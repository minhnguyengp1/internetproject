import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import CreateArticle from './CreateArticle'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../components/Header/Header.jsx', () => () => <div>Header</div>)

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
    articleCreate: { success: false }
}

const store = mockStore(initialState)

describe('CreateArticle', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders the CreateArticle component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateArticle />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Titel')).toBeInTheDocument()
        expect(screen.getByText('Kategorie')).toBeInTheDocument()
        expect(screen.getByText('Preis')).toBeInTheDocument()
        expect(screen.getByText('Typ')).toBeInTheDocument()
        expect(screen.getByText('Beschreibung')).toBeInTheDocument()
        expect(screen.getByText('Stadt')).toBeInTheDocument()
        expect(screen.getByText('Upload')).toBeInTheDocument()
        expect(screen.getByText('Anzeige aufgeben')).toBeInTheDocument()
    })

    test('handles form submission correctly', async () => {
        store.dispatch = jest.fn()

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateArticle />
                </MemoryRouter>
            </Provider>
        )

        fireEvent.change(screen.getByLabelText('Titel'), {
            target: { value: 'Test Title' }
        })
        fireEvent.change(screen.getByLabelText('Kategorie'), {
            target: { value: 'category1' }
        })
        fireEvent.change(screen.getByLabelText('Preis'), {
            target: { value: '100' }
        })
        fireEvent.change(screen.getByLabelText('Festpreis'), {
            target: { value: 'Festpreis' }
        })
        fireEvent.change(screen.getByLabelText('Beschreibung'), {
            target: { value: 'Test Description' }
        })
        fireEvent.change(screen.getByLabelText('Stadt'), {
            target: { value: 'city1' }
        })

        fireEvent.submit(screen.getByText('Anzeige aufgeben'))

        await act(async () => {
            expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function))
        })
    })

    test('handles file upload and preview correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateArticle />
                </MemoryRouter>
            </Provider>
        )

        const file = new File(['dummy content'], 'example.png', {
            type: 'image/png'
        })
        const input = screen.getByTestId('uploadsLabel')
    })

    // test('handles removing preview correctly', () => {
    //     render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <CreateArticle />
    //             </MemoryRouter>
    //         </Provider>
    //     )

    //     const file = new File(['dummy content'], 'example.png', {
    //         type: 'image/png',
    //     })
    //     const input = screen.getByText('Upload')

    //     fireEvent.change(input, { target: { files: [file] } })

    //     const removeButton = screen.getByTestId('removeBtn')
    //     fireEvent.click(removeButton)

    //     expect(screen.queryByAltText('Preview 1')).not.toBeInTheDocument()
    // })

    // test('navigates to success page on successful creation', () => {
    //     const successState = {
    //         articleCreate: { success: true },
    //     }
    //     const successStore = mockStore(successState)

    //     render(
    //         <Provider store={successStore}>
    //             <MemoryRouter>
    //                 <CreateArticle />
    //             </MemoryRouter>
    //         </Provider>
    //     )

    //     expect(store.getActions()).toContainEqual(resetArticleCreate())
    // })
})
