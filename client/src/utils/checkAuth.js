export const loadAuthState = () => {
    const token = localStorage.getItem('token')
    if (token) {
        return {
            isAuthenticated: true,
            token: token,
        }
    } else {
        return null
    }
}
