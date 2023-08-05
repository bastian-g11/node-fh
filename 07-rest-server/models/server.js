import express from 'express';
import cors from 'cors';
import authRouter from '../routes/auth.routes.js';
import userRouter from '../routes/user.routes.js';
import { dbConnection } from '../database/config.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

    // Connect to DB
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    // Parse and read body
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, authRouter);
    this.app.use(this.usersPath, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
