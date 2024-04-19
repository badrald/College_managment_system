function updateRowClass() {
  $("#tbody tr").each(function () {
    const checkbox = $(this).find(".employee-checkbox");
    if (!checkbox.prop("checked")) {
      $(this).addClass("d-print-none");
    } else {
      $(this).removeClass("d-print-none");
    }
  });
}

jQuery(function () {
  $("#loader").hide();
  $("#notFound").hide();
  $("#menuLink").click();
  $(".d-print-table-row").hide();
  $("#backBtn").hide();
});
function updateRowClass() {
  $("#tbody tr").each(function () {
    const checkbox = $(this).find(".employee-checkbox");
    if (!checkbox.prop("checked")) {
      $(this).addClass("d-print-none");
    } else {
      $(this).removeClass("d-print-none");
    }
  });
}

function updateTable(data) {
  $("#tbody").empty();
  $("#loader").show();
  if (data.data.length === 0) {
    $("#notFound").show();
  } else {
    $("#notFound").hide();

    $.each(data.data, function (index, employee) {
      let row = $("<tr>");
      // Append the cells to the row using jQuery chaining
      row.append(
        $("<td>").append(
          $("<input>", {
            type: "checkbox",
            class: "employee-checkbox d-print-none",
          })
        )
      );
      row.append($("<td>", { text: employee.name }));
      row.append($("<td>", { text: employee.national_number }));
      row.append(
        $("<td>", { text: employee.nationality, class: "d-print-none" })
      );
      row.append($("<td>", { text: employee.qualification }));
      row.append($("<td>", { text: employee.specialization }));
      row.append($("<td>", { text: employee.graduation_date }));
      row.append($("<td>", { text: employee.date_start }));
      row.append($("<td>", { text: employee.job_place__name }));
      row.append(
        $("<td>", { text: employee.appointment_record, class: "d-print-none" })
      );
      row.append($("<td>", { text: employee.degree, class: "d-print-none" }));
      row.append(
        $("<td>", { text: employee.folder_number, class: "d-print-none" })
      );

      row.append(
        $("<td>", {
          class: "text-center",
          text: employee.attendees ? "نعم" : "لا",
        })
      );
      row.append($("<td>", { text: employee.note }));
      // Append the buttons to the row
      row.append(
        $("<td>").append(
          $("<div>").append(
            $("<button>", {
              class: "btn  bg-navy dropdown-toggle d-print-none",
              type: "button",
              id: `actionsDropdown${employee.id}`,
              "data-bs-toggle": "dropdown",
              "aria-haspopup": "true",
              "aria-expanded": "false",
              text: "الإجراءات",
            }),
            $("<div>", {
              class: "dropdown-menu",
              "aria-labelledby": `actionsDropdown${employee.id}`,
            }).append(
              $("<a>", {
                class: "dropdown-item",
                href: `Employee/edit/${employee.id}`,
                text: "تعديل",
              }),
              $("<a>", {
                class: "dropdown-item",
                href: `Employee/print_page/${employee.id}`,
                text: "طباعة",
              }),
              $("<a>", {
                class: "dropdown-item",
                onclick: delete_view(employee.id, employee.name),
                "data-bs-toggle": "modal",
                "data-bs-target": "#message",
                text: "حذف",
              }),
              $("<a>", {
                class: "dropdown-item",
                href: `Employee/view_pdf/${employee.id}`,
                text: "المستندات",
              }),
              $("<a>", {
                class: "dropdown-item",
                href: `Employee/holiday/${employee.id}`,
                text: "الاجازات",
              }),
              $("<a>", {
                class: "dropdown-item",
                href: `Employee/employee_card/${employee.id}`,
                text: "بطافة الوظيفية",
              }),
              $("<a>", {
                class: "dropdown-item",
                href: `Employee/job_placement/Show/${employee.id}`,
                text: "رسالة تنسيب",
              }),
              $("<a>", {
                class: "dropdown-item",
                href: `/hr/job_placement/Edit/${employee.job_placement__id}`,
                text: "تعديل رسالة تنسيب",
              })
            )
          )
        )
      );
      row.append($("</tr>"));
      row.appendTo("#tbody");
    });

    // Update row visibility
    updateRowClass();
  }
}

function updatePagination(hasNext, hasPrev, page) {
  var pagination = $("#pagination");
  pagination.empty();

  if (hasPrev) {
    pagination.append(
      '<a href="#" class="page-link d-print-none" id="prevPage">السابق</a>'
    );
  }

  if (hasNext) {
    pagination.append(
      '<a href="#" class="page-link d-print-none" id="nextPage">التالي</a>'
    );
  }

  // Handle the click events for pagination links
  $("#prevPage").on("click", function () {
    fetchPage(page - 1);
  });

  $("#nextPage").on("click", function () {
    fetchPage(page + 1);
  });
}

function fetchPage(page) {
  $("#loader").show();
  $("#tbody").empty();
  var theType = document.getElementById("type").textContent;
  let national_number, name;
  if (theType === "الرقم الوطني") {
    name = null;
    national_number = $("#searchBar").val();
  } else {
    name = $("#searchBar").val();
    national_number = null;
  }
  let healthCenter = $("#id_job_place").val();
  console.log(healthCenter)
  $.ajax({
    url: "search",
    type: "GET",
    dataType: "json",
    data: { name: name, national_number: national_number,job_place:healthCenter, page: page }, // Include the page number
    success: function (data) {
      setTimeout(function () {
        updateTable(data);
        updatePagination(data.has_next, data.has_prev, page);
        $("#loader").hide();
        $("#tbody").show();
      }, 1000);
    },
    error: function (error) {
      console.error("Error fetching data:", error);
      let row = $("<tr>");
      row.append($("<td>", {colspan:28, text: "هناك خطأ اثناء جلب البيانات " }));
      $("#tbody").append(row);
      $("#loader").hide();
      $("#tbody").show();
    },
  });
}

$("#searchForm").on("submit", function (e) {
  e.preventDefault();
  $("#tbody").empty();
  $("#tbody").hide();
  $("#loader").show();
  var page = 1;
  fetchPage(page);
  $(".d-print-table-row").show();
  $("#backBtn").show();
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
      updateRowClass();
      print();
    }
  });
$(".default_option").on('click',function () {
  $(".dropdown ul").addClass("active");
});

$(".dropdown ul li").on('click',function () {
  var text = $(this).text();
  $("#searchBar").attr("type", $(this).val() == 2 ? "number" : "text");
  $(".default_option").text(text);
  $(".dropdown ul").removeClass("active");
});

let backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  $(".d-print-table-row").hide();
  $("#searchBar").val("");
  $("#backBtn").hide();
});


function delete_view(id, name){
  $("#message .modal-body p").text(`سيتم حذف الموظف ${name} هل انت متأكد `);
  $("#deleteEmployee input[name='id']").val(id);

  
}

$("#deleteEmployee").on("submit", function (event) {
  event.preventDefault();
  let form = new FormData(this);
  $.ajax({
    url: `/hr/Employee/delete/${$('#message input[name="id"]').val()}`,
    method: "POST",
    data: form,
    contentType: false,
    processData: false,
    success: function (data) {
      message.hide();
      $("#successMsg .modal-body p").text(data["success"]);
      successMsg.show();
      $("#successMsg").on("hidden.bs.modal", function (event) {
        fetchPage(1);
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