const successMsg = new bootstrap.Modal(document.getElementById("successMsg"));
  const errorMsg = new bootstrap.Modal(document.getElementById("errorMsg"));
  const message = new bootstrap.Modal(document.getElementById("message"));
  const holidEditForm = new bootstrap.Modal(document.getElementById("holidayEditForm"));

  $("#holidays_taken").val(100 - total)
  let myForm = document.getElementById('id_date_end')
  myForm.addEventListener('change', function () {
    let start_date = new Date(document.getElementById('id_date_start').value)
    let end_date = new Date(document.getElementById('id_date_end').value)
    let difference = end_date.getTime() - start_date.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    let restDays = document.getElementById("restDays");
    TotalDays = total - TotalDays;
  if (TotalDays >= 0) {
    $("#submitBtn").show();
    $("#holidays_taken").val(TotalDays);
    $("#left").val(TotalDays);
    restDays.innerText = "";
  }
  else {
    restDays.innerText = "ليس هناك عدد ايام كافي "
    $("#submitBtn").hide();
  }
}
  );
  $("#id_goverment_holiday").on("change", function () {
    $("#holidays_taken").val(0);
    $("#left").val(0);
  })
  function edit_holiday(holiday_id, info) {
    let data = info.children;
    $("#TotalDays2").val(data[5].innerText)
    $("#EditForm input[name='holiday_edit_id']").val(holiday_id);
    $("#EditForm select[name='holiday_type'] :selected").val(data[1].innerText).text(data[1].innerText);
    $("#EditForm input[name='start_date']").val(data[2].innerText);
    $("#EditForm input[name='end_date']").val(data[3].innerText);
    $("#EditForm input[name='holiday_note']").val(data[8].innerText);
    $("#EditForm input[name='left_days']").val(data[6].innerText);
    holidEditForm.show();
  }


  $("#EditForm input[name='end_date']").on("change", function (e) {
    let start_date = new Date($("#EditForm input[name='start_date']").val())
    let end_date = new Date($("#EditForm input[name='end_date']").val())
    let difference = end_date.getTime() - start_date.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    let restDays = document.getElementById("restDays2");
    TotalDays = $("#TotalDays2").val() - TotalDays;
    if (TotalDays >= 0) {
      $("#submitBtn2").show();
      $("#left_days").val(TotalDays);
      restDays.innerText = "";
    }
    else {
      restDays.innerText = "ليس هناك عدد ايام كافي "
      $("#submitBtn2").hide();
    }
  }
  )



  function delete_holiday(holiday_id) {
    let formData = new FormData();
    formData.append("delete", "delete");
    formData.append("holiday_id", holiday_id);
    console.log(formData);
    message.show();
    $("#confirmButton").on("click", e => {
      $.ajax({
        url: `/hr/Employee/holiday/${id}`,
        data: formData,
        type: "POST",
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
          var errorData = JSON.parse(data.responseText);
          $("#errorMsg .modal-body p").text(errorData["error"]);
          errorMsg.show();
        },
      });
    })
  }
  $("#EditForm").on("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    $.ajax({
      url: `/hr/Employee/holiday/${id}`,
      data: formData,
      type: 'POST',
      processData: false,
      contentType: false,
      success: function (data) {
        $("#successMsg .modal-body p").text(data['success'])
        successMsg.show();
        $("#successMsg").on("hidden.bs.modal",function(event){
          location.reload();
        })
      }, error: function (data) {
        var errorData = JSON.parse(data.responseText);
        $("#errorMsg .modal-body p").text(errorData['error']);
        errorMsg.show();
      }
    })
  })
  $("#add_Holiday").on("submit", function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    $.ajax({
      url: `/hr/Employee/holiday/${id}`,
      data: formData,
      type: 'POST',
      processData: false,
      contentType: false,
      success: function (data) {
        $("#successMsg .modal-body p").text(data['success'])
        successMsg.show();
        $("#successMsg").on("hidden.bs.modal",function(event){
          location.reload();
        })
      }, error: function (data) {
        var errorData = JSON.parse(data.responseText);
        $("#errorMsg .modal-body p").text(errorData['error']);
        errorMsg.show();
      }
    })
  })