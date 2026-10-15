# RequestCard

Cartão de solicitação para a fila de aprovação do gestor e do RH: férias, banco de horas, atestado, reembolso.

**Props:** `kind` (`Férias` · `Banco de horas` · `Atestado` · `Reembolso`, define o ícone), `status`, `name`, `role`, `period`, `amount` + `amountLabel`, `note` (mensagem do colaborador), `onApprove`, `onReject` (os botões só aparecem com `status="pendente"`), `submitted` (rodapé com data e autor).

- Recusar sempre pede um motivo antes de concluir; o motivo é enviado ao colaborador.
- Depois de decidir, troque o status e mostre quem decidiu e quando em `submitted`.
