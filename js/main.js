import {renderPhotos} from './gallery.js';
import './big-picture.js';
import './form.js';
import {getData} from './load.js';
import {showErrorMessage} from './dialog.js';

const filters = document.querySelector('.img-filters');

getData()
  .then((data) => {
    renderPhotos(data);
    filters.classList.remove('img-filters--inactive');
  })
  .catch(
    (err) => {
      showErrorMessage(err.message);
    }
  );
