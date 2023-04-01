import {createDescriptions} from './photo-description-data.js';

createDescriptions(25);

const testDesc = createDescriptions(1);

import {showPhoto} from './photo-pop-up-controller.js';
import {closeShownPhoto} from './photo-pop-up-controller.js';

showPhoto(testDesc[0].url, testDesc[0].likes , testDesc[0].comments, testDesc[0].description);

document.querySelector('.big-picture__cancel').addEventListener('click', closeShownPhoto);
