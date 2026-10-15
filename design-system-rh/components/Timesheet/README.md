# Timesheet

Espelho de ponto: uma linha por dia com as marcações, horas trabalhadas e saldo do banco de horas.

**Props:** `days` (`{ date, punches?: string[], total?, balance?: '+hh:mm' | '-hh:mm', flag?: 'falta' | 'ferias' | 'feriado' | 'folga' }`), `slots` (marcações por dia, padrão 4), `caption`.

- Marcação ausente aparece como `--:--` em `warning`; num dia de falta, em `danger`.
- O saldo sempre leva sinal (`+00:12`, `-00:14`); a cor acompanha o sinal.
- Horários em 24h, `hh:mm`, em `mono` para alinhar as colunas.
- Ajustes de ponto são feitos por solicitação (`RequestCard`), nunca editando a célula direto.
