import App from './server'
import config from './config'

App.listen(config.PORT, () => {
  console.log(`Applicativo avviato sulla porta ${config.PORT} in modalità ${config.ENVIROMENT}`)
})