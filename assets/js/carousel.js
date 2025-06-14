document.addEventListener("DOMContentLoaded", function () {
      const carousels = document.querySelectorAll(".carousel-container");

      carousels.forEach((carousel) => {
        const track = carousel.querySelector(".carousel-track");
        const items = carousel.querySelectorAll(".carousel-item");
        const prevBtn = carousel.querySelector(".carousel-arrow.left");
        const nextBtn = carousel.querySelector(".carousel-arrow.right");

        let itemsPerView = window.innerWidth >= 992 ? 4 : 3;
        let index = 0;

        const allItems = carousel.querySelectorAll(".carousel-item");
        const totalItems = allItems.length;
        const itemWidth = allItems[0].getBoundingClientRect().width;
        const scrollAmount = itemWidth * itemsPerView;

        function moveToIndex(newIndex) {
          offset = newIndex + itemsPerView;
          track.style.transition = "transform 0.4s ease";
          track.style.transform = `translateX(-${offset * itemWidth}px)`;
          index = newIndex;
        }

        function handleNext() {
          if (index >= items.length) {
            index = 0;
          } else {
            index++;
            moveToIndex(index);
          }
        }

        function handlePrev() {
          if (index <= -1) {
            index = items.length - 1;
          } else {
            index--;
            moveToIndex(index);
          }
        }

        track.addEventListener("transitionend", () => {
          if (index >= items.length) {
            track.style.transition = "none";
            index = 0;
            offset = itemsPerView;
            track.style.transform = `translateX(-${offset * itemWidth}px)`;
          }
          if (index < 0) {
            track.style.transition = "none";
            index = items.length - 1;
            offset = items.length - 1 + itemsPerView;
            track.style.transform = `translateX(-${offset * itemWidth}px)`;
          }
        });

        prevBtn.addEventListener("click", handlePrev);
        nextBtn.addEventListener("click", handleNext);

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        track.addEventListener("touchstart", (e) => {
          startX = e.touches[0].clientX;
        });

        track.addEventListener("touchmove", (e) => {
          endX = e.touches[0].clientX;
        });

        track.addEventListener("touchend", () => {
          const deltaX = endX - startX;
          const threshold = 50;
          if (deltaX > threshold) handlePrev();
          if (deltaX < -threshold) handleNext();
          startX = 0;
          endX = 0;
        });

        window.addEventListener("resize", () => {
          itemsPerView = window.innerWidth >= 992 ? 4 : 3;
          moveToIndex(0);
        });
      });

  });