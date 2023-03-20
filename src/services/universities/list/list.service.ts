import { UniversityMongoModel } from '../../../mongoose/university.model'
import { Types } from 'mongoose'

interface ListUniversitiesInput {
  lastUniversityId?: string;
  page: number;
}

export const listUniversitiesService = async ({
  page,
  lastUniversityId,
}: ListUniversitiesInput) => {
  if (lastUniversityId) {
    const universities = await UniversityMongoModel.find({
      _id: { $gt: new Types.ObjectId(lastUniversityId) },
    })
      .sort({ _id: 1 })
      .limit(20)
      .select(['_id', 'name', 'country', 'state_province'])

    return universities
  }

  const universities = await UniversityMongoModel.find()
    .sort({ _id: 1 })
    .limit(20)
    .skip((page - 1) * 20)
    .select(['_id', 'name', 'country', 'state_province'])

  return universities
}
