import Router from 'express'
import universitiesControllers from '../controllers/university.controllers'

const routes = Router()

routes.get(
  '/',
  async (req, res) =>
    await universitiesControllers.saveDailyUniversitiesController(req, res)
)

export default routes
