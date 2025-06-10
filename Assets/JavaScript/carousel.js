const track = document.querySelector('.CarouselTrack');
const leftBtn = document.querySelector('.CarouselArrow.Left');
const rightBtn = document.querySelector('.CarouselArrow.Right');
const itemWidth = document.querySelector('.CarouselItem').offsetWidth;

let scrollPosition = 0;

leftBtn.addEventListener('click', () => {
scrollPosition = Math.max(scrollPosition - itemWidth, 0);
track.style.transform = `translateX(-${scrollPosition}px)`;
});

rightBtn.addEventListener('click', () => {
const maxScroll = track.scrollWidth - track.clientWidth;
scrollPosition = Math.min(scrollPosition + itemWidth, maxScroll);
track.style.transform = `translateX(-${scrollPosition}px)`;
});