import {
    userDetails,
    userArticles,
    userUpdate,
    strangerDetails,
    strangerArticles,
} from '../userReducer'
import * as actionTypes from '../../constants/userActionTypes'
import defaultAvatar from '../../../assets/default-avatar.png'

describe('userReducers', () => {
    describe('userDetails reducer', () => {
        const initialState = {
            userDetails: {
                fullName: '',
                street: '',
                city: '',
                postalCode: '',
                img: defaultAvatar,
            },
            error: null,
            loading: false,
        }

        it('should return the initial state', () => {
            expect(userDetails(undefined, {})).toEqual(initialState)
        })

        it('should handle FETCH_USER_DETAILS_REQUEST', () => {
            expect(
                userDetails(initialState, {
                    type: actionTypes.FETCH_USER_DETAILS_REQUEST,
                })
            ).toEqual({
                ...initialState,
                loading: true,
            })
        })

        it('should handle FETCH_USER_DETAILS_SUCCESS', () => {
            const payload = {
                fullName: 'John Doe',
                street: '123 Main St',
                city: 'City',
                postalCode: '12345',
                img: defaultAvatar,
            }
            expect(
                userDetails(initialState, {
                    type: actionTypes.FETCH_USER_DETAILS_SUCCESS,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                userDetails: payload,
            })
        })

        it('should handle FETCH_USER_DETAILS_FAILURE', () => {
            const payload = 'Error fetching user details'
            expect(
                userDetails(initialState, {
                    type: actionTypes.FETCH_USER_DETAILS_FAILURE,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                error: payload,
            })
        })
    })

    describe('userArticles reducer', () => {
        const initialState = { userArticles: [] }

        it('should return the initial state', () => {
            expect(userArticles(undefined, {})).toEqual(initialState)
        })

        // it('should handle FETCH_USER_ARTICLES_REQUEST', () => {
        //     expect(
        //         userArticles(initialState, {
        //             type: actionTypes.FETCH_USER_ARTICLES_REQUEST,
        //         })
        //     ).toEqual({
        //         ...initialState,
        //         loading: true,
        //     })
        // })

        // it('should handle FETCH_USER_ARTICLES_SUCCESS', () => {
        //     const payload = [
        //         { id: 1, title: 'Article 1' },
        //         { id: 2, title: 'Article 2' },
        //     ]
        //     expect(
        //         userArticles(initialState, {
        //             type: actionTypes.FETCH_USER_ARTICLES_SUCCESS,
        //             payload,
        //         })
        //     ).toEqual({
        //         ...initialState,
        //         userArticles: payload,
        //         loading: false,
        //     })
        // })

        it('should handle FETCH_USER_ARTICLES_FAILURE', () => {
            const payload = 'Error fetching user articles'
            expect(
                userArticles(initialState, {
                    type: actionTypes.FETCH_USER_ARTICLES_FAILURE,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                error: payload,
                userArticles: [],
            })
        })
    })

    describe('userUpdate reducer', () => {
        const initialState = {
            error: null,
            loading: false,
            success: false,
        }

        it('should return the initial state', () => {
            expect(userUpdate(undefined, {})).toEqual(initialState)
        })

        // it('should handle UPDATE_USER_DETAILS_REQUEST', () => {
        //     expect(
        //         userUpdate(initialState, {
        //             type: actionTypes.UPDATE_USER_DETAILS_REQUEST,
        //         })
        //     ).toEqual({
        //         ...initialState,
        //         loading: true,
        //         success: false,
        //     })
        // })

        // it('should handle UPDATE_USER_DETAILS_SUCCESS', () => {
        //     expect(
        //         userUpdate(initialState, {
        //             type: actionTypes.UPDATE_USER_DETAILS_SUCCESS,
        //         })
        //     ).toEqual({
        //         ...initialState,
        //         loading: false,
        //         success: true,
        //     })
        // })

        it('should handle UPDATE_USER_DETAILS_FAILURE', () => {
            const payload = { error: 'Error updating user details' }
            expect(
                userUpdate(initialState, {
                    type: actionTypes.UPDATE_USER_DETAILS_FAILURE,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                error: payload.error,
                success: false,
            })
        })
    })

    describe('strangerDetails reducer', () => {
        const initialState = {
            loading: false,
            strangerDetails: {
                fullName: '',
                street: '',
                city: '',
                postalCode: '',
                img: defaultAvatar,
            },
            error: null,
        }

        it('should return the initial state', () => {
            expect(strangerDetails(undefined, {})).toEqual(initialState)
        })

        it('should handle FETCH_STRANGER_DETAILS_REQUEST', () => {
            expect(
                strangerDetails(initialState, {
                    type: actionTypes.FETCH_STRANGER_DETAILS_REQUEST,
                })
            ).toEqual({
                ...initialState,
                loading: true,
            })
        })

        it('should handle FETCH_STRANGER_DETAILS_SUCCESS', () => {
            const payload = {
                fullName: 'Jane Doe',
                street: '456 Main St',
                city: 'City',
                postalCode: '67890',
                img: defaultAvatar,
            }
            expect(
                strangerDetails(initialState, {
                    type: actionTypes.FETCH_STRANGER_DETAILS_SUCCESS,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                strangerDetails: payload,
            })
        })

        it('should handle FETCH_STRANGER_DETAILS_FAILURE', () => {
            const payload = { error: 'Error fetching stranger details' }
            expect(
                strangerDetails(initialState, {
                    type: actionTypes.FETCH_STRANGER_DETAILS_FAILURE,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                error: payload.error,
            })
        })
    })

    describe('strangerArticles reducer', () => {
        const initialState = {}

        it('should return the initial state', () => {
            expect(strangerArticles(undefined, {})).toEqual(initialState)
        })

        it('should handle FETCH_STRANGER_ARTICLES_REQUEST', () => {
            expect(
                strangerArticles(initialState, {
                    type: actionTypes.FETCH_STRANGER_ARTICLES_REQUEST,
                })
            ).toEqual({
                loading: true,
                error: null,
            })
        })

        it('should handle FETCH_STRANGER_ARTICLES_SUCCESS', () => {
            const payload = [
                { id: 1, title: 'Article 1' },
                { id: 2, title: 'Article 2' },
            ]
            expect(
                strangerArticles(initialState, {
                    type: actionTypes.FETCH_STRANGER_ARTICLES_SUCCESS,
                    payload,
                })
            ).toEqual({
                strangerArticles: payload,
                loading: false,
                error: null,
            })
        })

        it('should handle FETCH_STRANGER_ARTICLES_FAILURE', () => {
            const payload = 'Error fetching stranger articles'
            expect(
                strangerArticles(initialState, {
                    type: actionTypes.FETCH_STRANGER_ARTICLES_FAILURE,
                    payload,
                })
            ).toEqual({
                loading: false,
                error: payload,
            })
        })
    })
})
