import { InferType, object, string } from 'yup'

const getUniversityByIdSchema = object({
  id: string().required(),
})

export const getUniversityByIdDto = (data: unknown) => {
  const { id } = getUniversityByIdSchema.camelCase().validateSync(data, {
    stripUnknown: true,
  })

  return { id }
}

export type GetUniversityByIdDto = InferType<typeof getUniversityByIdSchema>;
