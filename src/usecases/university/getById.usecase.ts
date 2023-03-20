import { Types } from 'mongoose'
import { NotFoundError } from '../../common/errors/notFoundError.error'
import { UniversityMongoModel } from '../../mongoose/university.model'

export const getUniversityByIdUsecase = async (id: string) => {
  const university = await UniversityMongoModel.findById(
    new Types.ObjectId(id)
  )

  if (!university) {
    throw new NotFoundError(
      'Não foi possível achar nenhuma universidade com esse id'
    )
  }

  return university.toJSON()
}
