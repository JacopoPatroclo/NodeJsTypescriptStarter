import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'

// Importa l'interfaccia di configurazione e il file di config
import Configuration from './interfaces/Configuration'
import config from './config'

// Importa i router
import Api from './api'
import UserRouter from './api/user/UserRouter'

// Importa i controller
import UserController from './api/user/UserController'

// Importa gli error handler
import ErrorHandler from './middleware/errorHandler'

// Importa il logger
import Logger from './lib/logger'

// Importo il db manager
import { sequelize } from './models'
import AuthRouter from './auth/AuthRouter';
import AuthController from './auth/AuthController';

// Importo gli util
import AuthUtil from './lib/auth';
import CryptoUtil from './lib/cryptoUtil';

const cryptoUtil = new CryptoUtil(10)
const myLogger = new Logger()
const authUtil = new AuthUtil(cryptoUtil)

class Server {

  public app: express.Application;

  constructor(
    public configuration: Configuration,
    public errorHandler: ErrorHandler,
    public apiRouter: Api,
    public authRouter: AuthRouter
    ) {
    this.app = express()
    this.config()
    this.route()
    this.errors()
    
  }

  public config(){
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(logger('dev'))
  }

  public route() {
    this.app.use('/api/v1', this.apiRouter.router)
    this.app.use('/auth', this.authRouter.router)
  }

  public errors() {
    this.app.use(this.errorHandler.handler)
  }

}

// Prima di avviare l'applicativo sincronizzo sequelize
(async () => {
  await sequelize.sync();
})()

export default new Server(
                      config,
                      new ErrorHandler(myLogger),
                      new Api(
                        new UserRouter(
                          new UserController(myLogger),
                          authUtil
                        )
                      ),
                      new AuthRouter(
                        new AuthController(
                          myLogger,
                          authUtil
                        ),
                        authUtil)
                    ).app