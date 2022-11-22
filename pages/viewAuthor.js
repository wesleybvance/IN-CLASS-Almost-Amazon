import { getAuthorBooks } from '../api/authorData';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { showBooks } from './books';
// import { showBooks } from './books';

const viewAuthor = (obj) => {
  clearDom();

  const domString = `
  <div class="mt-5 d-flex flex-wrap">
     <div class="mt-5">
       <i id="update-author-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
       <i id="delete-author--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
     </div>
   <div class="text-white ms-5 details">
     <h5>${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
     Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
     <p>${obj.description || ''}</p>   
      </div>
    </div>`;

  renderToDOM('#view', domString);
  getAuthorBooks(obj.firebaseKey).then(showBooks);
};

export default viewAuthor;
