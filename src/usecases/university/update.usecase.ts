import { Types } from 'mongoose'
import { NotFoundError } from '../../common/errors/notFoundError.error'
import { UpdateUniversityDto } from '../../dto'
import { UniversityMongoModel } from '../../mongoose/university.model'

export const updateUniversityUsecase = async ({
  domains,
  name,
  webPages,
  id,
}: UpdateUniversityDto) => {
  let updateOptions = {}

  if (domains === null || domains) {
    updateOptions = { ...updateOptions, domains }
  }

  if (name === null || name) {
    updateOptions = { ...updateOptions, name }
  }

  if (webPages === null || webPages) {
    updateOptions = { ...updateOptions, web_pages: webPages }
  }

  const updatedUniversity = await UniversityMongoModel.findByIdAndUpdate(
    new Types.ObjectId(id),
    updateOptions
  )

  if (!updatedUniversity) {
    throw new NotFoundError('Não foi possível achar a universidade')
  }

  return updatedUniversity.toJSON()
}
