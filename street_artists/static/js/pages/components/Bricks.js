import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Visitor");
  }

  async getHtml() {
    return `
        <div class="content-wrapper">
          <div class="bricks-pattern">
            <div class="bricks-text">
              <p>
                Looking for <br />
                masterpiece ?
              </p>
               <a href="/visitor/listing" data-link>
                <button class="btn-dark">
                  Find one now!
                </button>
              </a>
            </div>
          </div>
        </div>
        `;
  }
  onMount() {}
}
