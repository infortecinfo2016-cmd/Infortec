# Button

Botão com quatro variantes. **primary** (azul Infortec) para a ação principal da tela, no máximo uma por área; **secondary** para as demais; **ghost** para ações terciárias e links de ação; **danger** só para ações que encerram algo (desligar, excluir, cancelar folha), sempre seguidas de confirmação.

**Props:** `variant` (`primary` · `secondary` · `ghost` · `danger`, padrão `secondary`), `size` (`sm` 32px · `md` 40px · `lg` 48px), `icon` / `iconRight` (nome de um `Icon`), `loading`, `block`, mais qualquer atributo de `<button>`.

- Rótulo com verbo no infinitivo e o objeto: “Aprovar férias”, “Exportar folha”, “Admitir colaborador”. Nunca “OK” ou “Clique aqui”.
- `loading` desabilita o botão e troca o ícone por um spinner; mantenha o rótulo no gerúndio (“Calculando folha”).
- Use `size="sm"` dentro de tabelas, cartões de solicitação e filtros; `lg` no autoatendimento e no registro de ponto pelo celular.
- Não: dois botões primary lado a lado; danger sem confirmação; ícone sem rótulo (use `aria-label` se for só ícone).
