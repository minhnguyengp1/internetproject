import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import App from './App'
import RootRoutes from './routes/root.routes.jsx'
import '@testing-library/jest-dom'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
    userLogin: { isAuthenticated: false }
}

const store = mockStore(initialState)

jest.mock('./routes/root.routes.jsx', () => () => <div>Mocked RootRoutes</div>)

describe('App', () => {
    test('renders without crashing', () => {
        const { getByText } = render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        expect(getByText('Mocked RootRoutes')).toBeInTheDocument()
    })
})
