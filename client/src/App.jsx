import './styles/main.scss'
import React from 'react'
import RootRoutes from './routes/root.routes.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { SearchProvider } from './context/SearchContext.jsx'

function App() {
    return (
        <Provider store={store}>
            <SearchProvider>
                <RootRoutes />
            </SearchProvider>
        </Provider>
    )
}

export default App
