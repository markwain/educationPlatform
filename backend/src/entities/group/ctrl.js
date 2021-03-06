import autobind from 'autobind-decorator'

import User from '../user/model'
import { findCurrUserGroup, catchFindCurrUserGroup } from '../user/utils'
import BasicCtrl from '../common/ctrl'

import { filterValidationErrObj } from '../common/utils'


class GroupCtrl extends BasicCtrl {
  @autobind
  create(req, res, next){
    const { name } = req.body

    const { _id: userId } = req.user

    User.findById(userId, (err, user) => {
      if(err) return res.status(400).json({ errors: err})
      if(user.group) return res.status(400).json({ message: 'This user already have a group'})

      this.Model.create({
        name,
      }, (err, newGroup ) => {
        if(err) return res.status(400).json({ errors: filterValidationErrObj(err.errors)})

        User
          .update({_id: userId}, { group: newGroup._id} )
          .exec( err => { if(err) return next(err)} )

        res.status(201).json({ data: newGroup, })
      })
    })
  }

  @autobind
  list(req,res, next){
    const { _id: userId } = req.user
    findCurrUserGroup(userId).then( group => {
      this.Model
        .find({_id: group})
        .exec( (err, data) => {
          if(err) return next(err)

          res.json({ data })
        })
    }).catch( catchFindCurrUserGroup(res) )
  }
}

export default GroupCtrl