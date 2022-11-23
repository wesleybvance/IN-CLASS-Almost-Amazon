import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { getSingleAuthor } from '../api/authorData';

const emptyAuthors = () => {
  const domString = '<h1>No Authors</h1>';
  renderToDOM('#store', domString);
};

const favButtonFunc = (firebaseKey) => {
  const authorObj = getSingleAuthor(firebaseKey);
  const status = authorObj.favorite;
  const favorited = `<button type="button" class="btn btn-outline-warning" id="favButton--${firebaseKey}">Unfavorite</button>`;
  const unfavorited = `<button type="button" class="btn btn-dark" id="favButton--${firebaseKey}">Favorite</button>`;
  if (status) {
    return favorited;
  } return unfavorited;
};

const showAuthors = (array) => {
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';

  renderToDOM('#add-button', btnString);

  let domString = '';
  array.forEach((item) => {
    domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
        <hr><div class="favHeart">${item.favorite ? '<span>Favorite Author</span>' : ''}</div>
        <i class="btn btn-success fas fa-eye" id="view-author-btn--${item.firebaseKey}"></i>
        <i class="fas fa-edit btn btn-info" id="update-author--${item.firebaseKey}"></i>
        <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${item.firebaseKey}"></i>
        <div class="btn-fav-div" id="favButtonDiv--${item.firebaseKey}">${item.favorite ? `<button type="button" class="btn btn-outline-warning" id="favButton--${item.firebaseKey}">Unfavorite</button>` : `<button type="button" class="btn btn-dark" id="favButton--${item.firebaseKey}">Favorite</button>`}</div>
      </div>
    </div>
    `;
  });
  renderToDOM('#store', domString);
};

export { showAuthors, emptyAuthors, favButtonFunc };
