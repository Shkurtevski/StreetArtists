import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Visitor");
  }

  async getHtml() {
    return `
        <div class="slider">
          <div class="content-slider-wrapper">
            <div class="slider-one">
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img1.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img2.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img3.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img4.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img5.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img6.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img7.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img8.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img9.jpg" alt="slider Image" />
                </a>
              </div>
              <!-- 10 more slides -->
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img1.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img2.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img3.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img4.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img5.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img6.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img7.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img8.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img9.jpg" alt="slider Image" />
                </a>
              </div>
            </div>
            <div class="slider-two">
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img1.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img2.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img3.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img4.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img5.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img6.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img7.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img8.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img9.jpg" alt="slider Image" />
                </a>
              </div>
              <!-- 10 more slides -->
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img1.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img2.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img3.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img4.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img5.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img6.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img7.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img8.jpg" alt="slider Image" />
                </a>
              </div>
              <div class="slide">
                <a href="/visitor/listing" data-link>
                  <img src="./static/images/img9.jpg" alt="slider Image" />
                </a>
              </div>
            </div>
          </div>
        </div>
        `;
  }
  onMount() {}
}
