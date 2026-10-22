# Inventário de funcionalidades

Levantamento do app Meu Plantio versão 1.0.7 (portal web e app, 22/10/2026). Use esta lista ao reorganizar telas ou a navegação: cada linha precisa continuar acessível depois da mudança. A coluna "Na proposta" indica onde a função fica no padrão Caderno de campo (celular). Se mudar de lugar, atualize esta tabela.

## Acesso
| Funcionalidade | Hoje | Na proposta |
|---|---|---|
| Telas de boas-vindas | 3 telas com "Pular" antes do login | Mantidas, no novo visual |
| Login | E-mail, senha, mostrar senha, lembrar de mim | Mesmos campos |
| Esqueci minha senha | Link no login | Mesmo lugar |
| Criar conta | Link no login | Mesmo lugar |

## Geral
| Funcionalidade | Hoje | Na proposta |
|---|---|---|
| Aviso de teste grátis e Assinar | Faixa no topo da Início | Linha de aviso abaixo do título da Início |
| Menu rápido | ☰ na Início: busca e 13 atalhos (Novo plantio, Mão de obra, Colheitas, Adubação, Irrigação, Propriedades, Lançar gasto, Vendas, Compra e venda, Relatórios, Calculadora, Configurações, Ajuda) | Busca (acha registros e telas) + fileira Lançar + módulos listados em cada aba |
| Buscar em tudo | Lupa no topo | Lupa no cabeçalho das abas |
| Notificações | Sino no topo; atalho para a Agenda | Sino no cabeçalho das abas |
| Navegação principal | Abas embaixo: Início, Lavoura, Financeiro, Comercial, Agenda | Mesmas 5 abas; em tela larga, barra superior |
| Atualizar | Ícone no topo de quase toda tela | Puxar para atualizar |

## Início
| Funcionalidade | Hoje | Na proposta |
|---|---|---|
| Saudação e data | Faixa verde | Título grande com nome completo e data |
| Tarefas do dia | Card: tarefas hoje, atrasadas, programadas, Ver agenda | Número "Tarefas hoje" + seção Hoje |
| Atalhos | Novo plantio, Mão de obra, Colheitas, Financeiro, Agenda, Mais | Fileira Lançar; Financeiro e Agenda pelas abas |
| Indicadores | Plantios ativos (limite), Total de mudas, Custo por linha | Grade 2 × 2 |
| Meus plantios | Cards com fase e progresso, Novo plantio, Ver todos | Seção com uma linha por plantio e cronograma em miniatura |
| Atividades | Lista do dia, Ver | Seção Hoje |
| Previsão do tempo | Busca de cidade | Linha na seção Hoje |
| Resumo financeiro | Filtro por plantio, Total investido, status, Gasto no mês, Receitas, Retorno estimado | Seção Dinheiro, mesmos valores e filtro |
| Botão Lançar | Botão flutuante | Fileira Lançar |

## Lavoura
| Funcionalidade | Hoje | Na proposta |
|---|---|---|
| Módulos da Lavoura | Grade de 11 ícones | Lista agrupada com número em cada linha |
| Plantios: lista | Busca, filtros Todos/Ativos/Colhidos/Encerrados, card com fases, menu por card, Novo plantio | Busca, controle segmentado, linha com cronograma, ação fixa "Novo plantio" |
| Plantio: cabeçalho | Nome, variedade, status, propriedade, barra de progresso | Título, situação, botões e cronograma |
| Plantio: indicadores | Mudas, Total investido, Receita, A recuperar | Grade 2 × 2 |
| Plantio: registros | Abas Despesas, Insumos, Adubação, Colheita, Vendas, Anexos, cada uma com "novo" | Mesmas 6 abas com contagem |
| Plano de manejo | Menu ⋮ | Botão abaixo do título |
| Editar plantio | Menu ⋮: nome, propriedade, variedade, safra, status, mudas, valor/muda, linhas, datas, observações, demarcar área (GPS) | Botão Editar, mesmos campos |
| Mudar status | Menu ⋮: 9 status (Preparando Terra, Plantando, Plantado, Em Crescimento, Em Manutenção, Induzido (TIF), Pronto para Colheita, Colhido, Encerrado) | Botão abaixo do título, folha com os 9 status |
| Lançar receita | Menu ⋮ | Ação fixa "Receita" |
| Linha do tempo | Menu ⋮ | Seção Manejo |
| Indução floral (TIF) | Menu ⋮ | Seção Manejo |
| Pragas e doenças | Menu ⋮ | Seção Manejo |
| Vincular área | Menu ⋮ | ⋯ do cabeçalho |
| Irrigação do plantio | Menu ⋮ (Aplicações, Sistema, Plano, Produtos) | Seção Manejo |
| Correção de solo do plantio | Menu ⋮ | Seção Manejo |
| Análise da área | Menu ⋮ (gerar, histórico) | Seção Manejo |
| Excluir plantio | Menu ⋮ | ⋯ do cabeçalho, com confirmação |
| Mapa vivo | Buscar talhão | Lavoura › Mapa vivo |
| Adubação | Aplicações, total gasto, última; filtro por plantio, busca, ordenar; Histórico/Análise; Nova adubação | Lavoura › Adubação |
| Correção de solo | Filtro por plantio, busca, análise da área, Nova correção | Lavoura › Correção de solo |
| Irrigação | Escolha do plantio, Nova aplicação | Lavoura › Irrigação (sem tela azul) |
| Colheita | Lista, linha do tempo, Registrar | Lavoura › Colheita |
| Propriedades | Lista com área e plantios, editar, Nova propriedade | Lavoura › Propriedades + troca rápida no cabeçalho |
| Mão de obra | Busca, Ativos/Inativos/Todos, Diária em lote, Novo trabalhador | Lavoura › Mão de obra + "Diária" na fileira Lançar |
| Estoque | Buscar insumo, Novo insumo | Lavoura › Estoque |
| Safras | Comparar safras (Profissional e Premium) | Lavoura › Comparar safras, com aviso de plano |
| Calculadora de plantio | Área (m², hectare, linha, alqueire paulista, alqueire mineiro), 4 espaçamentos prontos, financeiro opcional, Limpar | Lavoura › Calculadora de plantio |

## Financeiro
| Funcionalidade | Hoje | Na proposta |
|---|---|---|
| Resumo | Filtrar período, saldo, receitas × despesas, contagens | Segmento Resumo, período no topo, números e lançamentos |
| Despesas | Busca, Nova despesa | Segmento Despesas; deslizar para editar ou excluir |
| Nova despesa | Descrição, valor, categoria, plantio, forma de pagamento, responsável, data, conta a pagar, observações | Folha que sobe de baixo, mesmos campos |
| Receitas | Busca, Nova receita | Segmento Receitas + ação fixa "Receita" |
| Vendas | Botão no Resumo; filtros Todos/Pendente/Recebido; Nova venda | Linha em "Mais no Financeiro" |
| Lucratividade | Botão no Resumo | Linha em "Mais no Financeiro" |
| Relatórios | Botão no Resumo; Financeiro, Por plantio, Produção, Insumos; período; Exportar PDF | Linha em "Mais no Financeiro" |

## Comercial
| Funcionalidade | Hoje | Na proposta |
|---|---|---|
| Painel | Nova negociação; resultado do mês (lucro líquido, bruto, margem, retorno); compras; vendas; recebimentos (hoje, semana, mês, atrasado); logística (hoje, agendados, pendentes, finalizados) | Grade de números + listas Acompanhar e Ferramentas + ação fixa |
| Mercado | CEASAs (média, CEAGESP, Campinas, BH), preço, caixeta, médias 7/30/90, comparativo, histórico 30/90/180, simulador, lançamento manual, sincronizar | Comercial › Mercado |
| Negociações | Lista, Nova negociação | Comercial › Negociações |
| Carregamentos | Filtros de status, calendário do mês, lista | Comercial › Carregamentos |
| Recebimentos | Total em aberto; Todos, A receber, Parcial, Atrasados, Recebidos; Novo | Comercial › Recebimentos |
| Relatórios comerciais | 11: compras por produtor, despesas da compra, vendas por fornecedor, lucro por negociação, lucro por período, despesas da venda, recebimentos, antecipações, carregamentos, por motorista, por caminhão | Comercial › Relatórios |
| Cadastros | Produtores, Fornecedores, Motoristas, Caminhões, Empresa | Comercial › Cadastros |
| Marcar tara | Nova contagem | Comercial › Marcar tara |

## Agenda
| Funcionalidade | Hoje | Na proposta |
|---|---|---|
| Lembretes | Lista, ver calendário, buscar, Novo lembrete | Aba Agenda + ação fixa "Novo lembrete" |

## Conta
| Funcionalidade | Hoje | Na proposta |
|---|---|---|
| Perfil | Foto, editar dados, verificar e-mail, membro desde, propriedades, área total | Conta (quadrado com as iniciais no cabeçalho) |
| Meu plano | Plano gratuito, limites, Assinar | Conta + aviso na Início |
| Dados e segurança | Dados pessoais, Alterar senha, Notificações, Sincronização | Conta |
| Usuários e permissões | Convidar equipe e definir permissões | Conta |
| Provedor de mapa | Mapbox ou Google Maps | Conta |
| Contar tara por blocos | Chave liga/desliga | Conta |
| Ajuda | Como usar, glossário, reportar problema, novidades, sobre | Conta + busca |
| Sair e excluir conta | Fim da tela de conta | Conta |

## Defeitos conhecidos da versão 1.0.7 (corrigir ao mexer na tela)
- Emoji da lua aparece como quadrado na saudação; o nome "Meu Plantio" vira só "Meu".
- Textos cortados no celular: "Plantios ativ…", "Total de mu…", atalho "Mais" pela metade.
- Palavras quebradas: "Propriedade s" (Lavoura) e "Prepar o" / "Colheit a" (lista de plantios).
- O botão flutuante "Lançar" cobre o card "Novo plantio".
- Gráfico de preços do Mercado em zigue-zague diário (parece juntar as três CEASAs numa série só).
- No portal web, os módulos abrem como tela de celular esticada, sem o menu.
