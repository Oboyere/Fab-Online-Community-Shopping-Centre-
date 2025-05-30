const products = [
  { name: "Amaya Wireless Bluetooth", price: 1500, image: "Amaya.jpeg", rating: 4 },
  { name: "Amaya USB Cable", price: 200, image: "amaya.jpg", rating: 5 },
  { name: "Original Amaya Type C", price: 1500, image: "c.JPG", rating: 4 },
  { name: "Solar Light", price: 750, image: "solar.jpg", rating: 3 },
  { name: "Snake Lights", price: 800, image: "snake lights.jpg", rating: 5 },
   { name: "Bab  Astra  Extension", price: 450, image: "exten.jpeg", rating: 3 },
  { name: "Snake light", price: 800, image: "snalight.jpeg", rating: 5 },
   { name: "Mens Classic Watch", price: 450, image: "watch.jpeg", rating: 3 },
  { name: "Mens Watch startar", price: 200, image: "watch2.jpeg", rating: 5 },
   { name: "Head phones soft", price: 1500, image: "headphones.jpg", rating: 3 },
  { name: "Stop Watch", price: 450, image: "stopwatch.jpeg", rating: 5 },
   { name: "Women classic bag", price: 200, image: "200 bag.jpg", rating: 3 },
  { name: "Sunday best for Women", price: 280, image: "280 bag.jpg", rating: 5 },
   { name: "Flower bag", price: 400, image: "400 bag.jpg", rating: 3 },
  { name: "Afya soap Anti-bacteria 100g", price: 80, image: "Afya soap.jpg", rating: 5 },
   { name: "compound solar light", price: 3500, image: "compound solar light.jpg", rating: 3 },
  { name: "Detrex black Antibacteria 80g ", price: 50, image: "detrexblack.jpeg", rating: 5 },
   { name: "Detrex Green Antibacteria 80g", price: 50, image: "soap green.jpeg", rating: 3 },
  { name: "Robot", price: 350, image: "robot.jpg", rating: 5 },
   { name: "Neck Headset", price: 650, image: "Neck headset.jpg", rating: 3 },
  { name: "Rechargeable DPLIGHT", price: 450, image: "Rec bulb.jpg", rating: 5 },
   { name: "Solar Light 50W", price: 800, image: "Rlight 50w.jpg", rating: 3 },
  { name: "Solar Gate Light", price: 1500, image: "solar gatelight.jpg", rating: 5 },
   { name: "DLight Solar Lantern", price: 1800, image: "dlight.jpg", rating: 3 },
];

const cart = {};

function displayProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product-card";

    const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Ksh ${product.price}</p>
      <div class="rating">${stars}</div>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(index) {
  const product = products[index];
  if (cart[product.name]) {
    cart[product.name].quantity += 1;
  } else {
    cart[product.name] = {
      price: product.price,
      quantity: 1
    };
  }
  updateCart();
}

function removeFromCart(name) {
  if (cart[name]) {
    cart[name].quantity -= 1;
    if (cart[name].quantity <= 0) {
      delete cart[name];
    }
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";
  let total = 0;

  for (const [name, details] of Object.entries(cart)) {
    const itemTotal = details.price * details.quantity;
    total += itemTotal;
    const li = document.createElement("li");
    li.innerHTML = `
      ${name} - ${details.quantity} x Ksh ${details.price} = Ksh ${itemTotal}
      <button onclick="removeFromCart('${name}')">Remove</button>
    `;
    cartList.appendChild(li);
  }

  if (total > 0) {
    const summary = document.createElement("li");
    summary.innerHTML = `<strong>Total: Ksh ${total}</strong>`;
    cartList.appendChild(summary);
  } else {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  }
}

function checkout() {
  let message = "Order Summary:\n";
  let total = 0;

  for (const [name, details] of Object.entries(cart)) {
    message += `- ${name}: ${details.quantity} x Ksh ${details.price}\n`;
    total += details.price * details.quantity;
  }

  if (total === 0) {
    alert("Your cart is empty.");
    return;
  }

  message += `\nTotal: Ksh ${total}`;
  const whatsappUrl = `https://wa.me/254759064950?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

displayProducts();
