import AbstractView from "./AbstractView.js";
import { items } from "../data/Data.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Items");
    this.items = [];
  }

  async getHtml() {
    this.items = items;
    return `
      <div id="auction">
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
        <div class="card-container">
          <div class="card-wrapper"></div>
        </div>
        <div class="live-auction">
          <div class="live-auction-inner">
            <div class="timer"></div>
            <button id="btn-bid" class="btn btn-active-contrast">Bid</button>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const cardWrapper = document.querySelector(".card-wrapper");
    const bidButton = document.querySelector("#btn-bid");

    // using async await
    async function biddingAPIAsync() {
      const formData = new FormData();
      formData.set("amount", 50);

      const rawData = await fetch(
        "https://projects.brainster.tech/bidding/api",
        { method: "POST", body: formData }
      );
      const data = await rawData.json();

      console.log(data);
    }
    biddingAPIAsync();

    // using regular function
    function biddingApi() {
      const formData = new FormData();
      formData.set("amount", 50);
      fetch("https://projects.brainster.tech/bidding/api", {
        method: "POST",
        body: formData,
      })
        .then((rawData) => rawData.json())
        .then((data) => console.log(data));
    }
    biddingApi();

    bidButton.addEventListener("click", (event) => {
      event.preventDefault();

      filteredCard.forEach((item) => {
        item.price /= 2;
        item.price = Math.floor(item.price);

        const card = document.querySelector(`.card[data-item-id="${item.id}"]`);
        const priceElement = card.querySelector(".card-span-element");
        priceElement.textContent = `${item.price} $`;

        localStorage.setItem(`price_${item.id}`, item.price);
      });
    });

    const createCardElement = (item, cardIndex) => {
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

      return card;
    };

    const filteredCard = items.filter((item) => item.isAuctioning === true);

    filteredCard.forEach((item) => {
      const card = createCardElement(item);
      card.setAttribute("data-item-id", item.id);
      cardWrapper.append(card);

      const storedPrice = localStorage.getItem(`price_${item.id}`);
      if (storedPrice) {
        const priceElement = card.querySelector(".card-span-element");
        priceElement.textContent = `${storedPrice} $`;
      }
    });

    console.log(filteredCard);
  }
}
