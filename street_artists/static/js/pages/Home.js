import AbstractView from "./AbstractView.js";
import Navbar from "./components/Navbar.js";
import { fetchData } from "../data/Data.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.Data = [];
    this.setTitle("Home");
    this.Navbar = new Navbar();
  }

  async getHtml() {
    this.Data = await fetchData();
    const navbarHtml = await this.Navbar.getHtml();
    return `
      <div id="home">
        ${navbarHtml}
        <div class="main-container">
          <div class="main-wrapper">
            <div class="banner">
              <img src="./static/images/logo-picture.png" alt="">
              <div class="banner-wrapper">
                <div class="banner-content">
                  <div class="square-one" id="join-as-artist">
                    <div class="square-one-inner">
                      <p>Join as Artist</p>
                      <select name="Choose" id="select-option-home-section">
                      </select>
                    </div>
                  </div>
                  <a href="/visitor" data-link>
                    <div class="square-two" id="join-as-visitor">
                      <div class="square-two-inner">
                        <p>Join as Visitor</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const select = document.querySelector("#select-option-home-section");

    function renderSelectOptions(data) {
      const defaultOption = renderDefaultOption();
      select.appendChild(defaultOption);

      data.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.name;
        option.textContent = element.name;
        select.appendChild(option);
      });
    }

    function renderDefaultOption() {
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Choose";
      defaultOption.disabled = true;
      defaultOption.selected = true;

      return defaultOption;
    }

    renderSelectOptions(this.Data);
  }
}
