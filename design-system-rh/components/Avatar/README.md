# Avatar

Foto ou iniciais da pessoa. Sem foto, mostra as iniciais (primeiro e último nome, ignorando “da”, “de”, “dos”) com uma cor estável calculada pelo nome.

**Props:** `name` (obrigatório; vira texto para leitores de tela), `src` (foto), `size` (`sm` 28 · `md` 36 · `lg` 48 · `xl` 72), `tone` (`brand` · `people` · `leave`, para fixar a cor), `status` (`online` · `ferias` · `offline`, ponto no canto).

- `xl` só no perfil do colaborador; `lg` em cartões; `md` em listas e solicitações; `sm` em tabelas densas e na barra lateral.
- Fotos quadradas, rosto centralizado; o componente recorta em círculo.
