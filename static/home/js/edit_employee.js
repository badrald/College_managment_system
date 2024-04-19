const successMsg = new bootstrap.Modal(document.getElementById("successMsg"));
const errorMsg = new bootstrap.Modal(document.getElementById("errorMsg"));
jQuery(function () {
  $("#myAlert").hide();
  $.ajaxSetup({
    headers: {
      "X-CSRFToken": "{{ csrf_token }}",
    },
  });
});

$("#upload-file").on("change", function () {
  var filename = $(this).val().split("\\").pop();
  $("#fileStatus").text(filename);
});

$("#editForm").on("submit", function (event) {
  event.preventDefault();
  var formData = new FormData(this);
  $.ajax({
    url: `/hr/Employee/edit/${employeeId}`, // Update the URL endpoint
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      successMsg.show();
    },
    error: function (error) {errorMsg.show();},
    
  });
});
