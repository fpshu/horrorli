function checkSVG() { return !!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect; }
var sounds = {};
sounds[0] = {tooltip : 'purgatory', oggsrc: 'http://horrorli.fps.hu/ogg/purgatory.ogg', src: 'https://api.soundcloud.com/tracks/130600768/stream?secret_token=s-LS7oE&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[1] = {tooltip : 'dead souls', oggsrc: 'http://horrorli.fps.hu/ogg/dead-souls.ogg', src: 'https://api.soundcloud.com/tracks/130600774/stream?secret_token=s-8sVJD&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[2] = {tooltip : 'zombies', oggsrc: 'http://horrorli.fps.hu/ogg/zombies.ogg', src: 'https://api.soundcloud.com/tracks/130600770/stream?secret_token=s-xIkcn&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[3] = {tooltip : 'crows', oggsrc: 'http://horrorli.fps.hu/ogg/crows.ogg', src: 'https://api.soundcloud.com/tracks/130600766/stream?secret_token=s-XMhwP&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[4] = {tooltip : 'singing girls', oggsrc: 'http://horrorli.fps.hu/ogg/singing-girls.ogg', src: 'https://api.soundcloud.com/tracks/130600773/stream?secret_token=s-QTzcH&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[5] = {tooltip : 'swing', oggsrc: 'http://horrorli.fps.hu/ogg/swing.ogg', src: 'https://api.soundcloud.com/tracks/130600775/stream?secret_token=s-vhO7K&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[6] = {tooltip : 'haunted place', oggsrc: 'http://horrorli.fps.hu/ogg/haunted-place.ogg', src: 'https://api.soundcloud.com/tracks/130600776/stream?secret_token=s-kzhDw&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[7] = {tooltip : 'church', oggsrc: 'http://horrorli.fps.hu/ogg/church.ogg', src: 'https://api.soundcloud.com/tracks/130600778/stream?secret_token=s-9kE4r&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[8] = {tooltip : 'whispering', oggsrc: 'http://horrorli.fps.hu/ogg/whispering.ogg', src: 'https://api.soundcloud.com/tracks/130600779/stream?secret_token=s-X18Sz&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 1};
sounds[9] = {tooltip : 'neon lights', oggsrc: 'http://horrorli.fps.hu/ogg/neon-lights.ogg', src: 'https://api.soundcloud.com/tracks/130600769/stream?secret_token=s-nmz9o&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 1};
sounds[10] = {tooltip : 'fear', oggsrc: 'http://horrorli.fps.hu/ogg/fear.ogg', src: 'https://api.soundcloud.com/tracks/130600771/stream?secret_token=s-fThjn&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[11] = {tooltip : 'music box', oggsrc: 'http://horrorli.fps.hu/ogg/music-box.ogg', src: 'https://api.soundcloud.com/tracks/130600772/stream?secret_token=s-6924R&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[12] = {tooltip : 'ghost child', oggsrc: 'http://horrorli.fps.hu/ogg/ghost-child.ogg', src: 'https://api.soundcloud.com/tracks/130600767/stream?secret_token=s-Fb1L9&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
sounds[13] = {tooltip : 'steps', oggsrc: 'http://horrorli.fps.hu/ogg/steps.ogg', src: 'https://api.soundcloud.com/tracks/130600777/stream?secret_token=s-8WkiL&client_id=42bb9716b0a24ce07069ff73952e5d81', volume: 0.7};
$(document).ready(function () {
	if(checkSVG()){
		$('body').addClass('svg');
	} else {
		$('body').addClass('nosvg');
		$('body img').each(function(){
			var src = $(this).attr('src');
			if(src != undefined){
				src = src.replace(".svg",".png");
				$(this).attr('src',src);
			}
		});
	}
	for(var i in sounds){
		var thisid = parseInt(i)+1;

		$("#sound"+thisid).jPlayer({swfPath: "http://cdn.jsdelivr.net/jplayer/2.4.1/Jplayer.swf", loop: !0, volume: 0.5, supplied: "mp3,oga", cssGuiSelector: ".jp-gui_"+thisid, wmode: "window", solution: "html,flash", preload: "none", keyEnabled: !1,}).jPlayer("setMedia", { mp3: sounds[i].src, oga: sounds[i].oggsrc });
		$("#sound"+thisid).data("jPlayer_"+thisid);
		$("#slider"+thisid).attr('data-num',thisid).slider({ animate: "fast", max: 1, range: "min", step: 0.01, value: sounds[i].volume, slide: function (a, b) { var thisid = $(this).attr('data-num'); $("#sound"+thisid).jPlayer("option", "volume", b.value) } });
		$("#cover"+thisid).attr('title',sounds[i].tooltip).attr('data-num',i).click(function(){
			var id = $(this).attr('data-num');
			var id2 = parseInt(id)+1;
			if($(this).hasClass('play')){
				$("#sound"+id2).jPlayerFade().to(1000,$("#slider"+id2).slider('value'),0,function(){ $("#sound"+id2).jPlayer('pause'); });
				$(this).removeClass('play'); $(".jp-gui_"+id2).stop().fadeOut(function(){$(this).css('opacity',0);});
			} else {
				$("#sound"+id2).jPlayerFade().to(1000,0,$("#slider"+id2).slider('value'));
				$("#sound"+id2).jPlayer('play'); $(this).addClass('play'); $(".jp-gui_"+id2).css('opacity',1).stop().fadeIn(function(){$(this).css('opacity',1);});
			}
		});
	}
	$('.cover').tooltip({
		position: { my: "center top", at: "center top-40" }
	});
});