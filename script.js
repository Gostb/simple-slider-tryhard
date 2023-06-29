document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector("#slider");
  const sliderWrapper = slider.querySelector(".js-wrapper");
  const slides = [...slider.querySelectorAll(".js-slide")];
  const next = slider.querySelector(".js-next");
  const prev = slider.querySelector(".js-prev");
  const transitionTime = 300;
  let index = 0;
  let dots;
  let shift;

  sliderWrapper.style.setProperty('--transitionTime', `${transitionTime}ms`);

  // Clone first and last elements and insert them
  const firstSlideClone = slides[0].cloneNode(true);
  const lastSlideClone = slides[slides.length - 1].cloneNode(true);
  firstSlideClone.classList.add("slider__slide--cloned", "active");
  lastSlideClone.classList.add("slider__slide--cloned", "active");
  sliderWrapper.appendChild(firstSlideClone); // after
  sliderWrapper.insertBefore(lastSlideClone, slides[0]); //before

  shift = slides[0].offsetWidth;

  // Dots initialization
  for (let i = 0; i <= slides.length - 1; i++) {
    const paginationWrap = slider.querySelector(".js-pagination");
    const elDiv = document.createElement("div");

    elDiv.classList.add("slider__dot", "js-dot");
    paginationWrap.appendChild(elDiv);

    dots = [...slider.querySelectorAll(".js-dot")];
  }

  // Active class
  function updateActiveClass() {
    if (slides[index]) {
      slides.forEach((el) => el.classList.remove("active"));
      slides[index].classList.add("active");
    }

    if (dots[index]) {
      dots.forEach((el) => el.classList.remove("active"));
      dots[index].classList.add("active");
    }
  }

  // Wrapper width setting
  function updateWrapperWidth() {
    sliderWrapper.style.maxWidth = slides[index].offsetWidth + "px";
    sliderWrapper.style.width = slides[index].offsetWidth + "px";
  }

  next.addEventListener("click", function () {
    sliderWrapper.style.transition = "";

    if (!(index == slides.length - 1)) {
      index++;
      shift += slides[index - 1].offsetWidth;
    } else {
      index = 0;
      shift += slides[0].offsetWidth;
      next.style.pointerEvents = "none";

      setTimeout(() => {
        sliderWrapper.style.transition = "none";
        next.style.pointerEvents = "";
        shift = slides[0].offsetWidth;
        sliderWrapper.style.transform = `translateX(-${shift}px)`;
      }, transitionTime);
    }

    sliderWrapper.style.transform = `translateX(-${shift}px)`;
    updateActiveClass();
    updateWrapperWidth();
  });

  // Prev button handler
  prev.addEventListener("click", function () {
    sliderWrapper.style.transition = "";

    if (index == 0) {
      index = slides.length - 1;
      shift -= slides[slides.length - 1].offsetWidth;
      prev.style.pointerEvents = "none";
      console.log(shift);
      setTimeout(() => {
        sliderWrapper.style.transition = "none";
        prev.style.pointerEvents = "";
        for (let i = 0; i < slides.length; i++) {
          shift += slides[i].offsetWidth;
        }
        sliderWrapper.style.transform = `translateX(-${shift}px)`;
      }, transitionTime);
    } else {
      index--;
      shift -= slides[index].offsetWidth;
    }

    sliderWrapper.style.transform = `translateX(-${shift}px)`;
    updateActiveClass();
    updateWrapperWidth();
  });

  // Dots managing
  dots.forEach((el) => el.addEventListener("click", function () {
    index = dots.indexOf(el);

    if (el == dots[0]) {
      shift = slides[0].offsetWidth;
    } else {
      shift = slides[0].offsetWidth;
      for (let j = 0; j <= index - 1; j++) {
        shift += slides[j].offsetWidth;
        console.log(index, shift);
      }
    }

    sliderWrapper.style.transform = `translateX(-${shift}px)`;
    updateActiveClass();
    updateWrapperWidth();
  }));

  if (sliderWrapper) {
    sliderWrapper.style.transform = `translateX(-${slides[0].offsetWidth}px)`;
  }

  // Functions calls
  updateActiveClass();
  updateWrapperWidth();
});
