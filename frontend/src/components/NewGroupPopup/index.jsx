import React from 'react'
import {connect} from 'react-redux'
import {Dialog} from 'material-ui'

import StepProgress from './StepProgress'
import GroupNameForm from './GroupNameForm'
import SubjectsForm from './SubjectsForm'
import StudentsForm from './StudentsForm'


class NewGroupPopup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      popupOpen: false,
      currentStep: 1,
      groupName: {
        input: {
          value: null,
          error: true,
          errorText: null,
        }
      }
    }
    this.handleClose = this.handleClose.bind(this)
    this.updateGroupNameInputData = this.updateGroupNameInputData.bind(this)
  }

  updateGroupNameInputData(value, error, errorText) {
    value = value === undefined ? this.state.groupName.input.value : value
    error = error === undefined ? this.state.groupName.input.error : error
    errorText = errorText === undefined ? this.state.groupName.input.errorText: errorText

    this.setState({
      ...this.state,
      groupName: {
        ...this.state.groupName,
        input:{ value, error, errorText }
      }
    })
  }

  handleClose() {
    this.setState({
      ...this.state,
      popupOpen: false
    })
    alert('asd')
  }

  render() {
    const {popupOpen, currentStep} = this.state

    return(
      <Dialog
        title='Create a new group'
        modal={true}
        open={true/*popupOpen*/}
        titleClassName='new-group-modal-title'
        onRequestClose={this.handleClose}
      >
        <StepProgress />
        {
          currentStep === 0 ? <GroupNameForm
            handleClose={this.handleClose}
            inputData={this.state.groupName.input}
            updateGroupNameInputData={this.updateGroupNameInputData}
          /> :
          currentStep === 1 ? <SubjectsForm /> :
          currentStep === 2 ? <StudentsForm /> :
          null
        }
      </Dialog>
    )
  }
}

export default connect( store => ({ popupStore: store.newGroupPopup }))(NewGroupPopup)
