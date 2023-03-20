import { InferType, number, object, string } from 'yup'

const listUniversitiesSchema = object({
  country: string(),
  page: number().required(),
  lastUniversityId: string(),
})

export const listUniversitiesDto = (data: unknown) => {
  const { country, page, lastUniversityId } = listUniversitiesSchema
    .camelCase()
    .validateSync(data, {
      stripUnknown: true,
    })

  return { country, page, lastUniversityId }
}

export type ListUniversitiesDto = InferType<typeof listUniversitiesSchema>;
