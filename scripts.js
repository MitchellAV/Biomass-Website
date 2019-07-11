  let jsonData;
  let data = Array(Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array(), Array());
  $(document).ready(function() {
    $.getJSON("/query.php", function(json) {
      console.log(json);
      jsonData = json;

      for (var i = 0; i < json.length; i++) {
        data[0][i] = json[i].id;
        data[1][i] = json[i].timedata;
        data[2][i] = json[i].ambTemp;
        data[3][i] = json[i].tankTemp;
        data[4][i] = json[i].adTemp;
        data[5][i] = json[i].cfm;
        data[6][i] = json[i].massFlow;
        data[7][i] = json[i].irradiance;
        data[8][i] = json[i].ph;
        data[9][i] = json[i].rpm;
        data[10][i] = json[i].tankErr;
        data[11][i] = json[i].adErr;
      }

      console.log(data);
      var title = "Temp Data";
      var config = genTempChart(data[1], data[2], data[3], data[4]);
      console.log(config);
      var ctx0 = document.getElementById('tempChart').getContext('2d');
      var tempGraph = new Chart(ctx0, config);
      title = "Irradiance Data";
      config = generateChart(title, data[1], data[7]);
      ctx1 = document.getElementById('irrChart').getContext('2d');
      var irrGraph = new Chart(ctx1, config);
      title = "Mass Flow Rate Data";
      config = generateChart(title, data[1], data[6]);
      ctx2 = document.getElementById('flowChart').getContext('2d');
      var irrGraph = new Chart(ctx2, config);
      title = "PH Data";
      config = generateChart(title, data[1], data[8]);
      ctx3 = document.getElementById('phChart').getContext('2d');
      var irrGraph = new Chart(ctx3, config);
      title = "Mixer Data";
      config = generateChart(title, data[1], data[9]);
      ctx4 = document.getElementById('mixerChart').getContext('2d');
      var irrGraph = new Chart(ctx4, config);

      let $timedata = data[1][data[1].length - 1];
      let $ambTemp = data[2][data[1].length - 1];
      let $tankTemp = data[3][data[1].length - 1];
      let $adTemp = data[4][data[1].length - 1];
      let $cfm = data[5][data[1].length - 1];
      let $massFlow = data[6][data[1].length - 1];
      let $irradiance = data[7][data[1].length - 1];
      let $ph = data[8][data[1].length - 1];
      let $rpm = data[9][data[1].length - 1];

      $(".amb").append($ambTemp + " C");
      $(".tank").append($tankTemp + " C");
      $(".ad").append($adTemp + " C");
      $(".irradiances").append($irradiance + " W/m^2");
      $(".cfm").append($cfm);
      $(".massflow").append($massFlow + " g/s");
      $(".phs").append($ph);
      $(".rpm").append($rpm);
    });

    $(".button").click(function() {
      $("#visual").children().addClass("hidden");
      var el = this.classList[0];
      console.log(el);
      $("#" + el).removeClass("hidden");
    });


  });


  function genTempChart(xValues, ambTemp, tankTemp, adTemp) {
    var config = {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [{
          label: "Ambient Temp",
          data: ambTemp,
          borderColor: [
            // COLORS[getRandomInt(COLORS.length)]
            //'rgba(200,30,30,.3)'
            '#01cdfe'
          ],
          backgroundColor: [
          '#01cdfe'
          ],
          fill: false,
          pointRadius: 0
        }, {
          label: "Storage Tank Temp",
          data: tankTemp,
          borderColor: [
            // COLORS[getRandomInt(COLORS.length)]
            //  'rgba(30,200,30,.3)'
            '#05ffa1'

          ],
          backgroundColor: [
          '#05ffa1'
        ],
          fill: false,
          pointRadius: 0
        }, {
          label: "AD Temp",
          data: adTemp,
          borderColor: [
            // COLORS[getRandomInt(COLORS.length)]
            //'rgba(30,30,200,.3)'
            '#b967ff'
          ],
          backgroundColor: [
            '#b967ff'
          ],
          fill: false,
          pointRadius: 0
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive: false,
        maintainAspectRatio: true,
        elements: {
          line: {
            tension: 0,
          },
          point: {
            hitRadius: 0,
            hoverRadius: 0
          }
        },
        spanGaps: true,

        tooltips: {
          mode: 'index',
          intersect: false
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Temp (C)'
            }
          }]
        }
      }
    };

    return config;
  }


  function generateChart(title, xValues, yValues) {
    var config = {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [{
          label: title,
          data: yValues,
          backgroundColor: [
            'rgba(30, 30, 30, 0.1)'
          ],
          borderColor: [
            // COLORS[getRandomInt(COLORS.length)]
            'rgba(30,30,30,.3)'
          ],
          fill: true
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive: false,
        maintainAspectRatio: true,
        elements: {
          line: {
            tension: 0,
          },
          point: {
            hitRadius: 0,
            hoverRadius: 0
          }
        },
        spanGaps: true,

        tooltips: {
          mode: 'index',
          intersect: false
        },

        // scales: {
        //   xAxes: [{
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Episodes'
        //     }
        //   }],
        //   yAxes: [{
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Ratings'
        //     }
        //   }]
        // }
      }
    };
    // for (var i = 1; i < yValues.lenth; i++) {
    //   config.data.datasets.push(yValues[i]);
    // }
    return config;
  }

  function fillArrayWithNumbers(n) {
    var arr = Array.apply(null, Array(n));
    return arr.map(function(x, i) {
      return i
    });
  }
