$(document).ready(function() {

  $(function () {

    console.log(Date.parse('15 Jun 2018 16:00:00 GMT-0000'));

    /*var data1 = [0, 0, 0, 0, 0, 17000, 17500, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 44000, 46000, 48000, 50000, 52000, 54000, 56000, 58000, 60000, 62000, 64000, 66000, 68000, 70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 88000, 90000, 92000, 94000, 96000, 98000, 100000, 102000, 104000, 106000, 108000, 110000];*/

    /* 1529020800000 - 15 июня 2018 00:00 */
    var data1 = [
      [1529038800000, 17000],
      [1529042400000, 17500],
      [1529046000000, 30000],
      [1529049600000, 32000],
      [1529053200000, 39000],
      [1529107199000, 120000]
    ];

    var dataPlanValue = 100000; // План
    var dataPlan = [dataPlanValue, dataPlanValue];

    Highcharts.setOptions({
      chart: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 0,
        plotBackgroundColor: 'rgba(255, 255, 255, 1)',
        plotShadow: false,
        plotBorderWidth: 0
      }
    });

    var chart2 = new Highcharts.Chart({
      chart: {
        renderTo: 'container',
        type: 'column'
      },

      title: {
        text: 'Скважина 1-1'
      },

      tooltip: {
        borderWidth: 2,
        backgroundColor: '#eeeeee',
        borderRadius: 2,
        dtaTimeLabelFormat: 'hour',
        enable: false
      },

      legend: 'fd',

      xAxis: {
        type: 'datetime',
        tickInterval: 2 * 3600 * 1000
      },

      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value} m',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        tickWidth: 6,
        minorTickInterval: 20 * 1000,
        title: {
          text: 'Дебит',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
        }, { // Secondary yAxis
        title: {
          text: 'Rainfall',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        labels: {
          format: '{value} mm',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }],

      plotOptions: {
        spline: {
          lineWidth: 3,
          states: {
            hover: {
              lineWidth: 3
            }
          },
          marker: {
            enabled: false
          },
          pointInterval: 3600000, // one hour
        }
      },

      series: [{
        name: 'Добыто (час)',
        data: [0, 0, 0, 0, 0, 17000, 1000, 16500, 17000, 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        type: 'column',
        color: '#88ee77',
        y: 0,
        pointStart: Date.UTC(2018, 5, 15),
        pointInterval: 3600 * 1000, // one hour
        tooltip: {
          valueSuffix: ' тыс.м'
        }

      }, {
        name: 'Добыто (сутки)',
        type: 'spline',
        dashStyle: 'ShortDot',
        color: '#ee8822',
        lineWidth: 3,
        data: data1,

        pointStart: Date.UTC(2018, 5, 15),
        pointInterval: 3600 * 1000, // one hour
        zoneAxis: 'x',
        zones: [{
            value: Date.UTC(2018, 5, 15, 9),
            color: '#bb44bb',
            dashStyle: 'solid'
        }]
      }, {
        name: 'План (сутки)',
        type: 'spline',
        dashStyle: 'solid',
        color: '#66aaff',
        lineWidth: 3,
        data: dataPlan,

        pointStart: Date.UTC(2018, 5, 15),
        pointInterval: 3600 * 1000 * 24, // one hour
        zoneAxis: 'x'
      }],

      dateformat: {
         millisecond: '%H:%M:%S.%L'
      }
    });

  /* --- */

  // Устанавливаем план добычи
  var planPush = function() {
    dataPlanValue = document.querySelector('#plan').value;
    chart2.series[2].data[0].update(+dataPlanValue);
    chart2.series[2].data[1].update(+dataPlanValue);
  }

  // Устанавливаем время для новой точки
  var timeSetup = function() {


    //var msUTC = Date.parse('2018-06-15T13:51:50.417Z');
    //console.log(msUTC);
  }

  // Добавляем точку добычи за сутки
  var minedDaySetClickHandler = function(e) {
    e.preventDefault();
    var minedDay = document.querySelector('#mined').value;

    var timeHour = document.querySelector('#timeHour').value;

    // Если число меньше 10, то подставляем первый нуль, иначе ошибка в формате UTC
    if(timeHour < 10) {
      timeHour = '0' + timeHour;
    }
    if(timeHour > 23) {
      timeHour = '23';
    }

    var timeMinute = document.querySelector('#timeMinute').value;
    if(timeMinute < 10) {
      timeMinute = '0' + timeMinute;
    }
    if(timeMinute > 59) {
      timeMinute = '59';
    }

    console.log(timeHour);
    var ms = '2018-06-15T' + timeHour + ':33:00.000Z'
    console.log('ms: ' + ms);
    var msUTC = Date.parse(ms);
    console.log('msUTC: ' + msUTC);

    var newPoint = [msUTC, +minedDay]; // Новая точка
    console.log(newPoint);
    for (var i = 0; i < data1.length; i++) {
      var t = data1[i][0];
      if(msUTC < t) {
        // data1.splice(i, 0, newPoint); // С позиции i удалить 0
        console.log('i: ' + (i-1));
        console.log(data1);
        chart2.series[1].data[i-1].update(newPoint);
        return;
      }
      //console.log(t);
    }
    //chart2.series[1].data[15].update(+minedDay);
    planPush();
    timeSetup();

    var date = new Date();
    date.toISOString();
    //console.log(date);
  }

  var minedDateSetClickHandler = function(e) {
    e.preventDefault();
    //var minedDate = document.querySelector('#mined-date').value;

    //chart2.series[1].data[15].y = minedDate;

  }

  var dataGetBtn = document.querySelector('.data-get-btn'); // Кнопка записи данных

  dataGetBtn.addEventListener('click', minedDaySetClickHandler);
  dataGetBtn.addEventListener('click', minedDateSetClickHandler);

  });



  $( '.datepicker' ).datepicker({
    inline: true
  });

});
