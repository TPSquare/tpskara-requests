import getVideoData from "./get-video-data.js";

const requestsListElement = document.getElementById("requests-list");

export default async function createRequestElement(request, order) {
  const requestElement = document.createElement("div");
  requestElement.className = "request";
  requestsListElement.appendChild(requestElement);

  const config = {};
  if (request.youtubeID) {
    const { snippet } = await getVideoData(request.youtubeID);
    config.title = snippet.title;
    config.thumbnailUrl = snippet.thumbnails.medium.url;
    config.link =
      "https://www.youtube.com/results?search_query=" +
      encodeURIComponent(snippet.title).replace(/%20/g, "+");
  } else {
    config.title = request.title;
    config.thumbnailUrl = request.thumbnailUrl;
    config.link = request.link;
  }

  const orderElement = document.createElement("div");
  orderElement.className = "order";
  orderElement.textContent = order;
  requestElement.appendChild(orderElement);

  const thumbnailElement = document.createElement("img");
  thumbnailElement.src = config.thumbnailUrl;
  thumbnailElement.alt = config.title;
  requestElement.appendChild(thumbnailElement);

  const rightElements = document.createElement("div");
  rightElements.className = "right";
  requestElement.appendChild(rightElements);

  const titleElement = document.createElement("a");
  titleElement.className = "title";
  titleElement.title = config.title;
  titleElement.textContent = config.title;
  titleElement.href = config.link;
  titleElement.target = "_blank";
  rightElements.appendChild(titleElement);

  const rightBottomElement = document.createElement("div");
  rightBottomElement.className = "bottom";
  rightElements.appendChild(rightBottomElement);

  if (request.requestText) {
    const requestTextElement = document.createElement("div");
    requestTextElement.classList = "request-text";
    requestTextElement.textContent = `Yêu cầu: ${request.requestText}`;
    rightBottomElement.appendChild(requestTextElement);
  }

  if (request.priority) {
    const priorityElement = document.createElement("div");
    priorityElement.className = "priority";
    priorityElement.innerHTML = request.priority.replaceAll(" ", "&nbsp;");
    requestElement.appendChild(priorityElement);
  }
}
