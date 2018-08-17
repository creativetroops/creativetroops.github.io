PopUp = {
	init: function(){
		$(".troop-opened").slideToggle();
		$('.troop').each(function(){
			var $obj = $(this);
        	$obj.on('click', function(){PopUp.openTroop($obj)});
        });
        $('.close-popup-troop').on('click', function(){PopUp.hideTroop()});
		/**
		 * Old Job
		 *
		$('.job').each(function(){
			var $obj = $(this);
        	$obj.on('click', function(){PopUp.openJob($obj)});
        });
		$(".job-opened").slideToggle();
        $('.close-popup-job').on('click', function(){PopUp.hideJob()});
        */
	},
	openJob: function(element){
		PopUp.hide_job();
		var title          = element.data('title');
		var description    = element.data('description');
		var url            = element.data('url');
		var num_pics       = element.data('num-pics');
		var num_hashtags   = element.data('num-hashtags');
		var limit_pics     = num_pics+1;
		var limit_hashtags = num_hashtags+1;
		var pics           = [];
		var hashtags           = [];
		for(var i=1;i<limit_pics;i++){
			pics[i] = element.data('img_'+ i);
		}
		for(var i=1;i<limit_hashtags;i++){
			hashtags[i] = element.data('hashtag_' + i);
		}
		PopUp.fillJob({
			title        : title,
			description  : description,
			pics         : pics,
			hashtags     : hashtags,
			url          : url,
			num_pics     : num_pics,
			num_hashtags : num_hashtags
		})
		PopUp.show_job();
	},
	fillJob: function(obj){
		var gallery      = "";
		var tags         = "";
		var str1         = "<div class=\"item\"><img class=\"img-responsive img-job\" src=\"";
		var str2         = "\"></div>";
		var num_pics     = (obj['num_pics']+1);
		var num_hashtags = (obj['num_hashtags']+1);
		var hashtags     = "";
		$('.job-title').empty().html(obj['title']);
		$('.job-description').empty().html(obj['description']);
		if(!PopUp.empty(obj['url'])){
			$('.job-link-change').show();
			$('.box-buttons-job').css('margin-left', '-150px', 'important');
			$('.job-link-change').attr("href", obj['url'])
		}
		else{
			$('.job-link-change').hide();
			$('.box-buttons-job').css('margin-left', '-75px', 'important');
		}
		for(var i=1;i<num_pics;i++){
			var check = obj.pics[i];
			if(!PopUp.empty(check)){
				gallery += str1 + check + str2;
			}
		}
		for(var i=1;i<num_hashtags;i++){
			hashtags += "<div class=\"job-hashtag\">#" + obj.hashtags[i] + "</div>";
		}
		$('.job-hashtags').empty().html(hashtags);
		$('#owl-job-pics').empty().html(gallery);
        $("#owl-job-pics").owlCarousel({
			navigation        : false,
			autoPlay          : true,
			pagination        : true,
            singleItem        : true,
        });
	},
	showJob: function(){
		$(".job-opened").slideDown();
		$(".job-initial").slideUp();
		$('html, body').stop().animate({ scrollTop: $("#jobs").offset().top - 150 }, 1000, 'easeOutQuart');
		$('html, body').stop().animate({ scrollTop: $("#jobs").offset().top + 1 }, 1000, 'easeOutQuart');
	},
	hideJob: function(){
		if($("#owl-job-pics").data('owlCarousel')){
			$("#owl-job-pics").data('owlCarousel').destroy();
		}
		$(".job-opened").slideUp();
		$(".job-initial").slideDown();
		$('html, body').stop().animate({ scrollTop: $("#jobs").offset().top - 150 }, 1000, 'easeOutQuart');
		$('html, body').stop().animate({ scrollTop: $("#jobs").offset().top + 1 }, 1000, 'easeOutQuart');
	},
	openTroop: function(element){
		PopUp.hideTroop();
		var first_name     = element.data('first-name');
		var last_name      = element.data('last-name');
		var picture        = element.data('picture');
		var age            = element.data('age');
		var graduation     = element.data('graduation');
		var occupation     = element.data('occupation');
		var url            = element.data('url');
		var bio            = element.data('bio');
		var num_hashtags   = element.data('num-hashtags');
		var limit_hashtags = num_hashtags+1;
		var hashtags       = [];
		for(var i=1;i<limit_hashtags;i++){
			hashtags[i] = element.data('hashtag_'+ i);
		}
		PopUp.fillTroop({
			first_name   : first_name,
			last_name    : last_name,
			picture      : picture,
			age          : age,
			hashtags     : hashtags,
			graduation   : graduation,
			occupation   : occupation,
			url          : url,
			bio          : bio,
			num_hashtags : num_hashtags
		})
		PopUp.showTroop();
	},
	fillTroop: function(obj){
		var hashtags     = "";
		var num_hashtags = (obj['num_hashtags']+1);
		$('.troop-first-name').empty().html(obj['first_name']);
		$('.troop-last-name').empty().html(obj['last_name']);
		$('.troop-age').empty().html(obj['age']);
		$('.troop-bio').empty().html(obj['bio']);
		$('.troop-graduation').empty().html(obj['graduation']);
		$('.troop-occupation').empty().html(obj['occupation']);
		$('.troop-picture').empty().html("<img class=\"img-responsive\" src=" + obj['picture'] + " />");
		for(var i=1;i<num_hashtags;i++){
			hashtags += "#" + obj.hashtags[i] + " ";
		}
		$('.troop-hashtags').empty().html(hashtags);
		if(!PopUp.empty(obj['url'])){
			$('.troop-link-change').show();
			$('.box-buttons-troop').css('margin-left', '-150px', 'important');
			$('.troop-link-change').attr("href", obj['url'])
		}
		else{
			$('.troop-link-change').hide();
			$('.box-buttons-troop').css('margin-left', '-75px', 'important');
		}
	},
	showTroop: function(){
		$(".troop-opened").slideDown();
		$(".troop-initial").slideUp();
		$('html, body').stop().animate({ scrollTop: $("#quem").offset().top - 100 }, 1000, 'easeOutQuart');
	},
	hideTroop: function(){
		$(".troop-opened").slideUp();
		$(".troop-initial").slideDown();
		$('html, body').stop().animate({ scrollTop: $("#quem").offset().top - 100 }, 1000, 'easeOutQuart');
	},
	empty: function(item){
		return (item == "" || item == null || item == undefined)
	}
}
$(document).ready(function() {
	PopUp.init();
});