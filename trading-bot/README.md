# 🤖 Robô de Trading - Mini Dólar (WDO)

Robô automatizado para operações no mini dólar brasileiro utilizando estratégia baseada em **VWAP (Volume Weighted Average Price)** e **Análise de Fluxo de Ordens** no Profit Pro.

---

## 📋 Índice

- [Sobre](#sobre)
- [Estratégia](#estratégia)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Integração com Profit Pro](#integração-com-profit-pro)
- [Segurança](#segurança)
- [Avisos Importantes](#avisos-importantes)

---

## 📖 Sobre

Este robô foi desenvolvido para operar o **mini dólar (WDO)** na B3 através da plataforma **Profit Pro** da Nelogica. Ele combina análise técnica (VWAP) com análise de fluxo de ordens (order flow) para identificar oportunidades de trading de alta probabilidade.

### Características Principais

- ✅ Cálculo de VWAP diário e semanal em tempo real
- ✅ Análise de fluxo de ordens (delta, agressão, book de ofertas)
- ✅ Identificação de clusters de ordens agressivas
- ✅ Gerenciamento automático de risco (stop loss e take profit)
- ✅ Sistema de logging completo
- ✅ Modo simulação para testes
- ✅ Configuração flexível com perfis de risco

---

## 🎯 Estratégia

### Conceito

A estratégia combina dois elementos principais:

1. **VWAP (Volume Weighted Average Price)**
   - Indicador que mostra o preço médio ponderado pelo volume
   - Utiliza VWAP diário para entradas táticas
   - Utiliza VWAP semanal para filtro de tendência

2. **Análise de Fluxo de Ordens**
   - Monitora agressão compradora vs vendedora
   - Analisa desequilíbrio no book de ofertas
   - Identifica clusters de ordens grandes

### Regras de Entrada - LONG (Compra)

O robô abre posição **LONG** quando:

1. Preço está próximo ou ligeiramente abaixo do VWAP diário (±0.05%)
2. Delta de volume positivo > 20% (mais compra que venda)
3. Book desequilibrado para compra > 15%
4. Preço alinhado com tendência do VWAP semanal
5. Cluster de compras agressivas detectado (dominância > 60%)

**Saída:**
- Stop Loss: -50 pontos do preço de entrada
- Take Profit: +100 pontos do preço de entrada
- Reversão de fluxo para bearish

### Regras de Entrada - SHORT (Venda)

O robô abre posição **SHORT** quando:

1. Preço está próximo ou ligeiramente acima do VWAP diário (±0.05%)
2. Delta de volume negativo < -20% (mais venda que compra)
3. Book desequilibrado para venda < -15%
4. Preço alinhado com tendência do VWAP semanal
5. Cluster de vendas agressivas detectado (dominância > 60%)

**Saída:**
- Stop Loss: +50 pontos do preço de entrada
- Take Profit: -100 pontos do preço de entrada
- Reversão de fluxo para bullish

---

## 📁 Estrutura do Projeto

```
trading-bot/
│
├── main.py                          # Arquivo principal do robô
│
├── config/
│   ├── __init__.py
│   └── config.py                    # Configurações e perfis de risco
│
├── indicators/
│   ├── __init__.py
│   └── vwap.py                      # Cálculo de VWAP diário e semanal
│
├── order_flow/
│   ├── __init__.py
│   └── analyzer.py                  # Análise de fluxo de ordens
│
├── strategies/
│   ├── __init__.py
│   └── vwap_orderflow_strategy.py   # Estratégia principal
│
├── utils/
│   └── __init__.py
│
├── requirements.txt                 # Dependências Python
└── README.md                        # Esta documentação
```

---

## 🚀 Instalação

### Pré-requisitos

- Python 3.9 ou superior
- Profit Pro instalado e configurado
- Conta em corretora compatível com Profit Pro
- DLL/API da Nelogica (se disponível)

### Passos de Instalação

1. **Clone o repositório (ou navegue até a pasta)**

```bash
cd trading-bot
```

2. **Crie um ambiente virtual Python**

```bash
python -m venv venv
```

3. **Ative o ambiente virtual**

- Windows:
```bash
venv\Scripts\activate
```

- Linux/Mac:
```bash
source venv/bin/activate
```

4. **Instale as dependências**

```bash
pip install -r requirements.txt
```

---

## ⚙️ Configuração

### 1. Editar Arquivo de Configuração

Abra `config/config.py` e configure os seguintes parâmetros:

```python
# Configurações do Profit Pro
'profit': {
    'username': 'SEU_USUARIO',      # Seu usuário na corretora
    'password': 'SUA_SENHA',        # Sua senha
    'environment': 'SIMULACAO',      # 'SIMULACAO' ou 'REAL'
    'dll_path': 'C:/Nelogica/DLL/nelogica.dll',  # Caminho da DLL
}
```

### 2. Escolher Perfil de Risco

O robô oferece três perfis pré-configurados:

- **Conservador**: Entradas mais seletivas, stops menores
- **Moderado**: Equilíbrio entre risco e retorno (padrão)
- **Agressivo**: Entradas mais frequentes, stops maiores

Para mudar o perfil, edite em `main.py`:

```python
from config.config import get_config

CONFIG = get_config('conservador')  # ou 'moderado' ou 'agressivo'
```

### 3. Modo de Operação

**Modo Simulação (recomendado para testes):**
```python
'simulation_mode': True,
'enable_trading': False,
```

**Modo Real (atenção!):**
```python
'simulation_mode': False,
'enable_trading': True,
```

### 4. Parâmetros de Risco

Ajuste conforme sua tolerância ao risco:

```python
'strategy': {
    'stop_loss_points': 50,      # Pontos de stop
    'take_profit_points': 100,   # Pontos de gain
    'max_position_size': 1,      # Contratos por operação
}
```

---

## 🎮 Uso

### Modo Simulação (Teste)

Execute o robô em modo simulação para testar a estratégia:

```bash
python main.py
```

O robô irá:
1. Simular ticks de mercado
2. Calcular VWAP e fluxo de ordens
3. Gerar sinais de entrada/saída
4. Logar todas as ações em `trading_bot.log`

### Modo Real

**⚠️ ATENÇÃO: Apenas execute em modo real após testes extensivos!**

1. Configure credenciais reais em `config/config.py`
2. Ative modo real:
```python
'simulation_mode': False,
'enable_trading': True,
```
3. Execute:
```bash
python main.py
```

### Interromper o Robô

- Pressione `Ctrl+C` para parar graciosamente
- O robô fechará posições abertas se configurado

---

## 🔌 Integração com Profit Pro

### Status Atual

Este robô foi desenvolvido com uma **estrutura preparada** para integração com o Profit Pro. No entanto, a conexão real requer:

1. **DLL/API da Nelogica**
   - Contato com sua corretora para acesso à API
   - Documentação técnica da Nelogica
   - Instalação da DLL no sistema

2. **Credenciais de Acesso**
   - Usuário e senha da corretora
   - Configuração de ambiente (simulação/real)

### Próximos Passos para Integração Completa

1. **Obter acesso à API B3 da Nelogica**
   - Contate sua corretora (XP, Clear, Genial, etc.)
   - Solicite documentação técnica
   - Obtenha credenciais de acesso

2. **Implementar Conexão**

No arquivo `main.py`, substitua os TODOs pela implementação real:

```python
def connect_to_profit_pro(self):
    from nelogica_dll import ProfitConnection

    self.profit_connection = ProfitConnection(
        username=self.config['profit']['username'],
        password=self.config['profit']['password'],
        environment=self.config['profit']['environment']
    )

    return self.profit_connection.connect()
```

3. **Implementar Execução de Ordens**

```python
def execute_trade(self, signal):
    if signal['action'] == 'ENTRY' and signal['position_type'] == 'LONG':
        self.profit_connection.buy(
            symbol='WDOH25',
            quantity=signal['size'],
            price=signal['price'],
            stop_loss=signal['stop_loss'],
            take_profit=signal['take_profit']
        )
```

### Alternativas

Se não tiver acesso à DLL/API:

1. **NTSL (Nelogica Trading System Language)**
   - Desenvolver a estratégia diretamente no Profit Pro
   - Usar a linguagem nativa NTSL

2. **Integração Manual**
   - Usar o robô para gerar sinais
   - Executar ordens manualmente no Profit Pro

---

## 🔒 Segurança

### ⚠️ IMPORTANTE - Mantenha em Segredo

Este código contém lógica proprietária de trading. **NUNCA compartilhe:**

- ✋ Credenciais de acesso (usuário/senha)
- ✋ Arquivo `config/config.py` com dados reais
- ✋ Logs de operações (`trading_bot.log`, `trades.json`)
- ✋ A estratégia completa publicamente

### Boas Práticas

1. **Use .gitignore**
   ```
   # Adicione ao .gitignore
   config/config.py
   *.log
   trades.json
   metrics.json
   venv/
   __pycache__/
   ```

2. **Variáveis de Ambiente**
   - Use arquivo `.env` para credenciais sensíveis
   - Nunca comite o arquivo `.env`

3. **Backups**
   - Faça backup regular do código
   - Mantenha backups criptografados

4. **Controle de Acesso**
   - Mantenha o repositório PRIVADO no GitHub
   - Use autenticação de dois fatores

---

## ⚠️ Avisos Importantes

### Riscos de Trading

- 📉 **Trading envolve risco de perda financeira**
- 📉 **Não opere com dinheiro que não pode perder**
- 📉 **Resultados passados não garantem resultados futuros**
- 📉 **Sempre teste em simulação antes de operar real**
- 📉 **Nunca deixe o robô sem supervisão em modo real**

### Disclaimer

Este software é fornecido "como está", sem garantias de qualquer tipo. O autor não se responsabiliza por:

- Perdas financeiras decorrentes do uso deste robô
- Bugs ou erros no código
- Problemas de conexão com o Profit Pro
- Decisões de trading tomadas pelo robô

**USE POR SUA CONTA E RISCO.**

### Recomendações

1. ✅ Teste extensivamente em modo simulação
2. ✅ Comece com tamanho mínimo de posição (1 contrato)
3. ✅ Monitore o robô constantemente no início
4. ✅ Defina limites de perda diária
5. ✅ Revise e ajuste parâmetros regularmente
6. ✅ Mantenha um diário de operações
7. ✅ Consulte um profissional financeiro se necessário

---

## 📊 Logs e Monitoramento

O robô gera logs detalhados em `trading_bot.log`:

```bash
# Ver logs em tempo real
tail -f trading_bot.log

# Buscar sinais gerados
grep "SINAL GERADO" trading_bot.log
```

Arquivo de histórico de trades: `trades.json`
Arquivo de métricas: `metrics.json`

---

## 🛠️ Desenvolvimento Futuro

Melhorias planejadas:

- [ ] Integração completa com DLL da Nelogica
- [ ] Backtesting com dados históricos
- [ ] Dashboard web para monitoramento
- [ ] Notificações via Telegram
- [ ] Otimização de parâmetros via machine learning
- [ ] Suporte a múltiplos ativos
- [ ] Estratégias adicionais (breakout, mean reversion, etc.)

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Revise esta documentação
2. Verifique os logs de erro
3. Teste em modo simulação
4. Entre em contato com sua corretora para questões de API

---

## 📝 Licença

Este código é **propriedade privada** e **uso pessoal**.

**Proibida:**
- Redistribuição
- Uso comercial
- Compartilhamento público

---

## 👨‍💼 Autor

**Prof. Rodolfo Barriviera**

Data de criação: 24 de Outubro de 2025

---

**🚀 Bons trades e boa sorte!**

*Lembre-se: A disciplina e o gerenciamento de risco são mais importantes que a estratégia.*
