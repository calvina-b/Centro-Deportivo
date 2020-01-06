import { Router } from 'express';
import * as reservationController from '../controllers/reservation.controller';
import { tokenValidation } from '../lib/verifyToken';


const router = Router();

router.route('/')
    .get(tokenValidation, reservationController.getSports)
    .post(tokenValidation, reservationController.reservation)

router.route('/new')    
    .post(tokenValidation, reservationController.newReservation)

router.route('/itemsAndReferee')
    .post(tokenValidation, reservationController.reservationItemsAndReferee)

router.route('/active')
    .post(reservationController.getActiveReservation)
    
router.route('/active/delete')
    .post(reservationController.deleteReservation) 
    
export default router;