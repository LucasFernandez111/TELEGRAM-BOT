const requestInterception = (request) => {
  if (["image", "stylesheet", "font"].indexOf(request.resourceType()) !== -1) {
    request.abort();
  } else request.continue();
};

module.exports = requestInterception;
