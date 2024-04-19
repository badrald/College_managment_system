function checkAll() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (
      checkboxes[i].disabled ||
      checkboxes[i].parentElement.parentElement.style.display == "none"
    )
      continue;

    checkboxes[i].checked = document.getElementById("check_all").checked;
  }
}

document.getElementById("check_all").addEventListener("click", checkAll);
function searchTable(searchText) {
  // Get the table body.
  const tbody = document.getElementById("tbody");

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
  searchTable(searchText);
});

const successMsg = new bootstrap.Modal(document.getElementById("successMsg"));
const errorMsg = new bootstrap.Modal(document.getElementById("errorMsg"));
const EmployeeMesg = new bootstrap.Modal(document.getElementById("message"));
const GroupEditForm = new bootstrap.Modal(
  document.getElementById("GroupEditForm")
);
function groupInfo(group_id) {
  $("#spinnerContainer").show();

  $.ajax({
    url: "/attendess/Groups/Edit/",
    type: "GET",
    data: { groupInfo: group_id },
    contentType: "application/json",
    async: false,
    success: function (data) {
      $("#EditForm input[name='group_id']").val(group_id);
      $("#EditForm input[name='name']").val(data.data["name"]);
      $("#EditForm select[name='supervisor'] :selected")
        .val(data.data["supervisor_id"])
        .text(data.data["supervisor"]);
      $("#GroupEditForm .modal-title ").text(data.data["name"]);
      $("#groupAdd input[name='group_id']").val(group_id);
      $("#EditForm select[name='job_place'] :selected")
        .val(data.data["job_place_id"])
        .text(data.data["job_place"]);
      UpdateTable(data.data["employees"], group_id);
      GroupEditForm.show();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function UpdateTable(data, group_id) {
  $("#tbodyGroupEdit").children(":not(#spinnerContainer)").remove();
  $("#EditForm select[name='supervisor']")
   .children(":not(:selected)")
   .remove();
   $("#EditForm select[name='supervisor']").append(
     `<option>---------------------</option>`
   );
  $.each(data, function (index, employee) {
    $("#EditForm select[name='supervisor']").append(
      `<option value="${employee.id}">${employee.name} // ${employee.specialization}</option>`
    );
   
    let row = $("<tr>");
    row.append(
      $("<input>", {
        type: "checkbox",
        name: "employees",
        class: "text-center d-none",
        value: employee.id,
        checked: true,
      })
    );
    row.append($("<td>", { class: "text-center", text: employee.name }));
    row.append(
      $("<td>", { class: "text-center", text: employee.specialization })
    );
    row.append(
      $("<td>", { class: "text-center" }).append(
        $("<a>", {
          class: "btn btn-danger d-print-none text-white",
          onclick: `updateDelete(0,'${employee.name}',${employee.id},${group_id})`,
          "data-bs-toggle": "modal",
          "data-bs-target": "#message",
          text: "حذف من المجموعة",
        })
      )
    );
    setTimeout(function (e) {
      $("#spinnerContainer").hide();
      row.appendTo("#tbodyGroupEdit");
    }, 3000);
  });
}

function updateDelete(type, name, id, group_id) {
  if (type) {
    let text1 = `هل انت متأكد انك تريد حذف هذه المجموعة ؟`;
    let text2 = `سيتم حذف  ${name} هل انت متأكد؟ `;
    $("#deletedEmployee").text(text2);
    $("#deleteText").text(text1);
    $("#deleteFromGroup input[name='employee_id']").remove();
    $("#deleteFromGroup input[name='deleteEmployee']").remove();
    $("#deleteFromGroup input[name='deleteGroup']").val(".");
    $("#deleteFromGroup input[name='group_id']").val(id);
  } else {
    let text1 = `هل انت متأكد انك تريد حذف هذا الموظف من المجموعة ؟`;
    let text2 = ` سيتم حذف الموظف ${name} هل انت متأكد؟ `;
    $("#deletedEmployee").text(text2);
    $("#deleteText").text(text1);
    $("#deleteFromGroup input[name='employee_id']").val(id);
    $("#deleteFromGroup input[name='deleteEmployee']").val(".");
    $("#deleteFromGroup input[name='deleteGroup']").remove();
    $("#deleteFromGroup input[name='group_id']").val(group_id);
  }
}

$("#deleteFromGroup").on("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(this);
  console.log(formData);
  $.ajax({
    url: "/attendess/Groups/Edit/", // Update the URL endpoint
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      EmployeeMesg.hide();
      console.log(data["success"]);
      $("#successText").text(data["success"]);
      successMsg.show();
      document
        .getElementById("successMsg")
        .addEventListener("hidden.bs.modal", function (event) {
          groupInfo($("#groupAdd input[name='group_id']").val());
        });
    },
    error: function (data) {
      EmployeeMesg.hide();
      console.log(data["error"]);
      $("#errorText").text(data["error"]);
      errorMsg.show();
    },
  });
});

$("#addForm").on("submit", function (event) {
  event.preventDefault();
  console.log("I am here");
  let formData = new FormData(this);
  $.ajax({
    url: "/attendess/Groups/Add/",
    type: "POST",
    dataType: "json",
    contentType: false,
    processData: false,
    data: formData,
    success: function (data) {
      successMsg.show();
      $("#successText").text(data["success"]);
      document
        .getElementById("successMsg")
        .addEventListener("hidden.bs.modal", function (event) {
          groupInfo($("#groupAdd input[name='group_id']").val());
        });
    },
    error: function (data) {
      $("#errorText").text(data["error"]);
      errorMsg.show();
    },
  });
});

$("#groupAdd").on("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(this);
  $.ajax({
    url: "/attendess/Groups/Edit/", // Update the URL endpoint
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      successMsg.show();
      $("#successText").text(data["success"]);
      document
        .getElementById("successMsg")
        .addEventListener("hidden.bs.modal", function (event) {
          groupInfo($("#groupAdd input[name='group_id']").val());
        });
    },
    error: function (error) {
      $("#errorText").text(error["error"]);
      errorMsg.show();
      setTimeout(function () {
        errorMsg.hide();
      }, 3000);
    },
  });
});

$("#EditForm").on("submit", function (event) {
  event.preventDefault();
  let formData = new FormData(this);
  $.ajax({
    url: "/attendess/Groups/Edit/", //Update the URL endpoint
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      $("#successText").text(data["success"]);
      successMsg.show();
      document
        .getElementById("successMsg")
        .addEventListener("hidden.bs.modal", function (event) {
          groupInfo($("#groupAdd input[name='group_id']").val());
        });
    },
    error: function (error) {
      $("#errorText").text(error["error"]);
      console.log(error);
      errorMsg.show();
    },
  });
});


$("#selectAll").on("click", function () {
  $(".employee-checkbox").prop("checked", $(this).prop("checked"));
});
document
  .getElementById("printSelectedBtn")
  .addEventListener("click", function () {
    let selectedEmployees = $(".employee-checkbox:checked");
    if (selectedEmployees.length === 0) {
      alert("الرجاء تحديد موظف واحد على الأقل للطباعة");
    } else {
      print();
    }
  });
