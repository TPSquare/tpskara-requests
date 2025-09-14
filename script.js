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
(async () => {
  const requestsListElement = document.getElementById("requests-list");
  const requests = await fetch(`./requests.json?time=${Date.now()}`).then((res) => res.json());

  if (requests.length) requestsListElement.removeChild(requestsListElement.querySelector(".empty"));

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    const config = { request: request.request, order: i + 1, priority: request.priority };
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
    const requestElement = createRequestElement(config);
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
