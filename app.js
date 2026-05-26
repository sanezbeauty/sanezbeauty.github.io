/* =========================
   SAFE GLOBAL STATE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   HERO ANIMATION (INDEX ONLY)
========================= */

const hiddenElements = document.querySelectorAll('.hidden');

if (hiddenElements.length > 0) {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  });

  hiddenElements.forEach(el => observer.observe(el));

}

/* =========================
   NAV CART UPDATE
========================= */

function updateCartUI() {

  const el = document.getElementById("cartCount");

  if (el) {
    el.innerText = cart.length;
  }

}

/* =========================
   NAVIGATION
========================= */

function goToShop() {
  window.location.href = "container.html";
}

function openCart() {
  window.location.href = "cart.html";
}

/* =========================
   INSTAGRAM ORDER SYSTEM
========================= */

function contactInstagram(productName = "", productPrice = "") {

  const message =
`Hello SANÉZ BEAUTY,

I want to place an order from your website.

${productName ? `Product: ${productName}` : ""}
${productPrice ? `Price: ₹${productPrice}` : ""}

Please guide me further regarding the order.`;

  navigator.clipboard.writeText(message);

  alert("Order message copied! Please paste it in Instagram DM.");

  window.open(
    "https://www.instagram.com/sanezbeauty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "_blank"
  );

}

/* =========================
   PRODUCT DATA (WITH IMAGES)
========================= */

const products = [

  {
    id: 1,
    name: "Sandalwood Soap",
    price: 59,
    image: "piics/1.png"
  },

  {
    id: 2,
    name: "Lavender Soap",
    price: 59,
    image: "piics/2.jpg"
  },

  {
    id: 3,
    name: "Glycerine Soap",
    price: 59,
    image: "piics/3.jpg"
  },

  {
    id: 4,
    name: "Neem Soap",
    price: 59,
    image: "piics/4.jpg"
  },

  {
    id: 5,
    name: "Multani Mitti Soap",
    price: 59,
    image: "piics/5.jpg"
  },

  {
    id: 6,
    name: "Aloe Vera Soap",
    price: 59,
    image: "piics/6.jpg"
  },

  {
    id: 7,
    name: "Neem + Turmeric Soap",
    price: 59,
    image: "piics/7.jpg"
  },

  {
    id: 8,
    name: "De-Tan Soap(gram flour + mulani mitti)",
    price: 59,
    image: "piics/8.jpg"
  },

  {
    id: 9,
    name: "7 in 1 scrub + facepack",
    price: 49,
    image: "piics/9.jpg"
  }

];

/* =========================
   INIT
========================= */

if (document.getElementById("products")) {
  renderProducts();
}

updateCartUI();

/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts() {

  const box = document.getElementById("products");

  if (!box) return;

  box.innerHTML = "";

  products.forEach(p => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      <div class="imgBox">
        <img src="${p.image}" alt="${p.name}">
      </div>

      <h3>${p.name}</h3>

      <p>₹${p.price}</p>

      <div class="btn-group">

        <button onclick="addToCart(${p.id})">
          Add to Cart 🛒
        </button>

        <button onclick="buyNow(${p.id})">
          Order Now
        </button>

      </div>

    `;

    box.appendChild(card);

    if (typeof gsap !== "undefined") {

      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 0.4
      });

    }

  });

}

/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

  const item = products.find(p => p.id === id);

  if (!item) return;

  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartUI();

  if (typeof gsap !== "undefined") {

    const cartEl = document.querySelector(".cart");

    if (cartEl) {

      gsap.from(cartEl, {
        scale: 1.2,
        duration: 0.2
      });

    }

  }

}

/* =========================
   BUY NOW
   (TEMP INSTAGRAM FLOW)
========================= */

function buyNow(id) {

  const item = products.find(p => p.id === id);

  if (!item) return;

  contactInstagram(item.name, item.price);

}

/* =========================
   CART PAGE RENDER
========================= */

function renderCart() {

  const box = document.getElementById("cartItems");

  if (!box) return;

  box.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

    const row = document.createElement("div");

    row.className = "cart-item";

    row.innerHTML = `

      <div class="cart-img">
        <img src="${item.image}" />
      </div>

      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      </div>

      <div class="qty">
        <button onclick="removeItem(${index})">🗑</button>
      </div>

    `;

    box.appendChild(row);

  });

  const totalEl = document.getElementById("totalPrice");

  if (totalEl) {
    totalEl.innerText = "Total: ₹" + total;
  }

}

/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartUI();

  renderCart();

}

/* =========================
   CART INIT
========================= */

if (document.getElementById("cartItems")) {
  renderCart();
}

/* =========================
   CART CHECKOUT BUTTON
   (TEMP INSTAGRAM FLOW)
========================= */

function goToPayment() {

  if (cart.length === 0) {

    alert("Your cart is empty.");
    return;

  }

  let itemsList = "";

  let total = 0;

  cart.forEach(item => {

    itemsList += `• ${item.name} - ₹${item.price}\n`;

    total += item.price;

  });

  const message =
`Hello SANÉZ BEAUTY,

I want to place an order.

Products:
${itemsList}

Total: ₹${total}

Please guide me further regarding the order.`;

  navigator.clipboard.writeText(message);

  alert("Order details copied! Please paste it in Instagram DM.");

  window.open(
    "https://instagram.com/https://https://www.instagram.com/sanezbeauty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "_blank"
  );

}

/* ===================================================
   TEMPORARILY DISABLED PAGES
   (BANK ISSUE - WILL RESTORE LATER)
=================================================== */

/*

=========================
PAYMENT PAGE SYSTEM
=========================

function clearExpressItem() {
  localStorage.removeItem("expressItem");
}

function loadPayment() {

  const box = document.getElementById("orderDetails");
  const totalEl = document.getElementById("totalAmount");

  if (!box || !totalEl) return;

  box.innerHTML = "";

  let total = 0;
  let items = [];

  const expressItem =
    JSON.parse(localStorage.getItem("expressItem"));

  if (cart && cart.length > 0) {
    items = [...cart];
  }

  else if (expressItem) {
    items = [expressItem];
  }

  if (items.length === 0) {

    box.innerHTML = "<p>No items found</p>";

    totalEl.innerText = "Total: ₹0";

    return;

  }

  items.forEach(item => {

    total += item.price;

    box.innerHTML += `
      <p>${item.name} - ₹${item.price}</p>
    `;

  });

  totalEl.innerText = "Total: ₹" + total;

}

if (document.getElementById("orderDetails")) {

  loadPayment();

  clearExpressItem();

}

*/

/*

=========================
FORM SYSTEM
=========================

const form = document.getElementById("orderForm");

if (form) {

  form.addEventListener("submit", function(e) {

    e.preventDefault();

    const expressItem =
      JSON.parse(localStorage.getItem("expressItem"));

    let orderItems = [];

    if (cart.length > 0) {
      orderItems = cart;
    }

    else if (expressItem) {
      orderItems = [expressItem];
    }

    const orderData = {

      name: document.getElementById("name").value,

      mobile: document.getElementById("mobile").value,

      email: document.getElementById("email").value,

      address: document.getElementById("address").value,

      txn: document.getElementById("txn").value,

      items: orderItems,

      total: orderItems.reduce(
        (sum, i) => sum + i.price,
        0
      ),

      time: new Date().toISOString()

    };

    console.log("ORDER PLACED:", orderData);

    localStorage.removeItem("cart");

    localStorage.removeItem("expressItem");

    window.location.href = "success.html";

  });

}

*/

/*

=========================
SUCCESS PAGE REDIRECT
=========================

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("orderForm");

  if (form) {

    form.addEventListener("submit", function (e) {

      e.preventDefault();

      window.location.href = "success.html";

    });

  }

});

*/
