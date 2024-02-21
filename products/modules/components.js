import { buyProduct, postProduct } from "./api.js";

const openaikey = "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";

const BLANK_IMAGE = "https://placehold.co/400";

const randomUnsplashImage = async (query) => {
  let res = await fetch(
    `https://api.unsplash.com/photos/random?client_id=pW5i6lVXxQ5vPo6LoBpKIviPXJmY6z3VUyUAgmH6dzI&query=${query}&orientation=squarish`
  );
  let data = await res.json();
  return data.urls.small;
};

const getRandomQuery = () => {
  const products = [
    "car",
    "telephone",
    "iphone",
    "macbook",
    "house",
    "cat",
    "ball",
    "spaceship",
    "building",
    "ipad",
  ];
  return products[Math.floor(Math.random() * products.length)];
};

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const displayProduct = (id, productData) => {
  let image = $(
    `<img src="${productData.image}" onerror="this.onerror = null; this.src='${BLANK_IMAGE}'"/>`
  );
  const productComponent = $(`<div id="product-${id}" class="product"></div>`);

  const content = $(
    `<div><b>${productData.name}</b><p>${productData.description}</p></div>`
  );
  const details = $(
    `<div class="details">
        <div><span>Inventory:</span><span>${productData.inventory}</span></div>
        <div><span>Price:</span><span>${productData.price} SEK</span></div>
    </div>`
  );

  const inventoryControls = $(`<div class="inventory_control"></div>`);

  const buyButton = $(`<button>Köp</button>`);
  const buyAmountInput = $(
    `<input min="0" max="${productData.inventory}" type="number" value="0" />`
  );

  buyButton.on("click", async () => {
    let newAmount = productData.inventory - buyAmountInput.val();

    if (newAmount == productData.inventory || newAmount < 0) return;
    let newData = await buyProduct(id, newAmount);

    buyAmountInput.val("0");
    $(`#product-${id} .details > div:first-child > span:nth-child(2)`).html(
      newData.inventory
    );
    buyAmountInput.attr("max", newData.inventory);
  });

  return productComponent.append(
    image,
    content,
    details,
    inventoryControls.append(buyAmountInput, buyButton)
  );
};

export const displayProductList = (data) => {
  const productsContainer = $("<div id='products' class='products'></div>");
  productsContainer.append(displayProductForm);
  Object.keys(data)
    .reverse()
    .forEach((id) => {
      let productData = data[id]; //{"done":false,"task":"call mom"}
      productsContainer.append(displayProduct(id, productData));
    });
  return productsContainer;
};

export const displayProductForm = () => {
  let imageUrl = BLANK_IMAGE;
  const image = $(`<img src=${imageUrl} />`);

  const getRandomImageButton = $(
    "<button class='randomImage'>Generate</button>"
  );
  getRandomImageButton.on("click", async (e) => {
    e.preventDefault();
    let query = getRandomQuery();
    imageUrl = await randomUnsplashImage(query);
    image.attr("src", imageUrl);
  });

  const productComponent = $(`<div class="new-product product"></div>`);

  const content = $(`<div></div>`);

  const nameInput = $(
    `<input type="text" placeholder="Enter name" value="" />`
  );
  const descriptionInput = $(
    `<textarea type="text" placeholder="Enter description" value="" />`
  );
  content.append(nameInput, descriptionInput);

  const details = $(`<div class="details"></div>`);
  const inventoryInput = $(
    `<input name="inventory" type="number" value="9999" />`
  );
  const priceInput = $(`<input name="price" type="number" value="500" />`);
  details.append(
    $("<div></div>").append(
      "<label for='inventory'>Inventory</label>",
      inventoryInput
    ),
    $("<div></div>").append("<label for='price'>Price</label>", priceInput)
  );

  const createProduct = $("<button>Create Product</button>");

  createProduct.on("click", async () => {
    const productData = {
      name: nameInput.val(),
      description: descriptionInput.val(),
      inventory: Number(inventoryInput.val()),
      price: Number(priceInput.val()),
      image: imageUrl,
    };
    console.log(productData);
    const data = await postProduct(productData);
    productComponent.after(displayProduct(data.name, productData));
    imageUrl = BLANK_IMAGE;
    image.attr("src", imageUrl);
    nameInput.val("");
    descriptionInput.val("");
    inventoryInput.val(9999);
    priceInput.val(400);
  });

  return productComponent.append(
    image,
    getRandomImageButton,
    content,
    details,
    $("<div class='create-product'></div>").append(createProduct)
  );
};
