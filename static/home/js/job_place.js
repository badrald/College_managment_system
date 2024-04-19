
  const successMsg = new bootstrap.Modal(document.getElementById("successMsg"));
  const errorMsg = new bootstrap.Modal(document.getElementById("errorMsg"));
  const massage = new bootstrap.Modal(document.getElementById("message"));
  function searchTable(searchText, table_id) {
    // Get the table body.
    const tbody = document.getElementById(table_id);

    const rows = tbody.querySelectorAll("tr");
    for (const row of rows) {
      row.style.display = "none";
    }

    // Filter the rows by the search text.
    for (const row of rows) {
      const text = row.textContent;
      if (text.includes(searchText)) {
        row.style.display = "";
      }
    }
  }

  $("#search_bar").on("keyup", (e) => {
    let searchText = $("#search_bar").val();
    console.log(searchText);
    searchTable(searchText, "tbody");
  });

  $("#search_bar_employee").on("keyup", (e) => {
    let searchText = $("#search_bar_employee").val();
    console.log(searchText);
    searchTable(searchText, "tbodyEmployee");
  });

  function deleteUpdate(text) {
    var Id = text.childNodes[1].innerText;
    console.log(Id);
    let jobPlace_name = text.childNodes[3].innerText;
    $("#employeeNameWarrning").text(`سيتم حذف جهة العمل ${jobPlace_name}`);
    $("#jobPlaceDelete input[name='id']").val(`${Id}`);
  }
  $("#jobPlaceDelete").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "/hr/job_places/", // Update the URL endpoint
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        massage.hide();
        $("#successMsg .modal-body p").text(data["success"]);
        successMsg.show();
        $("#successMsg").on("hidden.bs.modal", function (event) {
          location.reload();
        });
      },
      error: function (data) {
        massage.hide();
        var errorData = Json.parse(data.responseText);
        $("#errorMsg .modal-body p").text(errorData["error"]);
        errorMsg.show();
        setTimeout(function () {
          errorMsg.hide();
        }, 3000);
      },
    });
  });

  function editJobPlace(text) {
    console.log(text.childNodes);
    var id = text.childNodes[1].innerText;
    console.log(id);
    var jobPlace_name = text.childNodes[3].innerText;
    var jobPlace_address = text.childNodes[5].innerText;
    var jobPlace_map = text.childNodes[7].childNodes[1].getAttribute("href");
    var jobPlace_phoneNumber = text.childNodes[9].innerText;
    var jobPlace_representative_name = text.childNodes[11].innerText;
    var jobPlace_representativePN = text.childNodes[13].innerText;

    $("#jobPlaceEdit input[name='id']").val(id);
    $("#jobPlaceEdit input[name='name']").val(jobPlace_name);
    $("#jobPlaceEdit input[name='address']").val(jobPlace_address);
    $("#jobPlaceEdit input[name='location']").val(jobPlace_map);
    $("#jobPlaceEdit input[name='phone_number']").val(jobPlace_phoneNumber);
    if (jobPlace_representativePN != jobPlace_representative_name) {
      $("#jobPlaceEdit input[name='representative_name']").val(
        jobPlace_representative_name
      );
      $("#jobPlaceEdit input[name='representative_phone_number']").val(
        jobPlace_representativePN
      );
    } else {
      $("#jobPlaceEdit input[name='representative_name']").val("");
      $("#jobPlaceEdit input[name='representative_phone_number']").val("");
    }
  }
  $("#jobPlaceEdit").on("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "/hr/job_places/", // Update the URL with your own backend script
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        $("#successMsg .modal-body p").text(data["success"]);
        successMsg.show();
        $("#successMsg").on("hidden.bs.modal", function (event) {
          location.reload();
        });
      },
      error: function (data) {
        var errorData = Json.parse(data.responseText);
        $("#errorMsg .modal-body p").text(errorData["error"]);
        errorMsg.show();
      },
    });
  });
  $("#jobPlaceAdd").on("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "/hr/job_places/", // Update the URL with your own backend script
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        $("#successMsg .modal-body p").text(data["success"]);
        successMsg.show();
        $("#successMsg").on("hidden.bs.modal", function (event) {
          location.reload();
        });
      },
      error: function (data) {
        var errorData = Json.parse(data.responseText);
        $("#errorMsg .modal-body p").text(errorData["error"]);
        errorMsg.show();
      },
    });
  });