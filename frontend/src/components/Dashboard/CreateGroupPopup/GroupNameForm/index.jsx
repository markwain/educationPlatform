import React from 'react'
import {connect} from 'react-redux'

import InputRow from './InputRow'
import ButtonsRow from './ButtonsRow'


class GroupNameInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupName: {
        value: null,
        error: true,
        errorText: null,
      },
    }
    this.updateGroupNameInputData = this.updateGroupNameInputData.bind(this)
  }

  updateGroupNameInputData(value, error, errorText) {
    this.setState({
      groupName: {
        value, error, errorText
      }
    })
  }

  render() {
    const inputData = this.state.groupName

    return(
      <div>
        <InputRow
          inputData={inputData}
          updateGroupNameInputData={this.updateGroupNameInputData}
        />
        <ButtonsRow
          inputData={inputData}
          handleClose={this.props.handleClose}
        />
      </div>
    )
  }
}


export default connect()(GroupNameInput)