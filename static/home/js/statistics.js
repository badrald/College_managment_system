// charts.js


new Chart(document.getElementById("bar-chart"), {
  type: "bar",
  data: {
    labels: ["المستمرون", "المنقطعون"],
    datasets: [
      {
        label: " الحضور و الغياب",
        backgroundColor: ["#3e95cd", "#8e5ea2"],
        data: Bar_chart_data,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "احصائيات الحظور و الغياب",
    },
  },
});


// Specializations Chart
var labels = specializations.map(item => item.label);
var dataValues = specializations.map(item => item.value);
var ctxL = document.getElementById("lineChart1").getContext('2d');
var myLineChart = new Chart(ctxL, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: "التخصصات",
      data: dataValues,
      backgroundColor: ['#176BA0'],
      borderColor: ['#176BA0'],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true
  }
});

// ... (other chart configurations)
  var ctxL = document.getElementById("lineChart2").getContext('2d');
  var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
      labels: ["الدكتوراه", "الماجستير", "البكالوريوس", "الدبلوم العالي", "دبلوم المتوسط", "شهادة الثانوية", 'غير ذالك'],
      datasets: [{
        label: "الشهادات",
        data: line_Chart_data,
  backgroundColor: [
    '#f46a9b',
  ],
    borderColor: [
      '#f46a9b',
    ],
      borderWidth: 2
          },
          ]
        },
  options: {
    responsive: true
  }});
  new Chart("gender", {
    type: "doughnut",
    data: {
      labels: ["إناث", "ذكور"],
      datasets: [
        {
          backgroundColor: ['#FF00FF','#00FFFF'],
          data: gender_data,
        },
      ],
    },
    options: {
      title: {
        display: true,
      },
    },
  });

// Job Places Chart
var jobLabels = jobPlacesData.map(item => item.label);
var jobDataValues = jobPlacesData.map(item => item.value);
var jobBackgroundColors = jobPlacesData.map((item, index) => item.backgroundColor);
new Chart(document.getElementById("job_place"), {
  type: 'pie',
  data: {
    labels: jobLabels,
    datasets: [{
      label: "اماكن العمل",
      backgroundColor: jobBackgroundColors,
      data: jobDataValues
    }]
  },
  options: {
    title: {
      display: true,
      text: 'المراكز الصحية قصر بن غشير'
    }
  }
});
