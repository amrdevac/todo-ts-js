import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, Skeleton, Stack } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ModalCustom({
  showModal,
  modalIcon,
  modalText = "loading",
  btnCloseModal = true,
  closeHanlder
}: {
  showModal: boolean;
  modalText?: string;
  modalIcon: JSX.Element;
  btnCloseModal?: boolean;
  closeHanlder: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = React.useState(showModal);
  React.useEffect(() => {
    setOpen(showModal);
  }, [showModal]);
  const handleClose = () => closeHanlder(false);

  return (


    <div>
      <Modal
        disableEscapeKeyDown
        disableEnforceFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack alignItems={"center"} spacing={1}>
            <Typography variant="body1" color="initial">
              Informasi
            </Typography>
            {modalIcon}
            <Typography variant="body1" color="initial">
              {modalText}
            </Typography>
            {btnCloseModal &&
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleClose}
              >
                Ok
              </Button>
            }
          </Stack>
        </Box>
      </Modal>
    </div >
  );
}
