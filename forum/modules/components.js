export const displayPosts = (data) => {
  const postsContainer = $("<div id='posts' class='posts'></div>");
  // postsContainer.append(displayProductForm);
  Object.keys(data)
    .reverse()
    .forEach((id) => {
      let postData = data[id]; //{"done":false,"task":"call mom"}
      postsContainer.append(displayPost(id, postData));
    });
  return postsContainer;
};

export const displayPost = (id, postData) => {
  let postComponent = $(`<div ><div>`);

  let author = $(`<p>author: ${postData.author}</p>`);

  let postTitle = $(`<h3>${postData.title}</h3>`);
  let postDetails = $(
    `<div>${postData.body}</div><p>Subject: ${
      postData.subject || "no subject"
    }</p>`
  );

  let comments = $(`<ul><b>Comments:</b></ul>`);

  if (postData.comments) {
    Object.keys(postData.comments).forEach((id) => {
      let comment = postData.comments[id];
      comments.append(
        $(`<li><span>${comment.author} says:</span><p>${comment.body}</p></li>`)
      );
    });
  } else if (!postData.comments) {
    comments.append($("<p>No comments</p>"));
  }

  postComponent.append(postTitle, author, postDetails, comments);
  return postComponent;
};
