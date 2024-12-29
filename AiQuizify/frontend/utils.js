
import { toast } from 'react-toastify';

export const handleSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000, // 3 seconds duration
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}
