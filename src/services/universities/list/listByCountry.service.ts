import { UniversityMongoModel } from '../../../mongoose/university.model'

interface ListUniversitiesByCountryInput {
  lastUniversityId?: string;
  page: number;
  country: string;
}

export const listUniversitiesByCountryService = async ({
  country,
  page,
  lastUniversityId,
}: ListUniversitiesByCountryInput) => {
  if (lastUniversityId) {
    const universities = await UniversityMongoModel.find({
      _id: { $gt: lastUniversityId },
      country,
    })
      .sort({ _id: 1 })
      .limit(20)
      .select(['_id', 'name', 'country', 'state_province'])

    return universities
  }

  const universities = await UniversityMongoModel.find({
    country,
  })
    .sort({ _id: 1 })
    .limit(20)
    .skip((page - 1) * 20)
    .select(['_id', 'name', 'country', 'state_province'])

  return universities
}
