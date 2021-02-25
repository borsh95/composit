//const { default: Swiper } = require("swiper");

//const { default: Swiper } = require("swiper");

window.onscroll = showHeader;

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
			bodyEl.style.overflow = '';
		}
	});
}());

//Слайдер главный
if (document.querySelector('.slider-main')) {
	let sliderMain = document.querySelector('.slider-main');

	let slider = new Swiper('.slider-main', {
		loop: true,
		speed: 1700,
		longSwipesMs: 5000,
		pagination: {
			el: '.slider-main__pagination',
			clickable: true
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
	});
}

//Слайдер производства
if (document.querySelector('.production-slider')) {
	const productionSlider = new Swiper('.production-slider', {
		slidesPerView: 3,
		spaceBetween: 32,
		allowTouchMove: false,
		navigation: {
			nextEl: '.production-slider__arrow--right',
			prevEl: '.production-slider__arrow--left',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			480: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
			},
			1198: {
				slidesPerView: 3,
				spaceBetween: 32,
			}
		}
	})
}

//Слайдер портфолио главной страницы
if (document.querySelector('.portfolio__slider')) {

	let parameters = {
		loop: true,
		slidesPerView: 1,
		slidesPerGroup: 2,
		allowTouchMove: false,
		navigation: {
			nextEl: '.portfolio__slider-next',
			prevEl: '.portfolio__slider-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
			},
			430: {
				slidesPerView: 2,
				slidesPerGroup: 2,
			}
		}
	};

	sliderToggle('.portfolio__slider', parameters, 768, true);
}

//Cлайдер гарелеи
if (document.querySelector('.gallery')) {
	let parameters = {
		slidesPerView: 2,
		spaceBetween: 20,
		allowTouchMove: false,
		navigation: {
			nextEl: '.gallery__arrow-next',
			prevEl: '.gallery__arrow-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1
			},
			500: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			768: {
				spaceBetween: 20
			}
		}
	};

	sliderToggle('.gallery', parameters, 1197);
}

//слайдер цены
if (document.querySelector('.filters-price__slider')) {
	const sliderPrice = document.querySelector('.filters-price__slider');
	const inputs = document.querySelectorAll('.filters-inputs__input');

	noUiSlider.create(sliderPrice, {
		start: [500, 10000],
		connect: true,
		step: 1,
		range: {
			'min': [0],
			'max': [10000]
		}
	});

	sliderPrice.noUiSlider.on('update', function (values, handle) {
		inputs[handle].value = Math.round(values[handle]);
	});

	inputs.forEach(function (input, index) {
		input.addEventListener('change', function (e) {
			setRangeSlider(index, e.currentTarget.value)
		});
	});


	function setRangeSlider(i, value) {
		let arr = [null, null];
		arr[i] = value;

		sliderPrice.noUiSlider.set(arr);
	}
}

if (document.querySelector('.filters-inputs')) {
	document.querySelectorAll('.filters-inputs').forEach(function (inputsWrapp, ind) {
		restrictionEntry(inputsWrapp);
	});

}

//ограничение ввода в input number от и до
function restrictionEntry(inputsWrapp) {
	const inputs = document.querySelectorAll('input'),
		input1 = inputs[0],
		input2 = inputs[1];

	inputs.forEach(function (input) {
		input.addEventListener('change', () => {
			checkingValue(input);
		});
	});

	function checkingValue(input) {
		let val = +input.value;

		if (isNaN(val)) '';

		let min = +input.getAttribute('min') || 0;
		let max = +input.getAttribute('max') || 999999;

		input.value = (val < min) ? min : (val > max) ? max : val;
	}
}

//инициализация слайдера в зависимости от окна
function sliderToggle(selectorSlider, param, breakPoint) {
	let slider, isActive;

	switchingSlider();

	window.addEventListener('resize', () => {
		switchingSlider();
	});

	function switchingSlider() {
		if (document.documentElement.clientWidth <= breakPoint) {

			if (isActive) return;

			slider = new Swiper(selectorSlider, param);
			isActive = true;
		} else if (isActive) {
			slider.destroy();
			isActive = false;
		}
	};
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

//Загрузка видео с youtube
if (document.querySelector('.video__item')) {
	const videos = document.querySelectorAll('.video__item');

	videos.forEach((el) => {
		let videoHref = el.getAttribute('data-video');
		// let img;
		// let youtubeImgSrc;

		let deletedLength = 'https://youtu.be/'.length;

		let videoId = videoHref.substring(deletedLength, videoHref.length);

		// img = el.querySelector('img');
		// youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
		// img.setAttribute('src', youtubeImgSrc);

		el.addEventListener('click', (e) => {
			e.preventDefault();

			let iframe = createIframe(videoId);
			el.querySelector('img').remove();
			el.appendChild(iframe);
			el.querySelector('button').remove();
		});
	});

	// generate video url
	let generateUrl = function (id) {
		let query = '?rel=0&showinfo=0&autoplay=1';

		return 'https://www.youtube.com/embed/' + id + query;
	};

	// creating iframe
	let createIframe = function (id) {
		let iframe = document.createElement('iframe');

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay; encrypted-madia');
		iframe.setAttribute('src', generateUrl(id));

		return iframe;
	};
}

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

	window.scrollBy(0, -45);
	setTimeout(backToTop, 0);
}

function showHeader() {
	const header = document.querySelector('header');

	if (window.pageYOffset > 200) {
		header.classList.add('fixed');
	} else {
		header.classList.remove('fixed');
	}
}