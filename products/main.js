import { getProducts } from "./modules/api.js";
import { displayProductList } from "./modules/components.js";

const ROOT = $("#root");

async function displayUI() {
  const data = await getProducts();
  ROOT.append(displayProductList(data));
}

await displayUI();
