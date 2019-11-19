import dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import adminRoutes from './routes/admin.routes';
import userRoutes from './routes/user.routes';
import reservaRoutes from './routes/reserva.routes';

//Inicialization
const app: Application = express();
dotenv.config();

//Settings
app.set('port', process.env.PORT || 3000);


// //Mddlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    exposedHeaders: ['auth-token'],
  }));

//Routes
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reservation', reservaRoutes);


//Starting the server
app.listen(app.get('port'), () => {
    console.log('\nServer is running at http://localhost:' +
        app.get('port') + '\n'
    );
});