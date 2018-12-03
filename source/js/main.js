(function($){
	$(document).ready(function(){
		var desktopView = 'width=1200';
		var adaptiveView = 'width=320';
		var width = document.body.clientWidth;

		if(width <= 576)
		{
			$('meta[name=viewport]').attr('content', adaptiveView);
			$('.we-work .slick_m').slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				cssEase: 'linear',
				autoplay: true,
				autoplaySpeed: 0,
				speed: 7000,
			});
		}	
		else
		{
			$('meta[name=viewport]').attr('content', desktopView);
			$('.we-work .slick_d').slick({
				infinite: true,
				slidesToShow: 5,
				slidesToScroll: 5,
				cssEase: 'linear',
				autoplay: true,
				autoplaySpeed: 0,
				speed: 20000,
			});
		}

  $('body').on('mouseenter','label', function(event){
			$(this).parent().find('[type="checkbox"]').addClass('hover');
		});
  $('body').on('mouseleave click','label', function(event){
				$(this).parent().find('[type="checkbox"]').removeClass('hover');
		});     

		$('.arrow-language').click(function(event) {
			$('.language-list').slideToggle(400);
		});
		$('.navbar-toggle').click(function(event) {
			$('.navigation').slideToggle(400);
			$('.navbar-toggle').toggleClass('show');
		});
		var weWorkSlider = $('.comments .slick').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
		$('body').on('submit','form', function(event){
			event.preventDefault();
			$.ajax({
				url: '/mail.php',
				type: 'POST',
				data: $(this).serialize()+'&ajax=1',
			})
			.done(function(data) {
				if(+data === 1)
				{
					var modal = '<div id="modal" style="box-shadow: 4px 4px 4px rgba(0,0,0,.5); padding-top: 10px; z-index: 10; background: #737373; color: #fff; position: fixed;'+
					' width: 270px; height: 120px; top: calc((100vh - 170px) / 2); left: calc((100% - 250px) / 2);">'+
					'<div id="close" style="padding: 10px; border-radius: 50%; background: silver; width: 40px; height: 40px;'+
					'display: flex; flex-flow: column; align-items: center; justify-content: center; font-size: 2rem; line-height: 0;'+
					'z-index: 3; top: -10px; right: -10px; cursor: pointer; position: absolute;">x</div>'+
					'<h1 style="text-align: center;">Your message has been sent!</h1></div>';
					$('body').prepend(modal);
				}
			})
			.fail(function() {
				console.log("error");
			})
		});
		$('body').on('click','#close', function(event){
			$('#modal').remove();
		});
		$('body').on('keyup', function(event){
			if(event.which == 27)
				$('#modal').remove();
		});
	})
})($);