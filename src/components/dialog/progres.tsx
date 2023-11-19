import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LinearProgress, Stack } from "@mui/material";

export default function ProgressDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box className="absolute text-center  bg-white p-4 border-none rounded-lg  w-2/6">
          <Stack gap={1}>
            <LinearProgress></LinearProgress>
            <Typography variant="body1" className="italic" >
              Loading
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
