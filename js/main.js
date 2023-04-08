import {createDescriptions} from './photo-description-data.js';
import {renderPhotos} from './gallery.js';
import {loadForm, closeLoaderForm} from './form.js';

const descriptions = createDescriptions(25);

renderPhotos(descriptions);

