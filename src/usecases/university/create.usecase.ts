import { ConflictError } from '../../common/errors'
import { CreateUniversityDto } from '../../dto'
import { UniversityMongoModel } from '../../mongoose/university.model'

export const createUniversityUsecase = async ({
  alphaTwoCode,
  country,
  domains,
  name,
  stateProvince,
  webPages,
}: CreateUniversityDto) => {
  const universityExists = await UniversityMongoModel.findOne({
    name,
    state_province: stateProvince,
    country,
  })

  if (universityExists) {
    throw new ConflictError('Essa universidade já existe')
  }

  const createdUniversity = await UniversityMongoModel.create({
    name,
    state_province: stateProvince,
    web_pages: webPages,
    alpha_two_code: alphaTwoCode,
    domains,
    country,
  })

  return createdUniversity.toJSON()
}
