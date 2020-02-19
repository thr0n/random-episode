import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Button, Heading } from 'rebass'

import { spotifyConfig } from "./configuration/spotify"
import { sampleAlbums } from "./sample_response.js"

const hash = window.location.hash.substring(1).split("&").reduce((acc, item) => {
  if (item) {
    const parts = item.split("=")
    acc[parts[0]] = decodeURIComponent(parts[1])
  }
  return acc;
}, {});

const prod = process.env.NODE_ENV === 'production'

class App extends React.Component {
  state = {
    token: ""
  }

  componentDidMount() {
    let token = hash.access_token;
    if (token) {
      this.setState({
        token
      });

      if (prod) {
        // call the spotify services
      } else {
        const albums = sampleAlbums.albums.items
        const randomEpisode = albums[Math.floor(Math.random() * sampleAlbums.albums.items.length)]
        this.setState({ albums })
        this.setState({
          randomEpisode: {
            name: randomEpisode.name,
            ref: randomEpisode.external_urls.spotify,
            image: randomEpisode.images[1].url
          }
        })
      }
    }
  }

  startPlayback = () => {
    window.location = this.state.randomEpisode.ref
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Heading
            fontSize={[5, 6, 7]}
            color='lightgrey'>
            Was hören wir heute?
          </Heading>
          {!this.state.token && (
            <div>
              <img src={logo} className="App-logo" alt="logo"></img>
              <p><a className="App-link" href={`${spotifyConfig.AUTH_ENDPOINT}?client_id=${spotifyConfig.CLIENT_ID}` + (spotifyConfig.SCOPES ? '&scope=' + encodeURIComponent(spotifyConfig.SCOPES) : '')
                + `&response_type=${spotifyConfig.RESPONSE_TYPE}&redirect_uri=${spotifyConfig.REDIRECT_URI}&show_dialog=true`}>
                Login
                  </a>
              </p>
            </div>)}

          {(this.state.albums && this.state.albums.length > 0) && (
            <div>
              <img src={this.state.randomEpisode.image} alt="album_cover" />
              <div id="controls">
                <Button onClick={() => this.startPlayback()} variant='primary' mr='2'>Play</Button>
                {/* <Button variant='outline' disabled>Shuffle</Button> */}
              </div>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
