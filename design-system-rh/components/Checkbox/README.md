# Checkbox

Caixa de seleção para escolhas independentes e listas (benefícios, permissões, seleção em massa na tabela).

**Props:** `label`, `description` (linha de apoio), mais qualquer atributo de `<input type="checkbox">` (`checked`, `defaultChecked`, `onChange`, `disabled`). O estado misto vem de `ref.current.indeterminate = true`.

- Use para aceitar termos (“Li e aceito a política de privacidade”) e para marcar vários itens.
- Para ligar/desligar uma configuração com efeito imediato, use `Switch`.
