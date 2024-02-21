import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { getCalification, getCalifications, createCalification, updateCalification, deleteCalification, } from "../controllers/calification.controller.js";
import { createCalificationSchema } from '../schemas/califications.schema.js';

const router = Router();

router.get('/califications', authRequired, getCalifications);
router.get('/califications/:id', authRequired, getCalification);
router.post('/califications', authRequired, validateSchema(createCalificationSchema), createCalification);
router.delete('/califications/:id', authRequired, deleteCalification);
router.put('/califications/:id', authRequired, updateCalification);

export default router;
