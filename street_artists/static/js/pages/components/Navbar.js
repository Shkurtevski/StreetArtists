import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async getHtml() {
    return `
        <nav>
          <div class="main-nav-wrapper">
            <a><p>StreetARTists</p></a>
          </div>
        </nav>
        `;
  }
  onMount() {
  }
}
