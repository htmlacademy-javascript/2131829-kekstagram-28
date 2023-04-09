import {createDescriptions} from './photo-data.js';
import {renderPhotos} from './gallery.js';
import './big-picture.js';
import './form.js';

const descriptions = createDescriptions(25);

renderPhotos(descriptions);

// showPhoto(createDescriptions(1)[0]);

// document.addEventListener('keydown', (evt) => {
//   if (evt.code === 'Escape') {
//     closeShownPhoto();
//   }
// });
