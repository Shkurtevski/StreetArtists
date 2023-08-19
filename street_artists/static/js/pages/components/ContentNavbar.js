import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Listing");
  }

  async getHtml() {
    return `
      <nav>
        <div class="nav-wrapper">
          <div class="nav-content-wrapper">
            <div class="nav-content">
              <a href="/" data-link>
                <img src="/static/images/logo-picture.png" alt="logo-picture" />
                <p>StreetARTists</p></a>
            </div>
            <div class="icon">
              <a href="/auction" data-link>
                <img src="/static/images/icon.svg" alt="SVG Image" />
              </a>
            </div>
          </div>
        </div>
      </nav>
        `;
  }
  onMount() {}
}
