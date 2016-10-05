// Variables

var video;
var vidContainer;
var playPauseBtn;
var playBtn = '<img src="icons/play-icon.png" alt="Play button" />';
var pauseBtn = '<img src="icons/pause-icon.png" alt="Pause button" />';
var progressControl;
var progressBar;
var seekslider;
var buffTime = document.getElementById('buffered-amount');
var currentText;
var durationText;
var muteBtn;
var unmuteBtnHTML = '<img src="icons/volume-on-icon.png" alt="Unmute button" />';
var muteBtnHTML = '<img src="icons/volume-off-icon.png" alt="Mute button" />';
var volumeslider;
var enterFullscreen;
var exitFullscreen;
var fullScrBtnHTML = '<img src="icons/fullscreen-icon.png" alt="full screen button" />';
var exFullScrBtnHTML = '<i class="material-icons">fullscreen_exit</i>';
var ccBtn;
var speedSelect;
var transcript;
var transcriptSpan;
var textTrack;


function intializePlayer() {
	// Asign DOM elements to variables
	video = document.getElementById("video-1");
	vidContainer = document.getElementById("video-container");
	playPauseBtn = document.getElementById("play");
	progressControl = document.getElementById("progress-control");
	progressBar = document.getElementById("progressBar");
	seekslider = document.getElementById("seekslider");
	currentText = document.getElementById("current");
	durationText = document.getElementById("duration");
	muteBtn = document.getElementById("mute");
	volumeslider = document.getElementById("volumeslider");
	enterFullscreen = document.getElementById("enterFullscreen");
	exitFullscreen = document.getElementById("exitFullscreen");
	ccBtn = document.getElementById("captions");
	speedSelect = document.getElementById("speedSelect");
	transcript = document.getElementById("transcript");
	transcriptSpan = transcript.getElementsByTagName("span");
	textTrack = video.textTracks[0];
	
	// Add event listeners
	playPauseBtn.addEventListener("click", videoPlay, false);
	video.addEventListener("ended", videoEnd, false);
	progressControl.addEventListener("mousedown", seekMD, false);
	progressControl.addEventListener("mouseup", seekMU, false);
	progressControl.addEventListener("mousemove", seekMM, false);
	video.addEventListener("progress", videoBuffer, false);
	video.addEventListener("timeupdate", seektimeupdate, false);
	muteBtn.addEventListener("click", videoMute, false);
	volumeslider.addEventListener("change", setvolume, false);
	enterFullscreen.addEventListener("click", toFullScr, false);
	exitFullscreen.addEventListener("click", exitFullScr, false);
	ccBtn.addEventListener("click", ccToggle, false);
	video.addEventListener("timeupdate", highlighter, false);
	speedSelect.addEventListener("change", changeSpeed, false);
	transcript.addEventListener("click", whatClicked, false);
}

window.onload = intializePlayer;


// Play/Pause buttons

function videoPlay() {
		//highlighter();
	 if (video.paused) {
		 video.play();
		 playPauseBtn.innerHTML = pauseBtn;
	 } else {
		 video.pause();
		 playPauseBtn.innerHTML = playBtn;
	 }
}    

// Return to Play button at the end of the video

function videoEnd() {
	playPauseBtn.innerHTML = playBtn;
}

// Seek bar

function seektimeupdate() {
	var newTime = video.currentTime * (100 / video.duration);
	seekslider.style.width = newTime + "%";
	
	var curmins = Math.floor(video.currentTime / 60);
	var cursecs = Math.floor(video.currentTime - curmins * 60);
	var durmins = Math.floor(video.duration / 60);
	var dursecs = Math.floor(video.duration - durmins * 60);
	if(cursecs < 10) { cursecs= "0"+cursecs; }
	if(dursecs < 10) { dursecs = "0"+dursecs; }
	if(curmins < 10) { curmins= "0"+curmins; }
	if(durmins < 10) { durmins = "0"+durmins; }
	currentText.innerHTML = curmins+":"+cursecs;
	durationText.innerHTML = durmins+":"+dursecs;
}

var timeDrag = false;   /* Drag status */

function seekMD(event) {
	timeDrag = true;
	video.pause();
	updatebar(event.pageX);
}

function seekMU(event) {
	if (timeDrag) {
		timeDrag = false;
		video.play();
		updatebar(event.pageX);
	}
}

function seekMM(event) {
	if(timeDrag) {
		updatebar(event.pageX);
  }
}
 
// update Progress Bar control - used jQuery here because counldn't figure out the Javascript equivalent of width().

var updatebar = function(x) {
    var progress = $('#progressBar');
    var maxduration = video.duration; //Video duraiton
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();
 
    // Check within range
    if(percentage > 100) {
        percentage = 100;
    }
    if(percentage < 0) {
        percentage = 0;
    }
 
    // Update progress bar and video currentTime
    $('#seekslider').css('width', percentage+'%');
    video.currentTime = maxduration * percentage / 100;
};


// Buffer

function videoBuffer() {
    var bufferedEnd = video.buffered.end(video.buffered.length - 1);
    var duration =  video.duration;
    buffTime.style.width = ((bufferedEnd / duration)*100) + "%";

	
	if(bufferedEnd < duration) {
       setTimeout(videoBuffer, 500);
   }
}

setTimeout(videoBuffer, 500);


// Mute/unmute button

function videoMute() {
	if (video.muted === false) {
    // Mute the video
    video.muted = true;

    // Update the button text
    muteBtn.innerHTML = muteBtnHTML;
		volumeslider.value = 0;
  } else {
    // Unmute the video
    video.muted = false;

    // Update the button text
    muteBtn.innerHTML = unmuteBtnHTML;
		volumeslider.value = 100;
  }
}

// Volumn Slider

function setvolume(){
	video.volume = volumeslider.value / 100;
	if (volumeslider.value > 0) {
		
		// Unmute video if muted and volume slide changed to > 0
		video.muted = false;

    // Update the button text
    muteBtn.innerHTML = unmuteBtnHTML;
	}
}


// Turn on and off closed captioning

function ccToggle() {
	
	if (video.textTracks[0].mode == "showing") {
    // hide captions
    video.textTracks[0].mode = "hidden";
		
		// change button color
		ccBtn.classList.add("off");
		
  } else {
		// show captions
    video.textTracks[0].mode = "showing";
		
		// change button background
		ccBtn.classList.remove("off");
  }
}


// Enter full-screen

function toFullScr() {
	if (document.fullscreenElement === null && vidContainer.requestFullscreen ) {
			vidContainer.requestFullscreen();
			enterFullscreen.innerHTML = "";
			exitFullscreen.innerHTML = exFullScrBtnHTML;
	} else if (document.mozFullScreenElement === null && vidContainer.mozRequestFullScreen ) {
			vidContainer.mozRequestFullScreen(); // Firefox
			enterFullscreen.innerHTML = "";
			exitFullscreen.innerHTML = exFullScrBtnHTML;
	} else if (document.webkitFullscreenElement === null && vidContainer.webkitRequestFullscreen ) {
			vidContainer.webkitRequestFullscreen(); // Chrome and Safari
			enterFullscreen.innerHTML = "";
			exitFullscreen.innerHTML = exFullScrBtnHTML;
	}
}


// Exit full-screen

function exitFullScr() {
	if (document.fullscreenElement !== null && document.exitFullscreen ) {
			document.exitFullscreen();
			enterFullscreen.innerHTML = fullScrBtnHTML;
			exitFullscreen.innerHTML = "";
	} else if (document.mozFullScreenElement !== null && document.mozCancelFullScreen ) {
			document.mozCancelFullScreen(); // Firefox
			enterFullscreen.innerHTML = fullScrBtnHTML;
			exitFullscreen.innerHTML = "";
	} else if (document.webkitFullscreenElement !== null && document.webkitExitFullscreen ) {
			document.webkitExitFullscreen(); // Chrome and Safari
			enterFullscreen.innerHTML = fullScrBtnHTML;
			exitFullscreen.innerHTML = "";
	} 
}


// Playback speed buttons

function changeSpeed() {
	if ( speedSelect.value == "slow" ) {
		video.playbackRate = 0.75;
	} else if ( speedSelect.value == "fast" ) {
		video.playbackRate = 1.25;
	} else if ( speedSelect.value == "normal" ) {
		video.playbackRate = 1;
	}
}


// Highlighting Transcript

function highlighter() {
	var time = Math.floor(video.currentTime);
	for (var i = 0; i < transcriptSpan.length; i++) {
		if ( time >= parseInt(transcriptSpan[i].dataset.start) && time <= parseInt(transcriptSpan[i].dataset.end) ) {
			transcriptSpan[i].classList.add("highlight");
		} else {
			transcriptSpan[i].classList.remove("highlight"); 
		}
	}
}


// Make transcript clickable

function whatClicked(evt) {
	// Bind the cue number to the click event
  var clickedCue = evt.target.dataset.cue;
	
	// Get the new start time for the clicked cue
	var newStart = textTrack.cues.getCueById(clickedCue).startTime;
	
	// Change the video's current time to the clicked cue's start time
	video.currentTime = newStart;
}


// This "Highlighter "version didn't work in Chrome or Safari

//var textTrack = video.textTracks[0];
//var cues = textTrack.cues;
//var cue = cues[0];
//var transcript = document.getElementById("transcript");
//var transcriptSpan = transcript.getElementsByTagName("span");
//
//
//textTrack.oncuechange = function() {
//	var cueIndex = this.activeCues[0].id - 1;
//
//	// add highlight class on start of cue
//	cues[cueIndex].onenter = function(){
//  	transcriptSpan[cueIndex].classList.add("highlight");
//	};
//	
//	// remove hightlight class on end of cue
//	cues[cueIndex].onexit = function(){
//  	transcriptSpan[cueIndex].classList.remove("highlight");
//	};
//};
