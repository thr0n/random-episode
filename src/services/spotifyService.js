import 'axios' from 'axios'

// This is the id you are looking for: 3meJIgRw7YleJrmbpbJK6S

export const getCurrentlyPlaying(token) {
    axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(response => {
        console.log("success: " + JSON.stringify(response.data))
    }).catch(err => {
        console.log("error: " + err)
    })
}

export const findArtist(token, artist) {
    axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(response => {
        const {
            data
        } = response;
        console.log("success: " + JSON.stringify(data.artists.items))
    }).catch(err => {
        console.log("error: " + err)
    })
}

export const findAlbums(token, artist) {
    axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=album`, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(response => {
        console.log("success: " + JSON.stringify(response.data))
    }).catch(err => {
        console.log("error: " + err)
    })
}