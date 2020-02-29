(function(jQuery){

  // start: Chart =============

  Chart.defaults.global.pointHitDetectionRadius = 1;
  Chart.defaults.global.customTooltips = function(tooltip) {

    var tooltipEl = $('#chartjs-tooltip');

    if (!tooltip) {
      tooltipEl.css({
        opacity: 0
      });
      return;
    }

    tooltipEl.removeClass('above below');
    tooltipEl.addClass(tooltip.yAlign);

    var innerHtml = '';
    if (undefined !== tooltip.labels && tooltip.labels.length) {
      for (var i = tooltip.labels.length - 1; i >= 0; i--) {
        innerHtml += [
          '<div class="chartjs-tooltip-section">',
          '   <span class="chartjs-tooltip-key" style="background-color:' + tooltip.legendColors[i].fill + '"></span>',
          '   <span class="chartjs-tooltip-value">' + tooltip.labels[i] + '</span>',
          '</div>'
        ].join('');
      }
      tooltipEl.html(innerHtml);
    }

    tooltipEl.css({
      opacity: 1,
      left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
      top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
      fontFamily: tooltip.fontFamily,
      fontSize: tooltip.fontSize,
      fontStyle: tooltip.fontStyle
    });
  };
  var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
  };
  var lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      fillColor: "rgba(21,186,103,0.4)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(66,69,67,0.3)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [18,9,5,7,4.5,4,5,4.5,6,5.6,7.5]
    }, {
      label: "My Second dataset",
      fillColor: "rgba(21,113,186,0.5)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [4,7,5,7,4.5,4,5,4.5,6,5.6,7.5]
    }]
  };

})(jQuery);
