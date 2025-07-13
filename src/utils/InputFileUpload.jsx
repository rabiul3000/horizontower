import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { FaFileImage } from "react-icons/fa6";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ setImageFile }) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<FaFileImage />}
    >
      Upload Image
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => setImageFile(event.target.files[0])}
        multiple
      />
    </Button>
  );
}
