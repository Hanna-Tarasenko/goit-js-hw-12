// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// export function createGalleryMarkup(images, shoudAppend = false) {
//   const galleryContainer = document.querySelector('.image-gallery');
//   const markup = images
//     .map(
//       image => `
//         <div class="image-item">
//             <a href="${image.largeImageURL}">
//                 <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-img" />
//             </a>
//             <div class="image-info">
//                 <h5 class ="text"> <span class="icon-data">💗 Likes: ${image.likes} </span></h5>
//                 <h5 class ="text"> <span class="icon-data">🗨️ Comments: ${image.comments}</span></h5>
//                 <h5 class ="text"><span class="icon-data">👀 Views: ${image.views}</span></h5>
//                 <h5 class ="text"><span class="icon-data">⬇️ Downloads: ${image.downloads}</span></h5>
//             </div>
//         </div>
//     `
//     )
//     .join('');

//   if (shoudAppend) {
//     galleryContainer.insertAdjacentHTML('beforeend', markup);
//   } else {
//     galleryContainer.innerHTML = markup;
//   }
// }

// export function displayError(message) {
//   iziToast.error({
//     title: 'Error',
//     message: message,
//     position: 'bottomCenter',
//     color: 'red',
//   });
// }

export function createGalleryMarkup(images, shoudAppend = false) {
  const galleryContainer = document.querySelector('.image-gallery');
  const markup = images
    .map(
      image => `
        <div class="image-item">
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="image-info">
                <h5 class ="text"> <span class="icon-data">💗 Likes: ${image.likes} </span></h5>
                <h5 class ="text"> <span class="icon-data">🗨️ Comments: ${image.comments}</span></h5>
                <h5 class ="text"><span class="icon-data">👀 Views: ${image.views}</span></h5>
                <h5 class ="text"><span class="icon-data">⬇️ Downloads: ${image.downloads}</span></h5>

            </div>
        </div>
    `
    )
    .join('');

  if (shoudAppend) {
    galleryContainer.insertAdjacentHTML('beforeend', markup);
  } else {
    galleryContainer.innerHTML = markup;
  }
}

export function displayError(message) {
  iziToast.show({
    title: 'Error',
    message: message,
    position: 'bottomCenter',
    color: 'red',
  });
}
