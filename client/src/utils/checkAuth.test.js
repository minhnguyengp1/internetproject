import { loadAuthState } from './checkAuth'

describe('loadAuthState', () => {
    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks()
    })

    it('should return null if no token is found in localStorage', () => {
        // Mock localStorage.getItem to return null
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

        const result = loadAuthState()

        expect(result).toBeNull()
    })

    it('should return an auth state object if a token is found in localStorage', () => {
        const mockToken = 'mockToken123'

        // Mock localStorage.getItem to return a mock token
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockToken)

        const expectedAuthState = {
            isAuthenticated: true,
            token: mockToken,
        }

        const result = loadAuthState()

        expect(result).toEqual(expectedAuthState)
    })

    it('should call localStorage.getItem with "token"', () => {
        // Spy on localStorage.getItem
        const getItemSpy = jest.spyOn(Storage.prototype, 'getItem')

        loadAuthState()

        expect(getItemSpy).toHaveBeenCalledWith('token')
    })
})
