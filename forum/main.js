import { getPosts } from "./modules/api.js";
import { displayPosts } from "./modules/components.js";

const ROOT = $("#root");

async function displayUI() {
  const data = await getPosts();
  ROOT.append(displayPosts(data));
}

await displayUI();
