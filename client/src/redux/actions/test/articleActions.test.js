import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import axios from 'axios'
import * as actionTypes from '../../constants/articleActionTypes'
import * as actions from '../articleActions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
    userLogin: {
        accessToken: 'fakeAccessToken',
        userId: 1,
    },
}

describe('Article Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks()
    })

    test('fetchArticles creates ARTICLES_LIST_SUCCESS when fetching articles has been done', async () => {
        const mockData = [{ id: 1, title: 'Test Article' }]
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.ARTICLES_LIST_REQUEST },
            { type: actionTypes.ARTICLES_LIST_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.fetchArticles())
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchArticles creates ARTICLES_LIST_FAIL when fetching articles fails', async () => {
        const mockError = 'Failed to fetch articles'
        axios.get.mockRejectedValue(new Error(mockError))

        const expectedActions = [
            { type: actionTypes.ARTICLES_LIST_REQUEST },
            { type: actionTypes.ARTICLES_LIST_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.fetchArticles())
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchArticleById creates ARTICLE_DETAILS_SUCCESS when fetching article by id has been done', async () => {
        const mockData = { id: 1, title: 'Test Article' }
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.ARTICLE_DETAILS_REQUEST },
            { type: actionTypes.ARTICLE_DETAILS_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.fetchArticleById(1))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchArticleById creates ARTICLE_DETAILS_FAIL when fetching article by id fails', async () => {
        const mockError = 'Failed to fetch article details'
        axios.get.mockRejectedValue(new Error(mockError))

        const expectedActions = [
            { type: actionTypes.ARTICLE_DETAILS_REQUEST },
            { type: actionTypes.ARTICLE_DETAILS_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.fetchArticleById(1))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('createArticle creates ARTICLE_CREATE_SUCCESS when creating article has been done', async () => {
        axios.post.mockResolvedValue({})

        const formData = new FormData()
        formData.append('title', 'Test Article')

        const expectedActions = [
            { type: actionTypes.ARTICLE_CREATE_REQUEST },
            { type: actionTypes.ARTICLE_CREATE_SUCCESS },
        ]

        await store.dispatch(actions.createArticle(formData))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('createArticle creates ARTICLE_CREATE_FAIL when creating article fails', async () => {
        const mockError = 'Failed to create article'
        axios.post.mockRejectedValue(new Error(mockError))

        const formData = new FormData()
        formData.append('title', 'Test Article')

        const expectedActions = [
            { type: actionTypes.ARTICLE_CREATE_REQUEST },
            { type: actionTypes.ARTICLE_CREATE_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.createArticle(formData))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('updateArticle creates ARTICLE_UPDATE_SUCCESS when updating article has been done', async () => {
        axios.put.mockResolvedValue({})

        const formData = new FormData()
        formData.append('title', 'Updated Article')

        const expectedActions = [
            { type: actionTypes.ARTICLE_UPDATE_REQUEST },
            { type: actionTypes.ARTICLE_UPDATE_SUCCESS },
        ]

        await store.dispatch(actions.updateArticle(1, formData))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('updateArticle creates ARTICLE_UPDATE_FAIL when updating article fails', async () => {
        const mockError = 'Failed to update article'
        axios.put.mockRejectedValue(new Error(mockError))

        const formData = new FormData()
        formData.append('title', 'Updated Article')

        const expectedActions = [
            { type: actionTypes.ARTICLE_UPDATE_REQUEST },
            { type: actionTypes.ARTICLE_UPDATE_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.updateArticle(1, formData))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('deleteArticle creates ARTICLE_DELETE_SUCCESS when deleting article has been done', async () => {
        axios.delete.mockResolvedValue({})

        const expectedActions = [
            { type: actionTypes.ARTICLE_DELETE_REQUEST },
            { type: actionTypes.ARTICLE_DELETE_SUCCESS, payload: 1 },
        ]

        await store.dispatch(actions.deleteArticle(1))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('deleteArticle creates ARTICLE_DELETE_FAIL when deleting article fails', async () => {
        const mockError = 'Failed to delete article'
        axios.delete.mockRejectedValue(new Error(mockError))

        const expectedActions = [
            { type: actionTypes.ARTICLE_DELETE_REQUEST },
            { type: actionTypes.ARTICLE_DELETE_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.deleteArticle(1))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('setSelectedCategory creates SET_SELECTED_CATEGORY', () => {
        const category = 'Test Category'
        const expectedAction = {
            type: actionTypes.SET_SELECTED_CATEGORY,
            payload: category,
        }

        expect(actions.setSelectedCategory(category)).toEqual(expectedAction)
    })

    test('resetArticleUpdate creates ARTICLE_UPDATE_RESET', () => {
        const expectedAction = {
            type: actionTypes.ARTICLE_UPDATE_RESET,
        }

        expect(actions.resetArticleUpdate()).toEqual(expectedAction)
    })

    test('resetArticleCreate creates ARTICLE_CREATE_RESET', () => {
        const expectedAction = {
            type: actionTypes.ARTICLE_CREATE_RESET,
        }

        expect(actions.resetArticleCreate()).toEqual(expectedAction)
    })
})
