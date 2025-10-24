# 🚀 Guia de Instalação - Robô Mini Dólar no Profit Pro

**Versão NTSL para execução direta no Profit Pro**

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ Profit Pro instalado e atualizado
- ✅ Conta na corretora (com acesso ao módulo de Automação)
- ✅ Módulo de **Automação de Estratégias** contratado
- ✅ Conta de **Simulação** ativa (para testes)

---

## 🔧 Passo 1: Preparação

### 1.1 Verificar Módulo de Automação

1. Abra o **Profit Pro**
2. Verifique se o menu **"Automação"** está disponível no topo
3. Se não estiver, entre em contato com sua corretora para contratar

### 1.2 Ativar Conta de Simulação

1. No Profit, vá em **"Conexão" > "Ambiente de Negociação"**
2. Selecione **"Conta de Simulação"**
3. Confirme a conexão

⚠️ **IMPORTANTE**: SEMPRE teste em simulação antes de usar conta real!

---

## 📝 Passo 2: Criar a Estratégia

### 2.1 Abrir Editor de Estratégias

1. No Profit Pro, clique em **"Automação"**
2. Selecione **"Editor de Estratégias"**
3. Clique em **"Nova Estratégia"** ou pressione `Ctrl+N`

### 2.2 Configurar Nome e Descrição

1. **Nome**: `MiniDolar_VWAP_OrderFlow`
2. **Descrição**: `Estratégia VWAP + Fluxo de Ordens para Mini Dólar`
3. **Tipo**: `Automação`

### 2.3 Copiar o Código

1. Abra o arquivo **`MiniDolar_VWAP_OrderFlow.src`**
2. Selecione TODO o código (`Ctrl+A`)
3. Copie (`Ctrl+C`)
4. Cole no Editor de Estratégias do Profit (`Ctrl+V`)

### 2.4 Compilar o Código

1. Clique em **"Compilar"** ou pressione `F9`
2. Verifique se aparece **"Compilação bem-sucedida"** na parte inferior
3. Se houver erros, revise o código copiado

⚠️ **Se der erro**: Certifique-se de copiar TODO o código, incluindo as primeiras linhas de comentário.

---

## ⚙️ Passo 3: Configurar Parâmetros

### 3.1 Escolher Perfil de Risco

Abra o arquivo **`PERFIS_CONFIGURACAO.txt`** e escolha um perfil:

- **Conservador**: Para iniciantes, mais seguro
- **Moderado**: Recomendado para começar
- **Agressivo**: Para traders experientes
- **Scalper**: Operações rápidas
- **Defensivo**: Apenas tendências fortes

### 3.2 Aplicar Configurações

No editor, na seção **`Input`** (no início do código), ajuste os valores:

**Exemplo - Perfil MODERADO:**

```pascal
Input
  StopLossPoints     : Integer(50);
  TakeProfitPoints   : Integer(100);
  MaxContracts       : Integer(1);
  VWAPDeviationPct   : Float(0.05);
  DeltaThreshold     : Integer(20);
  BookImbalanceThreshold : Integer(15);
  // ... demais parâmetros
```

### 3.3 Salvar Estratégia

1. Clique em **"Salvar"** ou `Ctrl+S`
2. Escolha um local seguro
3. Nome sugerido: `MiniDolar_VWAP_OrderFlow.str`

---

## 📊 Passo 4: Aplicar no Gráfico

### 4.1 Abrir Gráfico do Mini Dólar

1. No Profit, abra um **novo gráfico**
2. Digite o símbolo: **`WDO`** (mini dólar)
3. Escolha o **vencimento desejado** (ex: WDOH25)
4. **Timeframe**: Recomendado **1 minuto** ou **tick a tick**

### 4.2 Aplicar a Estratégia

1. Com o gráfico aberto, clique em **"Automação"**
2. Selecione **"Aplicar Estratégia"**
3. Escolha **`MiniDolar_VWAP_OrderFlow`** da lista
4. Clique em **"Aplicar"**

### 4.3 Verificar Indicadores

Após aplicar, você deve ver no gráfico:

- **VWAP Diário** (linha azul)
- **VWAP Semanal** (linha verde)
- **Bandas de referência** (linhas cinzas)
- **Painel 1**: Delta % e Book Imbalance %
- **Painel 2**: Indicador de posição

---

## 🎮 Passo 5: Ativar o Robô

### 5.1 Habilitar Automação

1. No gráfico, clique com **botão direito**
2. Selecione **"Automação"**
3. Marque **"Habilitar Envio de Ordens"**

⚠️ **ATENÇÃO**:
- Verifique se está em **CONTA DE SIMULAÇÃO**
- Confirme que entende os riscos
- Monitore constantemente

### 5.2 Configurar Ordens

1. Vá em **"Automação" > "Configurações"**
2. Configure:
   - **Validade**: Dia
   - **Tipo**: Mercado (para melhor execução)
   - **Confirmação**: Desabilitada (para automação completa)

### 5.3 Iniciar Operação

1. Certifique-se de que está **dentro do horário de operação** (9h-17:30h)
2. O robô começará a analisar o mercado automaticamente
3. Aguarde os sinais de entrada

---

## 📈 Passo 6: Monitoramento

### 6.1 Painéis de Acompanhamento

Observe os seguintes painéis no gráfico:

**Gráfico Principal:**
- Preço em relação aos VWAPs
- Bandas de operação

**Painel 1 - Fluxo:**
- **Delta %**: Deve cruzar as linhas de threshold (+20 ou -20)
- **Book Imbalance**: Desequilíbrio do book

**Painel 2 - Posição:**
- **Verde**: Posição LONG ativa
- **Vermelho**: Posição SHORT ativa
- **Cinza**: Sem posição

### 6.2 Log de Operações

Para ver o histórico de trades:

1. Vá em **"Automação" > "Log de Ordens"**
2. Verifique:
   - Horário das entradas
   - Preços de entrada/saída
   - Resultado (lucro/prejuízo)

### 6.3 Arquivo de Log (Opcional)

Se habilitou `{$IFDEF Audit}`, verifique o arquivo:
- **Local**: Pasta do Profit Pro
- **Nome**: `RoboLog.txt`
- **Conteúdo**: Detalhes de cada operação

---

## 🛑 Passo 7: Parar o Robô

### 7.1 Desabilitar Automação

1. No gráfico, clique com **botão direito**
2. Selecione **"Automação"**
3. **Desmarque** "Habilitar Envio de Ordens"

### 7.2 Fechar Posições Manualmente (se necessário)

Se houver posição aberta:

1. Vá em **"Ordens"**
2. Visualize posições abertas
3. Clique em **"Zerar Posição"** se necessário

---

## 🔧 Ajustes e Otimização

### Modificar Parâmetros Durante o Uso

**NÃO recomendado durante o dia de trade!**

Para ajustar:

1. Pare o robô
2. Feche posições
3. Edite os parâmetros no Editor
4. Compile novamente
5. Reaplicar no gráfico

### Otimização de Parâmetros

Para encontrar os melhores parâmetros:

1. Use o **Backtesting** do Profit
2. Teste diferentes configurações
3. Compare resultados
4. Escolha o melhor perfil para seu estilo

**Como fazer Backtest:**

1. Editor de Estratégias
2. **"Testar" > "Backtest"**
3. Configure período de teste
4. Execute e analise resultados

---

## ⚠️ Checklist Antes de Operar REAL

Antes de sair da simulação para conta real, verifique:

- [ ] Testou por pelo menos **2 semanas** em simulação
- [ ] Resultados foram **consistentemente positivos**
- [ ] Entendeu **completamente** como o robô opera
- [ ] Ajustou parâmetros para seu **perfil de risco**
- [ ] Tem **capital suficiente** para suportar drawdowns
- [ ] Configurou **limites de perda** diária
- [ ] Sabe como **parar o robô rapidamente**
- [ ] Tem **tempo para monitorar** constantemente
- [ ] Leu e entendeu todos os **riscos**

---

## 🆘 Solução de Problemas

### Problema: Robô não compila

**Solução:**
- Verifique se copiou TODO o código
- Certifique-se de que a versão do Profit está atualizada
- Revise se não há caracteres especiais mal formatados

### Problema: Robô não gera ordens

**Possíveis causas:**
- Automação não está habilitada
- Está fora do horário de operação
- Condições de entrada não foram atendidas
- Book/fluxo insuficiente

**Solução:**
- Habilite "Envio de Ordens"
- Verifique horário (9h-17:15h)
- Observe os indicadores (Delta, Book)

### Problema: Muitas ordens sendo geradas

**Solução:**
- Use perfil mais conservador
- Aumente DeltaThreshold
- Aumente BookImbalanceThreshold
- Diminua VWAPDeviationPct

### Problema: Poucas ordens sendo geradas

**Solução:**
- Use perfil mais agressivo
- Diminua DeltaThreshold
- Diminua BookImbalanceThreshold
- Aumente VWAPDeviationPct

### Problema: Stops sendo atingidos frequentemente

**Solução:**
- Aumente StopLossPoints
- Use perfil mais defensivo
- Revise se o mercado não está muito volátil
- Considere não operar em dias de dados econômicos

---

## 📊 Exemplo de Configuração Inicial Recomendada

Para sua **primeira semana** de testes:

```
PERFIL: CONSERVADOR + HORÁRIO LIMITADO

StopLossPoints           = 40
TakeProfitPoints         = 80
MaxContracts             = 1
VWAPDeviationPct         = 0.03
DeltaThreshold           = 25
BookImbalanceThreshold   = 20
FlowWindowSize           = 150
ClusterDominance         = 0.65
EnableLongTrades         = True
EnableShortTrades        = False    // Apenas LONG no início
EnableFlowExit           = True
StartTime                = 1000     // Evita abertura
EndTime                  = 1600     // Sai cedo
StopNewTradesTime        = 1530
```

**Por quê?**
- Stop menor = menor risco por trade
- Apenas LONG = mais simples de acompanhar
- Horário limitado = evita extremos de volatilidade
- Parâmetros conservadores = menos trades, mais qualidade

---

## 📚 Recursos Adicionais

### Documentação Oficial

- **NTSL**: https://ajuda.nelogica.com.br
- **Automação Profit**: https://blog.nelogica.com.br/automacao-de-estrategias-o-seu-primeiro-robo-trader-no-profit/

### Suporte

- **Corretora**: Contate o suporte da sua corretora
- **Profit Pro**: Central de ajuda Nelogica

---

## ✅ Resumo Rápido

1. **Instalar**: Copiar código no Editor de Estratégias
2. **Configurar**: Escolher perfil e ajustar parâmetros
3. **Aplicar**: Adicionar estratégia no gráfico WDO
4. **Testar**: Rodar em simulação por 2+ semanas
5. **Monitorar**: Acompanhar constantemente
6. **Otimizar**: Ajustar conforme resultados
7. **Avançar**: Só passar para real após dominar simulação

---

## ⚠️ AVISO FINAL

- **Trading envolve risco de perda**
- **Não opere com dinheiro que não pode perder**
- **Este robô não garante lucros**
- **Resultados passados não garantem resultados futuros**
- **Monitore sempre, nunca deixe 100% automático**
- **USE POR SUA CONTA E RISCO**

---

**Boa sorte e bons trades! 🚀**

*Mantenha disciplina e respeite seu gerenciamento de risco.*
