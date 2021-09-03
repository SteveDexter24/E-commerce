import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './bootstrap.min.css'

// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers, { initialState } from './reducers'

// Translation Config
import './translateConfig'

// Stripe
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// App component
import App from './app'

// Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Stripe Promise
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(reduxThunk)),
)

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <Suspense fallback="...">
        <App />
      </Suspense>
    </Elements>
  </Provider>,
  document.getElementById('root'),
)
