import {createDescriptions} from './photo-description-data.js';
import {createMiniature} from './draw-miniature.js';

const descriptions = createDescriptions(25);

const miniature = createMiniature(descriptions[1]);
document.querySelector('.pictures').append(miniature);
