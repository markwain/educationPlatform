import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { TextField } from 'material-ui'


class Password extends React.Component {
  constructor(props) {
    super(props)

    this.passwordMinLength =  4
    this.errorMessages = {
      short: `It must contain at least ${this.passwordMinLength} characters`,
      empty: 'The password field can\'t be empty',
    }

    this.state = {
      value: null,
      errorText: null,
    }
  }

  @autobind
  handleInput(e) {
    const { errorMessages, passwordMinLength } = this
    const { updatePasswordState } = this.props
    const password = e.target.value

    if(!password) return this.setState({ errorText: errorMessages.empty })
    if(password.length < passwordMinLength) return this.setState({ errorText: errorMessages.short} )

    this.setState({ errorText: null })
    updatePasswordState(password)
  }


  @autobind
  enableEditMode(){
    const { updatePasswordState } = this.props

    this.setState({
      errorText: null,
    })
    updatePasswordState(null)
  }
  render() {
    const { errorText } = this.state
    const { validatingError } = this.props
    const foregroundErrorText = errorText || validatingError

    return(
      <div>
        <label htmlFor='login-modal-password'>Password:</label><br/>
        <TextField
          onFocus={this.enableEditMode}
          onBlur={this.handleInput}
          errorText={foregroundErrorText}
          id='login-modal-password'
          hintText='password'
          type='password'
        /><br/><br/>
      </div>
    )
  }
}

export default Password
