import AbstractView from "./AbstractView.js";
import { items } from "../data/Data.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("ItemAuction");
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
            <div class="item-sold"></div>
            <button id="btn-bid" class="btn btn-active-contrast">Bid</button>
          </div>
        </div>
      </div>
        `;
  }
  onMount() {
    const cardWrapper = document.querySelector(".card-wrapper");
    const bidButton = document.querySelector("#btn-bid");

    function updateCardElementPrice(card, price) {
      const priceElement = card.querySelector(".card-span-element");
      priceElement.textContent = `${price} $`;
    }

    function findItemByAuctionStatus(auctioningStatus) {
      return items.find((item) => {
        return (
          localStorage.getItem(`item_${item.id}_isAuctioning`) ===
          auctioningStatus.toString()
        );
      });
    }

    const auctioningItem = findItemByAuctionStatus(true);

    if (auctioningItem) {
      console.log("Item in auction found:", auctioningItem.id);
      items.forEach((item) => {
        item.isAuctioning = true;
      });
    } else if (!auctioningItem) {
      items.forEach((item) => {
        item.isAuctioning = false;
      });
    }

    if (auctioningItem) {
      console.log("Item in auction found:", auctioningItem.id);

      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.className = "card-image";
      img.src = auctioningItem.image;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const pTitle = document.createElement("p");
      pTitle.className = "card-p-title-element";

      const pTitleSpan = document.createElement("span");
      pTitleSpan.className = "card-p-title-span-element";
      pTitleSpan.textContent = auctioningItem.artist;

      const span = document.createElement("span");
      span.className = "card-span-element";
      span.textContent = `${auctioningItem.price} $`;

      const pOne = document.createElement("p");
      pOne.className = "card-p-one-element";
      pOne.textContent = auctioningItem.title;

      const pTwo = document.createElement("p");
      pTwo.className = "card-p-two-element";
      pTwo.textContent = auctioningItem.description;

      pTitle.append(pTitleSpan, span);
      cardBody.append(pTitle, pOne, pTwo);
      card.append(img, cardBody);
      cardWrapper.append(card);

      auctioningItem.card = card;
    }

    bidButton.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log("Bid button clicked");

      try {
        if (auctioningItem && auctioningItem.isAuctioning) {
          const apiData = await biddingAPIAsync(auctioningItem);

          if (apiData) {
            auctioningItem.price += apiData.bidAmount;
            auctioningItem.priceSold = auctioningItem.price; // Update priceSold

            console.log("Updated price:", auctioningItem.price);

            updateCardElementPrice(auctioningItem.card, auctioningItem.price);

            // Update the card data in local storage
            localStorage.setItem(
              `item_${auctioningItem.id}`,
              JSON.stringify(auctioningItem)
            );
          }
        } else {
          console.log("Item is not in auction.");
        }
      } catch (error) {
        console.error("Error during bidding:", error);
      }
    });

    async function biddingAPIAsync(item) {
      const formData = new FormData();
      formData.set("amount", 50);

      try {
        const rawData = await fetch(
          "https://projects.brainster.tech/bidding/api",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await rawData.json();
        console.log(data);

        return data;
      } catch (error) {
        console.error("Error during bidding:", error);
        throw error;
      }
    }
  }
}
