import AbstractView from "./AbstractView.js";
import { items } from "../data/Data.js";
import { setItems } from "../data/Data.js";
import { extractArtistNameFromPath } from "../store.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.items = [];
    this.setTitle("Items");
    this.artistName = decodeURIComponent(extractArtistNameFromPath());
    console.log("Received artist name:", this.artistName);
    console.log("Received params:", params);
  }

  

  async getHtml() {
    this.items = items;
    const artistName = this.artistName;
    
    return `
      <div id="items">
       <nav>
          <div class="nav-wrapper">
            <div class="nav-content-wrapper">
              <div class="nav-content">
                <a href="/" data-link>
                  <img src="/static/images/logo-picture.png" alt="logo-picture" />
                  <p>${artistName}</p></a
                >
              </div>
              <div class="hamburger-menu">
                <img class="hamburger-bars" src="/static/images/hamburger.svg" alt"SVG
                Image">
                <div class="nav-links">
                  <ul>
                    <li><a href="/artist">Home</a></li>
                    <li><a href="/artist/items">Items</a></li>
                    <li><a href="/auction">Auction</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="card-container">
          <div class="card-wrapper">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const hamburger = document.querySelector(".hamburger-bars");
    const navLinks = document.querySelector(".nav-links");

    const cardWrapper = document.querySelector(".card-wrapper");

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    this.artistName = decodeURIComponent(extractArtistNameFromPath());
    console.log("Artist name in onMount:", this.artistName);

    function createCardElement(item, cardIndex) {
      const card = document.createElement("div");
      const img = document.createElement("img");
      const cardBody = document.createElement("div");
      const pTitle = document.createElement("p");
      const pTitleSpan = document.createElement("span");
      const span = document.createElement("span");
      const pOne = document.createElement("p");
      const pTwo = document.createElement("p");
      const buttonsWrapper = document.createElement("div");
      const sendToAuctionBtn = document.createElement("button");
      const publishBtn = document.createElement("button");
      const removeBtn = document.createElement("button");
      const editBtn = document.createElement("button");

      img.className = "card-image";
      cardBody.className = "card-body";
      pTitle.className = "card-p-title-element";
      pTitleSpan.className = "card-p-title-span-element";
      span.className = "card-span-element";
      pOne.className = "card-p-one-element";
      pTwo.className = "card-p-two-element";
      buttonsWrapper.className = "buttons-wrapper-card";
      sendToAuctionBtn.className = "btn btn-blue";
      publishBtn.className = "btn btn-white";
      removeBtn.className = "btn btn-active-contrast";
      editBtn.className = "btn btn-light";

      card.classList.add("card");

      img.src = item.image;
      pTitleSpan.textContent = item.artist;
      span.textContent = `${item.price} $`;
      pOne.textContent = item.title;
      pTwo.textContent = item.description;
      sendToAuctionBtn.textContent = item.isAuctioning
        ? "Remove from Auction"
        : "Send to Auction";
      publishBtn.textContent = item.isPublished ? "Unpublish" : "Publish";
      publishBtn.classList.toggle("btn-green", item.isPublished);
      publishBtn.classList.toggle("btn-white", !item.isPublished);
      removeBtn.textContent = "Remove";
      editBtn.textContent = "Edit";

      card.append(img, cardBody);
      cardBody.append(pTitle, pOne, pTwo, buttonsWrapper);
      pTitle.append(pTitleSpan, span);
      buttonsWrapper.append(sendToAuctionBtn, publishBtn, removeBtn, editBtn);

      publishBtn.addEventListener("click", () => {
        item.isPublished = !item.isPublished; // Toggle the isPublished property
        setItems(items); // Update the array in localStorage

        // Update button text and class
        publishBtn.textContent = item.isPublished ? "Unpublish" : "Publish";
        publishBtn.classList.toggle("btn-green", item.isPublished);
        publishBtn.classList.toggle("btn-white", !item.isPublished);
      });

      removeBtn.addEventListener("click", () => {
        const cardIdToRemove = item.id;

        const updatedItems = items.filter((item) => item.id !== cardIdToRemove);
        setItems(updatedItems);
        card.remove();
        console.log(updatedItems);

        console.log(items);
      });
      return card;
    }

    

    const renderCard = (items) => {
      cardWrapper.innerHTML = "";
      let cardIndex = 0;
      const renderArtistName = this.artistName;
      items.forEach((item) => {
        if (item.artist === renderArtistName) {
          // Use arrow function to maintain 'this'
          const card = createCardElement(item, cardIndex);
          cardWrapper.appendChild(card);
          cardIndex++;
        }
      });
    }

    renderCard(items);
  }
}
