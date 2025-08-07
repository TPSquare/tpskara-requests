export default function parseRequest(rawRequest, status) {
  const props = rawRequest.split("|").map((e) => e.trim());
  return {
    id: props[0],
    request: status !== "paused" || props[2] ? props[1] : undefined,
    other: props[2] || props[1],
  };
}
