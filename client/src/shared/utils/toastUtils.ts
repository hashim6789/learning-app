import { toast, ToastOptions, Id } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  },
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  },
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  },
  confirm: (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const confirmId: Id = toast.warn(message, {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        onOpen: () => {
          const confirmButton = document.createElement("button");
          confirmButton.innerText = "Confirm";
          confirmButton.style.marginRight = "10px";
          confirmButton.onclick = () => {
            toast.dismiss(confirmId);
            resolve(true);
          };

          const cancelButton = document.createElement("button");
          cancelButton.innerText = "Cancel";
          cancelButton.onclick = () => {
            toast.dismiss(confirmId);
            resolve(false);
          };

          const toastElement = document.getElementById(`${confirmId}`);
          if (toastElement) {
            toastElement.appendChild(confirmButton);
            toastElement.appendChild(cancelButton);
          }
        },
      });
    });
  },
};
