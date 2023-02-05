import {showMessage} from 'react-native-flash-message';
import {COLOR} from '../constants/constants';

class Notification {
  showSuccessMessage(message, description) {
    showMessage({
      message: message,
      description: description,
      type: 'success',
      autoHide: true,
      duration: 2000,
      icon: 'success',
    });
  }

  showErrorMessage(message, description) {
    showMessage({
      message: message,
      description: description,
      type: 'danger',
      autoHide: true,
      duration: 2000,
      icon: 'danger',
    });
  }

  showWarningMessage(message, description) {
    showMessage({
      message: message,
      description: description,
      type: 'warning',
      autoHide: true,
      duration: 2000,
      icon: 'warning',
    });
  }

  showNotInternetMessage(message, description) {
    showMessage({
      message: message,
      description: description,
      type: 'default',
      autoHide: false,
      backgroundColor: COLOR.mainGray,
      color: COLOR.mainWhite,
    });
  }
}
export default new Notification();
