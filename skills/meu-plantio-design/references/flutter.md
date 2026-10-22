# Flutter · tema, formatos e widgets

Código de partida para aplicar o Caderno de campo no app Flutter (Android, iOS e web). Requer Flutter 3.27 ou mais novo (Dart 3), por causa de `CardThemeData` e `WidgetStateProperty`.

Antes de colar, procure no projeto um tema ou widgets equivalentes e adapte os nomes. Não duplique.

## Índice
1. Fontes no `pubspec.yaml`
2. `caderno_tokens.dart`: cores, fases, medidas e estilos de texto
3. `caderno_theme.dart`: o `ThemeData`
4. `formatos.dart`: dinheiro, número, porcentagem e data em pt-BR
5. Widgets: rótulo de seção, grupo e linha de lista, grade de números, marcador de situação, cronograma do ciclo, ação fixa, abas, moldura responsiva, folha de formulário, linha deslizável, controle segmentado e estado vazio
6. Padrões de tela (esqueleto com título grande e puxar para atualizar)

---

## 1. Fontes no `pubspec.yaml`

Baixe `Archivo[wdth,wght].ttf` (variável) e `JetBrainsMono[wght].ttf` do Google Fonts para `assets/fonts/`. O eixo de largura só funciona com o arquivo variável, e assim as fontes funcionam sem internet.

```yaml
flutter:
  fonts:
    - family: Archivo
      fonts:
        - asset: assets/fonts/Archivo[wdth,wght].ttf
    - family: JetBrainsMono
      fonts:
        - asset: assets/fonts/JetBrainsMono[wght].ttf
```

Para usar `NumberFormat` e `DateFormat`, adicione `intl` às dependências.

## 2. `lib/theme/caderno_tokens.dart`

```dart
import 'dart:ui' show FontFeature, FontVariation;
import 'package:flutter/material.dart';

/// Cores do Caderno de campo. Use sempre por aqui, nunca Color(...) solto em widget.
abstract final class Cores {
  static const papel = Color(0xFFF3F3EF);
  static const folhaBranca = Color(0xFFFFFFFF);
  static const regua = Color(0xFFD8DBD4);
  static const reguaSuave = Color(0xFFE9EBE6);
  static const campoBusca = Color(0xFFE6E7E2);
  static const tinta = Color(0xFF1A1D1B);
  static const tinta2 = Color(0xFF5B635F);
  static const tinta3 = Color(0xFF8A918D);
  static const folha = Color(0xFF2F6B57);
  static const folhaEscura = Color(0xFF234F41);
  static const marcaTexto = Color(0xFFF5CF47);
  static const marcaTextoTinta = Color(0xFF3A2F00);
  static const atencao = Color(0xFF9A5F0E);
  static const problema = Color(0xFFB3261E);
}

/// Fases do ciclo do abacaxi: cores tiradas da própria planta.
enum Fase {
  preparo('Preparo', Color(0xFF9A6B43)),
  crescimento('Crescimento', Color(0xFF8DB3A0)),
  manutencao('Manutenção', Color(0xFF2F6B57)),
  colheita('Colheita', Color(0xFFE2B53B));

  const Fase(this.nome, this.cor);
  final String nome;
  final Color cor;
}

abstract final class Medidas {
  static const toqueMinimo = 48.0;
  static const alturaBotao = 48.0;
  static const alturaBotaoPequeno = 36.0;
  static const cantoBotao = 6.0;
  static const cantoGrupo = 8.0;
  static const margemGrupo = 14.0;
  static const margemTexto = 20.0;
  static const alturaLinha = 50.0;
  static const larguraTelaLarga = 900.0;
}

/// Estilos de texto. A largura (wdth) só funciona com a Archivo variável empacotada.
abstract final class Textos {
  static TextStyle _archivo(double size, double peso, {double largura = 100, Color cor = Cores.tinta}) =>
      TextStyle(
        fontFamily: 'Archivo',
        fontSize: size,
        color: cor,
        // fontWeight serve de reserva se a fonte variável não carregar
        fontWeight: FontWeight.values[((peso / 100).round() - 1).clamp(0, 8)],
        fontVariations: [FontVariation('wght', peso), FontVariation('wdth', largura)],
      );

  static final tituloTela = _archivo(28, 760, largura: 108).copyWith(letterSpacing: -0.7, height: 1.08);
  static final tituloTelaInterna = _archivo(25, 760, largura: 108).copyWith(letterSpacing: -0.6, height: 1.08);
  static final tituloFolha = _archivo(17, 700);
  static final rotulo = _archivo(11, 650, largura: 75, cor: Cores.tinta2).copyWith(letterSpacing: 0.8);
  static final linhaTitulo = _archivo(15, 600);
  static final corpo = _archivo(15, 400);
  static final detalhe = _archivo(13.5, 400, cor: Cores.tinta2);
  static final legenda = _archivo(12.5, 400, cor: Cores.tinta2);
  static final botao = _archivo(14.5, 650);
  static final aba = _archivo(10.5, 600);

  static TextStyle valor(double size, {Color cor = Cores.tinta, FontWeight peso = FontWeight.w700}) => TextStyle(
        fontFamily: 'JetBrainsMono',
        fontSize: size,
        fontWeight: peso,
        color: cor,
        fontFeatures: const [FontFeature.tabularFigures()],
      );
  static final valorLinha = valor(14.5);
  static final valorGrade = valor(18);
  static final valorDestaque = valor(40).copyWith(letterSpacing: -1);
}
```

## 3. `lib/theme/caderno_theme.dart`

```dart
import 'package:flutter/material.dart';
import 'caderno_tokens.dart';

ThemeData temaCaderno() {
  final canto = RoundedRectangleBorder(borderRadius: BorderRadius.circular(Medidas.cantoBotao));
  return ThemeData(
    useMaterial3: true,
    fontFamily: 'Archivo',
    scaffoldBackgroundColor: Cores.papel,
    colorScheme: const ColorScheme.light(
      primary: Cores.folha,
      onPrimary: Colors.white,
      secondary: Cores.folha,
      surface: Cores.folhaBranca,
      onSurface: Cores.tinta,
      onSurfaceVariant: Cores.tinta2,
      outline: Cores.regua,
      outlineVariant: Cores.reguaSuave,
      error: Cores.problema,
      surfaceTint: Colors.transparent, // tira o tom esverdeado que o Material 3 põe por cima
    ),
    textTheme: TextTheme(
      headlineMedium: Textos.tituloTela,
      titleMedium: Textos.linhaTitulo,
      bodyLarge: Textos.corpo,
      bodyMedium: Textos.detalhe,
      bodySmall: Textos.legenda,
      labelLarge: Textos.botao,
      labelSmall: Textos.rotulo,
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: Cores.papel,
      foregroundColor: Cores.tinta,
      elevation: 0,
      scrolledUnderElevation: 0,
      centerTitle: false,
      titleTextStyle: Textos.linhaTitulo,
    ),
    cardTheme: CardThemeData(
      elevation: 0,
      margin: EdgeInsets.zero,
      color: Cores.folhaBranca,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(Medidas.cantoGrupo),
        side: const BorderSide(color: Cores.regua),
      ),
    ),
    dividerTheme: const DividerThemeData(color: Cores.reguaSuave, thickness: 1, space: 1),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: Cores.folha,
        foregroundColor: Colors.white,
        minimumSize: const Size(0, Medidas.alturaBotao),
        shape: canto,
        textStyle: Textos.botao,
        elevation: 0,
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: Cores.tinta,
        backgroundColor: Cores.folhaBranca,
        side: const BorderSide(color: Cores.regua),
        minimumSize: const Size(0, Medidas.alturaBotao),
        shape: canto,
        textStyle: Textos.botao,
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(foregroundColor: Cores.folha, textStyle: Textos.botao),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Cores.folhaBranca,
      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(Medidas.cantoBotao),
        borderSide: const BorderSide(color: Cores.regua),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(Medidas.cantoBotao),
        borderSide: const BorderSide(color: Cores.regua),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(Medidas.cantoBotao),
        borderSide: const BorderSide(color: Cores.folha, width: 2),
      ),
      labelStyle: Textos.detalhe,
      hintStyle: Textos.detalhe.copyWith(color: Cores.tinta3),
    ),
    switchTheme: SwitchThemeData(
      trackColor: WidgetStateProperty.resolveWith(
          (s) => s.contains(WidgetState.selected) ? Cores.folha : const Color(0xFFD2D5CF)),
      thumbColor: const WidgetStatePropertyAll(Colors.white),
      trackOutlineColor: const WidgetStatePropertyAll(Colors.transparent),
    ),
    bottomSheetTheme: const BottomSheetThemeData(
      backgroundColor: Cores.papel,
      showDragHandle: true,
      dragHandleColor: Cores.regua,
      dragHandleSize: Size(40, 5),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(14))),
    ),
    progressIndicatorTheme: const ProgressIndicatorThemeData(color: Cores.folha),
  );
}
```

## 4. `lib/ui/formatos.dart`

```dart
import 'package:intl/intl.dart';

final _real = NumberFormat.currency(locale: 'pt_BR', symbol: 'R\$', decimalDigits: 2);
final _inteiro = NumberFormat.decimalPattern('pt_BR');

/// R$ 7.430,00 (troca o espaço não separável por espaço comum)
String brl(num v) => _real.format(v).replaceAll(' ', ' ');

/// R$ 7.430 (sem centavos, para linhas compactas)
String brlCurto(num v) => brl(v).replaceAll(RegExp(r',\d\d$'), '');

/// −R$ 980,00 com o sinal de menos tipográfico
String brlSaida(num v) => '−${brl(v.abs())}';

/// 12.000
String numero(num v) => _inteiro.format(v);

/// 42,9%
String pct(num v, {int casas = 1}) =>
    '${NumberFormat.decimalPatternDigits(locale: 'pt_BR', decimalDigits: casas).format(v)}%';

/// 22/10 e 22/10/2026
String dia(DateTime d) => DateFormat('dd/MM', 'pt_BR').format(d);
String data(DateTime d) => DateFormat('dd/MM/yyyy', 'pt_BR').format(d);

/// out/26 (meses em minúsculas, para eixos e cronogramas)
String mesAno(DateTime d) => DateFormat('MMM/yy', 'pt_BR').format(d).replaceAll('.', '').toLowerCase();
```

Chame `initializeDateFormatting('pt_BR')` (de `package:intl/date_symbol_data_local.dart`) no `main` antes de usar `DateFormat`.

## 5. Widgets

Todos em `lib/ui/caderno/`. São pequenos de propósito: o visual vem do tema e dos tokens.

### Rótulo de seção

```dart
class RotuloSecao extends StatelessWidget {
  const RotuloSecao(this.texto, {super.key, this.acao, this.onAcao});
  final String texto;
  final String? acao;
  final VoidCallback? onAcao;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.fromLTRB(Medidas.margemTexto, 18, Medidas.margemTexto - 8, 6),
        child: Row(children: [
          Expanded(child: Text(texto.toUpperCase(), style: Textos.rotulo)),
          if (acao != null) TextButton(onPressed: onAcao, child: Text(acao!)),
        ]),
      );
}
```

### Grupo e linha de lista

```dart
class GrupoLista extends StatelessWidget {
  const GrupoLista({super.key, required this.filhos});
  final List<Widget> filhos;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(horizontal: Medidas.margemGrupo),
        child: Card(
          clipBehavior: Clip.antiAlias,
          child: Column(children: [
            for (var i = 0; i < filhos.length; i++) ...[
              if (i > 0) const Divider(),
              filhos[i],
            ],
          ]),
        ),
      );
}

/// Linha de lista: título, legenda opcional, detalhe ou valor à direita, seta quando abre outra tela.
class LinhaLista extends StatelessWidget {
  const LinhaLista({
    super.key,
    required this.titulo,
    this.legenda,
    this.corLegenda,
    this.detalhe,
    this.valor,
    this.legendaValor,
    this.corValor,
    this.final_,
    this.onTap,
  });
  final String titulo;
  final String? legenda;
  final Color? corLegenda;
  final String? detalhe; // texto comum à direita ("0 aplicações")
  final String? valor; // número em mono à direita ("R$ 4.800,00")
  final String? legendaValor; // micro-legenda embaixo do valor ("investido")
  final Color? corValor;
  final Widget? final_; // ex.: Switch
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) => InkWell(
        onTap: onTap,
        child: ConstrainedBox(
          constraints: const BoxConstraints(minHeight: Medidas.alturaLinha),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            child: Row(children: [
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(titulo, style: Textos.linhaTitulo),
                  if (legenda != null)
                    Text(legenda!, style: Textos.legenda.copyWith(color: corLegenda ?? Cores.tinta2)),
                ]),
              ),
              if (detalhe != null) Text(detalhe!, style: Textos.detalhe),
              if (valor != null)
                Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                  Text(valor!, style: Textos.valorLinha.copyWith(color: corValor ?? Cores.tinta)),
                  if (legendaValor != null) Text(legendaValor!, style: Textos.legenda.copyWith(color: Cores.tinta3, fontSize: 11.5)),
                ]),
              if (final_ != null) final_!,
              if (onTap != null) ...[
                const SizedBox(width: 8),
                const Icon(Icons.chevron_right, size: 18, color: Cores.tinta3),
              ],
            ]),
          ),
        ),
      );
}
```

### Grade de números (2 × 2)

```dart
class Numero {
  const Numero(this.rotulo, this.valor, {this.sufixo, this.legenda, this.atencao = false, this.corValor});
  final String rotulo, valor;
  final String? sufixo; // "de 1"
  final String? legenda; // "limite do plano"
  final bool atencao; // legenda na cor de atenção
  final Color? corValor;
}

class GradeNumeros extends StatelessWidget {
  const GradeNumeros(this.itens, {super.key, this.colunas = 2});
  final List<Numero> itens;
  final int colunas;

  @override
  Widget build(BuildContext context) {
    final linhas = <List<Numero>>[];
    for (var i = 0; i < itens.length; i += colunas) {
      linhas.add(itens.sublist(i, (i + colunas).clamp(0, itens.length)));
    }
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: Medidas.margemGrupo),
      child: Card(
        clipBehavior: Clip.antiAlias,
        child: Column(children: [
          for (var l = 0; l < linhas.length; l++) ...[
            if (l > 0) const Divider(),
            IntrinsicHeight(
              child: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
                for (var c = 0; c < linhas[l].length; c++) ...[
                  if (c > 0) const VerticalDivider(width: 1, color: Cores.reguaSuave),
                  Expanded(child: _Celula(linhas[l][c])),
                ],
              ]),
            ),
          ],
        ]),
      ),
    );
  }
}

class _Celula extends StatelessWidget {
  const _Celula(this.n);
  final Numero n;
  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.fromLTRB(13, 11, 13, 11),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(n.rotulo.toUpperCase(), style: Textos.rotulo.copyWith(fontSize: 10.5)),
          const SizedBox(height: 3),
          FittedBox(
            fit: BoxFit.scaleDown, // reduz em vez de cortar com reticências
            alignment: Alignment.centerLeft,
            child: Text.rich(TextSpan(children: [
              TextSpan(text: n.valor, style: Textos.valorGrade.copyWith(color: n.corValor)),
              if (n.sufixo != null)
                TextSpan(text: ' ${n.sufixo}', style: Textos.valor(12, cor: Cores.tinta3, peso: FontWeight.w500)),
            ])),
          ),
          if (n.legenda != null)
            Text(n.legenda!, style: Textos.legenda.copyWith(fontSize: 12, color: n.atencao ? Cores.atencao : Cores.tinta2)),
        ]),
      );
}
```

### Marcador de situação

```dart
/// "■ Preparando terra": quadrado de 9px mais o texto. Nunca pílula colorida.
class MarcaSituacao extends StatelessWidget {
  const MarcaSituacao(this.texto, {super.key, required this.cor, this.estilo});
  final String texto;
  final Color cor;
  final TextStyle? estilo;

  factory MarcaSituacao.ok(String t) => MarcaSituacao(t, cor: Cores.folha);
  factory MarcaSituacao.atencao(String t) => MarcaSituacao(t, cor: Cores.atencao);
  factory MarcaSituacao.problema(String t) => MarcaSituacao(t, cor: Cores.problema);
  factory MarcaSituacao.fase(Fase f, String t) => MarcaSituacao(t, cor: f.cor);

  @override
  Widget build(BuildContext context) => Row(mainAxisSize: MainAxisSize.min, children: [
        Container(width: 9, height: 9, color: cor),
        const SizedBox(width: 6),
        Text(texto, style: estilo ?? Textos.detalhe.copyWith(color: Cores.tinta, fontWeight: FontWeight.w600)),
      ]);
}
```

### Cronograma do ciclo

O elemento mais característico do app: as fases do abacaxi mês a mês, com o dia de hoje marcado em marca-texto. Use no lugar de qualquer barra de progresso de plantio. As durações vêm do plano de manejo do plantio. Se o plantio não tem data de início, mostre o estado vazio "Informe a data de início para ver o ciclo".

```dart
class FaseNoCiclo {
  const FaseNoCiclo(this.fase, this.meses);
  final Fase fase;
  final int meses;
}

class CronogramaCiclo extends StatelessWidget {
  const CronogramaCiclo({super.key, required this.inicio, required this.fases, required this.hoje, this.compacto = true});
  final DateTime inicio; // primeiro dia do mês de início
  final List<FaseNoCiclo> fases;
  final DateTime hoje;
  final bool compacto; // compacto: sem nomes das fases em cima (lista e celular)

  @override
  Widget build(BuildContext context) => AspectRatio(
        aspectRatio: compacto ? 300 / 66 : 640 / 74,
        child: CustomPaint(painter: _CicloPainter(inicio, fases, hoje, compacto)),
      );
}

class _CicloPainter extends CustomPainter {
  _CicloPainter(this.inicio, this.fases, this.hoje, this.compacto);
  final DateTime inicio;
  final List<FaseNoCiclo> fases;
  final DateTime hoje;
  final bool compacto;
  static const _iniciais = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  void _texto(Canvas c, String s, Offset o, TextStyle st, {bool centro = false}) {
    final tp = TextPainter(text: TextSpan(text: s, style: st), textDirection: TextDirection.ltr)..layout();
    tp.paint(c, centro ? o.translate(-tp.width / 2, 0) : o);
  }

  @override
  void paint(Canvas canvas, Size size) {
    final total = fases.fold<int>(0, (s, f) => s + f.meses);
    final mw = size.width / total;
    final escala = size.width / (compacto ? 300 : 640);
    final barraY = (compacto ? 20 : 22) * escala, barraH = (compacto ? 10 : 14) * escala;
    final mesStyle = Textos.legenda.copyWith(fontSize: 10.5 * escala);
    final anoStyle = Textos.valor(10 * escala, cor: Cores.tinta3, peso: FontWeight.w600);

    var x = 0.0;
    for (final f in fases) {
      final w = f.meses * mw;
      canvas.drawRect(Rect.fromLTWH(x, barraY, w - 1.5, barraH), Paint()..color = f.fase.cor);
      if (!compacto) _texto(canvas, f.fase.nome, Offset(x + 3, 2 * escala), Textos.legenda.copyWith(fontSize: 11 * escala, color: Cores.tinta, fontWeight: FontWeight.w600));
      x += w;
    }
    for (var i = 0; i < total; i++) {
      final m = DateTime(inicio.year, inicio.month + i);
      _texto(canvas, _iniciais[m.month - 1], Offset(i * mw + mw / 2, barraY + barraH + 4 * escala), mesStyle, centro: true);
      if (i == 0 || m.month == 1) _texto(canvas, '${m.year}', Offset(i * mw + 2, barraY + barraH + 18 * escala), anoStyle);
    }
    // marcador "hoje"
    final mesesAteHoje = (hoje.year - inicio.year) * 12 + hoje.month - inicio.month;
    final diasNoMes = DateUtils.getDaysInMonth(hoje.year, hoje.month);
    final hx = (mesesAteHoje + (hoje.day / diasNoMes)) * mw;
    if (hx >= 0 && hx <= size.width) {
      canvas.drawLine(Offset(hx, barraY - 4 * escala), Offset(hx, barraY + barraH + 3 * escala),
          Paint()..color = Cores.tinta..strokeWidth = 2 * escala);
      final ly = compacto ? 2 * escala : barraY + barraH + 18 * escala;
      canvas.drawRect(Rect.fromLTWH(hx + 4 * escala, ly, 30 * escala, 13 * escala), Paint()..color = Cores.marcaTexto);
      _texto(canvas, 'hoje', Offset(hx + 19 * escala, ly + 1 * escala),
          Textos.legenda.copyWith(fontSize: 10 * escala, fontWeight: FontWeight.w700, color: Cores.marcaTextoTinta), centro: true);
    }
  }

  @override
  bool shouldRepaint(covariant _CicloPainter o) => o.hoje != hoje || o.fases != fases || o.inicio != inicio;
}
```

### Ação fixa embaixo

```dart
/// Barra com a ação principal da tela, acima das abas. A lista termina antes dela (use como bottomNavigationBar
/// de um Scaffold interno, ou num Column abaixo do conteúdo rolável). Nunca FloatingActionButton por cima da lista.
class AcaoFixa extends StatelessWidget {
  const AcaoFixa({super.key, required this.principal, required this.onPrincipal, this.secundaria, this.onSecundaria, this.icone = Icons.add});
  final String principal;
  final VoidCallback onPrincipal;
  final String? secundaria;
  final VoidCallback? onSecundaria;
  final IconData? icone;

  @override
  Widget build(BuildContext context) => DecoratedBox(
        decoration: const BoxDecoration(
          color: Cores.folhaBranca,
          border: Border(top: BorderSide(color: Cores.reguaSuave)),
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
          child: Row(children: [
            if (secundaria != null) ...[
              OutlinedButton(onPressed: onSecundaria, child: Text(secundaria!)),
              const SizedBox(width: 8),
            ],
            Expanded(
              child: FilledButton.icon(
                onPressed: onPrincipal,
                icon: icone == null ? const SizedBox.shrink() : Icon(icone, size: 18),
                label: Text(principal),
              ),
            ),
          ]),
        ),
      );
}
```

### Abas embaixo e moldura responsiva

```dart
class Aba {
  const Aba(this.rotulo, this.icone);
  final String rotulo;
  final Widget icone; // ícone próprio em traço reto (SvgPicture ou CustomPaint)
}

/// Celular: abas embaixo com traço verde em cima da aba ativa.
/// Tela larga (>= 900): barra superior com as mesmas abas; os módulos abrem dentro dela.
class MolduraApp extends StatelessWidget {
  const MolduraApp({super.key, required this.abas, required this.atual, required this.onTrocar, required this.corpo, this.barraSuperiorLarga});
  final List<Aba> abas;
  final int atual;
  final ValueChanged<int> onTrocar;
  final Widget corpo;
  final PreferredSizeWidget Function(BuildContext)? barraSuperiorLarga;

  @override
  Widget build(BuildContext context) {
    final largo = MediaQuery.sizeOf(context).width >= Medidas.larguraTelaLarga;
    if (largo) {
      return Scaffold(appBar: barraSuperiorLarga?.call(context), body: corpo);
    }
    return Scaffold(
      body: corpo,
      bottomNavigationBar: DecoratedBox(
        decoration: const BoxDecoration(color: Cores.folhaBranca, border: Border(top: BorderSide(color: Cores.regua))),
        child: SafeArea(
          top: false,
          child: SizedBox(
            height: 64,
            child: Row(children: [
              for (var i = 0; i < abas.length; i++)
                Expanded(
                  child: InkWell(
                    onTap: () => onTrocar(i),
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        border: Border(top: BorderSide(color: i == atual ? Cores.folha : Colors.transparent, width: 2)),
                      ),
                      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                        IconTheme(
                          data: IconThemeData(size: 22, color: i == atual ? Cores.tinta : Cores.tinta3),
                          child: abas[i].icone,
                        ),
                        const SizedBox(height: 3),
                        Text(abas[i].rotulo, style: Textos.aba.copyWith(color: i == atual ? Cores.tinta : Cores.tinta3)),
                      ]),
                    ),
                  ),
                ),
            ]),
          ),
        ),
      ),
    );
  }
}
```

### Folha de formulário (lançamentos)

```dart
/// Abre o formulário como folha que sobe de baixo. O valor vem primeiro, em destaque.
Future<T?> abrirFolha<T>(BuildContext context, {required String titulo, required Widget conteudo, required Widget rodape}) {
  return showModalBottomSheet<T>(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (ctx) => DraggableScrollableSheet(
      expand: false,
      initialChildSize: 0.9,
      maxChildSize: 0.95,
      builder: (ctx, scroll) => Column(children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
          child: Row(children: [
            TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Cancelar')),
            Expanded(child: Text(titulo, textAlign: TextAlign.center, style: Textos.tituloFolha)),
            const SizedBox(width: 88), // equilibra o "Cancelar"
          ]),
        ),
        Expanded(child: ListView(controller: scroll, padding: const EdgeInsets.only(bottom: 16), children: [conteudo])),
        DecoratedBox(
          decoration: const BoxDecoration(color: Cores.folhaBranca, border: Border(top: BorderSide(color: Cores.reguaSuave))),
          child: SafeArea(top: false, child: Padding(padding: const EdgeInsets.fromLTRB(16, 10, 16, 10), child: rodape)),
        ),
      ]),
    ),
  );
}

/// Campo de valor em destaque (abre o teclado numérico).
class CampoValor extends StatelessWidget {
  const CampoValor({super.key, required this.controller, this.rotulo = 'Valor *'});
  final TextEditingController controller;
  final String rotulo;
  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(horizontal: Medidas.margemGrupo),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(14, 12, 14, 8),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(rotulo.toUpperCase(), style: Textos.rotulo),
              TextField(
                controller: controller,
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                autofocus: true,
                style: Textos.valorDestaque,
                decoration: InputDecoration(
                  prefixText: 'R\$ ',
                  prefixStyle: Textos.valor(16, cor: Cores.tinta3, peso: FontWeight.w500),
                  border: InputBorder.none, enabledBorder: InputBorder.none, focusedBorder: InputBorder.none,
                  filled: false, contentPadding: EdgeInsets.zero,
                ),
              ),
            ]),
          ),
        ),
      );
}
```

Os demais campos do formulário entram como `LinhaLista` dentro de `GrupoLista`: Categoria, Plantio, Data e Pagamento com `onTap`, que abre a lista completa de opções existente no app; "Conta a pagar" com `final_: Switch(...)`; e o Vencimento só aparece quando o switch está ligado.

### Linha deslizável (editar e excluir)

```dart
// Com o pacote flutter_slidable:
Slidable(
  key: ValueKey(lancamento.id),
  endActionPane: ActionPane(motion: const DrawerMotion(), extentRatio: 0.42, children: [
    SlidableAction(onPressed: (_) => editar(lancamento), backgroundColor: Cores.tinta2, foregroundColor: Colors.white, label: 'Editar'),
    SlidableAction(onPressed: (_) => confirmarExclusao(lancamento), backgroundColor: Cores.problema, foregroundColor: Colors.white, label: 'Excluir'),
  ]),
  child: LinhaLista(titulo: lancamento.descricao, legenda: '${dia(lancamento.data)} · ${lancamento.categoria}', valor: brlSaida(lancamento.valor)),
)
```

Excluir sempre pede confirmação dentro do app (diálogo ou folha), com o botão de confirmar em `Cores.problema`.

### Controle segmentado

```dart
SegmentedButton<String>(
  segments: const [
    ButtonSegment(value: 'todos', label: Text('Todos')),
    ButtonSegment(value: 'ativos', label: Text('Ativos')),
    ButtonSegment(value: 'colhidos', label: Text('Colhidos')),
    ButtonSegment(value: 'encerrados', label: Text('Encerrados')),
  ],
  selected: {filtro},
  onSelectionChanged: (s) => setState(() => filtro = s.first),
  showSelectedIcon: false,
  style: ButtonStyle(
    backgroundColor: WidgetStateProperty.resolveWith((s) => s.contains(WidgetState.selected) ? Cores.tinta : Cores.folhaBranca),
    foregroundColor: WidgetStateProperty.resolveWith((s) => s.contains(WidgetState.selected) ? Colors.white : Cores.tinta2),
    side: const WidgetStatePropertyAll(BorderSide(color: Cores.regua)),
    shape: WidgetStatePropertyAll(RoundedRectangleBorder(borderRadius: BorderRadius.circular(7))),
    visualDensity: VisualDensity.compact,
    tapTargetSize: MaterialTapTargetSize.padded,
  ),
)
```

### Estado vazio

```dart
class EstadoVazio extends StatelessWidget {
  const EstadoVazio({super.key, required this.frase, this.acao, this.onAcao});
  final String frase; // "Nenhuma despesa lançada."
  final String? acao; // "Nova despesa"
  final VoidCallback? onAcao;
  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        child: Row(children: [
          Expanded(child: Text(frase, style: Textos.detalhe)),
          if (acao != null) TextButton.icon(onPressed: onAcao, icon: const Icon(Icons.add, size: 16), label: Text(acao!)),
        ]),
      );
}
```

Sem ilustração grande e sem círculo colorido com ícone: o vazio é uma frase e uma ação, dentro do próprio grupo.

## 6. Esqueleto de tela

```dart
Scaffold(
  body: RefreshIndicator( // puxar para atualizar (no iOS, CupertinoSliverRefreshControl dá o efeito nativo)
    color: Cores.folha,
    onRefresh: recarregar,
    child: CustomScrollView(slivers: [
      SliverAppBar.large( // título grande que encolhe ao rolar
        title: const Text('Plantios'),
        // leading automático: "‹" volta para a tela anterior
        actions: [IconButton(onPressed: buscar, icon: const Icon(Icons.search))],
      ),
      SliverToBoxAdapter(child: RotuloSecao('1 plantio')),
      SliverToBoxAdapter(child: GrupoLista(filhos: [/* LinhaLista... */])),
      const SliverToBoxAdapter(child: SizedBox(height: 24)),
    ]),
  ),
  bottomNavigationBar: AcaoFixa(principal: 'Novo plantio', onPrincipal: novoPlantio),
)
```

O `SliverAppBar.large` usa o estilo `headlineMedium` do tema (`Textos.tituloTela`). Mantenha o fundo `Cores.papel` também quando a barra encolhe (`scrolledUnderElevation: 0` no tema).
