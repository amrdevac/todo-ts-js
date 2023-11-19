"use client";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";

type defaultType = {
  title: string;
  button?: ButtonProps;
};

export enum buttonPosition {
  left = 0,
  right = 1,
}

export type ButtonProps = {
  position: buttonPosition;
  title: string;
  action: () => void;
};

type Action = {
  button?: ButtonProps;
};

const DefaultHeader = ({ title, button }: defaultType) => {
  const [btnClicked, setBtnClicked] = useState(false);
  const actionButton = ({ button }: Action) => (
    <Button
      variant="outlined"
      onClick={() => button?.action()}
      disabled={btnClicked}
    >
      {btnClicked && (
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <CircularProgress size={20} color="inherit" />
          <Typography variant="body1" color="inherit">
            Loading
          </Typography>
        </Stack>
      )}
      {!btnClicked && button?.title}
    </Button>
  );

  return (
    <div className="flex justify-between " onClick={() => setBtnClicked(true)}>
      {button && button?.position == 0 && actionButton({ button: button })}
      <Typography variant="h5" fontWeight={"bold"} color="initial">
        {title}
      </Typography>
      {button && button?.position != 0 && actionButton({ button: button })}
    </div>
  );
};

export default DefaultHeader;
