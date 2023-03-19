import axios from 'axios'
import { DateTime } from 'luxon'
import { saveUniversitiesQueu } from '../../jobs/saveUniversities.job'
import { UniversityModel } from '../../models/university.model'
import { UniversitiesUpdateMongoModel } from '../../mongoose/lastUpdate.model'

export const saveDailyUniversitiesUsecase = async () => {
  const endOfDay = DateTime.local().endOf('day').toISO()
  const beginOfDay = DateTime.local().startOf('day').toISO()

  const todayUpdate = await UniversitiesUpdateMongoModel.findOne({
    created_at: {
      $gte: new Date(beginOfDay),
      $lte: new Date(endOfDay),
    },
  })

  const alreadyUpdateDailyUniversitiesWithSucess =
    todayUpdate && todayUpdate.run_with_success

  if (alreadyUpdateDailyUniversitiesWithSucess) {
    return
  }

  const triedUpdateButHaveFailed = todayUpdate && !todayUpdate.run_with_success

  if (triedUpdateButHaveFailed) {
    const universitiesToRetry = todayUpdate.updateErrors.map(
      (updateError) => updateError.universityWithError
    )

    saveUniversitiesQueu.add({ allUniversities: universitiesToRetry })

    return
  }

  const [
    argentinaUniversitiesResponse,
    brazilUniversitiesResponse,
    chileUniversitiesResponse,
    colombiaUniversitiesResponse,
    paraguayUniversitiesResponse,
    peruUniversitiesResponse,
    surinameUniversitiesResponse,
    uruguayUniversitiesResponse,
  ] = await Promise.all([
    axios.get<UniversityModel.UniversityFromBisApi[]>(
      'http://universities.hipolabs.com/search?country=argentina'
    ),
    axios.get<UniversityModel.UniversityFromBisApi[]>(
      'http://universities.hipolabs.com/search?country=brazil'
    ),
    axios.get<UniversityModel.UniversityFromBisApi[]>(
      'http://universities.hipolabs.com/search?country=chile'
    ),
    axios.get<UniversityModel.UniversityFromBisApi[]>(
      'http://universities.hipolabs.com/search?country=colombia'
    ),
    axios.get<UniversityModel.UniversityFromBisApi[]>(
      'http://universities.hipolabs.com/search?country=paraguay'
    ),
    axios.get<UniversityModel.UniversityFromBisApi[]>(
      'http://universities.hipolabs.com/search?country=peru'
    ),
    axios.get<UniversityModel.UniversityFromBisApi[]>(
      'http://universities.hipolabs.com/search?country=suriname'
    ),
    axios.get<UniversityModel.UniversityFromBisApi[]>(
      'http://universities.hipolabs.com/search?country=uruguay'
    ),
  ])

  const allUniversities = [
    ...argentinaUniversitiesResponse.data,
    ...brazilUniversitiesResponse.data,
    ...chileUniversitiesResponse.data,
    ...colombiaUniversitiesResponse.data,
    ...paraguayUniversitiesResponse.data,
    ...peruUniversitiesResponse.data,
    ...surinameUniversitiesResponse.data,
    ...uruguayUniversitiesResponse.data,
  ]

  saveUniversitiesQueu.add({ allUniversities })
}
