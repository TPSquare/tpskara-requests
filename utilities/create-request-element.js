export default function createRequestElement(id, snippet, status, request, order) {
  const requestElement = document.createElement("div");
  requestElement.className = "request";

  const orderElement = document.createElement("div");
  orderElement.className = "order";
  orderElement.textContent = order;
  requestElement.appendChild(orderElement);

  const thumbnailElement = document.createElement("img");
  thumbnailElement.src = snippet.thumbnails.medium.url;
  thumbnailElement.alt = snippet.title;
  requestElement.appendChild(thumbnailElement);

  const rightElements = document.createElement("div");
  rightElements.className = "right";
  requestElement.appendChild(rightElements);

  const titleElement = document.createElement("a");
  titleElement.className = "title";
  titleElement.title = snippet.title;
  titleElement.textContent = snippet.title;
  titleElement.href = "https://youtu.be/" + id;
  titleElement.target = "_blank";
  rightElements.appendChild(titleElement);

  const rightBottomElement = document.createElement("div");
  rightBottomElement.className = "bottom";
  rightElements.appendChild(rightBottomElement);

  if (request) {
    const requestTextElement = document.createElement("div");
    requestTextElement.classList = "request-text";
    requestTextElement.textContent = `Yêu cầu: ${request}`;
    rightBottomElement.appendChild(requestTextElement);
  }

  const statusElement = document.createElement("div");
  statusElement.className = "status" + (status ? ` ${status}` : "");
  statusElement.textContent = `Trạng thái: `;
  rightBottomElement.appendChild(statusElement);

  return requestElement;
}
