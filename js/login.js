$(document).ready(function () {
  $("#login-form").submit(function (e) {
    e.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();

    if (email === "" || password === "") {
      $(".error-message").text("Debes completar todos los campos.");
      return;
    }

    const usuarioCorrecto = "usuario@correo.com";
    const passwordCorrecta = "user1234";

    if (email !== usuarioCorrecto || password !== passwordCorrecta) {
      $(".error-message").text("Usuario o contraseña incorrectos.");
      return;
    }

    $(".success-message").text("Sesión iniciada con éxito.");

    setTimeout(function () {
      $(".success-message").text("");
      window.location.href = "menu.html";
    }, 800);
  });
});
