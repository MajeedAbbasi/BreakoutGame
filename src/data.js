export default {
  ballObj: {
    x: 10,
    y: 150,
    dx: 5,
    dy: 5,
    rad: 8,
    speed: 5,
  },
  brickObj: {
    x: 0.5,
    y: 50,
    width: 800 / 10 - 1,
    height: 28,
    density: 2,
    color: ["blue", "LightBlue"],
  },
  player: {
    name: "Majeed",
    lives: 5,
    score: 0,
    level: 1,
  },
  paddleProps: {
    height: 10,
    width: 200,
    x: 230,
    color: "orange",
  },
};
