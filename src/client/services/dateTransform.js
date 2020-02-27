const transform = timestamp => {
  let date = new Date(timestamp);

  if (date.toDateString() == new Date().toDateString()) {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric"
    });
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
};

export default transform;
