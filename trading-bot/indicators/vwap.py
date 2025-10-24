"""
Módulo de cálculo de VWAP (Volume Weighted Average Price)
Calcula VWAP diário e semanal para o mini dólar
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Tuple


class VWAPCalculator:
    """Calculadora de VWAP diário e semanal"""

    def __init__(self):
        self.daily_data = []
        self.weekly_data = []
        self.current_day = None
        self.current_week = None

    def reset_daily(self):
        """Reseta os dados diários"""
        self.daily_data = []
        self.current_day = datetime.now().date()

    def reset_weekly(self):
        """Reseta os dados semanais"""
        self.weekly_data = []
        self.current_week = datetime.now().isocalendar()[1]

    def add_tick(self, price: float, volume: int, timestamp: datetime = None):
        """
        Adiciona um tick aos cálculos de VWAP

        Args:
            price: Preço do tick
            volume: Volume negociado
            timestamp: Timestamp do tick (default: agora)
        """
        if timestamp is None:
            timestamp = datetime.now()

        tick_data = {
            'price': price,
            'volume': volume,
            'timestamp': timestamp,
            'pv': price * volume  # Price * Volume
        }

        # Verifica se é um novo dia
        if self.current_day is None or timestamp.date() != self.current_day:
            self.reset_daily()

        # Verifica se é uma nova semana
        current_week = timestamp.isocalendar()[1]
        if self.current_week is None or current_week != self.current_week:
            self.reset_weekly()

        # Adiciona aos dados
        self.daily_data.append(tick_data)
        self.weekly_data.append(tick_data)

    def calculate_vwap(self, data: List[Dict]) -> float:
        """
        Calcula VWAP baseado em uma lista de dados

        Args:
            data: Lista de dicionários com price, volume e pv

        Returns:
            Valor do VWAP
        """
        if not data:
            return 0.0

        total_pv = sum(tick['pv'] for tick in data)
        total_volume = sum(tick['volume'] for tick in data)

        if total_volume == 0:
            return 0.0

        return total_pv / total_volume

    def get_daily_vwap(self) -> float:
        """Retorna o VWAP diário atual"""
        return self.calculate_vwap(self.daily_data)

    def get_weekly_vwap(self) -> float:
        """Retorna o VWAP semanal atual"""
        return self.calculate_vwap(self.weekly_data)

    def get_vwap_deviation(self, current_price: float, vwap_type: str = 'daily') -> float:
        """
        Calcula o desvio percentual do preço atual em relação ao VWAP

        Args:
            current_price: Preço atual
            vwap_type: 'daily' ou 'weekly'

        Returns:
            Desvio percentual (positivo se acima do VWAP, negativo se abaixo)
        """
        vwap = self.get_daily_vwap() if vwap_type == 'daily' else self.get_weekly_vwap()

        if vwap == 0:
            return 0.0

        return ((current_price - vwap) / vwap) * 100

    def get_vwap_bands(self, vwap_type: str = 'daily', num_std: float = 1.0) -> Tuple[float, float, float]:
        """
        Calcula bandas de desvio padrão em torno do VWAP

        Args:
            vwap_type: 'daily' ou 'weekly'
            num_std: Número de desvios padrão

        Returns:
            Tupla (vwap, banda_superior, banda_inferior)
        """
        data = self.daily_data if vwap_type == 'daily' else self.weekly_data
        vwap = self.calculate_vwap(data)

        if not data or vwap == 0:
            return (0.0, 0.0, 0.0)

        # Calcula desvio padrão ponderado pelo volume
        prices = [tick['price'] for tick in data]
        volumes = [tick['volume'] for tick in data]

        # Desvio padrão ponderado
        variance = np.average((np.array(prices) - vwap) ** 2, weights=volumes)
        std_dev = np.sqrt(variance)

        upper_band = vwap + (std_dev * num_std)
        lower_band = vwap - (std_dev * num_std)

        return (vwap, upper_band, lower_band)

    def get_statistics(self) -> Dict:
        """
        Retorna estatísticas completas dos VWAPs

        Returns:
            Dicionário com estatísticas
        """
        daily_vwap, daily_upper, daily_lower = self.get_vwap_bands('daily', 1.0)
        weekly_vwap, weekly_upper, weekly_lower = self.get_vwap_bands('weekly', 1.0)

        return {
            'daily_vwap': daily_vwap,
            'daily_upper_band': daily_upper,
            'daily_lower_band': daily_lower,
            'daily_ticks': len(self.daily_data),
            'weekly_vwap': weekly_vwap,
            'weekly_upper_band': weekly_upper,
            'weekly_lower_band': weekly_lower,
            'weekly_ticks': len(self.weekly_data)
        }
