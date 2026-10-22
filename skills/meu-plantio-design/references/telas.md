# Receitas de tela

Como montar as telas principais do Meu Plantio no padrão Caderno de campo. Cada receita lista as seções na ordem de cima para baixo, no celular. Para uma tela nova, comece pela receita mais parecida.

Estrutura comum de toda tela:
1. Cabeçalho: na tela de aba, propriedade (logo pequena + "Sítio São José ▾") à esquerda e buscar, avisos (com contador) e conta à direita. Na tela interna, "‹ Tela anterior" à esquerda e ⋯ à direita.
2. Linha de contexto em `tinta2` (data, variedade, propriedade) e título grande.
3. Seções: `RotuloSecao` + `GrupoLista` ou `GradeNumeros`.
4. Ação fixa embaixo (quando a tela tem uma ação principal) e abas.

## Início (aba)
1. Cabeçalho da aba. Contexto: "Quinta, 22 de outubro". Título: "Boa noite, {nome completo da conta}".
2. Aviso do plano, quando houver ("Teste grátis termina hoje · Assinar"): uma linha branca com borda à esquerda em `atencao`. Não use faixa colorida no topo.
3. **LANÇAR**: fileira horizontal rolável de botões contornados com "+": Gasto, Colheita, Diária (mão de obra), Plantio, Lembrete. Ela substitui o botão flutuante e os atalhos em ícone.
4. **RESUMO**: grade 2 × 2 com Plantios ativos ("1 de 1", legenda "limite do plano" em atenção quando chegar no limite), Mudas, Custo por linha e Tarefas hoje (legenda "N atrasadas").
5. **MEUS PLANTIOS** (ação "Ver todos"): uma linha por plantio com nome, variedade, marcador da fase e porcentagem, cronograma em miniatura (barra de 6px com as quatro fases e o traço de hoje), valor investido à direita e seta.
6. **DINHEIRO** (filtro Todos / por plantio, se houver mais de um): Total investido, Gasto no mês, Receitas, Retorno estimado (com marca-texto) e Situação ("■ Em formação").
7. **HOJE**: tarefas do dia ou "Nada agendado para hoje. + Lembrete"; linha "Previsão do tempo" que abre a escolha de cidade e, depois, mostra a previsão.

## Lavoura (aba)
1. Cabeçalho da aba. Contexto: "Manejo do campo". Título: "Lavoura".
2. **NO CAMPO**: Plantios ("1 ativo"), Mapa vivo ("nenhum talhão" / "N talhões"), Adubação ("N aplicações"), Correção de solo, Irrigação, Colheita.
3. **RECURSOS**: Estoque ("N insumos"), Mão de obra ("N trabalhadores"), Propriedades ("N").
4. **FERRAMENTAS**: Calculadora de plantio; Comparar safras (detalhe "planos pagos" em atenção, se o plano não incluir).
5. Nota em `tinta2`: "Pragas, doenças e indução floral ficam dentro de cada plantio."

Nada de grade de ícones. O número ao lado de cada módulo é o que torna a lista útil.

## Plantios (interna, a partir de Lavoura)
1. "‹ Lavoura" e título "Plantios". Puxar para atualizar.
2. Campo de busca ("Buscar plantio ou variedade").
3. Controle segmentado: Todos, Ativos, Colhidos, Encerrados.
4. Rótulo com a contagem ("1 PLANTIO"). Cada plantio é um grupo: linha principal com nome, "variedade · propriedade · N linhas", marcador do status e `CronogramaCiclo` compacto; embaixo, as linhas Mudas e Investido. Toque na linha principal abre o plantio; ações rápidas (Mudar status, Excluir) ficam no toque longo ou no deslizar.
5. Nota do plano quando houver limite ("Plano gratuito: 1 de 1 plantio usado").
6. Ação fixa: "+ Novo plantio". Se o limite foi atingido, o toque abre a explicação do plano em vez do formulário.

## Um plantio (interna)
1. "‹ Plantios" e ⋯ (só Vincular área e Excluir). Contexto: "variedade · propriedade · N linhas". Título: nome do plantio. Marcador do status.
2. Botões pequenos contornados: Mudar status (abre folha com os 9 status), Editar (mesmos campos de hoje, incluindo demarcar área no mapa) e Plano de manejo.
3. Grade 2 × 2: Investido, Receita, Mudas e A recuperar (em atenção).
4. **CICLO**: `CronogramaCiclo` compacto. Sem data de início: "Informe a data de início para ver o ciclo. Editar".
5. **REGISTROS**: abas deslizantes com contagem (Despesas, Insumos, Adubação, Colheita, Vendas, Anexos) e a lista da aba escolhida. Cada aba mantém o seu "Novo …".
6. **MANEJO**: Pragas e doenças (situação: "■ nenhuma ocorrência ativa" ou "■ N ativas" em problema), Indução floral (liberada no crescimento/manutenção), Irrigação (aplicações, sistema, plano, produtos), Correção de solo, Análise da área (botão "Gerar" quando não houver) e Linha do tempo (N eventos).
7. Ação fixa: "Receita" (contornado) + "Lançar despesa" (principal).

Os doze itens que hoje ficam no menu ⋮ precisam ter lugar visível. Confira em `inventario.md`.

## Nova despesa (folha)
Use `abrirFolha`. De cima para baixo:
1. Alça, "Cancelar" e título "Nova despesa".
2. `CampoValor` (valor obrigatório, teclado numérico, em destaque).
3. Grupo: Descrição * (campo), Categoria ›, Plantio › ("Sem vínculo (geral)" por padrão), Data ›.
4. Grupo: Pagamento › (Dinheiro por padrão), Responsável (opcional), Conta a pagar (switch; quando ligado, aparece Vencimento ›), Observações (opcional).
5. Rodapé fixo: "Salvar despesa" em verde-folha, largura total.

As listas de Categoria e Pagamento vêm do cadastro atual do app. Não invente opções. O mesmo molde serve para Nova receita, Nova venda, Nova adubação, Registrar colheita, Novo insumo, Novo trabalhador, Nova negociação e Novo lembrete: troque o rótulo do valor quando não for dinheiro (quantidade, caixas, unidades).

## Financeiro (aba)
1. Cabeçalho da aba. Contexto: "Todos os plantios". Título: "Financeiro". À direita do título, botão pequeno com o período ("Out 2026 ▾"), que vale para todas as visões.
2. Controle segmentado: Resumo, Despesas, Receitas.
3. Resumo: grade 2 × 2 com Saldo do mês (negativo na cor de texto e legenda "volta na colheita" durante a formação), A pagar (legenda do vencimento em atenção), Receitas e Despesas.
4. **LANÇAMENTOS** ("Ver todos"): linhas com descrição, "data · categoria" e valor (saída com "−R$"). Deslize para Editar/Excluir. Conta a vencer com a legenda em atenção; vencida, em problema.
5. **MAIS NO FINANCEIRO**: Vendas ("N pendentes"), Lucratividade e Relatórios (Financeiro, Por plantio, Produção, Insumos; exportar PDF).
6. Ação fixa: "Receita" (contornado) + "Nova despesa".

## Comercial (aba)
1. Cabeçalho da aba. Contexto: "Compra e venda de abacaxi". Título: "Comercial".
2. Grade 2 × 2: Lucro líquido (legenda "N negociações"), Margem (legenda "retorno N%"), Compras e Vendas (legenda "N frutas").
3. **ACOMPANHAR**: Mercado (preço médio do dia na própria linha), Recebimentos (valor do mês e "N atrasados"), Carregamentos (hoje, agendados, pendentes) e Negociações ("N abertas").
4. **FERRAMENTAS**: Marcar tara, Relatórios ("11 relatórios") e Cadastros (produtores, fornecedores, motoristas, caminhões, empresa).
5. Ação fixa: "+ Nova negociação".

## Mercado (interna, a partir de Comercial)
1. "‹ Comercial" e ⋯ (Lançamento manual). Puxar para atualizar = sincronizar CEASAs. Contexto: "Abacaxi Pérola · cotação de DD/MM". Título: "Mercado".
2. Controle segmentado: Média, CEAGESP, Campinas, BH.
3. Preço do dia em `valorDestaque` com "/un" pequeno; abaixo, a variação (queda em problema, alta em folha) e "caixeta (22 un) R$ …".
4. **POR CEASA** (30, 90 ou 180 dias): uma linha por CEASA em ordem de preço, com um gráfico pequeno de linha (uma série por CEASA, nunca as três misturadas), o preço à direita e a variação embaixo. A de maior preço ganha "maior preço hoje" com marca-texto.
5. **MÉDIAS**: 7, 30 e 90 dias numa linha, sem cor por média.
6. **SIMULAR VENDA**: Quantidade × Preço/un = Total (o total com sublinhado de marca-texto).

## Agenda (aba)
1. Cabeçalho da aba. Título: "Agenda". Alternância Lista/Calendário como controle segmentado.
2. Lembretes agrupados por dia ("HOJE", "AMANHÃ", "SEX, 24/10"), com atrasados no topo em problema.
3. Ação fixa: "+ Novo lembrete".

## Portal web e tablet (900px ou mais)
- As cinco abas viram a primeira linha de uma barra superior branca (logo, abas com traço verde embaixo da ativa, busca "Buscar ou ir para… Ctrl K", avisos e conta).
- A segunda linha mostra os módulos da aba aberta (em Lavoura: Plantios, Mapa vivo, Adubação…) ou, na Início, os atalhos de lançamento e o aviso do plano.
- Conteúdo com margem de 18 a 24px. A grade 2 × 2 vira uma faixa de 4 números. Grupos lado a lado em duas colunas (principal 1,65 e lateral 1). Listas longas viram tabelas com cabeçalho em `rotulo` e valores à direita.
- Formulários abrem num painel à direita (440px) em vez de folha.
- Nada abre como tela de celular esticada. Se um módulo ainda não tem layout largo, centralize-o numa coluna de no máximo 720px dentro da moldura.
