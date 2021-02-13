let sliderMain = document.querySelector('.slider-main');

let slider = new Swiper('.slider-main', {
	pagination: {
		el: '.slider-main__pagination',
		clickable: true
	},
});



//Кнопка "Наверх"
const btnDown = document.querySelector('.v-up');

vUp(btnDown, scroledWindow);

btnDown.addEventListener('click', function () {
	console.log(23)
	backToTop();
});

window.addEventListener('scroll', () => {
	vUp(btnDown, scroledWindow);
});

function vUp(btn, scroled, scrollTop) {

	if (scroled() > (document.documentElement.clientHeight / 2)) {
		btn.classList.add('active');
	} else if (scroled() < (document.documentElement.clientHeight / 2) || btn.classList.contains('active')) {
		btn.classList.remove('active');
	}
}

function scroledWindow() {
	return window.pageYOffset || document.documentElement.scrollTop;
}

function backToTop() {
	if (window.pageYOffset <= 0) return;

	window.scrollBy(0, -80);
	setTimeout(backToTop, 0);

}