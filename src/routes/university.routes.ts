import {
  createUniversityDto,
  CreateUniversityDto,
  deleteUniversityDto,
  DeleteUniversityDto,
  getUniversityByIdDto,
  GetUniversityByIdDto,
  ListUniversitiesDto,
  listUniversitiesDto,
  updateUniversityDto,
  UpdateUniversityDto,
} from './../dto'
import Router from 'express'
import universitiesControllers from '../controllers/university.controllers'
import { validateRequest } from '../middlewares/validateRequest.middleware'
import { validateToken } from '../middlewares/validateToken.middleware'

const routes = Router()

routes.get(
  '/save-daily',
  async (req, res) =>
    await universitiesControllers.saveDailyUniversitiesController(req, res)
)

routes.get(
  '/',
  (req, res, next) =>
    validateRequest<ListUniversitiesDto>(req, res, next, listUniversitiesDto),
  async (req, res) => await universitiesControllers.listUniversities(req, res)
)

routes.get(
  '/:id',
  (req, res, next) =>
    validateRequest<GetUniversityByIdDto>(req, res, next, getUniversityByIdDto),
  async (req, res) => await universitiesControllers.getUniversityById(req, res)
)

routes.post(
  '/',
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) =>
    validateRequest<CreateUniversityDto>(req, res, next, createUniversityDto),
  async (req, res) => await universitiesControllers.createUniversity(req, res)
)

routes.put(
  '/:id',
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) =>
    validateRequest<UpdateUniversityDto>(req, res, next, updateUniversityDto),
  async (req, res) => await universitiesControllers.updateUniversity(req, res)
)

routes.delete(
  '/:id',
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) =>
    validateRequest<DeleteUniversityDto>(req, res, next, deleteUniversityDto),
  async (req, res) => await universitiesControllers.deleteUniversity(req, res)
)

export default routes
