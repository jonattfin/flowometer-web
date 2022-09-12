import styled from "@emotion/styled";
import { Button, Stack } from "@mui/material";
import { padStart } from "lodash";
import {
  ActionType,
  TimerState,
} from "../../../services/reducers/timer-reducer";

export type TimerProps = {
  currentTodo: string;
  minutes: number;
  seconds: number;
  newState: ActionType;
  timerState: TimerState;
  onClick: () => void;
  onPause: () => void;
  onResume: () => void;
};

export default function TimerComponent(props: TimerProps) {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <TimeWrapperDiv>{`${format(props.minutes)} : ${format(
        props.seconds
      )}m`}</TimeWrapperDiv>
      <TitleWrapperDiv>{`Current todo: ${
        props.currentTodo || "N/A"
      }`}</TitleWrapperDiv>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={props.onClick}
          disabled={props.currentTodo === undefined}
        >
          {props.newState}
        </Button>

        {props.timerState == TimerState.Started && (
          <Button variant="contained" onClick={props.onPause}>
            Pause
          </Button>
        )}
        {props.timerState == TimerState.Paused && (
          <Button variant="contained" onClick={props.onResume}>
            Resume
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

// styled components

const TimeWrapperDiv = styled.div`
  font-size: 5em;
`;

const TitleWrapperDiv = styled.div`
  font-size: 1em;
`;

// helpers

function format(value: number) {
  return padStart(value.toString(), 2, "0");
}
