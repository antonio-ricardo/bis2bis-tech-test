import { Types } from 'mongoose'
import { NotFoundError } from '../../common/errors/notFoundError.error'
import { UniversityMongoModel } from '../../mongoose/university.model'

export const deleteUniversityUsecase = async (id: string) => {
  const deletedUniversity = await UniversityMongoModel.findByIdAndDelete(
    new Types.ObjectId(id)
  )

  if (!deletedUniversity) {
    throw new NotFoundError(
      'Não foi possível achar nenhuma universidade com esse id'
    )
  }

  return deletedUniversity.toJSON()
}
