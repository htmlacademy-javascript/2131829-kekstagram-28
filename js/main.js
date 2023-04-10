import {createPhotos} from './photo-data.js';
import {renderPhotos} from './gallery.js';
import './big-picture.js';
import './form.js';

const photos = createPhotos(25);

renderPhotos(photos);
