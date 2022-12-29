import { showMessage } from "react-native-flash-message";

const ShowError = (msg: string) => {
   return showMessage({
      type: 'danger',
      icon: 'danger',
      message: msg,
   })
}

const ShowSuccess = (msg: string) => {
   return showMessage({
      type: 'success',
      icon: 'success',
      message: msg,
   })
}

export {
   ShowError,
   ShowSuccess
}