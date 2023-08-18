export default class {
  constructor(params, name = "") {
    this.params = params;
    this.name = name;
  }

  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }
  onMount() {}
}
