# Prompt: Demarcar área com 4 modos no app Meu Plantio

> Como usar: abra o projeto do app Meu Plantio no VS Code, abra o Claude Code e cole tudo abaixo da linha. Para a Fase 0, ative o modo de planejamento (Shift+Tab até aparecer "plan mode").
>
> **Não instale a skill `meu-plantio-design` no projeto para este trabalho.** Ela traz a proposta de visual novo, e o Claude Code a usaria sozinho em qualquer tela. Se ela já estiver em `.claude/skills/` ou `.agents/skills/` do projeto, ou em `~/.claude/skills/`, remova antes de começar: `skills/instalar.sh --remover` (e `--projeto CAMINHO` se foi instalada no projeto).

---

## Contexto

Este é o app **Meu Plantio**, de gestão de lavoura de abacaxi, feito em Flutter (Android, iOS e portal web no mesmo código). Hoje a função **"Demarcar área no mapa (GPS)"** (no formulário de editar plantio, e usada também por "Vincular área", "Mapa vivo" e "Análise da área") obriga o produtor a tocar ponto por ponto no mapa. Quero trocar isso por uma tela com **4 jeitos de criar a área**, todos terminando na mesma tela de ajuste:

1. **Andar no contorno**: o produtor dá a volta no talhão com o celular e o GPS grava o caminho, com as curvas do terreno.
2. **Desenhar com o dedo**: o produtor traça o contorno por cima da imagem de satélite e o app suaviza a linha.
3. **Tocar no talhão**: o produtor toca dentro da lavoura e um serviço detecta o contorno pela imagem de satélite.
4. **Importar KML/KMZ**: o produtor importa um arquivo do Google Earth, do Google My Maps, de drone ou de um técnico.

Nenhuma funcionalidade existente pode se perder: áreas já demarcadas continuam abrindo, e "Vincular área", "Mapa vivo" e "Análise da área" continuam funcionando com as áreas novas.

## Como quero que você trabalhe

- Trabalhe em fases. Ao fim de cada fase: rode `flutter analyze` e `flutter test`, faça um commit na branch `feature/demarcar-area` com mensagem clara e me mostre um resumo curto (o que mudou, como testar no aparelho, o que ficou pendente).
- **Pare e espere minha aprovação** ao fim da Fase 0, e sempre que precisar: adicionar um serviço pago ou uma chave de API; mudar o formato dos dados salvos no servidor; ou mexer em telas fora deste escopo.
- Siga o código que já existe: mesmo gerenciamento de estado, mesma organização de pastas, mesmos nomes, mesma camada de dados e mesmo provedor de mapa (o app tem opção de Mapbox ou Google Maps nas configurações). Não troque bibliotecas que o projeto já usa.
- **Visual: mantenha o app exatamente como está em produção.** Este trabalho acrescenta funções, não muda a aparência. As regras estão na seção "Visual: manter o que está em produção", no fim deste prompt. Se existir alguma skill ou guia de design novo no ambiente, ignore-o neste trabalho.
- Textos da interface em português do Brasil.
- Não invente dados. Onde depender de algo que você não encontrar no código (endpoint, tabela, regra), pergunte.

---

## Fase 0: Entender o código e planejar (sem escrever código)

Investigue e me entregue um plano em `docs/demarcar-area/PLANO.md` com:

1. Onde está hoje a tela "Demarcar área no mapa (GPS)": arquivos, widgets e como recebe e devolve os pontos.
2. Como a área é salva: modelo, formato (lista de pontos? GeoJSON?), onde é persistida (API própria, Firebase, Supabase, banco local) e como é sincronizada offline, se for.
3. Como o app lida com os dois provedores de mapa (Mapbox e Google Maps): existe uma abstração? Quais pacotes e versões?
4. Onde "Vincular área", "Mapa vivo" (busca de talhão) e "Análise da área" leem a área.
5. Gerenciamento de estado, navegação (rotas), tema e padrão de testes do projeto.
6. Versões de Flutter e Dart do projeto e as dependências relevantes já instaladas (geolocalização, arquivos, XML, zip, permissões).
7. **O padrão visual atual que as telas novas vão copiar:** arquivo do tema e cores usadas, fonte, como são a barra do topo (AppBar), os botões principais e secundários, os cards, os campos de formulário, as folhas que sobem de baixo (como "Nova Despesa" e "Mudar Status"), os diálogos, os estados vazios, os avisos (SnackBar ou banner) e o botão flutuante. Liste os widgets reutilizáveis que já existem para cada um.
8. O plano das Fases 1 a 5 adaptado ao que você encontrou, com a lista de arquivos novos e alterados, as dependências que pretende adicionar (com o motivo de cada uma) e os riscos. Marque quais arquivos **existentes** vão ser alterados e por quê; nenhum deles pode ser de tema ou de estilo global.

**Pare aqui e espere minha aprovação.**

---

## Fase 1: Núcleo de geometria, modelo e tela de ajuste

### 1.1 Modelo
Crie (ou adapte o existente para) um modelo de área com:
- `anel externo` (lista de lat/lon, sentido anti-horário, fechado) e `buracos` opcionais;
- `origem`: `gps`, `desenho`, `deteccao`, `kml` ou `manual` (as áreas antigas viram `manual`);
- `areaHa`, `perimetroM`, `centro`, `precisaoEstimadaM` (opcional) e `criadaEm`;
- serialização para **GeoJSON** (ordem `[longitude, latitude]`), lendo também o formato antigo para não quebrar áreas já salvas.

Se o formato salvo no servidor precisar mudar, **pare e me pergunte**, mostrando a migração proposta.

### 1.2 Utilitários de geometria (Dart puro, sem depender de Flutter, com testes)
- Área geodésica em hectares (excesso esférico ou fórmula equivalente; erro abaixo de 0,5% em talhões de até 500 ha).
- Perímetro (haversine) e centro.
- Projeção local em metros (equiretangular em torno do centro) para os cálculos abaixo.
- Simplificação Douglas-Peucker com tolerância em metros.
- Suavização Chaikin (2 a 3 iterações), preservando os pontos de início e fim quando a linha não está fechada.
- Fechar o anel, corrigir a orientação, remover pontos duplicados ou colados.
- Detectar autointerseção (o contorno cruzando a si mesmo).
- Detectar latitude e longitude trocadas (ponto fora do Brasil: latitude entre −34 e 6, longitude entre −74 e −34).

Testes obrigatórios: um quadrado de 100 m × 100 m perto de Floresta do Araguaia (PA), cerca de 1,000 ha, com tolerância de 0,5%; um retângulo de 1 km × 500 m (50 ha); um polígono com buraco; simplificação que não aumenta a área em mais de 1%; e detecção de autointerseção.

### 1.3 Tela "Ajustar área" (comum aos 4 modos)
Construa esta tela **a partir da tela atual de demarcação**, com a mesma aparência (barra do topo, botões, cores e estilo do polígono que ela já usa), acrescentando os recursos abaixo. Só crie uma tela nova se não der para estender a atual, e nesse caso copie o visual dela.
- Mapa com o polígono, no mesmo estilo de cor e borda que a demarcação atual já usa.
- Pontos arrastáveis nos vértices e um ponto menor no meio de cada lado: arrastar o ponto do meio cria um vértice novo. Toque longo num vértice remove o vértice.
- Desfazer e refazer.
- A área em hectares e o perímetro em metros, atualizados enquanto a pessoa mexe, no formato pt-BR (`4,26 ha`, `842 m`), usando os estilos de texto que o app já tem.
- Avisos que não bloqueiam ("O contorno cruza a si mesmo", "Área muito pequena (menos de 0,05 ha)"), no mesmo componente de aviso que o app já usa.
- Botão "Suavizar curvas" (aplica Chaikin) e botão "Simplificar" (reduz pontos), com o estilo de botão secundário existente.
- Botão "Salvar área" no mesmo estilo e posição do botão de confirmar da demarcação atual. Ao salvar, devolve a área ao fluxo que chamou (editar plantio, vincular área) e usa o caminho de persistência existente.

### 1.4 Escolha do modo
- **O botão "Demarcar área no mapa (GPS)" continua igual**: mesmo texto, ícone, lugar e estilo no formulário de editar plantio (e onde mais ele aparecer).
- Ao tocar nele, abra uma escolha de modo usando o mesmo componente de escolha que o app já usa, por exemplo a folha que sobe de baixo de "Mudar Status" ou o diálogo de "Vincular Área". Copie o estilo dos itens dessa lista. Opções:
  - **Andar no contorno**: "Dê a volta no talhão com o celular. Grava as curvas sozinho."
  - **Desenhar com o dedo**: "Trace o contorno por cima da imagem de satélite."
  - **Tocar no talhão**: "O app tenta encontrar o contorno pela imagem de satélite." (aparece como "Em breve" e desabilitado enquanto a Fase 5 estiver desligada)
  - **Importar KML ou KMZ**: "Arquivo do Google Earth, de drone ou de um técnico."
  - **Marcar ponto a ponto**: o modo de hoje, que continua disponível e funcionando como em produção.
- Se o plantio já tem área, inclua no topo dessa escolha a opção "Ajustar área atual".

Commit da Fase 1.

---

## Fase 2: Importar KML/KMZ

- Escolher arquivo com o seletor do sistema (`.kml` e `.kmz`), funcionando no Android, no iOS e na web (na web, ler os bytes).
- KMZ: abrir o zip e ler o `doc.kml` (ou o primeiro `.kml` encontrado).
- Ler com um parser XML (pacote `xml`), tolerando namespaces e prefixos (`kml:`).
- Extrair:
  - `Polygon` (outerBoundaryIs + innerBoundaryIs) → área candidata;
  - `MultiGeometry` → desdobrar em várias candidatas;
  - `LineString` → mostrar como linha de referência (não vira área);
  - `Point` → mostrar como ponto de referência;
  - `name`, `description` e `ExtendedData` → nome e observação;
  - `Folder` → agrupamento na lista.
- Ignorar altitude. Corrigir latitude e longitude trocadas, avisando. Fechar anéis abertos.
- Tela de conferência, no visual das telas de lista existentes (como "Meus Plantios"): o mapa com tudo o que foi encontrado e uma lista com uma linha por área (caixa de seleção, nome, área em ha). Botão "Usar esta área": com uma área selecionada, vai para "Ajustar área"; com várias, pergunta se quer juntar (união) ou escolher uma.
- Mensagens claras para: arquivo vazio, sem polígonos ("Este arquivo só tem linhas ou pontos. Desenhe a área ou use outro arquivo."), XML inválido e arquivo grande demais (acima de 10 MB).
- Bônus, se couber sem risco: "Exportar KML" da área salva, pelo compartilhamento do sistema.

Testes com arquivos de exemplo em `test/fixtures/kml/`: polígono simples, polígono com buraco, MultiGeometry, KMZ, coordenadas trocadas e arquivo só com pontos.

Commit da Fase 2.

---

## Fase 3: Desenhar com o dedo

- Na tela do mapa, alternância "Mover mapa" / "Desenhar". No modo Desenhar, o gesto de um dedo traça a linha e o mapa não se move (dois dedos continuam dando zoom).
- Capturar os pontos da tela durante o gesto e converter para lat/lon com o controlador do provedor de mapa em uso (Google Maps e Mapbox). Se o app não tem abstração de mapa, crie uma interface mínima para essa conversão, com as duas implementações.
- Ao soltar o dedo: fechar o contorno, simplificar (tolerância de uns 2 m), suavizar com Chaikin e ir para "Ajustar área".
- Botão "Apagar e desenhar de novo".
- Camada de satélite ligada por padrão nesse modo.

Commit da Fase 3.

---

## Fase 4: Andar no contorno (GPS)

### Captura
- Use o pacote de localização já usado no app (ou `geolocator`), com precisão máxima e filtro de distância de 1 a 2 m.
- Antes de começar, mostre a precisão atual ("GPS: ±4 m") e só libere "Iniciar" quando estiver em ±15 m ou melhor. Se não chegar lá, explique: "Vá para um lugar aberto e espere alguns segundos".
- Botões: Iniciar, Pausar/Continuar (para atravessar cerca ou porteira) e Concluir.
- Tela durante a gravação: o mapa com o rastro sendo desenhado, a distância percorrida, a área parcial (fechando o contorno até o início), o tempo e a precisão do GPS.
- Fechamento automático: quando a pessoa já andou mais de 50 m e volta para menos de 8 m do início, sugerir "Fechar contorno aqui?".
- Manter a tela acesa durante a gravação (`wakelock_plus` ou o equivalente que o projeto use).

### Limpeza do rastro
- Descartar pontos com precisão pior que 15 m, saltos impossíveis (acima de 15 m/s a pé ou de carro na lavoura) e pontos repetidos.
- Suavizar com média móvel de 3 a 5 pontos e depois simplificar (Douglas-Peucker, uns 1,5 m).
- Guardar `precisaoEstimadaM` (mediana da precisão dos pontos aceitos).

### Plataforma
- **Android:** gravar com a tela bloqueada usando um serviço em primeiro plano com notificação ("Meu Plantio está gravando o contorno do talhão"). Use `foregroundServiceType="location"` e as permissões `FOREGROUND_SERVICE` e `FOREGROUND_SERVICE_LOCATION` (Android 14+). Não peça `ACCESS_BACKGROUND_LOCATION`: o serviço em primeiro plano basta e evita a exigência extra da Google Play.
- **iOS:** `NSLocationWhenInUseUsageDescription` em pt-BR ("Usamos sua localização para gravar o contorno do talhão enquanto você caminha."), `UIBackgroundModes` com `location` e `showsBackgroundLocationIndicator` ativo, para continuar com a tela bloqueada durante a gravação.
- **Web:** esconda este modo no computador; no navegador do celular, permita só com a tela aberta e avise que bloquear a tela interrompe a gravação.
- **Segurança contra perda:** salve o rastro em andamento localmente a cada poucos segundos. Se o app fechar, ao reabrir ofereça "Continuar gravação" ou "Descartar".

### Testes
- Testes de unidade da limpeza do rastro com uma sequência simulada que inclua ruído, um salto e uma pausa.
- Deixe um modo de simulação, só em debug, que reproduza um rastro GPX/GeoJSON de exemplo, para testar sem sair andando.

Commit da Fase 4.

---

## Fase 5: Tocar no talhão (detecção automática)

A detecção precisa de um servidor, porque o modelo de IA roda sobre imagens de satélite. Nesta fase, faça a parte do app e deixe o servidor especificado. **Não contrate nem configure serviço pago sem me perguntar.**

### No app
- Interface `DetectorDeTalhao` com `Future<List<AreaCandidata>> detectar(LatLng ponto)`.
- Implementação `DetectorServidor`, que chama `POST {baseUrl}/talhoes/detectar` com `{ "lat": ..., "lon": ... }` e recebe `{ "talhoes": [GeoJSON Polygon...], "fonte": "...", "dataImagem": "AAAA-MM-DD", "confianca": 0-1 }`. Use o cliente HTTP e a autenticação que o app já tem.
- Implementação `DetectorFalso`, usada em debug e nos testes, que devolve um polígono em volta do ponto.
- Chave de configuração (feature flag ou config remota, conforme o padrão do projeto) para ligar e desligar. Desligado: a linha aparece com "Em breve" e não abre.
- Fluxo: tocar no mapa → indicador "Procurando o contorno…" → mostrar o resultado com a confiança. Se a área for menor que 3 ha, avisar: "Áreas pequenas podem vir com erro. Confira o contorno antes de salvar." Depois, ir para "Ajustar área".
- Erros: sem internet ("A detecção precisa de internet. Use Andar no contorno ou Desenhar.") e nada encontrado ("Não encontramos um talhão aqui. Tente tocar mais no meio da lavoura ou desenhe.").

### Especificação do servidor (só documento)
Crie `docs/demarcar-area/deteccao-servidor.md` com:
- O contrato da API acima.
- Opção A, própria: modelos abertos do projeto Fields of The World (`ftw-tools`) sobre imagens Sentinel-2 (gratuitas, 10 m). Inclua as etapas: buscar a cena mais recente sem nuvem em volta do ponto, rodar a segmentação, vetorizar, escolher o polígono que contém o ponto e simplificar.
- Opção B, serviço pago (ex.: EOSDA), com o que precisaria ser contratado.
- Limitações: resolução de 10 m, talhões pequenos, nuvens.
- Regra: **não usar imagens do Google Maps ou do Mapbox para a detecção**, porque os termos de uso não permitem.

Commit da Fase 5.

---

## Visual: manter o que está em produção

Este trabalho acrescenta funções. A aparência do app não muda.

- **Não altere** o tema (`ThemeData`, `ColorScheme`, `TextTheme`), as cores, a fonte (Poppins), os ícones, nem widgets compartilhados de estilo. Se um widget compartilhado precisar de algo novo, acrescente um parâmetro opcional com padrão igual ao comportamento atual.
- **Não altere** a aparência de nenhuma tela existente. A única mudança permitida em tela existente é o que o botão "Demarcar área no mapa (GPS)" abre ao ser tocado.
- **As telas novas copiam o estilo das existentes**: a mesma barra do topo verde, os mesmos botões, cards, campos, folhas que sobem de baixo, diálogos, avisos e botão flutuante, reutilizando os widgets que você listou na Fase 0. Não crie paleta, fonte ou componente com estilo próprio.
- Use as cores do tema (por exemplo `Theme.of(context).colorScheme`), nunca uma cor escrita direto no widget, a não ser que as telas existentes façam assim para aquele mesmo elemento.
- Siga o mesmo tamanho de toque e o mesmo formato de números que o app já usa. Para área e distância, use o formato brasileiro: `4,26 ha`, `842 m`, `±4 m`.
- Na dúvida sobre o visual de algum elemento novo, pare e me mostre duas opções baseadas em telas existentes.

## Critérios de aceite

- [ ] Nenhuma tela existente mudou de aparência, e nenhum arquivo de tema ou de estilo global foi alterado (confira no `git diff` e liste no resumo final os arquivos existentes que foram tocados).
- [ ] As telas novas parecem parte do app atual: mesma barra do topo, botões, cards, fonte e cores.
- [ ] O botão "Demarcar área no mapa (GPS)" continua igual e abre a escolha com os 4 modos novos mais "Marcar ponto a ponto", que funciona como hoje.
- [ ] Os 4 modos novos terminam em "Ajustar área".
- [ ] Áreas antigas abrem, aparecem no Mapa vivo e funcionam em "Vincular área" e "Análise da área".
- [ ] Área calculada com erro abaixo de 0,5% nos testes de referência.
- [ ] Um KML do Google Earth com polígono importa corretamente; KMZ também.
- [ ] Desenhar com o dedo funciona com os dois provedores de mapa (Google e Mapbox).
- [ ] Andar no contorno grava com a tela bloqueada no Android e no iOS e sobrevive ao app ser fechado.
- [ ] Tocar no talhão funciona com o `DetectorFalso` e fica desligado em produção até eu configurar o servidor.
- [ ] `flutter analyze` sem avisos novos; `flutter test` passando.
- [ ] Ao final, um `docs/demarcar-area/COMO-TESTAR.md` com o roteiro de teste manual em aparelho (Android e iPhone), incluindo andar em volta de uma área real.
