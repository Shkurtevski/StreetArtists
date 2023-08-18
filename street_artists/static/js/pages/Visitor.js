import AbstractView from "./AbstractView.js";
import ContentNavbar from "./components/ContentNavbar.js";
import Bricks from "./components/Bricks.js";
import Slider from "./components/Slider.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Visitor");
    this.ContentNavbar = new ContentNavbar();
    this.Bricks = new Bricks();
    this.Slider = new Slider();
  }

  async getHtml() {
    const contentNavbar = await this.ContentNavbar.getHtml();
    const bricks = await this.Bricks.getHtml();
    const slider = await this.Slider.getHtml();
    return `
      <div id="visitor">
        ${contentNavbar}
          <div class="main-container">
            ${bricks}
            ${slider}
            <div class="carousel">
              <div class="carousel__item">
                <div class="carousel__wrapper">
                  <div class="left">
                    <img src="./static/images/person1.jpg" alt="person image">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.</p>
                  </div>
                  <div class="right">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor</p>
                  </div>
                </div>
              </div>
              <div class="carousel__item">
                <div class="carousel__wrapper">
                  <div class="left">
                    <img src="./static/images/person2.jpg" alt="person image">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.</p>
                  </div>
                  <div class="right">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor</p>
                  </div>
                </div>
              </div>
              <div class="carousel__item">
                <div class="carousel__wrapper">
                  <div class="left">
                    <img src="./static/images/person3.jpg" alt="person image">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.</p>
                  </div>
                  <div class="right">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
  }
  onMount() {
    document.querySelectorAll(".carousel").forEach((carousel) => {
      const items = carousel.querySelectorAll(".carousel__item");
      const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel__button"></span>`;
      });

      carousel.insertAdjacentHTML(
        "beforeend",
        `
      <div class="carousel__nav">
        ${buttonsHtml.join("")}
      </div>
    `
      );

      const buttons = carousel.querySelectorAll(".carousel__button");

      function showItem(index) {
        items.forEach((item) =>
          item.classList.remove("carousel__item--selected")
        );
        buttons.forEach((button) =>
          button.classList.remove("carousel__button--selected")
        );

        items[index].classList.add("carousel__item--selected");
        buttons[index].classList.add("carousel__button--selected");
      }

      buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
          showItem(i);
        });
      });

      function startCarousel() {
        let currentIndex = 0;
        const intervalTime = 5000;

        function updateCarousel() {
          currentIndex = (currentIndex + 1) % items.length;
          showItem(currentIndex);
        }

        let carouselInterval = setInterval(updateCarousel, intervalTime);

        carousel.addEventListener("mouseenter", () => {
          clearInterval(carouselInterval);
        });

        carousel.addEventListener("mouseleave", () => {
          carouselInterval = setInterval(updateCarousel, intervalTime);
        });
      }

      items[0].classList.add("carousel__item--selected");
      buttons[0].classList.add("carousel__button--selected");

      startCarousel();
    });
  }
}
