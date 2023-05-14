// Använde internet för att göra den här funktionen men vet till 90% vad allt gör.
let buyButtons = document.querySelectorAll("button[id^='köp']");

for (let i = 0; i < buyButtons.length; i++) {
  buyButtons[i].addEventListener("click", function () {
    let productSection = this.parentNode;
    let productName = productSection.querySelector("h2").textContent;
    let productPrice = productSection.querySelector(".price").textContent;

    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    let cartItems = document.querySelector(".cart-items");
    cartItems.appendChild(cartItem);

    let cartItemName = document.createElement("p");
    cartItemName.textContent = productName;
    cartItem.appendChild(cartItemName);

    let cartItemPrice = document.createElement("p");
    cartItemPrice.textContent = productPrice;
    cartItem.appendChild(cartItemPrice);
  });
}
