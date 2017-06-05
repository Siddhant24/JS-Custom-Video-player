const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = Array.from(player.querySelectorAll('[data-skip]'));
const ranges = Array.from(player.querySelectorAll('.player__slider'));
const fullscreen = player.querySelector('.full_screen');
const full_screen_icon = document.getElementById('full_screen_icon');
// functions

function togglePlay(){
  if(video.paused){
    video.play();
  }
  else {
    video.pause();
  }
}

function updateButton(){
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
  handleProgress();
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}

function handleProgress(){
  progressBar.style.flexBasis = `${(video.currentTime/video.duration)*100}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullscreenFunc() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);
console.log(isInFullScreen);
    if (!isInFullScreen) {
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullScreen) {
            player.webkitRequestFullScreen();
        } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
        }
        full_screen_icon.setAttribute('src', 'fullscreen-exit-symbol-white.png');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        full_screen_icon.setAttribute('src', 'fullscreen-symbol-white.png');
    }
}

// event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mouseout', () => mousedown = false);

fullscreen.addEventListener('click', fullscreenFunc);
