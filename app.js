const images = document.querySelectorAll('.image-container img');

const randomDirection = () => Math.random() * 2 * Math.PI;
const randomSpeed = () => Math.random() * 3 + 1;
const randomCurve = () => Math.random() * 0.2 - 0.1;
const randomRotation = () => Math.random() * 30 - 15;

let lastFrameTime = null;

const moveImages = (timestamp) => {
  if (lastFrameTime !== null) {
    const timeDelta = timestamp - lastFrameTime;
    images.forEach(image => {
      let { x, y, direction, speed, curve, rotation } = image.dataset;
      x = parseFloat(x) || 0;
      y = parseFloat(y) || 0;
      direction = parseFloat(direction) || randomDirection();
      speed = parseFloat(speed) || randomSpeed();
      curve = parseFloat(curve) || randomCurve();
      rotation = parseFloat(rotation) || randomRotation();

      const newX = x + Math.cos(direction) * speed + curve * timeDelta / 16;
      const newY = y + Math.sin(direction) * speed;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (newX < -screenWidth / 2 - image.width) {
        x = screenWidth / 2;
      }
      if (newX > screenWidth / 2) {
        x = -screenWidth / 2 - image.width;
      }
      if (newY < -screenHeight / 2 - image.height) {
        y = screenHeight / 2;
      }
      if (newY > screenHeight / 2) {
        y = -screenHeight / 2 - image.height;
      }

      const newRotation = rotation + (Math.random() - 0.5) * 10;
      image.style.transform = `translate(${newX}px, ${newY}px) rotate(${newRotation}deg)`;
      image.dataset.x = x + Math.cos(direction) * speed + curve * timeDelta / 16;
      image.dataset.y = y + Math.sin(direction) * speed;
      image.dataset.speed = speed;
      image.dataset.direction = direction;
      image.dataset.curve = curve;
      image.dataset.rotation = newRotation;
    });
  }

  lastFrameTime = timestamp;
  requestAnimationFrame(moveImages);
};

requestAnimationFrame(moveImages);
