import { listUniversitiesByCountryService } from '../../services/universities/list/listByCountry.service'
import { ListUniversitiesDto } from '../../dto'
import { listUniversitiesService } from '../../services/universities/list/list.service'

export const listUniversitiesUsecase = async ({
  page,
  country,
  lastUniversityId,
}: ListUniversitiesDto) => {
  const shouldFilterByCountry = !!country

  const universities = shouldFilterByCountry
    ? await listUniversitiesByCountryService({
        country,
        page,
        lastUniversityId,
      })
    : await listUniversitiesService({ page, lastUniversityId })

  return universities
}
