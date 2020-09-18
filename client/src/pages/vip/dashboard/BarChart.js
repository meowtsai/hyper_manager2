// @flow
import React from "react";
import { Bar, defaults as ChartjsDefaults, Chart } from "react-chartjs-2";
import { Card, CardBody } from "reactstrap";

const BarChart = ({ data = [] }) => {
  //console.log("data.length", data.length);
  if (data.length === 0) {
    return null;
  }
  // changing chartjs defaults
  ChartjsDefaults.global.defaultFontColor = "#8391a2";
  ChartjsDefaults.scale.gridLines.color = "#8391a2";
  ChartjsDefaults.global.defaultFontFamily =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
  var draw3 = Chart.controllers.bar.prototype.draw;
  Chart.controllers.bar = Chart.controllers.bar.extend({
    draw: function () {
      draw3.apply(this, arguments);
      var ctx = this.chart.chart.ctx;
      var _fill = ctx.fill;
      ctx.fill = function () {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.01)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 5;
        _fill.apply(this, arguments);
        ctx.restore();
      };
    },
  });

  const barChartData = (canvas) => {
    const colorSet = ["#fa5c7c", "#ffce56"];
    const ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 500, 0, 150);
    gradientStroke.addColorStop(0, "#fa5c7c");
    gradientStroke.addColorStop(1, "#727cf5");

    const allDates = [...new Set((data || []).map((item) => item.udate))];
    const allGamesId = [...new Set((data || []).map((item) => item.game_id))];

    // console.log("allDates", allDates);
    // console.log("allGamesId", allGamesId);
    // const alldate2 = [...new Set(allDates)];
    // const finalData = alldate2.map((d) => {
    //   const dobj = h55data.filter((item) => item.udate === d)[0];
    //   console.log("d", dobj);
    //   if (dobj) {
    //     return { x: dobj.udate, y: dobj.amount };
    //   } else {
    //     return { x: d, y: 0 };
    //   }
    // });
    // console.log(finalData);

    // return {
    //   labels: allDates,
    //   datasets: allGamesId.map((value, index) => ({
    //     label: data.filter((item) => item.game_id === value)[0].game_name,
    //     backgroundColor: colorSet[index],
    //     borderColor: gradientStroke,
    //     hoverBackgroundColor: colorSet[index],
    //     hoverBorderColor: gradientStroke,
    //     data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81],
    // }))}

    return {
      labels: allDates,
      datasets: allGamesId.map((value, index) => ({
        label: data.filter((item) => item.game_id === value)[0].game_name,
        backgroundColor: colorSet[index],
        borderColor: gradientStroke,
        hoverBackgroundColor: colorSet[index],
        hoverBorderColor: gradientStroke,
        data: allDates.map((d) => {
          const dobj = data
            .filter((d) => d.game_id === value)
            .filter((item) => item.udate === d)[0];
          return dobj ? dobj.amount : 0;
        }),
        // data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81],
      })),
    };
  };

  // options
  const barChartOpts = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#727cf5",
      titleFontColor: "#fff",
      bodyFontColor: "#fff",
      bodyFontSize: 14,
      displayColors: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
            color: "rgba(0,0,0,0.05)",
          },
          stacked: false,
          ticks: {
            stepSize: 50000,
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 0.7,
          categoryPercentage: 0.5,
          stacked: false,
          gridLines: {
            color: "rgba(0,0,0,0.01)",
          },
        },
      ],
    },
  };

  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">VIP 過去30日訂單金額</h4>

        <div style={{ height: "320px" }} className="chartjs-chart">
          <Bar data={barChartData} options={barChartOpts} />
        </div>
      </CardBody>
    </Card>
  );
};

export default BarChart;
