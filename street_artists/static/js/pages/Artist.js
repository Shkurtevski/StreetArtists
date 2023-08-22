import AbstractView from "./AbstractView.js";
import { items } from "../data/Data.js";
import { getFromStore } from "../store.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.items = [];
    this.setTitle("Artist");
  }

  async getHtml() {
    this.items = items;
    const artistName = getFromStore("selectedArtistName");

    return `
      <div id="artist">
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
                    <li><a href="/artist" data-link>Home</a></li>
                    <li><a href="/artist/items/${encodeURIComponent(
                      getFromStore("selectedArtistName")
                    )}" data-link>Items</a></li>
                    <li><a href="/itemauction" data-link>Auction</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="main-container">
          <div class="main-wrapper">
            <div class="content-wrapper">
              <div class="left-right-wrapper">
                <div class="left-content">
                  <p>total items sold</p>
                  <p class="items-sold"></p>
                </div>
                <div class="right-content">
                  <p>total income</p>
                  <p class="items-income"></p>
                </div>
              </div>
              <div class="bottom-content">
                <p class="item-auction-title">live auctioning item</p>
                <p class="item-auction"></p>
                <p>current bid</p>
              </div>
            </div>
          </div>
          <div class="chart-content-wrapper">
            <div class="chart-content">
              <p>Display my income for all time</p>
              <div class="chart-buttons-wrapper">
                <button id="btn-7" class="btn btn-dark">7 days</button>
                <button id="btn-14" class="btn btn-dark">14 days</button>
                <button id="btn-30" class="btn btn-dark">30 days</button>
                <button id="btn-all-time" class="btn btn-dark">All time</button>
              </div>
            </div>
            <div class="chart-container">
              <canvas id="myChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onMount() {
    const artistName = getFromStore("selectedArtistName");
    const itemsByArtist = extractDataForArtists(artistName);
    const itemAuction = document.querySelector(".item-auction");

    function findItemByAuctionStatusAndArtist(auctioningStatus, artistName) {
      return items.find((item) => {
        return (
          localStorage.getItem(`item_${item.id}_isAuctioning`) ===
            auctioningStatus.toString() && item.artist === artistName
        );
      });
    }

    let auctioningItem = findItemByAuctionStatusAndArtist(true, artistName);

    if (auctioningItem) {
      itemAuction.textContent = `$${auctioningItem.price}`;
    } else {
      itemAuction.textContent = "";
    }

    const buttons = [
      document.querySelector("#btn-7"),
      document.querySelector("#btn-14"),
      document.querySelector("#btn-30"),
      document.querySelector("#btn-all-time"),
    ];

    buttons[3].classList.add("btn-active-contrast");

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn, i) => {
          if (i === index) {
            btn.classList.add("btn-active-contrast");
          } else {
            btn.classList.remove("btn-active-contrast");
          }
        });
      });
    });

    const itemsSoldPara = document.querySelector(".items-sold");
    const itemsIncome = document.querySelector(".items-income");
    const hamburger = document.querySelector(".hamburger-bars");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    function extractDataForArtists(artistName) {
      return items.filter((item) => item.artist === artistName);
    }

    function updateUI(artistName, itemsByArtist) {
      const dateCreated = itemsByArtist.map((item) => item.dateCreated);
      const priceSold = itemsByArtist.map((item) => item.priceSold);
      const totalSoldItems = itemsByArtist.length;
      const accumulatedMoney = priceSold.reduce((acc, price) => acc + price, 0);

      itemsSoldPara.textContent = `${totalSoldItems}/${itemsByArtist.length}`;
      itemsIncome.textContent = `$${accumulatedMoney}`;

      generateChart(priceSold, totalSoldItems);
    }

    function generateChart(priceSold, totalSoldItems) {
      const ctx = document.getElementById("myChart").getContext("2d");
      const soldItems = Array.from({ length: totalSoldItems }, (_, i) => i + 1);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: soldItems,
          datasets: [
            {
              label: "Amount",
              data: priceSold,
              backgroundColor: "#A16A5E",
              borderColor: "rgba(75, 192, 192, 1)",
              hoverBackgroundColor: "#D44C2E",
              borderWidth: 0,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    }

    updateUI(artistName, itemsByArtist);
  }
}
