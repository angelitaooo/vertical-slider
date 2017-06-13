import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import jqueryMousewheel from 'jquery-mousewheel';

const NEXT = 'next';
const PREV = 'prev';
const timer = 50;
const sliderItems = $('[data-js-slider-id]'); // grab each one of slider items
const totalSlides = sliderItems.length;
const firstSlide = 1;

const handleScroll = (e) => {
	const activeSlide = sliderItems.filter(':checked').data('js-slider-id');
	const slideDirection = scrollDirection(e.originalEvent.wheelDelta);
	const nextSlide = whichIsNextSlide({
		sliderSize: totalSlides,
		activeSlide: activeSlide,
		sliderDirection: slideDirection
	});

	resetSelectedSliderItems(sliderItems);
	selectSliderItems(sliderItems, nextSlide);
	console.log(nextSlide);

	// is the last slide AND is not the first slide
	if (activeSlide === nextSlide  &&  nextSlide !== 0) {
		resetOverflow('initial');
		scrollingInPage(document.documentElement.clientHeight);
		$(document).unbind();
	}
}

/**
 *
 * @param {*}  Remove overflow from the htlm and body and activate the next section of the page
 */
const resetOverflow = (newOverflow) => {
	$('html, body').css({ overflow: newOverflow });
};

const scrollingInPage = (top) => {
	window.scrollBy({
		top: top,
		behavior: 'smooth'
	});
};

/**
 *
 * @param {*} sliderItems Remove checked attribute from sliderItems
 */
const resetSelectedSliderItems = sliderItems => {
	sliderItems.prop('checked', false);
};

const selectSliderItems = (sliderItems, nextSliderIndex) => {
	$(sliderItems[nextSliderIndex]).prop('checked', 'checked');
};

/**
 * @method scrollDirection
 * @param {number} wheelDelta Scroll value. If positive, user is scrolling up. Negative if scrolling down
 */
const scrollDirection = wheelDelta => wheelDelta < 0 ? NEXT : PREV;

/**
 *
 * @param {Object} Returns the index of the next slide.
 */
const whichIsNextSlide = ({ sliderSize, activeSlide, sliderDirection }) => {
	let nextSlide = 0;

	if (activeSlide === 0 && sliderDirection === PREV) {
		nextSlide = 0;
	} else if (activeSlide === sliderSize - 1 && sliderDirection === NEXT) {
		nextSlide = sliderSize - 1;
	} else {
		if (sliderDirection === NEXT) {
			nextSlide = activeSlide + 1;
		}

		if (sliderDirection === PREV) {
			nextSlide = activeSlide - 1;
		}
	}

	return nextSlide;
}

export const slider = () => {
	$(document).mousewheel(debounce(handleScroll, timer));
};
