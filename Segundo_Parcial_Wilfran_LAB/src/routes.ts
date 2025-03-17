// src/routes.ts
import { Router } from 'express';
import { getUsuarios, postUsuario } from './controllers';

const router = Router();

router.get('/usuarios', getUsuarios);
router.post('/usuarios', postUsuario);

export default router;
