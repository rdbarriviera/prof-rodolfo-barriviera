"""
Analisador de Fluxo de Ordens
Analisa o book de ofertas e o tape (time & sales) para identificar
padrões de agressão compradora/vendedora
"""

from typing import Dict, List, Optional
from datetime import datetime
from collections import deque


class OrderFlowAnalyzer:
    """Analisador de fluxo de ordens para mini dólar"""

    def __init__(self, window_size: int = 100):
        """
        Inicializa o analisador

        Args:
            window_size: Tamanho da janela para análise (número de trades)
        """
        self.window_size = window_size
        self.trades = deque(maxlen=window_size)
        self.book_bid = {}  # Preço: Volume
        self.book_ask = {}  # Preço: Volume

        # Métricas de fluxo
        self.buy_volume = 0
        self.sell_volume = 0
        self.buy_trades = 0
        self.sell_trades = 0

    def update_book(self, bids: Dict[float, int], asks: Dict[float, int]):
        """
        Atualiza o book de ofertas

        Args:
            bids: Dicionário {preço: volume} de compras
            asks: Dicionário {preço: volume} de vendas
        """
        self.book_bid = bids.copy()
        self.book_ask = asks.copy()

    def add_trade(self, price: float, volume: int, aggressor: str, timestamp: datetime = None):
        """
        Adiciona um trade ao fluxo

        Args:
            price: Preço do trade
            volume: Volume negociado
            aggressor: 'buy' (compra agressiva) ou 'sell' (venda agressiva)
            timestamp: Timestamp do trade
        """
        if timestamp is None:
            timestamp = datetime.now()

        trade = {
            'price': price,
            'volume': volume,
            'aggressor': aggressor,
            'timestamp': timestamp
        }

        self.trades.append(trade)

        # Atualiza métricas
        if aggressor == 'buy':
            self.buy_volume += volume
            self.buy_trades += 1
        elif aggressor == 'sell':
            self.sell_volume += volume
            self.sell_trades += 1

        # Remove volume antigo se exceder janela
        if len(self.trades) > self.window_size:
            old_trade = self.trades[0]
            if old_trade['aggressor'] == 'buy':
                self.buy_volume -= old_trade['volume']
                self.buy_trades -= 1
            elif old_trade['aggressor'] == 'sell':
                self.sell_volume -= old_trade['volume']
                self.sell_trades -= 1

    def get_delta(self) -> int:
        """
        Retorna o delta (volume de compra - volume de venda)

        Returns:
            Delta de volume
        """
        return self.buy_volume - self.sell_volume

    def get_delta_percentage(self) -> float:
        """
        Retorna o delta em percentual

        Returns:
            Percentual de predomínio de compra (positivo) ou venda (negativo)
        """
        total_volume = self.buy_volume + self.sell_volume
        if total_volume == 0:
            return 0.0

        return (self.get_delta() / total_volume) * 100

    def get_aggressor_ratio(self) -> float:
        """
        Retorna a razão entre compras agressivas e vendas agressivas

        Returns:
            Razão buy/sell (>1 = mais compra, <1 = mais venda)
        """
        if self.sell_volume == 0:
            return float('inf') if self.buy_volume > 0 else 1.0

        return self.buy_volume / self.sell_volume

    def get_book_imbalance(self, levels: int = 5) -> float:
        """
        Calcula o desequilíbrio no book de ofertas

        Args:
            levels: Número de níveis a considerar

        Returns:
            Desequilíbrio (-100 a 100, positivo = mais ofertas de compra)
        """
        if not self.book_bid or not self.book_ask:
            return 0.0

        # Pega os top N níveis
        bid_levels = sorted(self.book_bid.items(), reverse=True)[:levels]
        ask_levels = sorted(self.book_ask.items())[:levels]

        bid_volume = sum(vol for _, vol in bid_levels)
        ask_volume = sum(vol for _, vol in ask_levels)

        total = bid_volume + ask_volume
        if total == 0:
            return 0.0

        return ((bid_volume - ask_volume) / total) * 100

    def get_large_trades(self, volume_threshold: int) -> List[Dict]:
        """
        Identifica trades grandes (ordens de tamanho significativo)

        Args:
            volume_threshold: Volume mínimo para considerar trade grande

        Returns:
            Lista de trades grandes
        """
        return [trade for trade in self.trades if trade['volume'] >= volume_threshold]

    def get_aggressive_cluster(self, time_window_seconds: int = 10) -> Dict:
        """
        Identifica clusters de agressão (múltiplas ordens agressivas em sequência)

        Args:
            time_window_seconds: Janela de tempo para considerar cluster

        Returns:
            Dicionário com informações do cluster
        """
        if not self.trades:
            return {'type': None, 'volume': 0, 'count': 0}

        recent_time = datetime.now()
        buy_cluster_volume = 0
        sell_cluster_volume = 0
        buy_cluster_count = 0
        sell_cluster_count = 0

        for trade in reversed(self.trades):
            time_diff = (recent_time - trade['timestamp']).total_seconds()
            if time_diff > time_window_seconds:
                break

            if trade['aggressor'] == 'buy':
                buy_cluster_volume += trade['volume']
                buy_cluster_count += 1
            elif trade['aggressor'] == 'sell':
                sell_cluster_volume += trade['volume']
                sell_cluster_count += 1

        if buy_cluster_volume > sell_cluster_volume:
            return {
                'type': 'buy',
                'volume': buy_cluster_volume,
                'count': buy_cluster_count,
                'dominance': buy_cluster_volume / (buy_cluster_volume + sell_cluster_volume) if (buy_cluster_volume + sell_cluster_volume) > 0 else 0
            }
        elif sell_cluster_volume > buy_cluster_volume:
            return {
                'type': 'sell',
                'volume': sell_cluster_volume,
                'count': sell_cluster_count,
                'dominance': sell_cluster_volume / (buy_cluster_volume + sell_cluster_volume) if (buy_cluster_volume + sell_cluster_volume) > 0 else 0
            }
        else:
            return {'type': 'neutral', 'volume': 0, 'count': 0, 'dominance': 0.5}

    def get_flow_signal(self) -> str:
        """
        Gera sinal baseado no fluxo de ordens

        Returns:
            'BULLISH', 'BEARISH' ou 'NEUTRAL'
        """
        delta_pct = self.get_delta_percentage()
        book_imbalance = self.get_book_imbalance()
        cluster = self.get_aggressive_cluster()

        # Critérios para sinal bullish
        if delta_pct > 20 and book_imbalance > 15 and cluster['type'] == 'buy':
            return 'BULLISH'

        # Critérios para sinal bearish
        if delta_pct < -20 and book_imbalance < -15 and cluster['type'] == 'sell':
            return 'BEARISH'

        return 'NEUTRAL'

    def get_statistics(self) -> Dict:
        """
        Retorna estatísticas completas do fluxo

        Returns:
            Dicionário com estatísticas
        """
        cluster = self.get_aggressive_cluster()

        return {
            'total_trades': len(self.trades),
            'buy_volume': self.buy_volume,
            'sell_volume': self.sell_volume,
            'buy_trades': self.buy_trades,
            'sell_trades': self.sell_trades,
            'delta': self.get_delta(),
            'delta_percentage': self.get_delta_percentage(),
            'aggressor_ratio': self.get_aggressor_ratio(),
            'book_imbalance': self.get_book_imbalance(),
            'cluster_type': cluster['type'],
            'cluster_volume': cluster['volume'],
            'flow_signal': self.get_flow_signal()
        }
