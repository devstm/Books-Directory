import { Router } from 'express';
import {index, show, create, update, destroy, getAuthorByName} from '../Controllers/Author';
const authorsRouter = Router();

authorsRouter.get('/authors', index);
authorsRouter.get('/authors/:id', show);
authorsRouter.get('/search', getAuthorByName);
authorsRouter.post('/create', create);
authorsRouter.put('/authors/:id', update);
authorsRouter.delete('/authors/:id', destroy);



export default authorsRouter;