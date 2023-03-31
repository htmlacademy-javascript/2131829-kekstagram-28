import {createDescriptions} from './photo-description-data.js';
import {renderPhotos} from './render-photos.js';

const descriptions = createDescriptions(25);

renderPhotos(descriptions);
