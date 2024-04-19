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
      row.append($("<td>", { text: employee.job_place__name }));

      // Append the buttons to the row
      row.append($("<td>").append($("<a>", {
                class: "btn bg-navy ",
                href: `/hr/Employee/holiday/${employee.id}`,
                text: "إضافة اجازة",
              })));
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
  var theType = $("#type").val();
  let data ;
  if (theType === 2) {
    data = {national_number : $("#searchBar").val(),page :page};
  } else {
    data={ name : $("#searchBar").val(),national_number:null,page :page};
  }
  $.ajax({
    url: "",
    type: "GET",
    dataType: "json",
    data: data, // Include the page number
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
      row.append($("<td>", { text: "هناك خطأ اثناء جلب البيانات " }));
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
$(".default_option").click(function () {
  $(".dropdown ul").addClass("active");
});

$(".dropdown ul li").click(function () {
  var text = $(this).text();;
  $("#searchBar").attr("type",$(this).val() == 2 ?"number":"text");
  $(".default_option").text(text);
  $(".dropdown ul").removeClass("active");
});

let backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  $(".d-print-table-row").hide();
  $("#searchBar").val("");
  $("#backBtn").hide();
});
