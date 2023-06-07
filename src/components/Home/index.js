import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  logoutTheSession = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/ebank/login')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <button
            onClick={this.logoutTheSession}
            type="button"
            className="logout-btn"
          >
            Logout
          </button>
        </nav>
        <div className="visa-container">
          <h1>Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card-img"
          />
        </div>
      </div>
    )
  }
}

export default Home
