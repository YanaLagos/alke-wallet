$(document).ready(function () {
  $("#deposit-form").submit(function (e) {
    e.preventDefault();
    console.log("SUBMIT deposit OK");

    let depositAmount = Number($("#depositAmount").val().trim());

    if (isNaN(depositAmount) || depositAmount <= 0) {
      $("#formError").text("Ingresa un monto válido");
      return;
    }

    $("#formError").text("");

    let totalAmount = Number(localStorage.getItem("totalAmount")) || 0;

    totalAmount += depositAmount;

    localStorage.setItem("totalAmount", totalAmount);

    $("#formSucess").text("Depósito realizado con éxito");

    addTransaction("DEPÓSITO", depositAmount);

    setTimeout(function () {
      $("#formSuccess").text("");
      window.location.href = "menu.html";
    }, 800);
  });

  function getTransactions() {
    const raw = localStorage.getItem("transactions");
    if (!raw) return [];
    return raw.split("~");
  }

  function saveTransactions(list) {
    localStorage.setItem("transactions", list.join("~"));
  }

  function addTransaction(tipo, monto) {
    const now = new Date();
    const date = now.toLocaleString("es-CL");
    const entry = tipo + "|" + monto + "|" + date;

    const list = getTransactions();
    list.push(entry);
    saveTransactions(list);
  }
});
