export default function Brick(level, bricks, canvas, brick) {
  brick.width = canvas.width / 5 - 1;
  let newbricks = [];
  if (!bricks) {
    return [];
  }

  if (bricks.length >= 5 * level) {
    return;
  }

  for (let i = 0; i < 5 * level; i++) {
    let newBrick = new SingleBrick(
      brick.x + brick.width,
      brick.y,
      brick.width,
      brick.height,
      brick.colors
    );
    newbricks.push(newBrick);

    brick.x += brick.width + 1;
    if (brick.x + brick.width >= canvas.width) {
      brick.x = 0.5;
      brick.y += brick.height + 1;
    }
  }

  return newbricks;
}
class SingleBrick {
  constructor(x, y, w, h, c) {
    this.x = x - w;
    this.y = y;
    this.width = w;
    this.height = h;
    // this.colors = c;
    this.broke = false;
    this.color = this.generateRandomColor();
  }
  generateRandomColor() {
    const randColor = ["red", "blue", "gray", "orange"];
    let randomNumber = Math.floor(Math.random() * 4);
    return randColor[randomNumber];
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.broke ? "rgba(19, 73, 89, 0)" : this.color;
    ctx.lineWidth = 5;
    ctx.strokeStyle = this.broke ? "rgba(19, 73, 89, 0)" : "transparent";
    ctx.fill();
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
