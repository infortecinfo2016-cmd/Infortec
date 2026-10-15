# DataTable

Tabela de dados para listas de colaboradores, lançamentos da folha e relatórios. Rola na horizontal dentro da própria moldura em telas estreitas.

**Props:** `columns` (`{ key, label, align?: 'right' | 'center', mono?, width?, render?(row) }`), `rows`, `rowKey` (padrão `id`), `onRowClick(row)`, `dense`, `caption` (nome para leitores de tela), `empty` (texto do estado vazio).

- Valores em reais e horas alinhados à direita (`align: 'right'`) e em `mono`.
- Primeira coluna identifica a linha: use a classe `irh-cell-person` com `Avatar` + nome + cargo.
- Estado vazio diz o que fazer: “Nenhum colaborador neste filtro. Limpe os filtros ou admita alguém.”
- Use `dense` em telas de conferência (folha, ponto) com muitas linhas.
