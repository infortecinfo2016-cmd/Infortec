# Alert

Aviso em linha no topo de uma página ou seção. Para confirmação rápida de uma ação (“Férias aprovadas”), use um toast do app; para algo que bloqueia, use um modal.

**Props:** `tone` (`info` · `success` · `warning` · `danger`), `title`, `children` (texto), `action` (um `Button` `sm`), `onClose` (mostra o X).

- Título diz o fato; texto diz o que fazer a seguir: “Corrija o cadastro e envie de novo.”
- `danger` usa `role="alert"` e é anunciado na hora; os outros usam `role="status"`.
- Um alerta por seção. Vários avisos viram uma lista dentro de um único alerta.
