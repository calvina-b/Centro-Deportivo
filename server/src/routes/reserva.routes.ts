import { Router } from 'express';
import { reservation } from '../controllers/reservation.controller';
import { tokenValidation } from '../lib/verifyToken';


const router = Router();

router.route('/')
    .post(reservation)
    
export default router;