import {createDescriptions} from './photo-description-data.js';
import {renderPhotos} from './gallery.js';
import {loadForm} from './form.js';
import {closeLoaderForm} from './form.js';
import {imageLoader} from './form.js';

const descriptions = createDescriptions(25);

renderPhotos(descriptions);

imageLoader.addEventListener('change', loadForm);

const closeImageLoaderButton = document.querySelector('#upload-cancel');

closeImageLoaderButton.addEventListener('click', closeLoaderForm); //on Esc needed
