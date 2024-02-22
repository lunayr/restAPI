const BASE_URI =
  "https://webb23-1babd-default-rtdb.europe-west1.firebasedatabase.app/forum";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

//Hämta alla post
export async function getPosts() {
  const url = BASE_URI + ".json";

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function postPost(postData) {
  postData = { author, title, body, subject, comments: author, body };
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
