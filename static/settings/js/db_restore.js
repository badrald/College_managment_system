const successMsg = new bootstrap.Modal(document.getElementById("successMsg"));
const errorMsg = new bootstrap.Modal(document.getElementById("errorMsg"));
const message = new bootstrap.Modal(document.getElementById("message"));

$("#createUser").on("submit", function (event) {
  event.preventDefault();
  let formData = new FormData(this);
  $.ajax({
    url: "/settings/restoreDataBase/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      $("#scucessMsg .modal-body p").text(data["success"]);
      successMsg.show();
    },
    error: function (data) {
      var errorData = JSON.parse(data.responseText); // Parse the responseText as JSON
      $("#errorMsg .modal-body p").text(errorData["error"]);
      errorMsg.show();
    },
  });
});
function getFilesOnServer() {
  $("#tbody").children(":not(#spinnerContainer)").remove();
  $("#spinnerContainer").show();
  $.ajax({
    url: "/settings/restoreDataBase/",
    method: "GET",
    data: { files_on_server: ".", restore_from_server: "." },
    success: function (data) {
      $("#tbody").children(":not(#spinnerContainer)").remove();
      console.log(data);
      $.each(data["files_on_server"], function (index, file) {
        let row = $("<tr>");

        row.append($("<td>", { text: index + 1 }));
        row.append($("<td>", { text: file }));
        row.append(
          $("<td>").append(
            $("<button>", {
              text: "حذف الملف",
              class: "btn btn-danger",
              "data-bs-toggle": "modal",
              "data-bs-target": "#message",
              onclick: `updateDeleteName('${file}')`,
            })
          )
        );
        row.append(
          $("<td>").append(
            $("<button>", {
              text: "تطبيق",
              class: "btn btn-info",
              onclick: `applyRestoreFile('${file}')`,
            })
          )
        );
        $("#spinnerContainer").hide();
        row.appendTo("#tbody");
      });
    },
    error: function (data) {
      var errorData = JSON.parse(data.responseText); // Parse the responseText as JSON
      $("#errorMsg .modal-body p").text(errorData["error"]);
      errorMsg.show();
    },
  });
}

function updateDeleteName(text) {
  $("#deletedFile").text(
    `سيتم حذف ملف قاعدة البيانات ذا الاسم ${text} هل انت متأكد`
  );
  $("#deleteFile input[name='file_name']").val(text);
}
$("#deleteFile").on("submit", function (event) {
  event.preventDefault();
  var form = new FormData(this);
  $.ajax({
    url: "/settings/restoreDataBase/",
    type: "POST",
    data: form,
    contentType: false,
    processData: false,
    success: function (data) {
      message.hide();
      $("#successMsg .modal-body p").text(data["success"]);
      successMsg.show();
      $("#successMsg").on("hidden.bs.modal", function (event) {
        getFilesOnServer();
      });
    },
    error: function (data) {
      message.hide();
      var errorData = JSON.parse(data.responseText); // Parse the responseText as JSON
      $("#errorMsg .modal-body p").text(errorData["error"]);
      errorMsg.show();
    },
  });
});

function applyRestoreFile(text) {
  $.ajax({
    url: "/settings/restoreDataBase/",
    type: "POST",
    data: { file_name: text, restore_from_server: ".", applyFromSever: "." },
    success: function (data) {
      $("#successMsg .modal-body p").text(data["success"]);
      successMsg.show();
      $("#successMsg").on("hidden.bs.modal", function () {
        location.reload();
      });
    },
    error: function (data) {
      var errorData = JSON.parse(data.responseText); // Parse the responseText as JSON
      $("#errorMsg .modal-body p").text(errorData["error"]);
      errorMsg.show();
    },
  });
}

$("#resetForm").on("submit", function (event) {
  event.preventDefault();
  var form = new FormData(this);
  $.ajax({
    url: "/settings/restoreDataBase/",
    type: "POST",
    data: form,
    contentType: false,
    processData: false,
    success: function (data) {
      console.log(data["success"]);
      $("#successMsg .modal-body p").text(data["success"]);
      successMsg.show();
      $("#successMsg").on("hidden.bs.modal", function () {
        location.reload();
      });
    },
    error: function (data) {
      var errorData = JSON.parse(data.responseText); // Parse the responseText as JSON
      $("#errorMsg .modal-body p").text(errorData["error"]);
      errorMsg.show();
    },
  });
});

$("#FileForm").on("submit", function (event) {
  event.preventDefault();
  var form = new FormData(this);
  $.ajax({
    url: "/settings/restoreDataBase/",
    type: "POST",
    data: form,
    contentType: false,
    processData: false,
    success: function (data) {
      $("#successMsg .modal-body p").text(data["success"]);
      successMsg.show();
      $("#successMsg").on("hidden.bs.modal", function () {
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
