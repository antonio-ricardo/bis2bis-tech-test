import axios from 'axios'
import { logger } from '../helpers/logger.helper'
import cron from 'node-cron'
import { UniversitiesUpdateMongoModel } from '../mongoose/lastUpdate.model'

const callUniversitiesRoute = () => {
  axios
    .get(`http://localhost:${process.env.PORT || 3000}/universities/save-daily`)
    .then(() => {
      logger.info(
        'Rota de salvamento de universidades diarias chamada com sucesso!'
      )
    })
    .catch((error) => {
      UniversitiesUpdateMongoModel.create({
        run_with_success: false,
        updateErrors: [
          {
            errorDescription: error,
          },
        ],
      })
        .then(() => {
          logger.error(
            `Erro ao realizar salvamento diario de universidades: ${error}`
          )
        })
        .catch((error) => {
          logger.error(`Error ao salvar erro no banco ${error}`)
        })
    })
}

cron.schedule('0 8,20 * * *', callUniversitiesRoute)
