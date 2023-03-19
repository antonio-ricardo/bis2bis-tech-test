import { UniversityModel } from './../models/university.model'
import Queue from 'bull'
import redisConfig from '../redis/config'
import { UniversityMongoModel } from '../mongoose/university.model'
import { UniversitiesUpdateMongoModel } from '../mongoose/lastUpdate.model'

interface Data {
  allUniversities: UniversityModel.UniversityFromBisApi[];
}

interface RejectedPromise {
  status: 'rejected';
  reason: {
    universityWithError: UniversityModel.UniversityToMongo;
    errorDescription: string;
  };
}

interface ResolvedPromise {
  status: 'fulfilled';
}

type AllPromisesPosiblesResult = [ResolvedPromise | RejectedPromise];

export const saveUniversitiesQueu = new Queue('exportExcel', {
  redis: redisConfig,
})

saveUniversitiesQueu.process(async (job: Queue.Job<Data>, done) => {
  try {
    const createUniversityPromises = job.data.allUniversities.map(
      async (university) => {
        const universityAlreadyExists = await UniversityMongoModel.findOne({
          state_province: university['state-province'],
          country: university.country,
          name: university.name,
        })

        if (universityAlreadyExists) {
          return
        }

        return new Promise<UniversityModel.UniversityToMongo>((res, rej) => {
          UniversityMongoModel.create({
            state_province: university['state-province'],
            name: university.name,
            alpha_two_code: university.alpha_two_code,
            country: university.country,
            domains: university.domains,
            web_pages: university.web_pages,
          })
            .then(res)
            .catch((error) => {
              rej({ universityWithError: university, errorDescription: error })
            })
        })
      }
    )

    const promisesResult = (await Promise.allSettled(
      createUniversityPromises
    )) as unknown as AllPromisesPosiblesResult

    const failedPromises = promisesResult.filter(
      (promise) => promise.status === 'rejected'
    ) as RejectedPromise[]

    if (failedPromises.length < 1) {
      await UniversitiesUpdateMongoModel.create({ run_with_success: true })
      return done()
    }

    const updateErrors = failedPromises.map((failedPromise) => {
      return {
        universityWithError: failedPromise.reason.universityWithError,
        errorDescription: failedPromise.reason.errorDescription,
      }
    })

    await UniversitiesUpdateMongoModel.create({
      run_with_success: false,
      updateErrors,
    })

    return done()
  } catch (err: any) {
    done(new Error(err))
  }
})
