const __ = (time) => {
  let date = new Date(time);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default __;
