
const modal_carrito  = document.getElementById("modal_carrito");
const cartBtn        = document.getElementById("cartBtn");
const modal_doblon   = document.getElementById("modal_doblon");
const doblonBtn      = document.getElementById("doblonBtn");
const addToCartBtn   = document.getElementById("addToCartBtn");
const modal_monster  = document.getElementById("modal_monster");
const monsterBtn     = document.getElementById("monsterBtn");
const addMonsterBtn  = document.getElementById("addMonsterToCartBtn");
const doblonQtyInput  = document.getElementById("doblonQty");
const monsterQtyInput = document.getElementById("monsterQty");
const doblonStock     = 15;
const monsterStock    = 10;
const cartItemsUL    = document.getElementById("cartItems");
const joinQueueBtn   = document.getElementById("joinQueueBtn");
const queueStatus    = document.getElementById("queueStatus");
const summaryBtn     = document.getElementById("summaryBtn");
const modal_resumen  = document.getElementById("modal_resumen");
function openModal(m)  { m.style.display = "block"; }
function closeModal(m) { m.style.display = "none"; }


document.querySelectorAll(".modal .close").forEach(span => {
  span.onclick = () => closeModal(span.closest(".modal"));
});


window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) closeModal(e.target);
});

const cart = [];

function renderCart() {
  cartItemsUL.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — $${item.price} × ${item.qty}`;
    cartItemsUL.appendChild(li);
  });
}

function addProduct(name, price, qty) {
  const found = cart.find(it => it.name === name);
  if (found) {
    found.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }
  renderCart();
}


doblonBtn  .onclick = () => openModal(modal_doblon);
monsterBtn .onclick = () => openModal(modal_monster);


addToCartBtn.onclick = () => {
  const qty = Math.min(
    Number(doblonQtyInput.value),
    doblonStock - (cart.find(it => it.name === "Doblon")?.qty || 0)
  );
  if (qty > 0) {
    addProduct("Doblon", 350, qty);
    closeModal(modal_doblon);
    openModal(modal_carrito);
    doblonQtyInput.value = 1;
  } else {
    alert("No hay suficiente stock de Doblón.");
  }
};

addMonsterBtn.onclick = () => {
  const qty = Math.min(
    Number(monsterQtyInput.value),
    monsterStock - (cart.find(it => it.name === "Monster Energy")?.qty || 0)
  );
  if (qty > 0) {
    addProduct("Monster Energy", 1800, qty);
    closeModal(modal_monster);
    openModal(modal_carrito);
    monsterQtyInput.value = 1;
  } else {
    alert("No hay suficiente stock de Monster Energy.");
  }
};

cartBtn.onclick = () => { renderCart(); openModal(modal_carrito); };


let queueNumber   = Number(localStorage.getItem("globalQueue")) || 1;
let myQueueNumber = localStorage.getItem("assignedQueue")      || null;  

joinQueueBtn.addEventListener("click", () => {
  const nombre= localStorage.getItem("nombreUsuario") || "Invitado";

  if (!myQueueNumber) {
    myQueueNumber = queueNumber;
    queueNumber++;
    localStorage.setItem("assignedQueue", myQueueNumber);
    localStorage.setItem("globalQueue", queueNumber);
  }

  queueStatus.textContent =
    `${nombre},¡Te has unido a la fila! Tu número es: ${myQueueNumber}`;
});



function totalCart() {
  return cart.reduce((sum, it) => sum + it.price * it.qty, 0);
}

if (summaryBtn && modal_resumen) {
  const resumenClose = modal_resumen.querySelector(".close");

  summaryBtn.addEventListener("click", () => {
    const nombre = localStorage.getItem("nombreUsuario") || "Invitado";
    const fila     = myQueueNumber || "Sin fila";

    document.getElementById("summaryName").textContent  = `Nombre: ${username}`;
    document.getElementById("summaryQueue").textContent = `Número en fila: ${fila}`;
    document.getElementById("summaryTotal").textContent = `Total: $${totalCart()}`;

    openModal(modal_resumen);
  });

  resumenClose.onclick = () => closeModal(modal_resumen);
}