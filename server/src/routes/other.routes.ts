import { Router } from 'express';

import * as otherController from '../controllers/other.controller';

const router = Router();

router.route('/')
    .get(otherController.getFields)
    .post(otherController.postFields)

export default router;    