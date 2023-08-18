import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Items");
  }

  async getHtml() {
    return `
      <p>AUCTION</p>
    `;
  }

  onMount() {}
}
