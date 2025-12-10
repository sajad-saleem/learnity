// ---- ADD TO CART ----
var addButtons = document.getElementsByClassName('add-to-cart');
for (var i = 0; i < addButtons.length; i++) {
  addButtons[i].onclick = function() {
    var course = {
      name: this.dataset.name,
      price: parseInt(this.dataset.price),
      duration: this.dataset.duration
    };

    var cart = localStorage.getItem('cart');
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }

    // Prevent duplicate
    var exists = false;
    for (var j = 0; j < cart.length; j++) {
      if (cart[j].name == course.name) {
        exists = true;
      }
    }

    if (!exists) {
      cart.push(course);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(course.name + ' added to cart!');
    } else {
      alert(course.name + ' is already in cart!');
    }
  }
}

// ---- DISPLAY CART ----
function showCart() {
  var cartContainer = document.getElementById('cart-items');
  var totalEl = document.getElementById('total');
  if (!cartContainer) return;

  var cart = localStorage.getItem('cart');
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = [];
  }

  cartContainer.innerHTML = '';
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price;

    var div = document.createElement('div');
    div.className = 'cart-item col-12 mb-3 p-3 border rounded d-flex justify-content-between align-items-center';
    div.innerHTML =
      '<div><h5>' + item.name + '</h5><p>Duration: ' + item.duration + '</p></div>' +
      '<div><p>₨ ' + item.price + '</p>' +
      '<button class="remove-item btn btn-sm btn-danger" data-index="' + i + '">Remove</button></div>';
    cartContainer.appendChild(div);
  }

  totalEl.innerText = 'Total: ₨ ' + total;

  // ---- REMOVE ITEM ----
  var removeButtons = document.getElementsByClassName('remove-item');
  for (var k = 0; k < removeButtons.length; k++) {
    removeButtons[k].onclick = function() {
      var index = this.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      showCart();
    }
  }
}

// Initialize cart display
showCart();
