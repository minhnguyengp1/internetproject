import {
    articleListReducer,
    articleDetailsReducer,
    articleDeleteReducer,
    articleCreateReducer,
    articleUpdateReducer,
} from '../articleReducer'
import * as actionTypes from '../../constants/articleActionTypes'

describe('articleListReducer', () => {
    const initialState = { articles: [], selectedCategory: null }

    it('should return the initial state', () => {
        expect(articleListReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ARTICLES_LIST_REQUEST', () => {
        expect(
            articleListReducer(initialState, {
                type: actionTypes.ARTICLES_LIST_REQUEST,
            })
        ).toEqual({ ...initialState, loading: true, articles: [], error: null })
    })

    it('should handle ARTICLES_LIST_SUCCESS', () => {
        const payload = [{ id: 1, title: 'Test Article' }]
        expect(
            articleListReducer(initialState, {
                type: actionTypes.ARTICLES_LIST_SUCCESS,
                payload,
            })
        ).toEqual({
            ...initialState,
            loading: false,
            articles: payload,
            error: null,
        })
    })

    it('should handle ARTICLES_LIST_FAIL', () => {
        const payload = 'Error message'
        expect(
            articleListReducer(initialState, {
                type: actionTypes.ARTICLES_LIST_FAIL,
                payload,
            })
        ).toEqual({
            ...initialState,
            loading: false,
            error: payload,
            articles: [],
        })
    })

    it('should handle SET_SELECTED_CATEGORY', () => {
        const payload = 'category1'
        expect(
            articleListReducer(initialState, {
                type: actionTypes.SET_SELECTED_CATEGORY,
                payload,
            })
        ).toEqual({ ...initialState, selectedCategory: payload })
    })
})

describe('articleDetailsReducer', () => {
    const initialState = { article: {} }

    it('should return the initial state', () => {
        expect(articleDetailsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ARTICLE_DETAILS_REQUEST', () => {
        expect(
            articleDetailsReducer(initialState, {
                type: actionTypes.ARTICLE_DETAILS_REQUEST,
            })
        ).toEqual({ loading: true, ...initialState })
    })

    it('should handle ARTICLE_DETAILS_SUCCESS', () => {
        const payload = { id: 1, title: 'Test Article' }
        expect(
            articleDetailsReducer(initialState, {
                type: actionTypes.ARTICLE_DETAILS_SUCCESS,
                payload,
            })
        ).toEqual({ loading: false, article: payload })
    })

    it('should handle ARTICLE_DETAILS_FAIL', () => {
        const payload = 'Error message'
        expect(
            articleDetailsReducer(initialState, {
                type: actionTypes.ARTICLE_DETAILS_FAIL,
                payload,
            })
        ).toEqual({ loading: false, error: payload })
    })
})

describe('articleDeleteReducer', () => {
    it('should return the initial state', () => {
        expect(articleDeleteReducer(undefined, {})).toEqual({})
    })

    it('should handle ARTICLE_DELETE_REQUEST', () => {
        expect(
            articleDeleteReducer(
                {},
                { type: actionTypes.ARTICLE_DELETE_REQUEST }
            )
        ).toEqual({ loading: true })
    })

    it('should handle ARTICLE_DELETE_SUCCESS', () => {
        expect(
            articleDeleteReducer(
                {},
                { type: actionTypes.ARTICLE_DELETE_SUCCESS }
            )
        ).toEqual({ loading: false, success: true })
    })

    it('should handle ARTICLE_DELETE_FAIL', () => {
        const payload = 'Error message'
        expect(
            articleDeleteReducer(
                {},
                { type: actionTypes.ARTICLE_DELETE_FAIL, payload }
            )
        ).toEqual({ loading: false, error: payload })
    })
})

describe('articleCreateReducer', () => {
    it('should return the initial state', () => {
        expect(articleCreateReducer(undefined, {})).toEqual({})
    })

    it('should handle ARTICLE_CREATE_REQUEST', () => {
        expect(
            articleCreateReducer(
                {},
                { type: actionTypes.ARTICLE_CREATE_REQUEST }
            )
        ).toEqual({ loading: true })
    })

    it('should handle ARTICLE_CREATE_SUCCESS', () => {
        expect(
            articleCreateReducer(
                {},
                { type: actionTypes.ARTICLE_CREATE_SUCCESS }
            )
        ).toEqual({ loading: false, success: true })
    })

    it('should handle ARTICLE_CREATE_FAIL', () => {
        const payload = 'Error message'
        expect(
            articleCreateReducer(
                {},
                { type: actionTypes.ARTICLE_CREATE_FAIL, payload }
            )
        ).toEqual({ loading: false, error: payload })
    })

    it('should handle ARTICLE_CREATE_RESET', () => {
        expect(
            articleCreateReducer({}, { type: actionTypes.ARTICLE_CREATE_RESET })
        ).toEqual({})
    })
})

describe('articleUpdateReducer', () => {
    it('should return the initial state', () => {
        expect(articleUpdateReducer(undefined, {})).toEqual({})
    })

    it('should handle ARTICLE_UPDATE_REQUEST', () => {
        expect(
            articleUpdateReducer(
                {},
                { type: actionTypes.ARTICLE_UPDATE_REQUEST }
            )
        ).toEqual({ loading: true })
    })

    it('should handle ARTICLE_UPDATE_SUCCESS', () => {
        expect(
            articleUpdateReducer(
                {},
                { type: actionTypes.ARTICLE_UPDATE_SUCCESS }
            )
        ).toEqual({ loading: false, success: true })
    })

    it('should handle ARTICLE_UPDATE_FAIL', () => {
        const payload = 'Error message'
        expect(
            articleUpdateReducer(
                {},
                { type: actionTypes.ARTICLE_UPDATE_FAIL, payload }
            )
        ).toEqual({ loading: false, error: payload })
    })

    it('should handle ARTICLE_UPDATE_RESET', () => {
        expect(
            articleUpdateReducer({}, { type: actionTypes.ARTICLE_UPDATE_RESET })
        ).toEqual({})
    })
})
