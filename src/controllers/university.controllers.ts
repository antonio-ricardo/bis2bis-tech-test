import { Request, Response } from 'express'
import { SuccessNoContentResponse } from '../common/sucessNoContentResponse'
import { saveDailyUniversitiesUsecase } from '../usecases/university/saveDailyUniversities.usecase'

export default {
  async saveDailyUniversitiesController(req: Request, res: Response) {
    await saveDailyUniversitiesUsecase()

    const { status, body } = SuccessNoContentResponse.create()

    return res.status(status).json(body)
  },
}
