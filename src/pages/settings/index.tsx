import styled from "@emotion/styled";
import { Stack, TextField, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import { useTimerDuration } from "../../services/provider";

export default function Settings() {
  const { state: timerDuration, setTimerDuration } = useTimerDuration();
  const [currentValue, setCurrentValue] = useState(timerDuration);

  const onChange = (ev: any) => {
    setCurrentValue(ev.target.value);
  };
  const onSave = () => {
    setTimerDuration(currentValue);
  };

  return (
    <>
      <SeparatorDiv />
      <Paper>
        <InnerDiv>
          <Stack spacing={1} direction="row">
            <TextField
              label="Change timer duration"
              variant="outlined"
              size="small"
              // fullWidth
              value={currentValue}
              onChange={onChange}
            />
            <Button
              variant="contained"
              onClick={onSave}
              disabled={currentValue == timerDuration || currentValue < 5}
            >
              Save
            </Button>
          </Stack>
        </InnerDiv>
      </Paper>
    </>
  );
}

const SeparatorDiv = styled.div`
  margin-top: 1vh;
`;

const InnerDiv = styled.div`
  padding: 50px;
`;
