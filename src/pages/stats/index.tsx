import styled from "@emotion/styled";
import ReactECharts from "echarts-for-react";
import { random } from "lodash";

export default function Stats() {
  return <ReactECharts option={getOption()} />;
}

function buildData() {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}

function buildSeries() {
  const tasks = [
    { name: "x", count: 10 },
    { name: "y", count: 5 },
    { name: "z", count: 4 },
  ];

  function getData() {
    const data = buildData();
    return data.map(() => random(50, 300));
  }

  return tasks.map((t) => {
    return {
      name: t.name,
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: getData(),
    };
  });
}

function getOption() {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: buildData(),
    },
    series: buildSeries(),
  };
}
