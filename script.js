$(document).ready(function(){
	
	var $slider = $('.slider'),
		$nextBtn = $('<div class="nav next">></div>'),
		$prevBtn = $('<div class="nav prev"><</div>'),
		$prevImg,
		$currImg,
		$nextImg,
		$imageList,
		$sliderWidth,
		current = 0,
		
		library = [
			{ src: "images/image1.jpg" }, 
			{ src: "images/image2.jpg" },
			{ src: "images/image3.jpg" },
			{ src: "images/image4.jpg" },
			{ src: "images/image5.jpg" }
		];
	

	// create div with class imageHolder for each image

	function createImages(){
		$.each(library, function(index, element){
			var $div = $('<div />', {
				class: "imageHolder",
				id: index
			});
			var $img = $('<img />', {
				src: library[index].src,
				class: "photo"
			});
			$div.append($img);
			$slider.append($div);
		});

		// Place all images off to the right of the viewable area (slider), place first image at zero (centered) to view

		$imageList = $(".imageHolder");
		$sliderWidth = $('.slider').width();
		$imageList.css({"left": $sliderWidth});
		$currImg = $imageList.eq(0).css({"left": "0"});
	}

	
	function loadNext(curr){
		$currImg = $imageList.eq(curr);

		curr == $imageList.length - 1 ? ($nextImg = $imageList.eq(0), current = 0) : ($nextImg = $imageList.eq(curr+1), current++);
		
		$currImg.animate({
			left: "-" + $sliderWidth
			},  {
			duration: 1000,
			start: function() {
               $(".nav").addClass("disable");
            },
            complete: function() {
               $(".nav").removeClass("disable");
            }
        });


		$nextImg.css({ "left": $sliderWidth + "px" })
			.animate({
				left: 0
				}, {
				duration: 1000,
				start: function() {
					$(".nav").addClass("disable");
	            },
	            complete: function() {
	               $(".nav").removeClass("disable");
	            }
		  	});
	}

	function loadPrev(curr){
		$currImg = $imageList.eq(curr);

		curr == 0 ? ($prevImg = $imageList.eq($imageList.length - 1), current = $imageList.length - 1) : ($prevImg = $imageList.eq(curr-1), current--);

		$currImg.animate({
			left: $sliderWidth
			}, {
				duration: 1000,
				start: function() {
					$(".nav").addClass("disable");
	            },
	            complete: function() {
	               $(".nav").removeClass("disable");
	            }
	  	});

		$prevImg.css({ "left": "-" + $sliderWidth + "px" })
			.animate({
				left: 0
				}, {
				duration: 1000,
				start: function() {
					$(".nav").addClass("disable");
	            },
	            complete: function() {
	               $(".nav").removeClass("disable");
	            }
		  	}); 
	}
	
	// create and place the images, load the next/prev buttons
	
	createImages();
	$slider.append($nextBtn, $prevBtn);

	// events

	$nextBtn.on('click', function(){
		loadNext(current);
	});
	
	$prevBtn.on('click', function(){
		loadPrev(current);
	});
	
});