import styled from "@emotion/styled";
import ReactECharts from "echarts-for-react";
import { useTodos } from "../_shared_/app-context";

export default function Stats() {
  const { state } = useTodos();

  if (state.completedTodos.length == 0) {
    return (
      <WrapperDiv>
        You didn&apos;t finished any todos today. What are you waiting for?
      </WrapperDiv>
    );
  }

  return <ReactECharts option={getOption(state.completedTodos)} />;
}

const WrapperDiv = styled.div`
  text-align: center;
`;

function getOption(todos: any[]) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const series = buildSeries(days, todos);

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
      data: days,
    },
    series,
  };

  function buildSeries(days: string[], todos: any[]) {
    const currentDay = new Date().getDay();
    return todos.map((t) => {
      return {
        name: t.todo,
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: days.map((d, dayIndex) =>
          dayIndex === currentDay - 1 ? t.completed : 0
        ),
      };
    });
  }
}
