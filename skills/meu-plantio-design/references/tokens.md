# Tokens · Caderno de campo

Valores de referência do Meu Plantio. Os mesmos valores estão em `assets/tokens.json` (para scripts e ferramentas de design) e em Dart em `flutter.md`.

## Cores

### Base
| Token | Hex | Uso |
|---|---|---|
| `papel` | `#F3F3EF` | fundo de todas as telas |
| `folhaBranca` | `#FFFFFF` | grupos de lista, barra de abas, folhas (bottom sheet), campos |
| `regua` | `#D8DBD4` | borda de 1px de grupos, campos e botões secundários |
| `reguaSuave` | `#E9EBE6` | divisória entre linhas dentro de um grupo |
| `campoBusca` | `#E6E7E2` | fundo do campo de busca (sem borda) |
| `tinta` | `#1A1D1B` | texto principal, filtro selecionado, aba ativa |
| `tinta2` | `#5B635F` | texto secundário, rótulos, detalhe à direita da linha |
| `tinta3` | `#8A918D` | legenda, placeholder, seta da linha |

### Ação e situação
| Token | Hex | Uso |
|---|---|---|
| `folha` | `#2F6B57` | botão principal, link, aba ativa (traço), situação "ok" |
| `folhaEscura` | `#234F41` | botão principal pressionado |
| `marcaTexto` | `#F5CF47` | marcador "hoje", total calculado (sublinhado grosso ou fundo da metade de baixo do texto) |
| `marcaTextoTinta` | `#3A2F00` | texto sobre o marca-texto |
| `atencao` | `#9A5F0E` | conta a vencer, limite do plano, "a recuperar" |
| `problema` | `#B3261E` | atraso, praga ativa, prejuízo, Excluir, contador de avisos |

### Fases da lavoura (só no cronograma e no marcador de situação do plantio)
| Fase | Hex | Por quê |
|---|---|---|
| Preparo | `#9A6B43` | cor da terra |
| Crescimento | `#8DB3A0` | broto novo |
| Manutenção | `#2F6B57` | folha adulta (igual à cor de ação) |
| Colheita | `#E2B53B` | fruto maduro |

### Mapeamento de status do plantio para a cor do quadrado
| Status no app | Cor |
|---|---|
| Preparando Terra, Plantando | Preparo |
| Plantado, Em Crescimento | Crescimento |
| Em Manutenção, Induzido (TIF) | Manutenção |
| Pronto para Colheita, Colhido | Colheita |
| Encerrado | `tinta3` |

### Cores proibidas
Nenhum azul, roxo, laranja ou rosa como cor de tela, de cabeçalho ou de módulo. Se precisar diferenciar categorias num gráfico (ex.: despesas por categoria), use nesta ordem: Colheita `#E2B53B`, Preparo `#9A6B43`, `#2D5E86` (azul-acinzentado, só em gráfico), `tinta3` `#8A918D` para "outros".

## Tipografia

Fontes: **Archivo** (variável, eixos de largura `wdth` 62–125 e peso `wght` 100–900) e **JetBrains Mono**. Empacote os arquivos no app (`assets/fonts/`): a largura variável só funciona com o arquivo variável, e assim a fonte também funciona sem internet no campo.

| Estilo | Fonte | Tamanho / peso | Largura | Outros |
|---|---|---|---|---|
| `tituloTela` | Archivo | 28 / 760 | 108% | espaçamento −0,7; altura 1,08 |
| `tituloTelaInterna` | Archivo | 25 / 760 | 108% | igual ao acima |
| `tituloFolha` | Archivo | 17 / 700 | 100% | título da bottom sheet |
| `rotulo` | Archivo | 11 / 650 | 75% | MAIÚSCULAS, espaçamento +0,8 |
| `linhaTitulo` | Archivo | 15 / 600 | 100% | título da linha de lista |
| `corpo` | Archivo | 15 / 400 | 100% | texto comum |
| `detalhe` | Archivo | 13,5 / 400 | 100% | detalhe à direita da linha, cor `tinta2` |
| `legenda` | Archivo | 12,5 / 400 | 100% | subtítulo da linha, cor `tinta2` |
| `valorLinha` | JetBrains Mono | 14,5 / 700 | — | algarismos tabulares |
| `valorGrade` | JetBrains Mono | 18 / 700 | — | grade 2 × 2 |
| `valorDestaque` | JetBrains Mono | 34 a 46 / 700 | — | preço do dia, valor do formulário; espaçamento −1 |
| `botao` | Archivo | 14,5 / 650 | 100% | |
| `aba` | Archivo | 10,5 / 600 | 100% | rótulo das abas |

Portal web (tela larga): `tituloTela` 26, `corpo` 13,5, `valorGrade` 22.

## Forma e espaço

| Token | Valor |
|---|---|
| Margem lateral da tela | 14px para grupos, 16 a 20px para títulos e rótulos |
| Espaço entre grupos | 18px acima do rótulo, 7px entre rótulo e grupo |
| Altura mínima da linha de lista | 50px (alvo de toque mínimo 48px) |
| Botão principal | altura 44–48px, canto 6px |
| Botão pequeno | altura 36px, canto 6px |
| Grupo de lista / grade de números | canto 8px, borda 1px `regua`, sem sombra |
| Campo de texto | altura 44px, canto 6px, borda 1px `regua` |
| Controle segmentado | altura 34px, canto 7px, divisórias internas |
| Quadrado de situação | 9 × 9px, sem canto |
| Barra de abas | 64px + área segura de baixo; borda superior 1px |
| Barra de ação fixa | 66px, fundo branco, borda superior 1px `reguaSuave` |
| Folha (bottom sheet) | canto 14px no topo, alça de 40 × 5px |
| Sombra | nenhuma; exceção: folha e painel que abrem por cima |

## Ícones

Traço de 1,7px, ponta reta (`square`), sem preenchimento, desenhados num quadro de 24px. Use só estes:

| Uso | Tamanho |
|---|---|
| Cinco abas (Início = casa, Lavoura = quatro linhas de plantio sobre o chão, Financeiro = nota com moeda, Comercial = caixa de fruta, Agenda = calendário) | 22px |
| Ações de cabeçalho: buscar, avisos, mais (⋯), voltar | 18–20px |
| Dentro de botão: adicionar (+) | 15px |
| Seta de linha (›) | 16px, cor `tinta3` |

Se o projeto usa um pacote de ícones (Material Symbols, Lucide), use a variante de traço fino e não coloque o ícone dentro de uma forma colorida.
