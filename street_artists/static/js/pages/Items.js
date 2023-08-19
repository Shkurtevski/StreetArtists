import AbstractView from "./AbstractView.js";
import { items } from "../data/Data.js";
import { setItems } from "../data/Data.js";
import { getItems } from "../data/Data.js";
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
                    <li><a href="#">${artistName}</a></li>
                    <li><a href="/auction">Auction</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="edit-window">
          <div class="edit-window-content">
            <form id="edit-form">
              <p class="edit-paragraph"><span>Edit Item:</span><span><label for="item-is-published-checkbox">Is published</label>
                <input type="checkbox" id="item-is-published-checkbox" name="isPublished" /></span></p>
                <div class="form-group-artist">
                  <label for="item-title-input">Title</label>
                  <input type="text" id="item-title-input" name="title" placeholder="Item Title" />
                </div>
              <div class="form-group-artist">
                <label for="item-description-input">Description</label>
                <textarea id="item-description-input" name="description" placeholder="Item Description"></textarea>
              </div>
              <div class="form-group-artist">
                    <div class="price-group">
                      <div class="type-group">
                        <label for="item-type-input">Type</label>
                        <input type="text" id="item-type-input" name="type" placeholder="Item Type" />
                    </div>
                      <div class="price-group-inner">
                        <label for="item-price-input">Price</label>
                        <input type="text" id="item-price-input" name="price" placeholder="Item Price" />
                      </div>
                    </div>
                  </div>
              <div class="form-group-artist">
                <label for="item-image-input">Image URL</label>
                <input type="text" id="item-image-input" name="image" placeholder="Item Image URL" />
              </div>
              <div class="form-group-artist">
                <div class="edit-image">
                   <img id="edit-item-image-preview" src="" alt="Edit Item Image Preview" />
                </div>
              </div>
              <div class="button-wrapper-edit-window">
                <button class="save-btn btn btn-active-contrast">Save</button>
                <button class="cancel-btn btn btn-white">Cancel</button>
              </div>
            </form>
          </div>
        </div>
        <div id="add-new-item">
          <div class="add-new-item-square">
            <div class="add-new-item-square-inner">
              <p class="add-new-item-text">&#43; Add new item</p>
            </div>
          </div>
          <div class="add-new-item-window">
            <div class="new-item-window-content">
              <form id="add-new-item-form">
                <p class="edit-paragraph"><span>Edit Item:</span><span><label for="new-item-is-published-checkbox">Is published</label>
                  <input type="checkbox" id="new-item-is-published-checkbox" name="isPublished" /></span></p>
                  <div class="form-group-artist">
                    <label for="new-item-title-input">Title</label>
                    <input type="text" id="new-item-title-input" name="title" placeholder="Item Title" />
                  </div>
                <div class="form-group-artist">
                  <label for="new-item-description-input">Description</label>
                  <textarea id="new-item-description-input" name="description" placeholder="Item Description"></textarea>
                </div>
                <div class="form-group-artist">
                      <div class="price-group">
                        <div class="type-group">
                          <label for="new-item-type-input">Type</label>
                          <input type="text" id="new-item-type-input" name="type" placeholder="Item Type" />
                      </div>
                        <div class="price-group-inner">
                          <label for="new-item-price-input">Price</label>
                          <input type="text" id="new-item-price-input" name="price" placeholder="Item Price" />
                        </div>
                      </div>
                    </div>
                <div class="form-group-artist">
                  <label for="new-item-image-input">Image URL</label>
                  <input type="text" id="new-item-image-input" name="image" placeholder="Item Image URL" />
                </div>
                <div class="form-group-artist">
                  <div class="form-text">
                  <p>or</p>
                  </div>
                </div>
                <div class="form-group-artist">
                  <div class="camera-square">
                    <div class="camera-square-inner">
                      <i class="fa-solid fa-camera" id="camera-icon"></i>
                      <p class="camera-text">Take a snapshot</p>
                      </div>
                  </div>
                  <div class="camera-popup" id="camera-popup">
                    <div class="popup-content">
                      <h3>Take a Snapshot</h3>
                      <video id="camera-feed-popup" autoplay></video>
                      <div class="camera-button-wrapper">
                        <button class="capture-btn btn btn-active-contrast" id="capture-button-popup">Capture</button>
                        <button class="cancel-btn btn btn-white" id="cancel-button-popup">Cancel</button>
                      </div>
                    </div>
                </div>
                </div>
                <div class="button-wrapper-edit-window">
                  <button class="save-btn-camera btn btn-active-contrast">Save</button>
                  <button class="cancel-btn btn btn-white">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="card-container">
          <div class="card-wrapper">
            </div>
          </div>
        </div>
    `;
  }

  onMount() {
    this.artistName = decodeURIComponent(extractArtistNameFromPath());
    console.log("Artist name in onMount:", this.artistName);

    const hamburger = document.querySelector(".hamburger-bars");
    const navLinks = document.querySelector(".nav-links");

    const editWindow = document.querySelector(".edit-window");
    const cancelBtn = document.querySelector(".cancel-btn");
    const saveBtn = document.querySelector(".save-btn");

    const cardWrapper = document.querySelector(".card-wrapper");

    const itemIsPublishedCheckbox = document.getElementById(
      "item-is-published-checkbox"
    );
    const itemTitleInput = document.getElementById("item-title-input");
    const itemDescriptionInput = document.getElementById(
      "item-description-input"
    );
    const itemTypeInput = document.getElementById("item-type-input");
    const itemPriceInput = document.getElementById("item-price-input");
    const itemImageInput = document.getElementById("item-image-input");

    const addNewItemSquare = document.querySelector(
      ".add-new-item-square-inner"
    );
    const addNewItemWindow = document.querySelector(".add-new-item-window");

    const cameraIcon = document.getElementById("camera-icon");
    const cameraText = document.querySelector(".camera-text");
    const cameraFeedPopup = document.getElementById("camera-feed-popup");
    const captureButtonPopup = document.getElementById("capture-button-popup");
    const cancelButtonPopup = document.querySelector("#cancel-button-popup");
    const cameraPopup = document.getElementById("camera-popup");
    const saveBtnCamera = document.querySelector(".save-btn-camera");
    let cameraStreamPopup = null;

    cameraIcon.addEventListener("click", () => {
      cameraPopup.style.display = "block";

      if (!cameraStreamPopup) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            cameraStreamPopup = stream;
            cameraFeedPopup.srcObject = stream;
          })
          .catch((error) => {
            console.error("Error accessing camera:", error);
          });
      }
    });

    let capturedImage = null;

    captureButtonPopup.addEventListener("click", async (event) => {
      event.preventDefault();
      if (cameraStreamPopup) {
        const canvas = document.createElement("canvas");
        canvas.width = cameraFeedPopup.videoWidth;
        canvas.height = cameraFeedPopup.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(cameraFeedPopup, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL("image/jpeg", 0.7);

        const uniqueImageName = `image_${Date.now()}.jpg`;

        const imageBase64 = getBase64ImageFromDataURL(dataURL);

        const newItemImageInput = document.getElementById(
          "new-item-image-input"
        );
        newItemImageInput.value = uniqueImageName;

        const cameraSquareInner = document.querySelector(
          ".camera-square-inner"
        );

        cameraIcon.style.display = "none";
        cameraText.style.display = "none";

        if (capturedImage) {
          capturedImage.remove();
        }

        capturedImage = document.createElement("img");
        capturedImage.src = dataURL;
        capturedImage.alt = "Captured Image";
        capturedImage.className = "captured-image";

        cameraSquareInner.appendChild(capturedImage);

        localStorage.setItem("capturedImage", imageBase64);

        cameraPopup.style.display = "none";
        cameraStreamPopup.getTracks().forEach((track) => track.stop());
      }
    });

    function getBase64ImageFromDataURL(dataURL) {
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    cancelButtonPopup.addEventListener("click", () => {
      if (canvas) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      cameraPopup.style.display = "none";

      if (cameraStreamPopup) {
        cameraStreamPopup.getTracks().forEach((track) => track.stop());
      }
    });

    saveBtnCamera.addEventListener("click", (event) => {
      event.preventDefault();

      const newItemIsPublishedCheckbox = document.getElementById(
        "new-item-is-published-checkbox"
      );
      const newItemTitleInput = document.getElementById("new-item-title-input");
      const newItemDescriptionInput = document.getElementById(
        "new-item-description-input"
      );
      const newItemTypeInput = document.getElementById("new-item-type-input");
      const newItemPriceInput = document.getElementById("new-item-price-input");
      const newItemImageInput = document.getElementById("new-item-image-input");

      const newItem = {
        id: Date.now(),
        description: newItemDescriptionInput.value,
        image: newItemImageInput.value,
        price: parseFloat(newItemPriceInput.value),
        artist: this.artistName,
        dateCreated: "2023-10-13T02:00:48.990Z",
        isPublished: true,
        isAuctioning: false,
        dateSold: "2023-11-29T02:00:48.990Z",
        priceSold: 16203,
        title: newItemTitleInput.value,
        type: newItemTypeInput.value,
      };

      if (capturedImage) {
        localStorage.setItem("capturedImage", capturedImage.src);
        newItem.image = capturedImage.src;
        capturedImage = null;
      }

      items.push(newItem);
      setItems(items);

      if (newItem.artist === this.artistName) {
        const card = createCardElement(newItem, items.length - 1);
        cardWrapper.appendChild(card);
      }

      if (
        !newItemTitleInput.value ||
        !newItemDescriptionInput.value ||
        !newItemTypeInput.value ||
        !newItemPriceInput.value ||
        !newItemImageInput.value
      ) {
        alert("All fields are !");
        return;
      }

      newItemIsPublishedCheckbox.checked = false;
      newItemTitleInput.value = "";
      newItemDescriptionInput.value = "";
      newItemTypeInput.value = "";
      newItemPriceInput.value = "";
      newItemImageInput.value = "";

      cameraPopup.style.display = "none";
      addNewItemWindow.classList.remove("is-active");
      console.log("New Item:", newItem);
      location.reload();
    });

    addNewItemSquare.addEventListener("click", () => {
      addNewItemWindow.classList.toggle("is-active");
      console.log("clicked");
    });

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
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
      sendToAuctionBtn.className = "btn btn-blue send-to-auction-button";
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
        ? "Auctioning.."
        : "Send to Auction";
      publishBtn.textContent = item.isPublished ? "Unpublish" : "Publish";
      publishBtn.classList.toggle("btn-green", item.isPublished);
      publishBtn.classList.toggle("btn-white", !item.isPublished);
      sendToAuctionBtn.classList.toggle("btn-green", item.isAuctioning);
      sendToAuctionBtn.classList.toggle("btn-blue", !item.isAuctioning);
      removeBtn.textContent = "Remove";
      editBtn.textContent = "Edit";

      card.append(img, cardBody);
      cardBody.append(pTitle, pOne, pTwo, buttonsWrapper);
      pTitle.append(pTitleSpan, span);
      buttonsWrapper.append(sendToAuctionBtn, publishBtn, removeBtn, editBtn);

      publishBtn.addEventListener("click", () => {
        item.isPublished = !item.isPublished;
        setItems(items);

        publishBtn.textContent = item.isPublished ? "Unpublish" : "Publish";
        publishBtn.classList.toggle("btn-green", item.isPublished);
        publishBtn.classList.toggle("btn-white", !item.isPublished);
      });

      sendToAuctionBtn.addEventListener("click", () => {
        if (!item.isAuctioning) {
          const auctioningItem = items.find((item) => item.isAuctioning);
          if (auctioningItem) {
            console.log("An item is already in auction.");
            console.log(
              "An item is already in auction, ID:",
              auctioningItem.id
            );
            return;
          }

          item.isAuctioning = true;
          sendToAuctionBtn.textContent = "Auctioning...";
          sendToAuctionBtn.disabled = true;
          publishBtn.disabled = true; // Disable the Publish button
          removeBtn.disabled = true; // Disable the Remove button
          editBtn.disabled = true; // Disable the Edit button

          localStorage.setItem(`item_${item.id}_isAuctioning`, "true");
          localStorage.setItem(`item_${item.id}_buttonColor`, "btn-green");

          localStorage.setItem(`item_${item.id}_isAuctioning`, "true");

          localStorage.setItem("currentAuctionItemId", item.id);

          sendToAuctionBtn.classList.remove("btn-blue");
          sendToAuctionBtn.classList.add("btn-green");
        }
      });

      // Check if the button color class was saved in localStorage
      if (localStorage.getItem(`item_${item.id}_buttonColor`) === "btn-green") {
        sendToAuctionBtn.classList.remove("btn-blue");
        sendToAuctionBtn.classList.add("btn-green");
      }

      if (localStorage.getItem(`item_${item.id}_isAuctioning`) === "true") {
        item.isAuctioning = true;
        sendToAuctionBtn.textContent = "Auctioning...";
        sendToAuctionBtn.disabled = true;
        publishBtn.disabled = true;
        removeBtn.disabled = true;
        editBtn.disabled = true;
      }

      items.forEach((item) => {
        if (item.isAuctioning) {
          console.log(`Item ID ${item.id} is in auction.`);
        }
      });

      const currentAuctionItemId = localStorage.getItem("currentAuctionItemId");
      if (currentAuctionItemId && currentAuctionItemId !== item.id) {
        sendToAuctionBtn.disabled = true;
      }

      removeBtn.addEventListener("click", () => {
        const cardIdToRemove = item.id;

        const updatedItems = items.filter((item) => item.id !== cardIdToRemove);
        setItems(updatedItems);
        card.remove();
        console.log(updatedItems);

        console.log(items);
      });

      editBtn.addEventListener("click", () => {
        itemIsPublishedCheckbox.checked = item.isPublished;
        itemTitleInput.value = item.title;
        itemDescriptionInput.value = item.description;
        itemTypeInput.value = item.type;
        itemPriceInput.value = item.price.toString();
        itemImageInput.value = item.image;

        const editItemImagePreview = document.getElementById(
          "edit-item-image-preview"
        );
        editItemImagePreview.src = item.image;

        saveBtn.dataset.itemIndex = cardIndex;

        console.log("Editing item at index:", cardIndex);
        editWindow.classList.add("is-active");
      });

      saveBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const editedItemIndex = parseInt(saveBtn.dataset.itemIndex, 10);
        if (
          !isNaN(editedItemIndex) &&
          editedItemIndex >= 0 &&
          editedItemIndex < items.length
        ) {
          const editedItem = items[editedItemIndex];

          editedItem.isPublished = itemIsPublishedCheckbox.checked;
          editedItem.title = itemTitleInput.value;
          editedItem.description = itemDescriptionInput.value;
          editedItem.type = itemTypeInput.value;
          editedItem.price = parseFloat(itemPriceInput.value);
          editedItem.image = itemImageInput.value;
          editedItem.artist = this.artistName;

          if (localStorage.getItem(`item_${item.id}_isAuctioning`) === "true") {
            sendToAuctionBtn.textContent = "Auctioning...";
            sendToAuctionBtn.classList.remove("btn-blue");
            sendToAuctionBtn.classList.add("btn-green");
          } else {
            sendToAuctionBtn.textContent = "Send to Auction";
            sendToAuctionBtn.classList.remove("btn-green");
            sendToAuctionBtn.classList.add("btn-blue");
          }

          setItems(items);

          const updatedCard = createCardElement(editedItem, editedItemIndex);
          const existingCard = cardWrapper.children[editedItemIndex];

          console.log("Updating card for item at index:", editedItemIndex);
          console.log("Existing card:", existingCard);

          if (Node.prototype.isPrototypeOf(existingCard)) {
            cardWrapper.replaceChild(updatedCard, existingCard);
            editWindow.classList.remove("is-active");
          } else {
            console.error("Existing card element is not a valid Node.");
          }
        }
      });

      return card;
    };

    cancelBtn.addEventListener("click", (event) => {
      editWindow.classList.remove("is-active");
    });

    const renderCard = (items) => {
      cardWrapper.innerHTML = "";
      let cardIndex = 0;
      const renderArtistName = this.artistName;
      items.forEach((item) => {
        if (item.artist === renderArtistName) {
          const card = createCardElement(item, cardIndex);
          cardWrapper.appendChild(card);
          cardIndex++;
        }
      });
    };

    console.log(items.length);
    renderCard(items);
  }
}
