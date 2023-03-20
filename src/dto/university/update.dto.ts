import { array, InferType, object, string } from 'yup'

const updateUniversitySchema = object({
  id: string().required(),
  webPages: array(string()).nullable(),
  name: string().nullable(),
  domains: array(string()).nullable(),
})

export const updateUniversityDto = (data: unknown) => {
  const { domains, name, webPages, id } = updateUniversitySchema
    .camelCase()
    .validateSync(data, {
      stripUnknown: true,
    })

  return { domains, name, webPages, id }
}

export type UpdateUniversityDto = InferType<typeof updateUniversitySchema>;
