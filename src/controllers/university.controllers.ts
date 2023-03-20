import { Request, Response } from 'express'
import { SuccessResponse } from '../common/successResponse'
import { SuccessNoContentResponse } from '../common/sucessNoContentResponse'
import {
  createUniversityUsecase,
  deleteUniversityUsecase,
  getUniversityByIdUsecase,
  listUniversitiesUsecase,
  saveDailyUniversitiesUsecase,
  updateUniversityUsecase,
} from '../usecases'

export default {
  async saveDailyUniversitiesController(req: Request, res: Response) {
    await saveDailyUniversitiesUsecase()

    const { status, body } = SuccessNoContentResponse.create()

    return res.status(status).json(body)
  },

  async listUniversities(req: Request, res: Response) {
    const data = await listUniversitiesUsecase(req.body)

    const { status, body } = SuccessResponse.create(data)

    return res.status(status).json(body)
  },

  async getUniversityById(req: Request, res: Response) {
    const data = await getUniversityByIdUsecase(req.body)

    const { status, body } = SuccessResponse.create(data)

    return res.status(status).json(body)
  },

  async createUniversity(req: Request, res: Response) {
    const data = await createUniversityUsecase(req.body)

    const { status, body } = SuccessResponse.create(data)

    return res.status(status).json(body)
  },

  async updateUniversity(req: Request, res: Response) {
    const data = await updateUniversityUsecase(req.body)

    const { status, body } = SuccessResponse.create(data)

    return res.status(status).json(body)
  },

  async deleteUniversity(req: Request, res: Response) {
    const data = await deleteUniversityUsecase(req.body)

    const { status, body } = SuccessResponse.create(data)

    return res.status(status).json(body)
  },
}
