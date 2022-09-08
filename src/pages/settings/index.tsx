import { Stack, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useTimerDuration } from "../_shared_/app-context";

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
  );
}
