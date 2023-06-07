import {Component} from 'react'
import {Redirect} from 'react-router-dom'
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
    // console.log(data)
    const jwtToken = data.jwt_token
    if (response.ok) {
      Cookies.set('jwt_token', jwtToken, {expires: 10})
      //   console.log(this.props)
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const {userId, pin, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

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
                  type="password"
                  className="input-box"
                />
              </label>
              <button type="submit" className="login-btn">
                Login
              </button>
              {errorMsg && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
