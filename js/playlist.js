class Player {
  constructor(container, songData) {
    this.container = document.querySelector(container);
    this.player = new Audio();
    this.songData = songData;
    this.songs = [];
    
    this.container.innerHTML=`
            <div class="player">
          <div class="player__image-box">
            <img src="./images/pexels-dellon-thomas-3394347.jpg" alt="" class="player__image">
          </div>
          <div class="player__title">Give it all</div>
          <div class="player__artist">john mario</div>
          
          <div class="player__progress-container">
          <time class="player__time-elasped">--:--</time>
            
            <div class="player__progress">
              <div class="player__progress-fill"></div>
            <div class="player__buffer-progress"></div>
            </div>
          <time class="player__duration">--:--</time>
          </div>
          <div class="player__controls-container">
            <button class="player__control-btn fi-rr-rewind" id="prev_btn"></button>
            <button class="player__control-btn flaticon-play-button" id="play_pause_btn"></button>
            <button class="player__control-btn fi-rr-forward" id="next_btn"></button>
          </div>
        </div>
        <div class="song-list-container">
          <div class="song-list-header"><span>up next</span></div>
        <ul class="song-list">

        </ul>
        </div>
`;
this.playerContainer=this.container.getElementById('player');
this.playlistContainer=this.container.querySelector('.song-list');
this.playerImage=this.container.querySelector('.player__image');
this.playerTitle=this.container.querySelector('.player__title');
this.playerArtist=this.container.querySelector('.player__artist');
this.playerProgress=this.container.querySelector('.player__progress');
this.playerProgressFill=this.container.querySelector('.player__progress-fill');
this.playerBufferProgress=this.container.querySelector('.player__buffer-progress');
this.playerDuration=this.container.querySelector('.player__duration');
this.playerTimeElasped=this.container.querySelector('.player__time-elasped');

// controls 
this.playPauseBtn=this.container.getElementById('play_pause_btn');
this.prevBtn=this.container.getElementById('next_btn');
this.nextBtn=this.container.getElementById('prev_btn');


// event listeners
this.playPauseBtn.addEventListener('click',()=>{
  this.playPauseSong();
});
this.prevBtn.addEventListener('click',()=>{
  this.prevSong();
});
this.nextBtn.addEventListener('click',()=>{
  this.nextSong();
});
this.player.addEventListener('timeupdate',()=>{
  this.onTimeUpdate();
});
this.player.addEventListener('loadedmetadata',()=>{
  this.onMetaDataLoad();
});
this.player.addEventListener('progress',()=>{
  this.onProgress();
});
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
  onMetaDataLoad(){
    const {duration} = this.player;
    const MINUTES = Math.floor(duration/60);
    let seconds = Math.floor(duration%60);
    seconds < 10 ? '0'+seconds : seconds;
this.playerDuration.textContent=`${MINUTES}:${seconds}`;
}
onTimeUpdate(){
      const {currentTime,duration} = this.player;
    const MINUTES = Math.floor(currentTime/60);
    let seconds = Math.floor(currentTime%60);
    seconds < 10 ? '0'+seconds : seconds;
this.playerTimeElasped.textContent=`${MINUTES}:${seconds}`;
this.playerProgressFill.style.width=(100/duration * currentTime)+'%';
}
seekPlayer(){
  const {currentTime}=this.player
}
onProgress(){

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
new Player('#playlist_container',[{}])