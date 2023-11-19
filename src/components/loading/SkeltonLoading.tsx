import { Skeleton } from "@mui/material";

const SkeltonLoading = ({ showSkelton }: { showSkelton: boolean }) => {
  if (showSkelton) {
    return (
      <Skeleton
        sx={{ bgcolor: "grey.500", marginTop: 4 }}
        variant="rounded"
        width={"100%"}
        height={300}
      />
    );
  }
};

export default SkeltonLoading;
