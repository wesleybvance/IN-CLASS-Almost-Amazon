import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import addBookForm from '../components/forms/addBookForm';
import {
  getAuthors, getSingleAuthor, updateAuthor
} from '../api/authorData';
import { showAuthors, favButtonFunc } from '../pages/authors';
import { showBooks } from '../pages/books';
import addAuthorForm from '../components/forms/addAuthorForm';
import { getBookDetails, deleteAuthorBooksRelationship } from '../api/mergedData';
import viewBook from '../pages/viewBook';
import viewAuthor from '../pages/viewAuthor';
import renderToDOM from '../utils/renderToDom';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // console.warn('CLICKED DELETE BOOK', e.target.id);
        // console.warn(e.target.id.split('--'));
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooks(user.uid).then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(user.uid);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      // console.warn('EDIT BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      // console.warn('VIEW BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));
      // const [, firebaseKey] = e.target.id.split('--');
      const [, firebaseKey] = e.target.id.split('--');
      getBookDetails(firebaseKey).then(viewBook);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // console.warn('DELETE AUTHOR', e.target.id);
        // console.warn(e.target.id.split('--'));
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors(user.uid).then(showAuthors);
        });
        // deleteSingleAuthor(firebaseKey).then(() => {
        //   getAuthors().then(showAuthors);
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }
    // CLICK EVENT FOR VIEW AUTHOR
    if (e.target.id.includes('view-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => viewAuthor(authorObj));
    }
    // FAVORITE AUTHOR

    if (e.target.id.includes('favButton')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((author) => {
        const payload = {
          favorite: !author.favorite,
          firebaseKey,
        };
        updateAuthor(payload).then(() => {
          getAuthors(user.uid).then(showAuthors);
          console.warn(payload);
        });
      });
      renderToDOM(`#favButtonDiv--${firebaseKey}`, favButtonFunc(firebaseKey));
    }
  });
};
export default domEvents;
