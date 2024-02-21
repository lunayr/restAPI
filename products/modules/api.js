const BASE_URI =
  "https://webb23-1babd-default-rtdb.europe-west1.firebasedatabase.app/products";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

//Hämta alla produkter
export async function getProducts() {
  const url = BASE_URI + ".json";

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function postProduct(productData) {
  const { description, image, inventory, name, price } = productData;
  //check if all parameter is ok.
  const url = BASE_URI + ".json";
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(productData),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

export async function buyProduct(productId, newInventory) {
  const url = BASE_URI + "/" + productId + ".json";
  const options = {
    method: "PATCH",
    body: JSON.stringify({ inventory: newInventory }),
  };

  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}
