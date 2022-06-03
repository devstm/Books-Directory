import { Router } from 'express';
import authorsRouter from './AuthorsRouter';
import booksRouter from './BooksRouter';
const router = Router();

router.use(authorsRouter);
router.use(booksRouter)

export default router;