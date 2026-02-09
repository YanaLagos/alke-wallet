$(document).ready(function () {
  console.log("main.js cargado>");

  $("#start-btn").click(function () {
    window.location.href = "pages/login.html";
  });

  $("#btn-back").click(function(){
    window.location.href = "menu.html";
  });
});
