let sliderMain = document.querySelector('.slider-main');

let slider = new Swiper('.slider-main', {
	pagination: {
		el: '.slider-main__pagination',
		clickable: true,
		// renderBullet: function (index, className) {
		// 	return `<span class="` + className + `"><svg><circle cx="8" cy="8" r="6" style="stroke-dashoffset: calc(37.7 - (37.7 * ${(index + 1) / countSlide * 100}) / 100);
		// "></circle></svg></span>`;
		// }
	},
});
