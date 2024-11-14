import { fetchImages } from './js/pixabay-api';
import { createGalleryMarkup, displayError } from './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.image-gallery');
const loader = document.querySelector('.loader');
let lightbox;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchForm.querySelector('.search-form-input')?.value.trim();

  if (!query) {
    displayError('Please enter a valid search query');
    return;
  }

  loader.style.display = 'block';

  try {
    galleryContainer.innerHTML = '';
    const images = await fetchImages(query);

    if (images.length === 0) {
      iziToast.show({
        title: 'No results found',
        message: 'Try a different search term',
        color: 'red',
        position: 'bottomCenter',
      });
    } else {
      createGalleryMarkup(images);
      lightbox = new SimpleLightbox('.image-gallery a', {
        captions: true,
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
      });
      lightbox.refresh();
    }
  } catch (error) {
    displayError('An error occurred while fetching images. Please try again.');
  } finally {
    loader.style.display = 'none';
  }

  searchForm.reset();
});
