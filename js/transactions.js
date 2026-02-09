$(document).ready(function () {
  renderTransactions();
});

function getTransactions() {
  const raw = localStorage.getItem("transactions");
  if (!raw) return [];
  return raw.split("~");
}

function renderTransactions() {
  $("#transactionsList").empty();

  const list = getTransactions();
  if (list.length === 0) {
    $("#transactionsList").append(
      "<li class='list-group-item text-muted'>No hay movimientos.</li>",
    );
    return;
  }

  const template = document.getElementById("transactionsTemplate");

  for (let i = list.length - 1; i >= 0; i--) {
    const parts = list[i].split("|");
    const tipo = parts[0];
    const monto = parts[1];
    const fecha = parts[2];

    const clone = template.content.cloneNode(true);
    clone.querySelector(".transaction-type").textContent = tipo;
    clone.querySelector(".transaction-amount").textContent = "$" + monto;
    clone.querySelector(".transaction-date").textContent = fecha;

    $("#transactionsList").append(clone);
  }
}
