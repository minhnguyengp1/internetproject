import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { loadAuthState } from './utils/checkAuth.js'

const root = ReactDOM.createRoot(document.getElementById('root'))

const preloadedState = loadAuthState()

if (preloadedState) {
    store.dispatch({
        type: 'AUTH_RESTORE',
        payload: preloadedState,
    })
}

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
