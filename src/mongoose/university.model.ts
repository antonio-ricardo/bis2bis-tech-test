import { model, Schema } from 'mongoose'

const universitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  alpha_two_code: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state_province: {
    type: String,
    default: null,
  },
  web_pages: {
    type: [String],
    required: true,
  },
  domains: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
})

const UniversityMongoModel = model('universities', universitySchema)

export { UniversityMongoModel }
