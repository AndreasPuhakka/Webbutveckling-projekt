// Följde en youtube tutorial för att göra detta men har ändrat på den för att passa min kod.

let buyButtons = document.querySelectorAll("button[id^='köp']");
let cartIcon = document.getElementById("cartIcon");
let cartDropdown = document.getElementById("cartdropdown");
let cartItemsContainer = document.querySelector("#cartdropdown");
let maxCartItems = 5;

let cartItems = {};

cartIcon.addEventListener("click", function () {
  cartDropdown.classList.toggle("show");
});

for (let i = 0; i < buyButtons.length; i++) {
  buyButtons[i].addEventListener("click", function () {
    let productSection = this.parentNode;
    let productName = productSection.querySelector("h2").textContent;
    let productPrice = productSection.querySelector(".price").textContent;

    if (cartItemsContainer.children.length < maxCartItems) {
      if (cartItems.hasOwnProperty(productName)) {
        cartItems[productName].quantity++;
        let cartItem = cartItems[productName].element;
        let cartItemQuantity = cartItem.querySelector(".cart-item-quantity");
        cartItemQuantity.textContent = `${productName} x${cartItems[productName].quantity}`;
      } else {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        let cartItemQuantity = document.createElement("p");
        cartItemQuantity.classList.add("cart-item-quantity");
        cartItemQuantity.textContent = `${productName} x1`;
        cartItem.appendChild(cartItemQuantity);

        let cartItemPrice = document.createElement("p");
        cartItemPrice.textContent = productPrice;
        cartItem.appendChild(cartItemPrice);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-cart-item");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.productName = productName;
        cartItem.appendChild(deleteButton);

        cartItemsContainer.appendChild(cartItem);

        cartItems[productName] = {
          element: cartItem,
          quantity: 1,
        };
      }

      cartDropdown.classList.add("show");
      cartDropdown.classList.remove("empty");
    } else {
      console.log("Cart is full");
    }
    checkCart();
  });
}

function checkCart() {
  if (Object.keys(cartItems).length === 0) {
    cartDropdown.classList.add("empty");
    cartItemsContainer.innerHTML = "<p>Empty</p>";
  } else {
    cartDropdown.classList.remove("empty");
    cartItemsContainer.innerHTML = "";
    for (let item in cartItems) {
      let cartItem = cartItems[item].element;
      cartItemsContainer.appendChild(cartItem);
    }
  }
}

checkCart();

cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-cart-item")) {
    let productName = event.target.dataset.productName;
    deleteCartItem(productName);
  }
});

function deleteCartItem(productName) {
  if (cartItems.hasOwnProperty(productName)) {
    let cartItem = cartItems[productName].element;
    cartItemsContainer.removeChild(cartItem);
    delete cartItems[productName];
    checkCart();
  }
}
