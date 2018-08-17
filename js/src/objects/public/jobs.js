Jobs = {
	init: function(){
		$("#owl-job-pics").owlCarousel({
			navigation        : false,
			autoPlay          : true,
			pagination        : true,
            singleItem        : true,
        });
	}
}
$(document).ready(function() {
	Jobs.init();
});