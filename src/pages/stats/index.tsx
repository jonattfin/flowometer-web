import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { generateCountriesData, sets } from "@nivo/generators";
import styled from "@emotion/styled";
import { NoSsr } from "@mui/material";

const keys = ["hot dogs", "burgers", "sandwich", "kebab", "fries", "donut"];
const commonProps = {
  margin: { top: 60, right: 110, bottom: 60, left: 80 },
  data: generateCountriesData(keys, { size: 7 }),
  indexBy: "country",
  keys,
  padding: 0.2,
  labelTextColor: "inherit:darker(1.4)",
  labelSkipWidth: 16,
  labelSkipHeight: 16,
};

export default function Stats() {
  return (
    <ParentContainer>
      <GraphContainer>
        <NoSsr>
          <ResponsiveBar {...commonProps} />
        </NoSsr>
      </GraphContainer>
    </ParentContainer>
  );
}

const GraphContainer = styled.div`
  height: 50vh;
  width: 50vw;
`;

const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
