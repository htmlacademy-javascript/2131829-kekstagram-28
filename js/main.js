import {renderPhotos} from './gallery.js';
import './big-picture.js';
import './form.js';
import {getData} from './load.js';
import {showAlert} from './utils.js';

getData()
  .then((data) => {
    renderPhotos(data);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

