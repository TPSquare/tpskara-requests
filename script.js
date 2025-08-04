(async () => {
  const api = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC-_m5GLVvVOEUYkTknhdjzw&key=AIzaSyDJvCeWiQP8gLQCiZGoQAOQvE9F-e1LIy8`;
  const channelData = await fetch(api).then((res) => res.json());
  const statistics = channelData.items[0].statistics;
  const { viewCount, subscriberCount, videoCount } = statistics;
  const aboutElement = document.getElementById("about");
  aboutElement.querySelector(
    ".label.subscribers .text"
  ).textContent = `${subscriberCount} người đăng ký`;
  aboutElement.querySelector(".label.videos .text").textContent = `${videoCount} video`;
  aboutElement.querySelector(".label.views .text").textContent = `${viewCount} lượt xem`;
})();

import createRequestElement from "./utilities/create-request-element.js";
import getVideoData from "./utilities/get-video-data.js";
import parseRequest from "./utilities/parse-request.js";
(async () => {
  const requestsListElement = document.getElementById("requests-list");
  const rawRequests = await fetch(`./requests.json?t=${Date.now()}`).then((res) => res.json());

  const availableStates = Object.keys(rawRequests);

  const isExist = availableStates.every((status) => !rawRequests[status]?.length);
  if (!isExist) requestsListElement.removeChild(requestsListElement.querySelector(".empty"));

  let requestOrder = 0;
  for (const status of availableStates)
    for (const rawRequest of rawRequests[status]) {
      const { id, request } = parseRequest(rawRequest);
      const { snippet } = await getVideoData(id);
      const requestElement = createRequestElement(id, snippet, status, request, ++requestOrder);
      requestsListElement.appendChild(requestElement);
    }
})();

(() => {
  const sidebarElement = document.getElementById("sidebar");

  const overlayElement = document.getElementById("overlay");
  overlayElement.addEventListener("click", () => overlayElement.classList.remove("show"));

  const aboutElement = document.getElementById("about");
  sidebarElement.querySelector(".about").onclick = () => {
    aboutElement.classList.toggle("show");
    overlayElement.classList.toggle("show");
    overlayElement.onclick = () => aboutElement.classList.remove("show");
  };

  window.onresize = () => {
    overlayElement.classList.remove("show");
    aboutElement.classList.remove("show");
  };
})();
