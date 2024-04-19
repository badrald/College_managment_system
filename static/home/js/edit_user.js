parameters = {
  count: false,
  letters: false,
  numbers: false,
  special: false,
};
const successMsg = new bootstrap.Modal(document.getElementById("successMsg"));
const errorMsg = new bootstrap.Modal(document.getElementById("errorMsg"));
const message = new bootstrap.Modal(document.getElementById("message"));
let strengthBar = document.getElementById("strength-bar");

function strengthChecker() {
  let password = document.getElementById("new_password1").value;

  parameters.letters = /[A-Za-z]+/.test(password) ? true : false;
  parameters.numbers = /[0-9]+/.test(password) ? true : false;
  parameters.special = /[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(password)
    ? true
    : false;
  parameters.count = password.length > 7 ? true : false;

  let barLength = Object.values(parameters).filter((value) => value);
  strengthBar.innerHTML = "";
  for (let i in barLength) {
    let span = document.createElement("span");
    span.classList.add("strength");
    strengthBar.appendChild(span);
  }

  let spanRef = document.getElementsByClassName("strength");
  for (let i = 0; i < spanRef.length; i++) {
    switch (spanRef.length - 1) {
      case 0:
        spanRef[i].style.background = "#ff3e36";
        break;
      case 1:
        spanRef[i].style.background = "#ff691f";
        break;
      case 2:
        spanRef[i].style.background = "#ffda36";
        break;
      case 3:
        spanRef[i].style.background = "#0be881";
        break;
    }
  }
}
function toggle() {
  let password = document.getElementById("new_password1");
  let eye = document.getElementById("toggle");

  if (password.getAttribute("type") == "password") {
    password.setAttribute("type", "text");
    eye.style.color = "#062b61";
  } else {
    password.setAttribute("type", "password");
    eye.style.color = "#6b6868";
  }
}
$("#changePasswordForm").on("submit", function (event) {
  event.preventDefault();
  var formData = new FormData(this);
  $.ajax({
    url: `/accounts/password/${userId}`, // Update the URL endpoint
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      if (isLoginUser) {
        $("#successMsg .modal-body p").text(data["success"]);
        successMsg.show();
        $("#successMsg").on("hidden.bs.modal", function (event) {
          window.location.href = `/`;
        });
      } else {
        $("#successMsg .modal-body p").text(data["success"]);
        successMsg.show();
        $("#successMsg").on("hidden.bs.modal", function (event) {
          location.reload();
        });
      }
    },
    error: function (data) {
      var errorData = JSON.parse(data.responseText); // Parse the responseText as JSON
      $("#errorMsg .modal-body p").text(errorData["error"]);
      errorMsg.show();
    },
  });
});

function checkMatch() {
  let password = document.getElementById("new_password1");
  let password2 = document.getElementById("new_password2");
  if (password.value !== password2.value) {
    password2.classList.remove("is-valid");
    password2.classList.add("is-invalid");
  } else {
    password2.classList.remove("is-invalid");
    password2.classList.add("is-valid");
  }
}




    $("#delete_form").on("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(this);
      $.ajax({
        url: `/accounts/delete_user/${userId}`, // Update the URL endpoint
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        success: function (data) {
          $("#successMsg .modal-body p").text(data["success"]);
          successMsg.show();
          $("#successMsg").on("hidden.bs.modal", function (event) {
            window.location.href = '{% url "profiles" %}';
          });
        },
        error: function (data) {
          message.hide();
          console.error(data.responseText);
          var errorData = JSON.parse(data.responseText); // Parse the responseText as JSON
          $("#errorMsg .modal-body p").text(errorData["error"]);
          errorMsg.show();
        },
      });
    });
    $("#EditForm").on("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(this);
      $.ajax({
        url: `/accounts/edit_profile/${userId}`, //Update the URL endpoint
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        success: function (data) {
          $("#successMsg .modal-body p").text(data["success"]);
          successMsg.show();
          $("#successMsg").on("hidden.bs.modal", function (event) {
            location.reload();
          });
        },
        error: function (data) {
          var errorData = JSON.parse(data.responseText); //Parse the responseText as JSON
          $("#errorMsg .modal-body p").text(errorData["error"]);
          errorMsg.show();
        },
      });
    });


