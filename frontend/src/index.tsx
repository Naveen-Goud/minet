import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <Auth0Provider
    domain={'dev-172stydgrhtr1apk.us.auth0.com'}
    clientId={'g9UVWTSP1B83iW5llvAmlqyNCDcZrmFK'}
    authorizationParams={{
      redirect_uri: window.location.origin + '/dashboard',
    }}
  >
    <App />
  </Auth0Provider>,

  document.getElementById('root')
)
