import { InferType, object, string } from 'yup'

const deleteUniversitySchema = object({
  id: string().required(),
})

export const deleteUniversityDto = (data: unknown) => {
  const { id } = deleteUniversitySchema.camelCase().validateSync(data, {
    stripUnknown: true,
  })

  return { id }
}

export type DeleteUniversityDto = InferType<typeof deleteUniversitySchema>;
