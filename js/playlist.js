class Player {
  constructor(container, songData) {
    this.container = container;
    this.player = new Audio();
    this.songData = songData;
    this.songs = [];
    this.container.innerHTML=`
    

`
  }

  playPauseSong() {
    const IS_PLAYING = this.container.classList.contains('playing');
    if (IS_PLAYING) {
      this.pauseSong();
    }
    else {
      this.playSong()
    }
  }
  playSong() {
    this.container.classList.add('playing');
    this.player.play()
  }
  pauseSong() {
    this.container.classList.remove('playing');
    this.player.pause();
  }
  nextSong() {
    const SONGS = this.songs;
    this.songIndex += 1;
    if (this.songIndex > SONGS.length - 1) {
      this.songIndex = 0;
    }
    this._updateActiveSong(this.songs[this.songIndex]);

  }
  prevSong() {
    const SONGS = this.songs;
    this.songIndex -= 1;
    if (this.songIndex < 0) {
      this.songIndex = SONGS.length - 1;
    }
    this._updateActiveSong(this.songs[this.songIndex]);
  }
  async _loadSongs() {

    if (typeof this.songData == 'string') {
      const RESPONSE = await fetch(this.songData);
      const DATA = await RESPONSE.json();
      this.songs.push(...DATA)
    }
    else {
      this.songs.push(...this.songData)
    }
    this._updatePlaylist(this.songs);
    this._setActiveSong(this.songs[this.songIndex]);
  }
  _setActiveSong(song = {}) {
    this.playerImage = song.cover;
    this.playerTitle = song.title;
    this.playerArtist = song.artist;
    this.player.src = song.url;
  }
  _updatePlaylist(songs) {
    for (const song of songs) {

      this.playlistContainer.innerHTML += this._createHTMLList({ id: song.id, cover: song.cover, artist: song.artist, url: song.url, title: song.title })
    }
    this.playListItems = this.playlistContainer.querySelectorAll('.song-item');
    this.playListItems.forEach(function(playListItem, index) {
      playListItem.addEventListener('click', function() {
        const PLAYLIST_ITEM_ID = playListItem.songId;
        const SONG = this.songs.find(function(song) {
          return song.id === PLAYLIST_ITEM_ID;
          this._updateActiveSong(SONG);
          this.songIndex = index;
        });
      });
    });

  }
  _updateActiveSong(song = {}) {
    this.playerImage = song.cover;
    this.playerTitle = song.title;
    this.playerArtist = song.artist;
    this.player.src = song.url;

    this.playlistContainer.querySelector('.active--song-item').classList.remove('active--song-item');
    this.playlistContainer.querySelector(`.song-item[data-song-id='${song.id}']`).classList.add('active--song-item');
  }

  _createHTMLList({ id, cover, url, title, artist } = {}) {
    return (`<li class='song-item' data-song-id='${id}'>
  <div class='song-item__image-box'>
  <img class='song-item__image' src='${cover}' alt='${artist}' /> </div>
  <div class='song-item__info-container' aria-label='${title} by ${artist}'>
  <strong class='song-item__title'>${title} </strong><br/>
  <span class='song-item__artist'>${artist}</span>
  <audio src='${url}'></audio>
  <span class='song-item__duration'>4:50</span>
  </div>
  </li>`)
  }
}