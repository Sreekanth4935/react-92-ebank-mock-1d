import React, {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    errorMsg: '',
  }

  saveUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  savePin = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  handleForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/ebank/login', options)
    // console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      Cookies.set('jwtToken', data.jwt_token)
    } else {
      this.setState({
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const {userId, pin} = this.state

    return (
      <div className="main-container">
        <div className="login-container">
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-log"
            />
          </div>
          <div className="form-container">
            <h1>Welcome Back!</h1>
            <form onSubmit={this.handleForm}>
              <label className="username-label">
                User ID
                <input
                  value={userId}
                  onChange={this.saveUserId}
                  placeholder="Enter User ID"
                  type="text"
                  className="input-box"
                />
              </label>
              <label className="pin-label ">
                PIN
                <input
                  onChange={this.savePin}
                  value={pin}
                  placeholder="Enter PIN"
                  type="text"
                  className="input-box"
                />
              </label>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
