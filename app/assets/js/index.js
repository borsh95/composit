//const { default: Swiper } = require("swiper");

//const { timers } = require("jquery");

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

if (document.querySelector('.menu__dropdown')) {
	dropdown('.menu__dropdown', '.menu__dropdown-list');
}

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

if (document.querySelector('#map')) {
	ymaps.ready(init);
	function init() {
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			controls: ['zoomControl', 'fullscreenControl', 'rulerControl'],
			center: [55.76, 37.64],
			zoom: 4
		});

		var coords = [
			[[53.88284489738071, 27.7274985]], //минск
			[[52.508328315696836, 13.396575499999914], 'Sauna-Vermietung & Verkauf', 'https://www.tatpool.ru/'],//берлин
			[[48.68148937931495, 19.699416499999966], 'SAIBOT, LTD.', 'https://www.tatpool.ru/'], //словакия
			[[43.223342794696485, 76.95543649999995], 'ООО «Композит Групп»'], //алматы
			[[56.39807256832419, 38.71432549999995], 'ООО «Бассейны и Купели»'], //владимирская область
			[[55.753524068970925, 49.2174635], 'ООО «Каскад»', 'http://www.tatkaskad.ru/'],//г. Казань, ул. Софиулина, д. 6б
			[[55.79099506894799, 49.18174649999999], 'OOO «Бассейнофф»', 'https://www.tatpool.ru/'], //г. Казань, ул. Курская, д. 27
			[[55.63390206908048, 37.47177549999989], 'Компания «Белорусские бассейны»'], //г. Москва, ул. Академика Варги, д. 22а, вход со двора
			[[55.88192227851689, 37.54766722883604], '«Комфорт строй»'], //г. Москва, Дмитровское шоссе, д. 100, стр. 2
			[[55.865106568870054, 37.494664999999934], '«Компания Kpools»'], //г. Москва, ул. Петрозаводская, д. 9, к. 2, оф. 8
			[[55.640238069096746, 37.693291499999994], 'ООО «СтройПроектИнжиниринг»'],//г. Москва, Каширское шоссе, д. 53, корп. 5
			[[55.750291568992424, 37.7325475], '«ПЯТЫЙ ЭЛЕМЕНТ»'],// г. Москва, ул. 2-я Энтузиастов, д. 5, корп. 3, оф. 
			[[55.723426193213, 37.433256023803665], '«Водный дом»'],//Можайское шоссе, 1,5 км. от МКАД Строительный рынок «ТВЦ», строение 14, помещение 46
			[[55.841063068897775, 37.17477449999999], '«OasisPool»'],//Московская обл, красногорский р-он, пгт. Нахабино, ул. Институтская, д. 18
			[[55.8465220689118, 37.19480750000002], '«Пул мастер»'], //Московская обл, Волоколамское шоссе, р.пНахабино, ул. Советская 73А
			[[56.324596068405434, 43.994299499999975], 'ООО «Лорнет»', 'http://www.zelkareta.ru'],//Нижний Новгород, ул. Добролюбова, д. 10, оф. 8
			[[56.313663068437315, 44.028327499999946], 'ООО «Аквамастер»', 'http://www.aquamasternn.ru'],//г. Нижний Новгород, ул. Полтавская, 30 Торговый центр КУБ, Магазин «АКВАМАСТЕР»
			[[44.05285807460203, 43.00392449999993], 'ИП Голощапова Т.С.'],//Пятигорск ул. Беговая 12
			[[47.237920074266626, 39.619288499999925], 'ООО «Акварай-юг»'],//г. Ростов-на-Дону, ул. Доватора, д. 144/16, оф. 13 
			[[53.219106071206625, 50.15600549999993], 'ООО «Всеслав Самара»', 'http://www.vseslav-samara.ru'],//г. Самара, ул. Ново-Садовая, д. 161, оф. 17
			[[51.51118557239116, 45.99563799999999], '«Фан групп»', 'http://www.fungroup64.ru'],//г. Саратов, ул. Набережная, д. 18, проходная хлебокомбината, 2-ой этаж
			[[43.43863057454526, 39.92037649999998], 'ООО «СРЕДА ОБИТАНИЯ»'],//г. Сочи, ул. Авиационная, д. 2г.
			[[43.60415157457324, 39.735395499999996], 'ООО «СК АкваЭталон»', 'http://www.akvaetalon.ru'],//г. Сочи, ул. Пластунская, д. 81, оф. 19
			[[53.513196070977955, 49.27921399999998], 'ООО «Всеслав Самара»'],// г. Тольятти, ул. Юбилейная, д. 37а, ТЦ Галанский Дом
			[[54.16520907043993, 37.593515499999974], 'ООО «Акватемп»', 'http://www.aqua-temp.ru'],//г. Тула, ул. Станиславского, д. 15, оф. 3
			[[55.191240581069124, 61.3263225], '«Композит групп УРФО»', 'http://www.akvaholding.ru'],//г. Челябинск, ул. Молодогвардейцев , д. 7, корпус 3, офис 415/13
			[[54.300344070318936, 48.380197999999965], 'ООО «Дельфин Групп»'],//г. Ульяновск, ул. Пушкинская, д. 15А, оф. 5
			[[54.72681906994654, 55.928166499999996], 'Магазин — салон «Суоми»', 'http://www.ufasauna.ru'], //уфа
			[[57.64904306697437, 39.908473999999984], 'ООО «АСТРАЛ-групп»', 'http://www.sk-astral.ru'],// г. Ярославль, ул. Урочская, д.17, офис 206
			[[57.62326256699944, 39.8672595], 'БО «Бассейны и Оборудование»', 'http://b-o.su']// г. Ярославль, ул Салтыкова-Щедрина, д.21, офис 225
		];

		var myCollection = new ymaps.GeoObjectCollection({}, {
			preset: 'islands#blueDotIcon',
		});

		coords.forEach((data, ind) => {
			let placemark;

			if (typeof data[1] === "string" && data[1].length !== 0) {
				placemark = new ymaps.Placemark(data[0], {
					hintContent: `<div style="font-size: 18px;padding: 10px;">${data[1]}</div>`,
				});
			} else {
				placemark = new ymaps.Placemark(data[0]);
			}

			if (typeof data[2] === "string" && data[2].length !== 0) {
				placemark.events.add('click', function () {
					window.open(data[2]);
				});
			}

			myCollection.add(placemark);

		});

		myMap.geoObjects.add(myCollection);
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
(function () {
	const btnDown = document.querySelector('.v-up');
	let vUpTriggerTimer = 0;

	vUp(btnDown, scroledWindow);

	btnDown.addEventListener('click', function () {
		backToTop(-45, 0);
	});

	window.addEventListener('scroll', function () {
		clearTimeout(vUpTriggerTimer);
		vUpTriggerTimer = setTimeout(() => {
			vUp(btnDown, scroledWindow);
		}, 200)
	});
})();

//Укорачивание списка, добавлением выпадающего списка
if (document.querySelector('.contacts-page__list')) {

	createDropdown('.contacts-page__list', 9);
	dropdownList('.dropdownWrapp');

	function createDropdown(listSelector, numberVisible) {

		const list = document.querySelector(listSelector);
		let listItem = Array.from(list.children);

		if (listItem.length >= numberVisible) {
			let fragmentItemsHidden = new DocumentFragment;
			let DropdownPlugin = document.createElement('div');

			DropdownPlugin.classList.add('dropdownWrapp');

			listItem.forEach(function (item, index) {
				if (index < numberVisible) return;

				fragmentItemsHidden.append(item);
			});

			DropdownPlugin.innerHTML = `
					<div class="dropdownList"></div>
					<div class="dropdownBtn"></div>
			`;

			let dropList = DropdownPlugin.querySelector('.dropdownList');

			listItem[numberVisible - 1].after(DropdownPlugin);

			dropList.append(fragmentItemsHidden);

			document.querySelector('header').append(fragmentItemsHidden);

		}
	}
}

//Выпадающий список
function dropdownList(dropWrappSelector) {
	const dropdownWrapp = document.querySelector(dropWrappSelector);
	const dropdownList = dropdownWrapp.querySelector('.dropdownList');
	const dropdownBtn = dropdownWrapp.querySelector('.dropdownBtn');
	let coordsBtn = 0;

	dropdownBtn.addEventListener('click', function () {
		this.classList.toggle('active');
		dropdownWrapp.classList.toggle('active');
		isActive = dropdownBtn.classList.contains('active');

		dropdownList.style.minHeight = isActive ? dropdownList.scrollHeight + 'px' : '';

		if (!isActive && coordsBtn !== 0) {
			let scroledWindow = window.pageYOffset;
			let to = coordsBtn.top - 400;

			if (scroledWindow < coordsBtn.top) return;

			setTimeout(() => {
				backToTop(-8, to);
			}, 0);
		}

		coordsBtn = getCoords(this);
	});
}

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

//прокрутка окна вверх вниз
function backToTop(interval, to) {
	if (window.pageYOffset <= to) return;

	window.scrollBy(0, interval);
	setTimeout(() => {
		backToTop(interval, to)
	}, 0);
}

function showHeader() {
	const header = document.querySelector('header');

	if (window.pageYOffset > 200) {
		header.classList.add('fixed');
	} else {
		header.classList.remove('fixed');
	}
}

function dropdown(btn, list) {
	const btnDrop = document.querySelector(btn);
	const listDrop = document.querySelector(list);

	btnDrop.addEventListener('click', function (e) {
		e.stopPropagation();

		this.classList.toggle('active');

		listDrop.style.minHeight = btnDrop.classList.contains('active') ? listDrop.scrollHeight + 'px' : '';
	});

	document.addEventListener('click', function () {
		btnDrop.classList.remove('active');
		listDrop.style.minHeight = "";
	})
}