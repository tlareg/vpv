import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';

const defaultSwalConfig = {
  animation: false
};

class ConfirmationHelper {
  constructor() {}

  confirmAction() {
    return swal(Object.assign({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }, defaultSwalConfig));
  }

  confirmError(title) {
    return swal(Object.assign({
      title: title || 'Error',
      type: 'error',
      confirmButtonText: 'OK'
    }, defaultSwalConfig));
  }
}

const confirmationHelper = new ConfirmationHelper()
export default confirmationHelper