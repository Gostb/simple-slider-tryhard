window.onload = function () {
  const slider = document.querySelector("#slider");
  const sliderWrapper = slider.querySelector(".js-wrapper");
  const slides = [...slider.querySelectorAll(".js-slide")];
  const next = slider.querySelector(".js-next");
  const prev = slider.querySelector(".js-prev");
  const transitionTime = 300;
  let shift = slides[0].offsetWidth;
  let index = 0;
  let newArray;
  let dots;

  // Clone first and last elements and insert them
  const firstSlideClone = slides[0].cloneNode(true);
  const lastSlideClone = slides[slides.length - 1].cloneNode(true);
  firstSlideClone.classList.add("slider__slide--cloned", "active");
  lastSlideClone.classList.add("slider__slide--cloned", "active");
  sliderWrapper.appendChild(firstSlideClone); // after
  sliderWrapper.insertBefore(lastSlideClone, slides[0]); //before

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
    sliderWrapper.style.transform = `translateX(-${shift}px)`;

  }

  next.addEventListener("click", function () {
    sliderWrapper.style.transition = "";
    sliderWrapper.style.setProperty('--transitionTime', `${transitionTime}ms`);

    if (!(index == slides.length - 1)) {
      index++;
      shift += slides[index - 1].offsetWidth;
    } else {
      index = 0;
      shift += slides[0].offsetWidth;
      next.style.pointerEvents = "none";

      setTimeout(() => {
        sliderWrapper.style.transition = "none";
        next.style.pointerEvents = "unset";
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
    if (index >= 1) {
      index--;
      updateActiveClass();
      updateWrapperWidth();

      shift -= slides[index].offsetWidth;
      sliderWrapper.style.transform = `translateX(-${shift}px)`;
    } else {
      event.preventDefault();
    }
  });

  // Dots managing
  dots.forEach((el) => el.addEventListener("click", function () {
    index = dots.indexOf(el);

    if (!(el == dots[0])) {
      for (let j = 0; j <= index - 1; j++) {
        shift += slides[j].offsetWidth;
        sliderWrapper.style.transform = `translateX(-${shift}px)`;
      }
    } else {
      sliderWrapper.style.transform = "translateX(0px)";
    }

    updateActiveClass();
    updateWrapperWidth();
  }));

  // Copies of elements for loop slider
  newArray = [slides.length].concat(slides);
  newArray.push(slides[0]);

  // Functions calls
  updateActiveClass();
  updateWrapperWidth();
};