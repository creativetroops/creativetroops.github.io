Oracle = {
    Effect: {
        config: {
            senseSpeed    : 15,
            previusScroll : 0
        },
        init: function(page){
            $(window).scroll(function(event){
                var scroller = $(this).scrollTop();
                if (scroller - Oracle.Effect.config.senseSpeed >  Oracle.Effect.config.previousScroll && !$(".overlay-door").hasClass('open')){
                    $(".hide-menu").fadeOut();
                }
                else if (scroller + Oracle.Effect.config.senseSpeed < Oracle.Effect.config.previousScroll){
                    $(".hide-menu").fadeIn();
                }
                Oracle.Effect.config.previousScroll = scroller;
            });
        }
    },
    Nav: {
        init: function(){
            $('.smooth-nav').on('click',function(event){
                var $anchor = $(this);
                $('html, body').stop().animate({ scrollTop: $($anchor.attr('href')).offset().top}, 1000, 'easeOutQuart');
                var url = window.location.href.split("/")[4];
                var alias = $anchor.attr('href').replace('#', '');
                if(url == "" || url != alias){
                    window.history.pushState("", "", './' + alias);
                }
                event.preventDefault();
                overlay = document.querySelector( 'div.overlay' );
                if(classie.has(overlay, 'open')){
                    Oracle.OverlayMenu.toggleOverlay();
                    if($('.icon-nav').hasClass('close-door-menu'))
                        $('.icon-nav').removeClass('close-door-menu');
                }
            });
            $(".navbar-nav li a").click(function(event) {
                $(".navbar-collapse").collapse('hide');
            });
        }
    },
    MenuAnimation: {
        init: function(){
            var anchor = document.querySelectorAll('button');
            [].forEach.call(anchor, function(anchor){
                anchor.onclick = function(event){
                    event.preventDefault();
                    if(!$('.icon-nav').hasClass('close-door-menu')){
                        this.classList.add('close-door-menu');
                    }
                    else{
                        this.classList.remove('close-door-menu');
                    }
                }
            });
        }
    },
    OverlayMenu:{
        init: function(){
            $('.icon-nav').on('click', function(){Oracle.OverlayMenu.toggleOverlay()});
        },
        toggleOverlay: function() {
            overlay = document.querySelector( 'div.overlay' );
            transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition'   : 'transitionend',
                'OTransition'     : 'oTransitionEnd',
                'msTransition'    : 'MSTransitionEnd',
                'transition'      : 'transitionend'
            },
            transEndEventName = transEndEventNames[ Modernizr.prefixed('transition')],
            support           = { transitions : Modernizr.csstransitions };
            if( classie.has(overlay, 'open')){
                //$(".icon-nav-back").animate({'opacity': '1'}, 1000);
                classie.remove(overlay, 'open');
                classie.add(overlay,'close-door');
                var onEndTransitionFn = function(ev){
                    if(support.transitions){
                        if(ev.propertyName !== 'visibility') return;
                        this.removeEventListener(transEndEventName, onEndTransitionFn);
                    }
                    classie.remove(overlay, 'close-door');
                };
                if(support.transitions) {
                    overlay.addEventListener(transEndEventName, onEndTransitionFn);
                }
                else {
                    onEndTransitionFn();
                }
            }
            else if(!classie.has(overlay, 'close-door')){
                classie.add(overlay, 'open');
                //$(".icon-nav-back").animate({'opacity': '0.6'}, 1000);
            }
        }
    },
    NiceScroll: {
        init: function(){
            $("html").niceScroll(
                {
                    cursorwidth        : "8px",
                    zindex             : 99999999,
                    scrollspeed        : 90,
                    mousescrollstep    : 60,
                    cursoropacitymax   : 0.8,
                    cursorcolor        : "#d2ff00",
                    horizrailenabled   : false,
                    cursorborder       : "none",
                    cursorborderradius : "0px"
                }
            );
        }
    },
    MixItUp: {
        init: function () {
            $('#jobs-list').mixitup({
                targetSelector: '.portfolio',
                filterSelector: '.filter',
                effects: ['fade'],
                easing: 'snap',
                onMixEnd: Oracle.MixItUp.hoverEffect()
            });
        },
        hoverEffect: function () {
            $('#jobs-list .portfolio').hover(
                function () {
                    $(this).find('.label').css('display', 'block', 'important');
                    $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
                    $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');
                },
                function () {
                    $(this).find('.label').css('display', 'block', 'important');
                    $(this).find('.label').stop().animate({bottom: -100}, 200, 'easeInQuad');
                    $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');
                }
            );
        }
    },
    OwlCarousel: {
        init: function(){
            $("#owl-quem").owlCarousel({
                navigation        : false,
                autoPlay          : true,
                pagination        : true,
                items             : 3,
                itemsDesktop      : [1200,3],
                itemsDesktop      : [1199,3],
                itemsDesktopSmall : [992,3],
                itemsTablet       : [768,3],
                itemsMobile       : [767,1]
            });
            $("#owl-stamp").owlCarousel({
                navigation        : false,
                autoPlay          : true,
                pagination        : false,
                items             : 4,
                itemsDesktop      : [1200,4],
                itemsDesktop      : [1199,4],
                itemsDesktopSmall : [992,2],
                itemsTablet       : [768,2],
                itemsMobile       : [767,1]
            });
        }
    },
    Preloader: {
        init: function(){
            $("#status").fadeOut();
            $("#preloader").delay(500).fadeOut("slow");
            if(!Mobile.isMobile){
                if(Cookie.get('CT_NO_SOUND') != 'true')
                    setTimeout(Sound.file.play(), 1000);
                else
                    $('.icon-sound').addClass('icon-sound-muted');
            }
        }
    },
	Modernizr: {
		init: function(){
            if (!Modernizr.svg) {
    			$('img[src*="svg"]').attr('src', function() {
    			    return $(this).attr('src').replace('.svg', '.png');
    			});
            }
		}
	},
    ScrollReveal: {
        config : {
            after          : "0s",
            enter          : "top",
            move           : "15px",
            over           : "0.5s",
            easing         : "ease-in-out",
            viewportFactor : 0,
            reset          : false,
            init           : true
        },
        init: function(){
            window.sr = new scrollReveal(Oracle.ScrollReveal.config);
        }
    },
    FormInputs: {
        init: function(){
            if (!String.prototype.trim) {
                (function() {
                    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                    String.prototype.trim = function() {
                        return this.replace(rtrim, '');
                    };
                })();
            }

            [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
                if( inputEl.value.trim() !== '' ) {
                    classie.add( inputEl.parentNode, 'input--filled' );
                }
                inputEl.addEventListener( 'focus', Oracle.FormInputs.onInputFocus );
                inputEl.addEventListener( 'blur', Oracle.FormInputs.onInputBlur );
            });
        },
        onInputFocus: function(ev) {
            classie.add( ev.target.parentNode, 'input--filled' );
        },
        onInputBlur: function(ev) {
            if( ev.target.value.trim() === '' ) {
                classie.remove( ev.target.parentNode, 'input--filled' );
            }
        }
    },
    init: function () {
        Oracle.ScrollReveal.init();
        Oracle.NiceScroll.init();
        Oracle.OwlCarousel.init();
        Oracle.MixItUp.init();
        Oracle.FormInputs.init();
        Oracle.OverlayMenu.init();
        Oracle.MenuAnimation.init();
        Oracle.Nav.init();
        Oracle.Effect.init();
    },
    goTo: function(page){
        setTimeout(function(){$("#menu-" + page).trigger('click')}, 200);
        setTimeout(function(){$(".navbar-collapse").collapse('hide');}, 1000);
    },
}
$(document).ready(function() {
    Oracle.init();
});
$(window).load(function(){
    Oracle.Preloader.init();
})