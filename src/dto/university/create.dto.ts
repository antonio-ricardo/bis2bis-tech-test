import { array, InferType, object, string } from 'yup'

const createUniversitySchema = object({
  alphaTwoCode: string().required(),
  webPages: array(string()).required(),
  name: string().required(),
  country: string().required(),
  domains: array(string()).required(),
  stateProvince: string().nullable().required(),
})

export const createUniversityDto = (data: unknown) => {
  const { alphaTwoCode, country, domains, name, stateProvince, webPages } =
    createUniversitySchema.camelCase().validateSync(data, {
      stripUnknown: true,
    })

  return { alphaTwoCode, country, domains, name, stateProvince, webPages }
}

export type CreateUniversityDto = InferType<typeof createUniversitySchema>;
