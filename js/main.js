import {createDescriptions} from './photo-description-data.js';
import {renderPhotos} from './gallery.js';
import {showPhoto} from './photo-pop-up-controller.js';
import {closeShownPhoto} from './photo-pop-up-controller.js';

const descriptions = createDescriptions(25);

renderPhotos(descriptions);

const testDesc = createDescriptions(1);

showPhoto(testDesc[0].url, testDesc[0].likes , testDesc[0].comments, testDesc[0].description);

document.querySelector('.big-picture__cancel').addEventListener('click', closeShownPhoto);
