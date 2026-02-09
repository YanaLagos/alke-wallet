$(document).ready(function () {
  let contacts = getContacts();
  let selectedIndex = -1;

  renderContacts();

  $("#save-contact").click(function () {
    let name = $("#name").val().trim();
    let rut = $("#rut").val().trim();
    let alias = $("#alias").val().trim();
    let bank = $("#bank").val().trim();

    if (!name || !rut || !alias || !bank) {
      $("#formError").text("Completa todos los campos.").show();
      return;
    }

    const entry = name + "|" + rut + "|" + alias + "|" + bank;

    contacts.push(entry);
    saveContacts(contacts);

    $("#name, #rut, #alias, #bank").val("");

    renderContacts();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalAddContact"),
    );
    modal.hide();
  });

  $("#contactList").on("click", ".select-btn", function () {
    selectedIndex = Number($(this).data("index"));

    const parts = contacts[selectedIndex].split("|");

    $("#selectedContact").val(parts[0] + " (" + parts[2] + ")");

    renderContacts();
  });

  $("#sendmoney-form").submit(function (e) {
    e.preventDefault();

    let amount = Number($("#amount").val());
    let totalAmount = Number(localStorage.getItem("totalAmount")) || 0;

    $("#formError").hide().text("");
    $("#formSuccess").hide().text("");

    if (selectedIndex === -1) {
      $("#formError").text("Selecciona un contacto.").show();
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      $("#formError").text("Ingresa un monto válido.").show();
      return;
    }

    if (amount > totalAmount) {
      $("#formError").text("Saldo insuficiente.").show();
      return;
    }

    totalAmount = totalAmount - amount;
    localStorage.setItem("totalAmount", String(totalAmount));
    const parts = contacts[selectedIndex].split("|");

    $("#formSuccess")
      .text("Enviado $" + amount + " a " + parts[0])
      .show();

    $("#amount").val("");
    $("#message").val("");

    addTransaction("TRANSFERENCIA", amount);

    setTimeout(function () {
      window.location.href = "menu.html";
    }, 1000);
  });

  function renderContacts() {
    $("#contactList").empty();

    for (let i = 0; i < contacts.length; i++) {
      const parts = contacts[i].split("|");

      const name = parts[0];
      const rut = parts[1];
      const alias = parts[2];
      const bank = parts[3];

      const template = document.getElementById("contactTemplate");
      const clone = template.content.cloneNode(true);

      clone.querySelector(".contact-name").textContent = name;
      clone.querySelector(".contact-alias").textContent = alias;
      clone.querySelector(".contact-info").textContent = rut + " - " + bank;

      const button = clone.querySelector(".select-btn");
      button.dataset.index = i;

      if (i === selectedIndex) {
        button.classList.remove("btn-outline-primary");
        button.classList.add("btn-success");
        button.textContent = "Seleccionado";
      }

      $("#contactList").append(clone);
    }
  }

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

  function getContacts() {
    const raw = localStorage.getItem("contacts");
    if (!raw) return [];
    return raw.split("~");
  }

  function saveContacts(list) {
    localStorage.setItem("contacts", list.join("~"));
  }
});
