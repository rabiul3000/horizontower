import Swal from "sweetalert2";

export const successAlert = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: message,
    confirmButtonColor: "#3085d6",
  });
};

export const errorAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonColor: "#d33",
  });
};

export const confirmAlert = async (message) => {
  const result = await Swal.fire({
    title: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  return result.isConfirmed;
};
