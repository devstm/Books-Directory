import { Router } from 'express';
import {index, show, create, update, destroy, getAuthorByName} from '../Controllers/Author';
const router = Router();

router.get('/authors', index);
router.get('/authors/:id', show);
router.get('/search', getAuthorByName);
router.post('/create', create);
router.put('/authors/:id', update);
router.delete('/authors/:id', destroy);



export default router;