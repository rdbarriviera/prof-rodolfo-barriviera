"""
Estratégia de Trading baseada em VWAP e Fluxo de Ordens
Combina análise de VWAP (diário e semanal) com fluxo de ordens
para gerar sinais de entrada e saída
"""

from typing import Dict, Optional, Tuple
import sys
import os

# Adiciona o diretório pai ao path para imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from indicators.vwap import VWAPCalculator
from order_flow.analyzer import OrderFlowAnalyzer


class VWAPOrderFlowStrategy:
    """Estratégia que combina VWAP e Order Flow"""

    def __init__(self, config: Dict):
        """
        Inicializa a estratégia

        Args:
            config: Dicionário com configurações da estratégia
        """
        self.config = config
        self.vwap_calc = VWAPCalculator()
        self.order_flow = OrderFlowAnalyzer(window_size=config.get('flow_window', 100))

        # Parâmetros da estratégia
        self.vwap_deviation_threshold = config.get('vwap_deviation_threshold', 0.05)  # 0.05%
        self.delta_threshold = config.get('delta_threshold', 20)  # 20%
        self.book_imbalance_threshold = config.get('book_imbalance_threshold', 15)  # 15%

        # Controle de posição
        self.position = None  # 'LONG', 'SHORT' ou None
        self.entry_price = None
        self.stop_loss = None
        self.take_profit = None

        # Parâmetros de risco
        self.stop_loss_points = config.get('stop_loss_points', 50)  # pontos
        self.take_profit_points = config.get('take_profit_points', 100)  # pontos
        self.max_position_size = config.get('max_position_size', 1)

    def update_market_data(self, price: float, volume: int, aggressor: str,
                          bids: Dict[float, int], asks: Dict[float, int]):
        """
        Atualiza dados de mercado

        Args:
            price: Preço do último trade
            volume: Volume do trade
            aggressor: 'buy' ou 'sell'
            bids: Book de compras
            asks: Book de vendas
        """
        # Atualiza VWAP
        self.vwap_calc.add_tick(price, volume)

        # Atualiza order flow
        self.order_flow.add_trade(price, volume, aggressor)
        self.order_flow.update_book(bids, asks)

    def check_entry_long(self, current_price: float) -> bool:
        """
        Verifica condições para entrada em posição LONG

        Args:
            current_price: Preço atual

        Returns:
            True se deve entrar comprado
        """
        # 1. Preço deve estar próximo ou abaixo do VWAP diário
        daily_vwap = self.vwap_calc.get_daily_vwap()
        if daily_vwap == 0:
            return False

        price_vs_vwap = (current_price - daily_vwap) / daily_vwap * 100

        # Preço no VWAP ou ligeiramente abaixo
        if not (-self.vwap_deviation_threshold <= price_vs_vwap <= self.vwap_deviation_threshold):
            return False

        # 2. Fluxo deve ser comprador
        delta_pct = self.order_flow.get_delta_percentage()
        if delta_pct < self.delta_threshold:
            return False

        # 3. Book deve estar desequilibrado para compra
        book_imbalance = self.order_flow.get_book_imbalance()
        if book_imbalance < self.book_imbalance_threshold:
            return False

        # 4. Verificar alinhamento com VWAP semanal (tendência)
        weekly_vwap = self.vwap_calc.get_weekly_vwap()
        if weekly_vwap > 0 and current_price < weekly_vwap * 0.98:  # Muito abaixo da tendência semanal
            return False

        # 5. Cluster de compra agressiva
        cluster = self.order_flow.get_aggressive_cluster()
        if cluster['type'] != 'buy' or cluster['dominance'] < 0.6:
            return False

        return True

    def check_entry_short(self, current_price: float) -> bool:
        """
        Verifica condições para entrada em posição SHORT

        Args:
            current_price: Preço atual

        Returns:
            True se deve entrar vendido
        """
        # 1. Preço deve estar próximo ou acima do VWAP diário
        daily_vwap = self.vwap_calc.get_daily_vwap()
        if daily_vwap == 0:
            return False

        price_vs_vwap = (current_price - daily_vwap) / daily_vwap * 100

        # Preço no VWAP ou ligeiramente acima
        if not (-self.vwap_deviation_threshold <= price_vs_vwap <= self.vwap_deviation_threshold):
            return False

        # 2. Fluxo deve ser vendedor
        delta_pct = self.order_flow.get_delta_percentage()
        if delta_pct > -self.delta_threshold:
            return False

        # 3. Book deve estar desequilibrado para venda
        book_imbalance = self.order_flow.get_book_imbalance()
        if book_imbalance > -self.book_imbalance_threshold:
            return False

        # 4. Verificar alinhamento com VWAP semanal (tendência)
        weekly_vwap = self.vwap_calc.get_weekly_vwap()
        if weekly_vwap > 0 and current_price > weekly_vwap * 1.02:  # Muito acima da tendência semanal
            return False

        # 5. Cluster de venda agressiva
        cluster = self.order_flow.get_aggressive_cluster()
        if cluster['type'] != 'sell' or cluster['dominance'] < 0.6:
            return False

        return True

    def check_exit_conditions(self, current_price: float) -> Tuple[bool, str]:
        """
        Verifica condições de saída

        Args:
            current_price: Preço atual

        Returns:
            Tupla (deve_sair, motivo)
        """
        if self.position is None or self.entry_price is None:
            return (False, '')

        # Stop Loss
        if self.position == 'LONG':
            if current_price <= self.stop_loss:
                return (True, 'STOP_LOSS')
            if current_price >= self.take_profit:
                return (True, 'TAKE_PROFIT')

            # Reversão de fluxo
            if self.order_flow.get_flow_signal() == 'BEARISH':
                return (True, 'FLOW_REVERSAL')

        elif self.position == 'SHORT':
            if current_price >= self.stop_loss:
                return (True, 'STOP_LOSS')
            if current_price <= self.take_profit:
                return (True, 'TAKE_PROFIT')

            # Reversão de fluxo
            if self.order_flow.get_flow_signal() == 'BULLISH':
                return (True, 'FLOW_REVERSAL')

        return (False, '')

    def generate_signal(self, current_price: float) -> Dict:
        """
        Gera sinal de trading

        Args:
            current_price: Preço atual

        Returns:
            Dicionário com sinal e informações
        """
        signal = {
            'action': 'HOLD',
            'position_type': None,
            'price': current_price,
            'stop_loss': None,
            'take_profit': None,
            'size': 0,
            'reason': ''
        }

        # Verifica saída se já tem posição
        if self.position is not None:
            should_exit, exit_reason = self.check_exit_conditions(current_price)
            if should_exit:
                signal['action'] = 'EXIT'
                signal['position_type'] = self.position
                signal['reason'] = exit_reason
                return signal

        # Verifica entrada se não tem posição
        if self.position is None:
            # Verifica entrada LONG
            if self.check_entry_long(current_price):
                signal['action'] = 'ENTRY'
                signal['position_type'] = 'LONG'
                signal['price'] = current_price
                signal['stop_loss'] = current_price - self.stop_loss_points
                signal['take_profit'] = current_price + self.take_profit_points
                signal['size'] = self.max_position_size
                signal['reason'] = 'VWAP_ORDERFLOW_LONG'

            # Verifica entrada SHORT
            elif self.check_entry_short(current_price):
                signal['action'] = 'ENTRY'
                signal['position_type'] = 'SHORT'
                signal['price'] = current_price
                signal['stop_loss'] = current_price + self.stop_loss_points
                signal['take_profit'] = current_price - self.take_profit_points
                signal['size'] = self.max_position_size
                signal['reason'] = 'VWAP_ORDERFLOW_SHORT'

        return signal

    def execute_signal(self, signal: Dict):
        """
        Executa o sinal (atualiza estado interno)

        Args:
            signal: Sinal gerado
        """
        if signal['action'] == 'ENTRY':
            self.position = signal['position_type']
            self.entry_price = signal['price']
            self.stop_loss = signal['stop_loss']
            self.take_profit = signal['take_profit']

        elif signal['action'] == 'EXIT':
            self.position = None
            self.entry_price = None
            self.stop_loss = None
            self.take_profit = None

    def get_status(self) -> Dict:
        """
        Retorna status atual da estratégia

        Returns:
            Dicionário com status
        """
        vwap_stats = self.vwap_calc.get_statistics()
        flow_stats = self.order_flow.get_statistics()

        return {
            'position': self.position,
            'entry_price': self.entry_price,
            'stop_loss': self.stop_loss,
            'take_profit': self.take_profit,
            'vwap_daily': vwap_stats['daily_vwap'],
            'vwap_weekly': vwap_stats['weekly_vwap'],
            'order_flow_signal': flow_stats['flow_signal'],
            'delta_percentage': flow_stats['delta_percentage'],
            'book_imbalance': flow_stats['book_imbalance']
        }
