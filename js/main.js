import {createDescriptions} from './photo-description-data.js';
import {renderPhotos} from './gallery.js';

const descriptions = createDescriptions(25);

renderPhotos(descriptions);
