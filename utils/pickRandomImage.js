const items = [
  "https://res.cloudinary.com/ayenco/image/upload/v1644252130/sample.jpg",
  "https://res.cloudinary.com/ayenco/image/upload/v1644252139/samples/bike.jpg",
  "https://res.cloudinary.com/ayenco/image/upload/v1644252136/samples/animals/reindeer.jpg",
  "https://res.cloudinary.com/ayenco/image/upload/v1644252138/samples/sheep.jpg",
  "https://res.cloudinary.com/ayenco/image/upload/v1644252141/samples/animals/three-dogs.jpg",
];

const RandomImage = items[Math.floor(Math.random() * items.length)];

export default RandomImage;
