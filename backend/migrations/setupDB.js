import mongoose from 'mongoose'
import { spawn } from 'child_process'

import subjectsList from './subjectsList'

import Subject from '../src/entities/subject/model'
import Student from '../src/entities/student/model'
import Group from '../src/entities/group/model'
import Course from '../src/entities/course/model'
import Score from '../src/entities/score/model'
import Student2Course from '../src/entities/student2Course/model'
import User from '../src/entities/user/model'


const mode = 'prod'
export const handleError = err => { if(err) console.error(err) }


const connectDataBase = uri => {
  mongoose.connect(uri)
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ...`);
  })
}
// connectDataBase('mongodb://localhost/educationPlatform')

const string2ObjectInArray = propName => valuesArr => valuesArr.map( value => ({ [propName] : value}))
const generateName = baseName => mode === 'dev' ? baseName + Math.random() : baseName

const createEntities = Entity => entitiesData => (
  entitiesData.forEach( data => Entity.create(data, err => {
    if(err) handleError(err)
  }))
)

export default () => {
  //dropDb
  spawn('mongo', ['educationPlatform','--eval', 'db.dropDatabase();'])

  setTimeout( () => {

    createEntities(Subject)( string2ObjectInArray('name')(subjectsList) )
    
    Subject.create( {name:generateName('Math')}, (err, subject) => {
      handleError(err)
      const subjectId = subject._id

      Group.create( {name: '11-D'}, (err, group) => {
        handleError(err)
        const groupId = group._id

        User.create( {name: generateName('Dasha'), password: 'test', group: groupId}, (err, user) => {
          handleError(err)
          const userId = user._id

          Student.create({name: generateName('Stuart'), group}, (err, student) => {
            handleError(err)
            const studentId = student._id

            Course.create( { subject, group}, (err, course) => {
              handleError(err)
              const courseId = course._id

              Student2Course.create( {group: groupId, student: studentId, course: courseId,}, (err) => {
                handleError(err)
              })

              Score.create({ scoreValue: 10, group: groupId, student:studentId, course}, (err) => {
                handleError(err)
              })
            })
          })
        })
      })
    })
  }, 1000)

}
