# 🤖 Robô Mini Dólar - Versão NTSL (Profit Pro)

**Estratégia: VWAP + Order Flow**
**Versão para execução DIRETA no Profit Pro**

---

## 📌 Sobre Esta Versão

Esta é a versão **NTSL** (Nelogica Trading System Language) do robô de trading para mini dólar. Ao contrário da versão Python que requer integração externa, **esta versão roda nativamente dentro do Profit Pro**.

### ✅ Vantagens da Versão NTSL

- ✅ **Execução nativa** no Profit Pro (sem necessidade de DLL externa)
- ✅ **Plug & Play** - Basta copiar e colar no editor
- ✅ **Acesso direto** ao book de ofertas e fluxo em tempo real
- ✅ **Visualização gráfica** - VWAPs e indicadores plotados automaticamente
- ✅ **Módulo de Automação** oficial da Nelogica
- ✅ **Backtest integrado** - Teste histórico no próprio Profit
- ✅ **Mais estável** - Menos pontos de falha

### 🔄 Diferenças vs Versão Python

| Característica | Python | NTSL |
|----------------|--------|------|
| **Instalação** | Complexa | Simples |
| **DLL Externa** | Necessária | Não necessária |
| **Integração** | Manual | Nativa |
| **Backtest** | Manual | Integrado |
| **Customização** | Mais flexível | Limitada ao NTSL |
| **Deploy** | Complexo | Imediato |

**Recomendação:** Se você tem acesso ao módulo de Automação do Profit Pro, **use a versão NTSL** (esta).

---

## 📁 Arquivos Incluídos

```
ntsl-version/
│
├── MiniDolar_VWAP_OrderFlow.src    # Código principal NTSL
├── PERFIS_CONFIGURACAO.txt         # 5 perfis de risco prontos
├── GUIA_INSTALACAO_PROFIT.md       # Guia passo a passo completo
└── README_NTSL.md                  # Este arquivo
```

---

## 🚀 Início Rápido (5 minutos)

### 1. Copiar Código

Abra `MiniDolar_VWAP_OrderFlow.src` e copie TODO o conteúdo.

### 2. Criar Estratégia no Profit

1. Abra **Profit Pro**
2. Vá em **Automação > Editor de Estratégias**
3. Clique em **Nova Estratégia**
4. Cole o código
5. Compile (**F9**)

### 3. Configurar Parâmetros

Abra `PERFIS_CONFIGURACAO.txt` e escolha um perfil (recomendado: **Moderado**).

### 4. Aplicar no Gráfico

1. Abra gráfico do **WDO** (mini dólar)
2. **Automação > Aplicar Estratégia**
3. Selecione `MiniDolar_VWAP_OrderFlow`

### 5. Ativar em Simulação

1. Certifique-se de estar em **conta de simulação**
2. Clique com botão direito no gráfico
3. **Automação > Habilitar Envio de Ordens**

**Pronto!** O robô está operando em simulação.

---

## 📖 Documentação Detalhada

### 📘 Para instalação completa passo a passo:
👉 Leia **`GUIA_INSTALACAO_PROFIT.md`**

### 📗 Para escolher e configurar perfis:
👉 Leia **`PERFIS_CONFIGURACAO.txt`**

### 📙 Para entender a estratégia:
👉 Leia **`../README.md`** (pasta raiz do projeto)

---

## 🎯 Como Funciona

### Estratégia em Resumo

O robô combina dois elementos:

#### 1️⃣ VWAP (Volume Weighted Average Price)
- Calcula VWAP **diário** e **semanal** em tempo real
- Identifica quando preço está próximo ao valor justo
- Usa como referência para entradas

#### 2️⃣ Fluxo de Ordens (Order Flow)
- Monitora **delta de volume** (compra vs venda)
- Analisa **desequilíbrio do book** de ofertas
- Identifica **clusters de agressão** compradora/vendedora

### Sinais de Entrada

**LONG (Compra):**
- ✅ Preço próximo ao VWAP diário (±0.05%)
- ✅ Delta positivo > 20% (mais compra que venda)
- ✅ Book desequilibrado para compra > 15%
- ✅ Cluster de compras agressivas detectado

**SHORT (Venda):**
- ✅ Preço próximo ao VWAP diário (±0.05%)
- ✅ Delta negativo > 20% (mais venda que compra)
- ✅ Book desequilibrado para venda > 15%
- ✅ Cluster de vendas agressivas detectado

### Saídas

- 🛑 **Stop Loss**: 50 pontos (R$ 20 por contrato)
- 🎯 **Take Profit**: 100 pontos (R$ 40 por contrato)
- 🔄 **Reversão de Fluxo**: Sai se fluxo inverter

---

## 📊 O Que Você Verá no Gráfico

### Painel Principal
- **Linha Azul**: VWAP Diário
- **Linha Verde**: VWAP Semanal
- **Linhas Cinzas**: Bandas de referência (±0.5%)

### Painel 1 - Fluxo de Ordens
- **Linha Amarela**: Delta % (compra vs venda)
- **Linha Laranja**: Book Imbalance % (desequilíbrio)
- **Linhas Verdes/Vermelhas**: Thresholds de entrada

### Painel 2 - Status da Posição
- **Barra Verde**: Posição LONG ativa
- **Barra Vermelha**: Posição SHORT ativa
- **Linha Cinza**: Sem posição (flat)

---

## ⚙️ Perfis de Configuração

### 🛡️ Conservador
**Para iniciantes e trading mais seguro**
- Stop: 40 pontos | Target: 80 pontos
- Entradas mais seletivas (menos trades)
- Menor risco por operação

### 📈 Moderado (Recomendado)
**Equilíbrio entre risco e retorno**
- Stop: 50 pontos | Target: 100 pontos
- Configuração testada e balanceada
- Ideal para maioria dos traders

### 🚀 Agressivo
**Para traders experientes**
- Stop: 70 pontos | Target: 140 pontos
- Mais entradas (mais trades)
- Maior exposição ao risco

### ⚡ Scalper
**Operações rápidas intraday**
- Stop: 30 pontos | Target: 45 pontos
- Múltiplas operações por dia
- Requer acompanhamento constante

### 🛡️ Defensivo
**Apenas tendências fortes**
- Stop: 100 pontos | Target: 200 pontos
- Poucos trades de alta qualidade
- Menor estresse operacional

**📋 Todos os parâmetros detalhados em:** `PERFIS_CONFIGURACAO.txt`

---

## 🧪 Testando o Robô

### Fase 1: Simulação (Mínimo 2 Semanas)

1. **Configure ambiente de simulação** no Profit
2. **Aplique perfil CONSERVADOR** primeiro
3. **Monitore CONSTANTEMENTE** as primeiras operações
4. **Anote resultados** em planilha

### Fase 2: Otimização

1. Use **Backtest** do Profit para testar parâmetros
2. Teste diferentes perfis
3. Ajuste conforme seu estilo
4. Compare resultados

### Fase 3: Real (Somente após dominar simulação)

1. **Certifique-se** de ter resultados consistentes em simulação
2. Comece com **1 contrato apenas**
3. **Monitore ainda mais** de perto
4. Aumente gradualmente se resultados forem positivos

---

## ⚠️ Avisos Importantes

### 🚨 NUNCA faça isso:

- ❌ Pular fase de simulação
- ❌ Deixar robô sem monitoramento
- ❌ Operar com capital que não pode perder
- ❌ Mudar parâmetros durante o dia de trade
- ❌ Ignorar stops
- ❌ Operar em dias de dados econômicos importantes sem experiência

### ✅ SEMPRE faça isso:

- ✅ Teste extensivamente em simulação
- ✅ Monitore constantemente (especialmente no início)
- ✅ Respeite seu stop loss
- ✅ Anote todas as operações
- ✅ Revise resultados semanalmente
- ✅ Ajuste parâmetros gradualmente
- ✅ Defina limite de perda diária

---

## 🔧 Suporte e Troubleshooting

### Robô não compila?

**Soluções:**
- Verifique se copiou TODO o código (incluindo comentários iniciais)
- Atualize o Profit Pro para última versão
- Verifique se tem módulo de Automação habilitado

### Robô não gera ordens?

**Possíveis causas:**
- Automação não está habilitada
- Fora do horário de operação (9h-17:15h)
- Condições de entrada não foram satisfeitas
- Mercado sem fluxo suficiente

### Muitos trades sendo gerados?

**Solução:**
- Use perfil mais conservador
- Aumente DeltaThreshold e BookImbalanceThreshold

### Poucos trades sendo gerados?

**Solução:**
- Use perfil mais agressivo
- Diminua thresholds

### Stops frequentes?

**Soluções:**
- Aumente StopLossPoints
- Use perfil defensivo
- Evite horários de alta volatilidade

---

## 📊 Expectativas Realistas

### Win Rate Esperado
- **Conservador**: 55-65%
- **Moderado**: 50-60%
- **Agressivo**: 45-55%
- **Scalper**: 60-70% (necessário)

### Número de Trades/Dia
- **Conservador**: 1-3 trades
- **Moderado**: 3-6 trades
- **Agressivo**: 5-10 trades
- **Scalper**: 10-20 trades

### Drawdown Esperado
- **Conservador**: 2-4 stops consecutivos
- **Moderado**: 3-5 stops consecutivos
- **Agressivo**: 4-7 stops consecutivos

**⚠️ Importante**: Estes são valores ESPERADOS, não garantidos. O mercado pode ter períodos ruins.

---

## 📈 Monitoramento e Métricas

### Acompanhe Diariamente:

- 📊 **Número de trades**
- 💰 **P/L do dia**
- 📉 **Drawdown máximo**
- ✅ **Win rate**
- ⏱️ **Tempo médio em posição**
- 🎯 **Relação risco/retorno real**

### Revise Semanalmente:

- Quais setups funcionaram melhor?
- Quais horários foram mais lucrativos?
- Houve mudança no comportamento do mercado?
- Os parâmetros precisam ajuste?

---

## 🔐 Segurança

### Arquivo Privado

Este código é **PRIVADO** e **não deve ser compartilhado**.

### Dados Sensíveis

- Não compartilhe seus logs de operação
- Não divulgue seus parâmetros otimizados
- Não poste resultados com dados de conta

### Backup

Faça backup regular:
- Do arquivo .src
- Dos parâmetros configurados
- Dos logs de operação

---

## 📚 Recursos Adicionais

### Documentação Oficial

- **NTSL**: [https://ajuda.nelogica.com.br](https://ajuda.nelogica.com.br)
- **Automação Profit**: [Blog Nelogica](https://blog.nelogica.com.br)

### Comunidades

- Grupos de usuários do Profit Pro
- Fóruns de day trading
- Comunidades da sua corretora

---

## 🎓 Aprendizado Contínuo

### Próximos Passos

1. ✅ Dominar a versão básica
2. 🔧 Otimizar parâmetros para seu estilo
3. 📊 Estudar padrões que funcionam melhor
4. 🚀 Considerar adicionar filtros adicionais
5. 📈 Explorar outros ativos (índice, ações)

### Melhorias Futuras Possíveis

- Adicionar filtro de volatilidade (ATR)
- Implementar trailing stop
- Adicionar break-even automático
- Criar filtros de horário mais refinados
- Integrar com outros indicadores

---

## ✅ Checklist Final

Antes de operar em conta real, certifique-se:

- [ ] Testou por **mínimo 2 semanas** em simulação
- [ ] Obteve resultados **consistentemente positivos**
- [ ] **Entende completamente** a lógica do robô
- [ ] Sabe **parar o robô rapidamente** se necessário
- [ ] Tem **capital suficiente** para suportar drawdowns
- [ ] Configurou **limites de perda diária**
- [ ] Tem **tempo para monitorar** constantemente
- [ ] Leu e **entendeu TODOS os riscos**
- [ ] Testou o botão de **pânico/zerar posição**
- [ ] Tem **plano B** se algo der errado

---

## 📞 Suporte

**Para dúvidas sobre:**

- **Instalação/Compilação**: Revise o GUIA_INSTALACAO_PROFIT.md
- **Parâmetros**: Consulte PERFIS_CONFIGURACAO.txt
- **Estratégia**: Leia o README.md principal
- **Profit Pro**: Suporte oficial Nelogica ou sua corretora

---

## ⚖️ Disclaimer

**LEIA COM ATENÇÃO:**

- ⚠️ Trading envolve **risco substancial de perda**
- ⚠️ Este robô **NÃO garante lucros**
- ⚠️ Resultados passados **NÃO garantem** resultados futuros
- ⚠️ **Você é totalmente responsável** por suas operações
- ⚠️ O autor **NÃO se responsabiliza** por perdas
- ⚠️ **USE POR SUA CONTA E RISCO**

**Não opere com dinheiro que você não pode perder.**

---

## 📝 Changelog

### Versão 1.0 (24/10/2025)
- ✅ Release inicial
- ✅ Cálculo de VWAP diário e semanal
- ✅ Análise de fluxo de ordens
- ✅ Sistema de entrada LONG/SHORT
- ✅ Gerenciamento de risco (stop/target)
- ✅ 5 perfis de configuração pré-definidos
- ✅ Visualização gráfica completa
- ✅ Sistema de logging

---

## 👨‍💼 Autor

**Prof. Rodolfo Barriviera**
Data: 24 de Outubro de 2025

---

## 📄 Licença

**Código PRIVADO - Uso Pessoal**

Proibido:
- ❌ Redistribuição
- ❌ Uso comercial
- ❌ Compartilhamento público
- ❌ Revenda

---

**🚀 Bons trades e sucesso!**

*Lembre-se: Disciplina e gerenciamento de risco são mais importantes que a estratégia em si.*

---

**🔗 Estrutura do Projeto:**

```
trading-bot/
├── (Versão Python - pasta raiz)
└── ntsl-version/ (VOCÊ ESTÁ AQUI)
    ├── MiniDolar_VWAP_OrderFlow.src      ← Código principal
    ├── PERFIS_CONFIGURACAO.txt            ← Configurações prontas
    ├── GUIA_INSTALACAO_PROFIT.md          ← Tutorial completo
    └── README_NTSL.md                     ← Este arquivo
```

**📖 Comece por aqui:**
1. Leia este README (você está aqui ✅)
2. Depois vá para: **GUIA_INSTALACAO_PROFIT.md**
3. Escolha perfil em: **PERFIS_CONFIGURACAO.txt**
4. Copie o código: **MiniDolar_VWAP_OrderFlow.src**

**Boa sorte! 🎯**
