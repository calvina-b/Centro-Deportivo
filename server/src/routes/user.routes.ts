import { Router } from 'express';
import { signin, signup, profile } from '../controllers/user.controller'
import { tokenValidation, isAdmin } from '../lib/verifyToken';
import { checkDuplicateNameOrEmailOrRutOrPhone } from '../lib/verifications';

const router = Router();

router.route('/')
    .post(signin);
router.route('/register')
    .post(checkDuplicateNameOrEmailOrRutOrPhone, signup);
router.route('/profile')
    .get(tokenValidation, isAdmin, profile);
    
export default router;