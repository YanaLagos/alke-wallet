$(document).ready(function () {
  var saldo = Number(localStorage.getItem("totalAmount")) || 0;

  $("#totalAmount").text("$" + saldo);

  $("#deposit").click(function () {
    window.location.href = "deposit.html";
  });

  $("#sendmoney").click(function () {
    window.location.href = "sendmoney.html";
  });

  $("#transactions").click(function () {
    window.location.href = "transactions.html";
  });
});
