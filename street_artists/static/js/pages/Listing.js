import AbstractView from "./AbstractView.js";
import { fetchData } from "../data/Data.js";
import { items } from "../data/Data.js";
import { itemTypes } from "../data/Data.js";
import ContentNavbar from "./components/ContentNavbar.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Listing");
    this.Data = [];
    this.items = [];
    this.itemTypes = [];
    this.ContentNavbar = new ContentNavbar();
  }
  async getHtml() {
    this.Data = await fetchData();
    this.items = items;
    this.itemTypes = itemTypes;
    const contentNavbar = await this.ContentNavbar.getHtml();
    return `
    <div id="listing">
      ${contentNavbar}
       <div class="main-container">
          <img src="/static/images/filter.svg" alt="svg-picture" class="filter-icon"/>
          <div class="filter-window">
              <img src="/static/images/check.svg" alt="svg-picture" class="check-icon"/>
              <i class="fa-solid fa-x"></i>
                <form>
                  <p>Filter by:</p>
                  <div class="form-group">
                    <label for="item-title-input">By Item Title</label>
                    <input type="text" name="text" id="item-title-input" placeholder="Item Title"/>
                  </div>
                  <div class="form-group">
                    <label for="filter-artist-input">By Artist</label>
                    <select name="Choose" id="filter-artist-select"></select>
                  </div>
                  <div class="form-group">
                    <label>By Price</label>
                    <div class="price-group">
                      <div class="min-price">
                        <label for="min-price-input">Min:</label>
                        <input type="number" name="number" id="min-price-input" placeholder="Min Price"/>
                    </div>
                      <div class="max-price">
                        <label for="max-price-input">Max:</label>
                        <input type="number" name="number" id="max-price-input" placeholder="Max Price"/>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="type-input">By Type</label>
                    <select name="Choose" id="filter-type-select"></select>
                  </div>
                </form>
            </div>
            <div class="card-container">
              <div class="card-wrapper">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
  }
  onMount() {
    const titleInput = document.querySelector("#item-title-input");
    const minPriceInput = document.querySelector("#min-price-input");
    const maxPriceInput = document.querySelector("#max-price-input");
    const filterWindow = document.querySelector(".filter-window");
    const filterIcon = document.querySelector(".filter-icon");
    const checkIcon = document.querySelector(".check-icon");
    const xIcon = document.querySelector(".fa-x");
    const cardWrapper = document.querySelector(".card-wrapper");

    const filterArtistSelect = document.querySelector("#filter-artist-select");
    const filterTypeSelect = document.querySelector("#filter-type-select");

    // Define filterItems function
    const filterItems = () => {
      const filteredItems = this.items.filter((item) => {
        const title = titleInput.value.trim().toLowerCase();
        const artist = filterArtistSelect.value;
        const minPrice = parseFloat(minPriceInput.value);
        const maxPrice = parseFloat(maxPriceInput.value);
        const type = filterTypeSelect.value;

        return (
          item.isPublished &&
          (title === "" || item.title.toLowerCase().includes(title)) &&
          (artist === "" || item.artist === artist) &&
          (isNaN(minPrice) || item.price >= minPrice) &&
          (isNaN(maxPrice) || item.price <= maxPrice) &&
          (type === "" || item.type === type)
        );
      });

      renderCard(filteredItems);
    };

    checkIcon.addEventListener("click", () => {
      const hasFilters =
        titleInput.value.trim() !== "" ||
        filterArtistSelect.value !== "" ||
        minPriceInput.value !== "" ||
        maxPriceInput.value !== "" ||
        filterTypeSelect.value !== "";

      if (hasFilters) {
        filterWindow.classList.remove("is-active");
        checkIcon.style.display = "none";
        xIcon.style.display = "none";

        filterItems();

        titleInput.value = "";
        filterArtistSelect.value = "";
        minPriceInput.value = "";
        maxPriceInput.value = "";
        filterTypeSelect.value = "";
      }
    });

    filterIcon.addEventListener("click", () => {
      console.log("Filter icon clicked");
      filterWindow.classList.toggle("is-active");
      checkIcon.style.display = "block";
      xIcon.style.display = "block";
    });

    xIcon.addEventListener("click", () => {
      console.log("X icon clicked");
      filterWindow.classList.remove("is-active");
      checkIcon.style.display = "none";
      xIcon.style.display = "none";
    });

    titleInput.addEventListener("input", filterItems);
    filterArtistSelect.addEventListener("change", filterItems);
    minPriceInput.addEventListener("input", filterItems);
    maxPriceInput.addEventListener("input", filterItems);
    filterTypeSelect.addEventListener("change", filterItems);

    function rendeArtistOption(data) {
      const defaultOption = renderDefaultOption();
      filterArtistSelect.append(defaultOption);

      data.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.name;
        option.textContent = element.name;
        filterArtistSelect.appendChild(option);
      });
    }

    function renderTypeOption(data) {
      const defaultOption = renderDefaultOption();
      filterTypeSelect.append(defaultOption);

      data.forEach((element) => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        filterTypeSelect.appendChild(option);
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

    rendeArtistOption(this.Data);
    renderTypeOption(this.itemTypes);

    function createCardElement(item, cardIndex) {
      const card = document.createElement("div");
      const img = document.createElement("img");
      const cardBody = document.createElement("div");
      const pTitle = document.createElement("p");
      const pTitleSpan = document.createElement("span");
      const span = document.createElement("span");
      const pOne = document.createElement("p");
      const pTwo = document.createElement("p");

      img.className = "card-image";
      cardBody.className = "card-body";
      pTitle.className = "card-p-title-element";
      pTitleSpan.className = "card-p-title-span-element";
      span.className = "card-span-element";
      pOne.className = "card-p-one-element";
      pTwo.className = "card-p-two-element";

      card.classList.add("card");

      img.src = item.image;
      pTitleSpan.textContent = item.artist;
      span.textContent = `${item.price} $`;
      pOne.textContent = item.title;
      pTwo.textContent = item.description;

      card.append(img, cardBody);
      cardBody.append(pTitle, pOne, pTwo);
      pTitle.append(pTitleSpan, span);

      if (cardIndex % 2 === 1) {
        cardBody.style.backgroundColor = "#A16A5E";
        span.style.backgroundColor = "#FCEBD5";
        span.style.color = "#A16A5E";
        pOne.style.color = "#FCEBD5";
        pTwo.style.color = "#FCEBD5";
        pTitleSpan.style.color = "#FCEBD5";
      } else {
        cardBody.style.backgroundColor = "#FCEBD5";
        span.style.backgroundColor = "#A16A5E";
        span.style.color = "#fff";
        pOne.style.color = "#A16A5E";
        pTwo.style.color = "#A16A5E";
        pTitleSpan.style.color = "#A16A5E";
      }

      return card;
    }

    function renderCard(items) {
      cardWrapper.innerHTML = "";
      let cardIndex = 0;
      items.forEach((item) => {
        if (item.isPublished) {
          const card = createCardElement(item, cardIndex);
          cardWrapper.appendChild(card);
          cardIndex++;
        }
      });
    }

    renderCard(this.items);
  }
}
