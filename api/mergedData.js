// for merged promises
import { getSingleBook } from './bookData';
import { getSingleAuthor } from './authorData';

const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObject) => {
    getSingleAuthor(bookObject.author_id).then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

export default getBookDetails;
