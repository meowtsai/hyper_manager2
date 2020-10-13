import React from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";
const AgeGroupsBarChart = ({ data = [] }) => {
  //console.log(data);
  if (data.length === 0) {
    return null;
  }
  const apexBarChartOpts = {
    chart: {
      height: 380,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 0,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
      formatter: function (val, opts) {
        return val + "人";
      },
    },
    colors: ["#6CACDE", "#F3913E", "#38B638"],
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },

    xaxis: {
      categories: [
        "年齡<18",
        "年齡18-25",
        "年齡26-35",
        "年齡36-45",
        "年齡46-55",
        "年齡56-65",
        "年齡65+",
      ],
    },
    legend: {
      offsetY: -10,
    },
    states: {
      hover: {
        filter: "none",
      },
    },
    grid: {
      borderColor: "#f1f3fa",
    },
  };

  const apexBarChartData = data.map((d) => {
    let item = {};
    if (d.gender === "m") {
      item.name = "男性";
    } else if (d.gender === "f") {
      item.name = "女性";
    } else {
      item.name = "中性";
    }
    item.data = [
      d["18-"],
      d["18-25"],
      d["26-35"],
      d["36-45"],
      d["46-55"],
      d["56-65"],
      d["65+"],
    ];
    return item;
  });

  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">VIP儲值用戶性別年齡分布</h4>
        <Chart
          options={apexBarChartOpts}
          series={apexBarChartData}
          type="bar"
          className="apex-charts"
        />
      </CardBody>
    </Card>
  );
};

export default AgeGroupsBarChart;
