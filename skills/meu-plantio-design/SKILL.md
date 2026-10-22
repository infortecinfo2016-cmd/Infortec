---
name: meu-plantio-design
description: Padrão visual "Caderno de campo" do app Meu Plantio (Flutter para Android, iOS e portal web) — cores, fontes, componentes, padrões de app e receitas de tela, sem a cara de layout gerado por IA. Use sempre que for criar, alterar ou revisar qualquer tela, widget, tema, formulário, lista, gráfico, ícone ou texto de interface do Meu Plantio, mesmo que o pedido não fale em design (por exemplo "adiciona um campo no lançamento de despesa", "cria a tela de colheita", "melhora o card do plantio", "a tela X ficou feia"). Também use para revisar se uma tela segue o padrão e para garantir que nenhuma funcionalidade se perca numa reestilização.
---

# Meu Plantio · Caderno de campo

O Meu Plantio é um app de gestão de lavoura de abacaxi. Quem usa é o produtor, quase sempre no celular, muitas vezes no sol, com pressa e com o polegar. O mesmo código Flutter gera o app Android, o app iOS e o portal web (`appmeuplantio.com.br/app`).

A identidade se chama **Caderno de campo**: papel claro, linha fina, letra firme e número bem alinhado. Ela existe para o app parecer uma ferramenta de trabalho confiável, e não um template gerado por IA. Toda tela nova precisa parecer feita pela mesma mão.

## Antes de escrever código

1. **Procure o tema no projeto** (`lib/theme/`, `ThemeData`, `ColorScheme`, constantes de cor). Se já existir o tema Caderno de campo (`caderno_tokens.dart` / `caderno_theme.dart`), use-o. Não crie uma segunda paleta nem cores soltas em widgets.
2. **Comece pelo celular** (360 a 390px de largura). A versão larga (portal web e tablet) é uma adaptação, feita depois.
3. **Leia a referência certa** para a tarefa:

| Vai fazer | Leia |
|---|---|
| Qualquer coisa com cor, fonte, tamanho, espaçamento | `references/tokens.md` |
| Escrever ou alterar código Dart/Flutter | `references/flutter.md` (tema, formatos e widgets prontos) |
| Criar ou mudar uma das telas principais, ou uma tela nova parecida | `references/telas.md` |
| Reorganizar navegação, mover ações, juntar ou dividir telas | `references/inventario.md` (lista do que não pode sumir) |

## Referência rápida

| Papel | Valor | Uso |
|---|---|---|
| Papel | `#F3F3EF` | fundo do app |
| Folha branca | `#FFFFFF` | grupos de lista, folhas, barra de abas |
| Régua | `#D8DBD4` | borda de 1px · divisória interna `#E9EBE6` |
| Tinta | `#1A1D1B` | texto, filtro selecionado · secundário `#5B635F` · apagado `#8A918D` |
| Folha | `#2F6B57` | botão principal, aba ativa, link, "tudo certo" |
| Marca-texto | `#F5CF47` | só o que é de hoje ou calculado (marcador "hoje", total de uma conta) |
| Atenção | `#9A5F0E` | conta a vencer, limite do plano, "a recuperar" |
| Problema | `#B3261E` | atraso, praga ativa, prejuízo, Excluir |
| Fases | terra `#9A6B43` · broto `#8DB3A0` · folha `#2F6B57` · fruto `#E2B53B` | preparo, crescimento, manutenção, colheita |

**Fontes:** Archivo para texto e títulos, com a versão estreita (largura 75%) nos rótulos em maiúsculas. JetBrains Mono para todo número isolado. **Forma:** botões de 44 a 48px com canto de 6px, grupos com canto de 8px e borda de 1px, sem sombra.

## Regras que dão a identidade

- **Texto e número no lugar de enfeite.** O rótulo diz o que é, e o número ao lado informa o resto. Ícone só aparece nas cinco abas e em ações (buscar, avisos, voltar, adicionar, fechar, mais). Um ícone decorativo dentro de quadradinho colorido é o sinal mais forte de layout gerado por IA, e não ajuda o produtor.
- **Cor quer dizer alguma coisa.** Uma cor de ação (folha), três de situação (ok, atenção, problema) e as quatro cores das fases, que vêm da própria planta. Nenhum módulo ganha tema próprio: Irrigação não é azul, Indução floral não é roxa. Se tudo tem cor, o vermelho deixa de avisar.
- **Situação é um quadrado de 9px mais o texto** ("■ Preparando terra"). Nada de pílula colorida. O quadrado continua legível para quem não distingue bem as cores, porque o texto está ao lado.
- **Número isolado é mono, alinhado à direita e no formato brasileiro:** `R$ 7.430,00`, `12.000`, `42,9%`, `22/10`. Frase com número ("vence em 19 dias") fica na fonte de texto.
- **Valor à direita, legenda pequena embaixo** ("R$ 7.430" e, embaixo, "investido").
- **Gastar não é erro.** "Total investido" e despesas ficam na cor de texto. Vermelho só para atraso, praga ativa, prejuízo real e Excluir.
- **O dia de hoje ganha marca-texto,** o único uso do amarelo além das fases: o marcador "hoje" no cronograma ou o total calculado de uma simulação.
- **Todo grupo tem um rótulo** em maiúsculas estreitas acima dele ("MEUS PLANTIOS", "DINHEIRO"). Quando o conteúdo não é óbvio, uma frase curta explica.
- **Um elemento próprio do domínio vale mais que dez enfeites.** Exemplos: o cronograma do ciclo do abacaxi mês a mês, as linhas do talhão desenhadas (L1 a L10), os preços por CEASA. Use esses elementos no lugar de barras de progresso e gráficos genéricos.

## Padrões de app (Android e iOS)

- **Cinco abas embaixo:** Início, Lavoura, Financeiro, Comercial, Agenda. Aba ativa com o texto na cor tinta e um traço de 2px verde-folha no topo. Ícones próprios em traço reto (Lavoura desenhada como linhas de plantio).
- **Título grande** no topo de cada tela. Telas internas mostram "‹ nome da tela anterior". O gesto de voltar do iOS e o botão voltar do Android continuam funcionando.
- **Listas agrupadas** (como Ajustes no iPhone e Configurações no Android) no lugar de grades de ícones. Cada linha tem no mínimo 48px, título, detalhe à direita e seta quando abre outra tela.
- **A ação principal fica fixa embaixo,** acima das abas e ao alcance do polegar ("Novo plantio", "Lançar despesa"), e a lista termina antes dela. Nunca use botão flutuante cobrindo conteúdo.
- **Formulários de lançamento sobem de baixo** como uma folha (bottom sheet): o valor vem primeiro e em destaque, as escolhas ficam em linhas que abrem a lista de opções, e "Salvar" fica em verde-folha no rodapé.
- **Puxar para atualizar** substitui os botões de atualizar no topo.
- **Deslizar uma linha para a esquerda** mostra Editar e Excluir nas listas de lançamentos.
- **Controle segmentado** para filtros curtos (Todos / Ativos / Colhidos / Encerrados). O item selecionado fica com fundo tinta e texto branco.
- **Respeite as áreas seguras** (entalhe e barra de gestos) com `SafeArea`. Todo alvo de toque tem pelo menos 48px.
- **Em tela larga** (900px ou mais, portal web e tablet), as abas viram uma barra superior, com uma segunda linha de atalhos ou de módulos. Os módulos abrem dentro dessa moldura, nunca como tela de celular esticada.

## Não faça (cara de IA)

| Evite | Use no lugar |
|---|---|
| Ícone dentro de quadradinho ou círculo colorido em card, linha ou atalho | Texto e número; ícone só em ação e nas abas |
| Grade de cards de indicador iguais, cada um com uma cor | Grade 2 × 2 de números com divisórias finas, dentro de um único grupo |
| Degradê, foto de fundo atrás de texto, vidro, brilho, sombra grande | Fundo papel e grupo branco com borda de 1px |
| Botão, etiqueta ou aba em pílula | Canto de 6px; situação com quadrado mais texto; aba com traço embaixo |
| Cor própria por módulo (tela azul, tela roxa) | Mesma tela para todos; cor só com significado |
| Botão de salvar vermelho ou laranja | Verde-folha; vermelho só para Excluir |
| Poppins, Inter, Montserrat ou outra fonte da moda | Archivo + JetBrains Mono |
| Emoji na interface (saudação, títulos) | Texto; emoji quebra em alguns aparelhos e no portal web |
| Barra de progresso genérica para o plantio | Cronograma do ciclo com as fases e o marcador "hoje" |
| Botão flutuante redondo cobrindo a lista | Ação fixa embaixo, com a lista terminando antes |
| Menu ⋮ escondendo as ações principais | Ação visível na tela; no ⋮ só o que é raro ou perigoso |

## Texto da interface

- Português do Brasil, frases curtas, na voz do produtor: "Nada agendado para hoje", "vence em 19 dias", "Puxe para atualizar".
- Nomeie pelo que a pessoa reconhece ("Lançar despesa", "Mudar status"), não pelo que o sistema faz por dentro.
- O botão diz exatamente o que acontece ("Salvar despesa", e não "OK" ou "Confirmar").
- Rótulos inteiros: se não couber, reorganize o layout (grade 2 × 2, linha de lista). Nunca corte com reticências e nunca deixe uma palavra quebrar no meio ("Propriedade s").
- Use o nome completo da pessoa ou da conta. Não extraia o "primeiro nome" de nomes compostos, porque "Meu Plantio" vira "Meu".
- Estado vazio: uma frase sobre o que vai aparecer ali e a ação para começar ("Nenhuma despesa lançada. + Nova despesa").

## Revisão antes de entregar

Confira cada item na tela pronta, primeiro a 360px e depois a 1440px:

1. Nenhuma cor fora dos tokens, e nenhum ícone decorativo em bolha colorida.
2. Todo número isolado em mono, no formato brasileiro e alinhado à direita nas listas.
3. Nenhum texto cortado com reticências e nenhuma palavra quebrada no meio.
4. Ação principal fixa embaixo, sem cobrir nada; alvos de toque com 48px ou mais.
5. Vermelho só para problema real ou Excluir; amarelo só para "hoje" ou valor calculado.
6. Grupos com rótulo; telas internas com "‹ voltar"; puxar para atualizar no lugar de botão.
7. Se a tela foi reorganizada, confira em `references/inventario.md` que todas as funcionalidades dela continuam acessíveis.
