import { fetchImages } from './js/pixabay-api';
import { createGalleryMarkup, displayError } from './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.image-gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.classList.add('load-more');
loadMoreBtn.textContent = 'Load more';

galleryContainer.insertAdjacentElement('afterend', loadMoreBtn);

let lightbox;
let query = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = searchForm.querySelector('.search-form-input')?.value.trim();

  if (!query) {
    displayError('Please enter a valid search query');
    return;
  }
  page = 1;
  loadMoreBtn.style.display = 'none';
  galleryContainer.innerHTML = '';

  loader.style.display = 'block';

  try {
    const { images, totalHits: fetchedTotalHits } = await fetchImages(
      query,
      page
    );
    totalHits = fetchedTotalHits;

    createGalleryMarkup(images);
    lightbox = new SimpleLightbox('.image-gallery a', {
      captions: true,
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    });
    lightbox.refresh();

    if (totalHits > page * 15) loadMoreBtn.style.display = 'block';
  } catch (error) {
    displayError(error.message);
  } finally {
    loader.style.display = 'none';
  }
});
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.style.display = 'block';
  try {
    const { images } = await fetchImages(query, page);
    createGalleryMarkup(images, true);
    lightbox.refresh();
    if (page * 15 >= totalHits) {
      loadMoreBtn.style.display = 'none';
      displayError('No more results could be found');
    } else {
      smoothScroll();
    }
  } catch (error) {
    displayError(error.message);
  } finally {
    loader.style.display = 'none';
  }
});
function smoothScroll() {
  const { height: cardHeight } =
    galleryContainer.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// galleryContainer.insertAdjacentElement('afterend', loadMoreBtn);

// let lightbox = new SimpleLightbox('.gallery a');
// let query = '';
// let page = 1;
// let totalHits = 0;

// searchForm.addEventListener('submit', async event => {
//   event.preventDefault();
//   query = searchForm.querySelector('.search-form-input')?.value.trim();

//   if (!query) {
//     displayError('Please enter a valid search query');
//     return;
//   }

//   page = 1;
//   loadMoreBtn.style.display = 'none';
//   galleryContainer.innerHTML = '';
//   loader.style.display = 'block';

//   try {
//     const { images, totalHits: fetchedTotalHits } = await fetchImages(
//       query,
//       page
//     );
//     totalHits = fetchedTotalHits;

//     createGalleryMarkup(images);
//     lightbox.refresh();
//     if (totalHits > page * 15) loadMoreBtn.style.display = 'block';
//   } catch (error) {
//     displayError(error.message);
//   } finally {
//     loader.style.display = 'none';
//   }
// });

// loadMoreBtn.addEventListener('click', async () => {
//   page += 1;
//   loader.style.display = 'block';

//   try {
//     const { images } = await fetchImages(query, page);
//     createGalleryMarkup(images, true);
//     lightbox.refresh();

//     if (page * 15 >= totalHits) {
//       loadMoreBtn.style.display = 'none';
//       displayError(
//         "We're sorry, but you've reached the end of search results."
//       );
//     } else {
//       smoothScroll();
//     }
//   } catch (error) {
//     displayError(error.message);
//   } finally {
//     loader.style.display = 'none';
//   }
// });

// function smoothScroll() {
//   const { height: cardHeight } =
//     galleryContainer.firstElementChild.getBoundingClientRect();
//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
