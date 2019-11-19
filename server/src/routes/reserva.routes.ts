import { Router } from 'express';
import * as reservationController from '../controllers/reservation.controller';
import { tokenValidation } from '../lib/verifyToken';


const router = Router();

router.route('/')
    .post(tokenValidation, reservationController.reservation)

router.route('/new')    
    .post(reservationController.newReservation)
export default router;