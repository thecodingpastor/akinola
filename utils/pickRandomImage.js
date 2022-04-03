const items = [
  "https://res.cloudinary.com/indelible-success/image/upload/v1648844763/samples/landscapes/landscape-panorama.jpg",
  "https://res.cloudinary.com/indelible-success/image/upload/v1648844752/samples/landscapes/girl-urban-view.jpg",
  "https://res.cloudinary.com/indelible-success/image/upload/v1648844753/samples/bike.jpg",
  "https://res.cloudinary.com/indelible-success/image/upload/v1648844761/samples/landscapes/nature-mountains.jpg",
  "https://res.cloudinary.com/indelible-success/image/upload/v1648844757/samples/landscapes/beach-boat.jpg",
];

const RandomImage = items[Math.floor(Math.random() * items.length)];

export default RandomImage;
