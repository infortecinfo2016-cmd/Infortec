# Select

Lista de opções nativa (`<select>`) com a mesma moldura do `TextField`. Use para até ~15 opções; acima disso, use um campo de busca.

**Props:** `label`, `options` (strings ou `{ value, label }`), `placeholder` (primeira opção desabilitada, ex.: “Selecione”), `hint`, `error`, `required`, mais qualquer atributo de `<select>`.

- Opções em ordem lógica (jornada, contrato) ou alfabética (departamentos, cargos).
- Prefira `Select` a botões de rádio quando houver mais de 4 opções.
