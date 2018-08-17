Sound = {
	file : '',
	init: function(){
		if(!Mobile.isMobile){
			var file = 'assets/sound/march.mp3';
			if(!Sound.empty(window.soundFile)){
				file = window.soundFile;
			}
			Sound.file = new Audio(file);
			Sound.file.addEventListener('ended', function() {
			    this.currentTime = 0;
			    this.play();
			}, false);
			Sound.file.volume = 0.3;
			$('.icon-sound').show();
			$('.icon-sound').on('click', function(){Sound.control()});
		}
	},
	playControl: function(){
		Sound.file.play();
		Cookie.set('CT_NO_SOUND', 'false');
	},
	stopControl: function(){
		Sound.file.pause();
		Cookie.set('CT_NO_SOUND', 'true');
	},
	control: function(){
		if(!$('.icon-sound').hasClass('icon-sound-muted')){
	        $('.icon-sound').addClass('icon-sound-muted');
	        Sound.stopControl();
	    }
	    else{
	        $('.icon-sound').removeClass('icon-sound-muted');
	        Sound.playControl();
	    }
	},
	empty: function(item){
		return (item == "" || item == null || item == undefined)
	}
}

$(document).ready(function() {
	Sound.init();
});