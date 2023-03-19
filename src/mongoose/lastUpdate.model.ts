import { model, Schema } from 'mongoose'

const universitiesUpdateSchema = new Schema({
  run_with_success: {
    type: Boolean,
    require: true,
    default: false,
  },
  updateErrors: {
    type: [
      {
        errorDescription: {
          type: String,
          required: true,
        },
        universityWithError: {
          type: {
            name: {
              type: String,
            },
            alpha_two_code: {
              type: String,
            },
            country: {
              type: String,
            },
            state_province: {
              type: String,
            },
            web_pages: {
              type: [String],
            },
            domains: {
              type: [{ type: String }],
            },
          },
          default: null,
        },
      },
    ],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const UniversitiesUpdateMongoModel = model(
  'universities_updates',
  universitiesUpdateSchema
)

export { UniversitiesUpdateMongoModel }
