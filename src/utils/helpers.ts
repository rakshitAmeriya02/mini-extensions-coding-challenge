import { toast } from "react-toastify";
import { ERROR_MESSAGES, NOTIFICATION_TYPE } from "./constant";

export const createNotification = (
  type: NOTIFICATION_TYPE,
  message?: string
) => {
  switch (type) {
    case NOTIFICATION_TYPE.SUCCESS:
      toast.success(message);
      break;
    case NOTIFICATION_TYPE.ERROR:
      toast.error(message || ERROR_MESSAGES.GENERIC_ERROR);
      break;
    default:
      toast(message);
      break;
  }
};
