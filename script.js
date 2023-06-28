window.onload = function () {
  const slider = document.querySelector("#slider");
  const sliderWrapper = slider.querySelector(".js-wrapper");
  const slides = [...slider.querySelectorAll(".js-slide")];
  const next = slider.querySelector(".js-next");
  const prev = slider.querySelector(".js-prev");
  let shift = 0;
  let index = 0;
  let newArray;
  let dots;

  // Dots initialization
  for (slide in slides) {
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

  // Next button handler
  next.addEventListener("click", function () {
    if (index + 1 <= slides.length - 1) {
      index++;
      updateActiveClass();
      updateWrapperWidth();

      shift += slides[index - 1].offsetWidth;
      sliderWrapper.style.transform = `translateX(-${shift}px)`;

    } else {
      event.preventDefault();
    }
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
    shift = 0;
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

  // Отримати посилання на цільовий елемент, перед яким потрібно вставити копію
  let targetElementFirst = slides[0];
  let targetElementLast = slides[slides.length - 1];

  // Скопіювати розмітку елементу
  let copiedElementFirst = targetElementFirst.cloneNode(true);
  let copiedElementLast = targetElementLast.cloneNode(true);

  // Вставити копію перед цільовим елементом за допомогою insertBefore()
  targetElementFirst.parentNode.insertBefore(copiedElementLast, targetElementFirst);
  targetElementLast.parentNode.insertBefore(copiedElementFirst, targetElementLast.nextSibling);

  // Functions calls
  updateActiveClass();
  updateWrapperWidth();
};