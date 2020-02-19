export const spotifyConfig = {
    'AUTH_ENDPOINT': "https://accounts.spotify.com/authorize",
    'CLIENT_ID': process.env.REACT_APP_CLIENT_ID,
    'RESPONSE_TYPE': "token",
    'REDIRECT_URI': "http://localhost:3000",
    'SCOPES': 'user-read-private user-read-email user-read-currently-playing user-read-playback-state'
}