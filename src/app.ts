import express from 'express';
import 'express-async-errors';
import authentication from './middlewares/auth';
import errorHandler from './middlewares/errorHandler';
import loginRoute from './routes/loginRoute';
import userRoute from './routes/userRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    this.app.use(express.json());
    this.app.use(loginRoute);
    this.app.use('/users', authentication, userRoute);
    this.app.use(errorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();