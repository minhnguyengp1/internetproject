import './styles/main.scss'
import React from 'react'
import RootRoutes from './routes/root.routes.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

function App() {
    return (
        <Provider store={store}>
            <RootRoutes />
        </Provider>
    )
}

export default App
