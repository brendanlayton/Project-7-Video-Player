var video = document.getElementById("video-1");
var $playPauseButton = document.getElementById("play");
var $pauseButton = '<img src="pause-icon.png" alt="Pause button" />';
var $playButton = '<img src="play-icon.png" alt="Play button" />';
var $muteButton = document.getElementById("mute");
var $unmuteButtonHTML = '<img src="volume-on-icon.png" alt="Unmute button" />';
var $muteButtonHTML = '<img src="volume-off-icon.png" alt="Mute button" />';
var $fullScreenButton = document.getElementById("full-screen");
var $fullScreenHTML = '<img src="fullscreen-icon.png" alt="full screen button" />';
var $seekBar = document.getElementById("seek-bar");
var $timings = document.getElementById("timings");
var ccButton = document.getElementById("captions");
var volumeslider = document.getElementById("volumeslider");





// Play/Pause buttons
function videoPlay() {
	 if (video.paused) {
		 video.play();
		 $playPauseButton.innerHTML = $pauseButton;
	 } else {
		 video.pause();
		 $playPauseButton.innerHTML = $playButton;
	 }
}    

// Event listener for the mute button

$muteButton.addEventListener("click", function() {
  if (video.muted == false) {
    // Mute the video
    video.muted = true;

    // Update the button text
    $muteButton.innerHTML = $muteButtonHTML;
		volumeslider.value = 0;
  } else {
    // Unmute the video
    video.muted = false;

    // Update the button text
    $muteButton.innerHTML = $unmuteButtonHTML;
		volumeslider.value = 100;
  }
});

// Volumn Slider

function setvolume(){
	video.volume = volumeslider.value / 100;
}

volumeslider.addEventListener("change", setvolume, false);


// Event listener for the full-screen button
$fullScreenButton.addEventListener("click", function() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen(); // Firefox
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen(); // Chrome and Safari
  }
});

//function toggleFullScr () {
//	if (document.mozFullScreenElement == null ) {
//		if (vidContainer.requestFullscreen) {
//			vidContainer.requestFullscreen();
//		} else if (vidContainer.mozRequestFullScreen) {
//			vidContainer.mozRequestFullScreen(); // Firefox
//		} else if (vidContainer.webkitRequestFullscreen) {
//			vidContainer.webkitRequestFullscreen(); // Chrome and Safari
//		} 
//	} else {
//			if(document.exitFullscreen) {
//			document.exitFullscreen();
//			} else if(document.mozCancelFullScreen) {
//			document.mozCancelFullScreen();
//			} else if(document.webkitExitFullscreen) {
//			document.webkitExitFullscreen();
//			}
//		}
//}

// Exit full-screen

//function exitFullscreen() {
//  if(document.exitFullscreen) {
//    document.exitFullscreen();
//  } else if(document.mozCancelFullScreen) {
//    document.mozCancelFullScreen();
//  } else if(document.webkitExitFullscreen) {
//    document.webkitExitFullscreen();
//  }
//}
//
//function isVideoInFullsreen() {
//  if (document.fullscreenElement && document.fullscreenElement.nodeName == 'VIDEO') {
//    console.log('Your video is playing in fullscreen');
//  }
//}

//function toggleFullScr () {
//	if (document.fullscreenElement == null ) {
//		vidContainer.requestFullscreen();
//	} else if (document.mozFullScreenElement == null) {
//		vidContainer.mozRequestFullScreen(); // Firefox
//	} else if (document.webkitFullscreenElemen == null) {
//			vidContainer.webkitRequestFullscreen(); // Chrome and Safari
//	} else if (document.fullscreenElement !== null ) {
//			document.exitFullscreen();
//	} else if (document.mozFullScreenElement !== null) {
//			document.mozCancelFullScreen();
//	} else if (document.webkitFullscreenElemen !== null) {
//			document.webkitExitFullscreen();
//	}
//}
// Progress bar

//get HTML5 video time duration
video.addEventListener('loadedmetadata', function() {
    $('.duration').text(video.duration);
});
 
//update HTML5 video current play time
video.addEventListener('timeupdate', function() {
    var currentPos = video.currentTime; //Get currenttime
    var maxduration = video.duration; //Get video duration
    var percentage = 100 * currentPos / maxduration; //in %
    $('.timeBar').css('width', percentage+'%');
});

//seekable - Review this section here - https://www.developphp.com/video/JavaScript/Video-Volume-Change-and-Mute-Programming-Tutorial

var timeDrag = false;   /* Drag status */

$('.progressBar').mousedown(function(e) {
    timeDrag = true;
    updatebar(e.pageX);
});
$(document).mouseup(function(e) {
    if(timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if(timeDrag) {
        updatebar(e.pageX);
    }
});
 
//update Progress Bar control
var updatebar = function(x) {
    var progress = $('.progressBar');
    var maxduration = video.duration; //Video duraiton
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();
 
    //Check within range
    if(percentage > 100) {
        percentage = 100;
    }
    if(percentage < 0) {
        percentage = 0;
    }
 
    //Update progress bar and video currenttime
    $('.timeBar').css('width', percentage+'%');
    video.currentTime = maxduration * percentage / 100;
};

//loop to get HTML5 video buffered data
var startBuffer = function() {
    var maxduration = video.duration;
    var currentBuffer = video.buffered.end(0);
    var percentage = 100 * currentBuffer / maxduration;
    $('.bufferBar').css('width', percentage+'%');
 
    if(currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
};
setTimeout(startBuffer, 500);


// Playback times

//var currentVal = $('.current').text();
//
//function time( currentVal ) {
//    if ( !/:/.test( currentVal ) ) { currentVal += ':00'; }
//    return currentVal.replace(/^\d{1}:/, '0$&').replace(/:\d{1}$/, '$&0' );
//}

function numToMMSS(time){
 var sec = Math.floor(time);
 return (sec < 60 ? "00:" : "") + (sec < 10 ? "0" : "") + sec;
}


//get HTML5 video time duration
$(document).ready(function() {
	var durationTime = numToMMSS(video.duration);
	$('.duration').text(durationTime);
});
 
//update HTML5 video current play time
video.addEventListener('timeupdate', function() {
	var displayTime = numToMMSS(video.currentTime);
	$('.current').text(displayTime);
	//$('.current').text(video.currentTime);
});


// Highlighting Transcript

var textTrack = video.textTracks[0];
var cues = textTrack.cues;
var cue = cues[0];
var transcriptPar = $('#transcript span');


textTrack.oncuechange = function() {
	var cueIndex = this.activeCues[0].id - 1;

	// add highlight class on start of cue
	cues[cueIndex].onenter = function(){
  	transcriptPar[cueIndex].classList.add("highlight");
	};
	
	// remove hightlight class on end of cue
	cues[cueIndex].onexit = function(){
  	transcriptPar[cueIndex].classList.remove("highlight");
	};
};



// Make transcript clickable

var transcript = document.getElementById("transcript");

function whatClicked(evt) {
	// Bind the cue number to the click event
  var clickedCue = evt.target.dataset.cue;
	
	// Get the new start time for the clicked cue
	var newStart = textTrack.cues.getCueById(clickedCue).startTime;
	
	// Change the video's current time to the clicked cue's start time
	video.currentTime = newStart;
}

transcript.addEventListener("click", whatClicked, false);


// Turn on and off close captioning

ccButton.addEventListener("click", function() {
  var captionsEl = document.getElementById('captions');
	
	if (video.textTracks[0].mode == "showing") {
    // hide captions
    video.textTracks[0].mode = "hidden";
		
		// change button color
		captionsEl.classList.add("off");
		
  } else {
		// show captions
    video.textTracks[0].mode = "showing";
		
		// change button background
		captionsEl.classList.remove("off");
  }
});


// ALL HIGHLIGHT VERSIONS

//var video = document.getElementById("video-1");
//var textTracks = video.textTracks; // one for each track element
//var textTrack = textTracks[0]; // corresponds to the first track element
//var kind = textTrack.kind // e.g. "subtitles"
//var mode = textTrack.mode // e.g. "disabled", hidden" or "showing"
//var cues = textTrack.cues;
//var cueText = cues.text; // Transcript text
//var activeCue = textTrack.activeCues[0];

//textTrack.oncuechange = function (){
//  var cue = textTrack.activeCues[0]; // assuming there is only one active cue
//  var cueIndex = activeCue.id - 1;
//
//	cues[cueIndex].onenter = function(){
//  	transcriptPar[cueIndex].classList.add("highlight");
//	};
//	
//	// remove hightlight class on end of cue
//	cues[cueIndex].onexit = function(){
//  	transcriptPar[cueIndex].classList.remove("highlight");
//	};
//}

// Cue = Each item in a track file. There are 16 cues in the file we're using
// 

//textTrack.oncuechange = function () { 
//	transcriptPar
//  	if ( transcriptPar[i].dataset.cue == textTrack.activeCues[0].id ) {
//			transcriptPar[i].classList.add("highlight");
//		} else {
//			transcriptPar[i].classList.remove("highlight");
//		}
//  }
//};

//var transcriptPar = $('#transcript span');
//
//
//textTrack.onCueChange = function() {
//	var cueIndex = textTrack.activeCues[0].id - 1;
//
//	// add highlight class on start of cue
//	textTrack.activeCues[0].addEventListener('onEnter', function(){
//  	transcriptPar[cueIndex].classList.add("highlight");
//		console.log('Enter cue');
//	});
//	
//	// remove hightlight class on end of cue
//	textTrack.activeCues[0].addEventListener('onExit', function(){
//  	transcriptPar[cueIndex].classList.remove("highlight");
//		console.log('Exit cue');
//	});
//};



//function highlighter() {
//	var time = document.getElementById("current");
//	var timeValue = time.innerHTML;
//	for (var i = 0; i < transcriptSpan.length; i++) {
//		if ( timeValue == transcriptSpan[i].dataset.start ) {
//			transcriptSpan[i].classList.add("highlight");
//		} else {
//			transcriptSpan[i].classList.remove("highlight"); 
//		}
//	}
//};

//textTrack.oncuechange = function() {
//	var time = document.getElementById("current");
//	var timeValue = time.innerHTML;
//	for (var i = 0; i < transcriptPar.length; i++) {
//		if ( timeValue == transcriptPar[i].dataset.start) {
//			transcriptPar[i].classList.add("highlight");
//		} else {
//			transcriptPar[i].classList.remove("highlight"); 
//		}
//	}
//};

//var transcriptPar = $('#transcript span');
//
//function highlighter() {
//	var video = document.getElementById("video-1");
//	var textTrack = video.textTracks[0];
//	var cues = textTrack.cues;
//	var cueIndex = cues[0].id - 1;
//
////if ( cues[cueIndex].id == 0) {
////	transcriptPar[0].classList.add("highlight");
////}
//
//	// add highlight class on start of cue
//	cues[cueIndex].onenter = function() {
//  	transcriptPar[cueIndex].classList.add("highlight");
//		console.log('New cue has been entered');
//	}
//	
//	// remove hightlight class on end of cue
//	cues[cueIndex].onexit = function() {
//  transcriptPar[cueIndex].classList.remove("highlight");
//		console.log('Now exiting cue');
//	}
//}

//var video = document.getElementById("video-1");
//var textTrack = video.textTracks[0];
//var cues = textTrack.cues;
//var cue = cues[0];
//var transcriptPar = $('#transcript span');
//var playPauseBtn = document.getElementById("play");
//
//
//
//textTrack.oncuechange function() {
//	var cueIndex = this.activeCues[0].id - 1;
//
//	// add highlight class on start of cue
//	cues[cueIndex].onenter = function(){
//  	transcriptPar[cueIndex].classList.add("highlight");
//	};
//	
//	// remove hightlight class on end of cue
//	cues[cueIndex].onexit = function(){
//  	transcriptPar[cueIndex].classList.remove("highlight");
//	};
//};

// END OF HIGHLIGHT VERSIONS






/*video.addEventListener('timeupdate', function () {
   var $progressBar = document.getElementById('progress-bar');
   var $value = (100 / video.duration) * video.currentTime;
   $progressBar.value = $value;
   //$progressBar.innerHTML = $percentage + '% played';
});*/

//loop to get HTML5 video buffered data

//window.onload = function(){
//
//  video.addEventListener('progress', function() {
//    var bufferedEnd = video.buffered.end(video.buffered.length - 1);
//    var duration =  video.duration;
//    
//		if (duration > 0) {
//      document.getElementById('buffered-amount').style.width = ((bufferedEnd / duration)*100) + "%";
//    }
//  });
//
//  video.addEventListener('timeupdate', function() {
//    var duration =  video.duration;
//    if (duration > 0) {
//      document.getElementById('progress-amount').style.width = ((video.currentTime / duration)*100) + "%";
//    }
//  });
//}



/*video.addEventListener('timeupdate', function ()  {
    var maxduration = video.duration;
    var currentBuffer = video.buffered;
    var percentage = 100 * currentBuffer / maxduration;
		var bufferBar = document.getElementById('buffer-bar');
    bufferBar.style.width = percentage + '%';
	
    if(currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
});
setTimeout(startBuffer, 500);*/

/*var startBuffer = function() {
    var maxduration = video.duration;
    var currentBuffer = video.buffered;
    var percentage = 100 * currentBuffer / maxduration;
		var bufferBar = document.getElementById('buffer-bar');
    bufferBar.style.width = percentage + '%';
	
    if(currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
};
setTimeout(startBuffer, 500);*/


//function updateProgressBar() {
//   var $progressBar = document.getElementById('progress-bar');
//   var $percentage = Math.floor((100 / video.duration) *
//   video.currentTime);
//   $progressBar.value = $percentage;
//   //$progressBar.innerHTML = $percentage + '% played';
//}

/* This might be required for extra credit

    function restart() {
        var video = document.getElementById("video-1");
        video.currentTime = 0;
    }


*/

/*
This came from http://blog.teamtreehouse.com/building-custom-controls-for-html5-videos, however it may not work for this project
as we'll need to show the progress bars as well.
// Event listener for the seek bar
$seekBar.addEventListener("change", function() {
  // Calculate the new time
  var time = video.duration * ($seekBar.value / 100);

  // Update the video time
  video.currentTime = $time;
	
	
});
 

// Update the seek bar as the video plays
video.addEventListener("timeupdate", function() {
  // Calculate the slider value
  var value = (100 / video.duration) * video.currentTime;
	

  // Update the slider value
  $seekBar.value = $value;
	$timings.innerHTML = parseInt($value);
	
});

// Pause the video when the slider handle is being dragged
$seekBar.addEventListener("mousedown", function() {
  video.pause();
});

// Play the video when the slider handle is dropped
$seekBar.addEventListener("mouseup", function() {
  video.play();
});

*/

// Mute/Unmute buttons
    
//	function videoVolumne () {
//       var video = document.getElementById("video-1");
//       var volumneButton = document.getElementById("mute");
//       if (video.muted == false) {
//         video.muted = true;
//				 volumneButton.innerHTML = muteButton;
//       } else {
//         video.muted = false;
//				 volumneButton.innerHTML = unmuteButton;
//       }
//    }
//
//    function skip(value) {
//        var video = document.getElementById("video-1");
//        video.currentTime += value;
//    }  


// For Highlighting Transcript

/*

var videoElement = document.querySelector('video');
var textTrack = videoElement.textTracks[0]; // there's only one!

var data = document.getElementById('data');
textTrack.oncuechange = function() {
  // 'this' is a textTrack
  var cue = this.activeCues[0]; // assuming there is only one active cue
  if (cue) {
    data.innerHTML = cue.startTime + '-' + cue.endTime + ': ' + cue.text +
      '<br />' + data.innerHTML;
    //  var obj = JSON.parse(cue.text); // cues can be data too :)
  }
};



*/
