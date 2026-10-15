# Infortec RH — design system

Versão navegável (com prévias ao vivo): https://claude.ai/artifact/7Do4RhGBQgmSDYSRLY7Y5K

Tela de exemplo: `painel.html` (abra no navegador) · versão online: https://claude.ai/artifact/QBU7E4En2jFv2EQehV69AN

Arquivos: `tokens.json` (fonte), `tokens.css` (variáveis CSS, temas claro e escuro), `components/bundle.js` + `bundle.css` (componentes React em `window.InfortecRH`), `components/index.d.ts` (props) e um README por componente.

Infortec RH é o sistema de recursos humanos da Infortec: admissão, cadastro de colaboradores, ponto, férias, folha de pagamento, benefícios e avaliações. Quem usa são analistas de RH e Departamento Pessoal o dia inteiro, gestores que aprovam pedidos e colaboradores no autoatendimento. O sistema precisa passar confiança (é salário e dado pessoal), ser rápido de ler e tratar pessoas como pessoas.

## Princípios

- **Confiável antes de bonito.** Números, datas e horários precisam estar certos e alinhados. Use `data` (JetBrains Mono, tabular) para matrícula, CPF, horários e saldos.
- **Humano.** O assunto são pessoas: mostre nome e avatar antes de matrícula; escreva com respeito; nunca culpe o usuário em uma mensagem.
- **Status com palavra.** Todo estado (Ativo, Em férias, Pendente, Falta) tem texto. A cor só reforça.
- **Privado por padrão.** CPF, salário, conta bancária e dados de saúde aparecem mascarados (`123.***.***-09`, `R$ ••••`) até a pessoa com permissão pedir para ver. Siga a LGPD.

## Conteúdo e voz

- Trate o usuário por **você**. Frases curtas, voz ativa, português do Brasil.
- Botões com verbo no infinitivo + objeto, em caixa de frase: “Aprovar férias”, “Exportar folha”, “Admitir colaborador”. Nunca “OK”, “Enviar” sozinho ou “Clique aqui”.
- Mensagens de erro dizem o que aconteceu e como resolver: “O evento S-2200 foi rejeitado: CPF de dependente inválido. Corrija o cadastro e envie de novo.”
- Confirmações destrutivas nomeiam a pessoa e a consequência: “Desligar Carlos Henrique da Silva? O acesso ao portal será bloqueado hoje.”
- Use os termos do RH brasileiro: colaborador(a), admissão, desligamento, competência, banco de horas, período aquisitivo, eSocial, holerite.
- Formatos: datas `dd/mm/aaaa`; horas `hh:mm` em 24h; dinheiro `R$ 4.850,00`; percentuais `2,1%`; variação de percentual em `p.p.`.
- Sem emoji, sem exclamação em mensagens do sistema, sem gírias. Aniversários e boas-vindas podem ser calorosos (“Boas-vindas à equipe, Ana”), ainda sem emoji.

## Cores

- O azul da logo é `brand` (#0042D7). Ele marca a ação principal, links, seleção e o foco. Não use `brand` como fundo de grandes áreas de conteúdo; o azul forte fica para a barra lateral (`nav`, azul-noite) e para ações.
- Página em `surface`, cartões e tabelas em `surface-raised` com borda `line`. `surface-sunken` para cabeçalho de tabela, hover de linha e campos desabilitados.
- Texto: `ink` para o principal, `ink-muted` para secundário. Os dois passam 4.5:1 em `surface`, `surface-raised` e `surface-sunken`, nos dois temas.
- `people` (verde-água) é o acento humano: benefícios, bem-estar, aniversários, experiência. Use pouco, nunca para ação principal.
- Status: `success` (aprovado, ativo, saldo positivo), `warning` (pendente, ponto incompleto, prazo próximo), `danger` (recusado, falta, saldo negativo, ação destrutiva) e `leave` (férias e licenças). Texto colorido vai sobre o fundo `-soft` do mesmo status. Sobre preenchimentos sólidos, use `on-brand`, `on-people` e `on-danger`, nunca branco literal.
- O tema escuro clareia as cores de status e marca; por isso o texto sobre `brand` vira escuro (`on-brand`).

## Tipografia

- Archivo para toda a interface (a mesma família do site Infortec), JetBrains Mono para dados. Carregue as duas do Google Fonts (o `bundle.css` já importa).
- Escala: `display` (saudação do painel), `page-title` (título da página), `section-title` (seções e cartões), `kpi` (números de indicador), `body-lg` (textos corridos), `body` (padrão, 14px), `label` (rótulos e cabeçalhos), `caption` (dicas e metadados), `overline` (grupos da barra lateral, rótulos de indicador, sempre em maiúsculas) e `data` (identificadores e horários).
- Títulos levam `font-stretch: 112%` (Archivo é variável em largura); isso aproxima a interface da marca.

## Espaço, forma e elevação

- Grade de 4px: `space-3` dentro de células, `space-4` entre campos, `space-5` dentro de cartões, `space-6` entre cartões, `space-8` na margem da página.
- Raios: `radius-sm` (botões, campos, itens de menu), `radius-md` (cartões, tabelas, alertas), `radius-lg` (modais, painéis), `radius-full` só para badges, avatares e switch.
- Bordas antes de sombras: cartões usam `line` + `shadow-sm`; `shadow-md` para menus; `shadow-lg` para modais.
- Controles: `control-md` (40px) por padrão, `control-sm` (32px) em tabelas e filtros, `control-lg` (48px) no autoatendimento e no celular.

## Foco e acessibilidade

- Foco do teclado é `focus-ring`: 2px da cor do fundo e 2px sólidos de `focus`, com pelo menos 3:1 sobre todas as superfícies. Na barra lateral, o foco é um contorno `on-nav`.
- Bordas de campos (`line-strong`) têm 3:1 sobre os fundos. Nenhuma informação depende só da cor: status levam texto, variações levam seta e sinal, saldos levam `+` ou `-`.
- Respeite `prefers-reduced-motion`; animações ficam em transições curtas (150ms).

## Layout

- App com barra lateral fixa (`SideNav`, largura `sidebar`) e conteúdo até `content-max`. Abaixo de 960px, a barra vira gaveta.
- Painel: saudação em `display`, linha de 3 a 4 `StatCard`, fila de aprovação (`RequestCard`) e listas.
- Listas com mais de 20 pessoas usam `DataTable`; grades de `EmployeeCard` ficam para organograma e busca.

## Iconografia

- Use o `Icon` do sistema: traço de 1.75px, grade de 24px, pontas arredondadas, cor do texto. 20px por padrão; 16px em botões pequenos e badges; 18px na barra lateral.
- Cada módulo tem um ícone fixo (Painel `home`, Colaboradores `users`, Admissão `user-plus`, Ponto `clock`, Férias `calendar`, Folha `wallet`, Benefícios `gift`, Avaliações `star`, Relatórios `chart`, Documentos `file`).
- O conjunto não veio de uma biblioteca da marca; foi desenhado para este sistema. Para ícones que faltarem, use Lucide com o mesmo traço.

## Logo

- Logo azul (`logo-azul.png`) sobre fundos claros; logo branca (`logo-branca.png`) sobre `nav`, `brand` e no tema escuro. Ícone do app (`icone-app.jpg`) só para favicon e lojas.
