//Hamburger
(function () {
	const hamburgerBtn = document.querySelector('.hamburger');
	const burgerBlock = document.querySelector('.header__burger-block');
	const bodyEl = document.querySelector('body');



	hamburgerBtn.addEventListener('click', function () {
		this.classList.toggle('active');

		let isActive = this.classList.contains('active');
		burgerBlock.classList[isActive ? 'add' : 'remove']('active');
		bodyEl.style.overflow = (isActive) ? 'hidden' : '';
	});

	window.addEventListener('resize', function () {
		if (document.documentElement.clientWidth > 1197 && burgerBlock.classList.contains('active')) {
			hamburgerBtn.classList.remove('active');
			burgerBlock.classList.remove('active');
		}
	});
}());

// Scroll header
let scrollHeader = (function () {

	let scrollWindow = window.pageYOffset || document.documentElement.scrollTop;
	let scrolled;
	let scrollEl = document.querySelector("header");
	let positionHeader = getCoords(scrollEl);

	function headerScroll() {
		scrolled = scrollWindow;
		scrollWindow = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollWindow > scrollEl.offsetHeight) {
			scrollEl.classList.add("fixed");

			if (scrolled > scrollWindow) {
				scrollEl.classList.add("visible");
			} else {
				scrollEl.classList.remove("visible");
			}
		} else if (scrollWindow <= positionHeader.top) {
			scrollEl.classList.remove("fixed");
			scrollEl.classList.remove("visible");
		}
	}

	window.addEventListener('scroll', function () {
		headerScroll();
	});
}());


//Слайдер главный
let sliderMain = document.querySelector('.slider-main');

let slider = new Swiper('.slider-main', {
	pagination: {
		el: '.slider-main__pagination',
		clickable: true
	},
});

//Слайдер галереи
if (document.querySelector('.portfolio__slider')) {

	let portfolioSlider, isActive;

	sliderCategoriesToggle();

	function sliderCategoriesToggle() {
		if (document.documentElement.clientWidth <= 768) {
			console.log(222)

			if (isActive) return;

			categoriesSlider = new Swiper('.portfolio__slider', {
				loop: true,
				slidesPerView: 2,
				slidesPerGroup: 2,
				allowTouchMove: false,
				navigation: {
					nextEl: '.portfolio__slider-next',
					prevEl: '.portfolio__slider-prev',
				},
			});
			console.log(22)
			isActive = true;
		} else if (isActive) {
			categoriesSlider.destroy();
			isActive = false;
		}
	}

	window.addEventListener('resize', sliderCategoriesToggle, false);
}

//Кнопка "Наверх"
const btnDown = document.querySelector('.v-up');

vUp(btnDown, scroledWindow);

btnDown.addEventListener('click', function () {
	backToTop();
});

window.addEventListener('scroll', () => {
	vUp(btnDown, scroledWindow);
});

//пролистываине окна вверх при клике на кнопку
function vUp(btn, scroled, scrollUp) {
	if (scroled() > (document.documentElement.clientHeight / 2)) {
		btn.classList.add('active');
	} else if (scroled() < (document.documentElement.clientHeight / 2) || btn.classList.contains('active')) {
		btn.classList.remove('active');
	}
}

//на сколько прокручено окно
function scroledWindow() {
	return window.pageYOffset || document.documentElement.scrollTop;
}

// получаем координаты элемента в контексте документа
function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}

//прокрутка окна вверх
function backToTop() {
	if (window.pageYOffset <= 0) return;

	window.scrollBy(0, -80);
	setTimeout(backToTop, 0);
}