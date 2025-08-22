export default function createRequestElement({
  title,
  thumbnailUrl,
  request,
  order,
  link,
  donate,
}) {
  const requestElement = document.createElement("div");
  requestElement.className = "request";

  const orderElement = document.createElement("div");
  orderElement.className = "order";
  orderElement.textContent = order;
  requestElement.appendChild(orderElement);

  const thumbnailElement = document.createElement("img");
  thumbnailElement.src = thumbnailUrl;
  thumbnailElement.alt = title;
  requestElement.appendChild(thumbnailElement);

  const rightElements = document.createElement("div");
  rightElements.className = "right";
  requestElement.appendChild(rightElements);

  const titleElement = document.createElement("a");
  titleElement.className = "title";
  titleElement.title = title;
  titleElement.textContent = title;
  titleElement.href = link;
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

  if (donate) {
    const donateElement = document.createElement("div");
    donateElement.className = "donate";
    donateElement.textContent = donate;
    requestElement.appendChild(donateElement);
  }

  return requestElement;
}
