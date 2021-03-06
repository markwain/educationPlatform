import mongoose from 'mongoose'

import { requiredObjectId } from '../common/model'

const courseSchema = new mongoose.Schema({
  subject: requiredObjectId,
  group: requiredObjectId,
})

export default mongoose.model('Course', courseSchema)