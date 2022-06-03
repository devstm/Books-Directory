import { Router } from 'express';
import {
  index,
  show,
  create,
  update,
  destroy,
  getBooksByName,
  getBooksByAuthorName
} from '../Controllers/Books';
const booksRouter = Router();

booksRouter.get('/books', index);
booksRouter.get('/book/:id', show);
booksRouter.get('/book', getBooksByName);
booksRouter.get('/authorsBooks', getBooksByAuthorName);
booksRouter.post('/book', create);
booksRouter.put('/book/:id', update);
booksRouter.delete('/book/:id', destroy);

export default booksRouter;
