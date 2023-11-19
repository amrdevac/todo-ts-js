import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LinearProgress, Stack } from "@mui/material";
import { Help, HelpCenter, QuestionMarkRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/RTK/store";
import { triggerConfirmResult } from "@/state/RTK/confirmDialog/confirmDialogSlice";

export default function Confirmation({
  isOpen,
  closeHanlder,
}: {
  isOpen: boolean;
  closeHanlder: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClose = () => closeHanlder(false);
  const dispatch = useDispatch<AppDispatch>()
  const confirmState = useSelector((state: RootState) => state.confirmDialog);
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box className="absolute text-center  bg-white p-4 border-none rounded-lg">
          <Stack gap={2} alignItems={"center"}>
            <Help color="primary" fontSize="large" />
            <Typography variant="body1">{confirmState.confirmText}</Typography>
            <Stack direction={"row"} gap={2}>
              <Button size="small" variant="contained" className="bg-blue-500"
                onClick={() => dispatch(triggerConfirmResult(true))}
              >
                {confirmState.btnOkText}
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleClose}
              >
                {confirmState.btnCancelText}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
