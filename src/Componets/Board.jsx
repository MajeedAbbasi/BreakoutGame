import React, { useRef, useEffect } from "react";
import { BallMovement } from "../BallMovement";
import data from "../data";
import WallCollision from "../WallCollision";
import Paddle from "../Paddle";
import Brick from "./Brick";
import BricksCollision from "../BricksCollision";
import PaddleHit from "../PaddleHit";
import PlayerStats from "../PlayerStates";
import AllBroken from "../AllBroken";
import ResetBall from "../ResetBall";
let x = 0;
let bricks = [];
let { ballObj, paddleProps, brickObj } = data;
const Board = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    let bonusPoint = false;
    let { ballObj, player } = data;
    const ballObj2 = {
      x: 20,
      y: 200,
      dx: 5,
      dy: 5,
      rad: 8,
      speed: 5,
    };
    let hitColor = "brown";
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      paddleProps.y = canvas.height - 30;
      let newBrickSet = Brick(player.level, bricks, canvas, brickObj);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      PlayerStats(ctx, player, canvas);
      if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

      if (player.lives === 0) {
        alert("Game Over! Please Press Ok to Start");
        player.level = 1;
        bricks.length = 0;
        player.lives = 5;
        player.score = 0;
        ResetBall(ballObj, canvas, paddleProps);
        bricks.length = 0;
      }
      bricks.map((brick) => {
        return brick.draw(ctx);
      });
      if (player.level == 1) {
        BallMovement(ctx, ballObj);
      } else if (player.level >= 2) {
        BallMovement(ctx, ballObj);
        BallMovement(ctx, ballObj2);
      }
      AllBroken(bricks, player, canvas, ballObj);
      WallCollision(ballObj, canvas, player, paddleProps);
      WallCollision(ballObj2, canvas, player, paddleProps);
      let brickCollision;
      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BricksCollision(ballObj, bricks[i]);
        if (brickCollision.hit && !bricks[i].broke) {
          if (brickCollision.axis === "X") {
            ballObj.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === "Y") {
            ballObj.dy *= -1;
            bricks[i].broke = true;
          }
          if (hitColor == bricks[i].color) {
            hitColor = bricks[i].color;
            player.score += 20;
            bonusPoint = true;
            setTimeout(() => {
              bonusPoint = false;
            }, 1000);
          } else {
            hitColor = bricks[i].color;
            player.score += 10;
          }
        }
      }
      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BricksCollision(ballObj2, bricks[i]);
        if (brickCollision.hit && !bricks[i].broke) {
          if (brickCollision.axis === "X") {
            ballObj2.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === "Y") {
            ballObj2.dy *= -1;
            bricks[i].broke = true;
          }
          if (hitColor == bricks[i].color) {
            hitColor = bricks[i].color;
            player.score += 20;
            bonusPoint = true;
            setTimeout(() => {
              bonusPoint = false;
            }, 1000);
          } else {
            hitColor = bricks[i].color;
            player.score += 10;
          }
        }
      }
      if (bonusPoint) {
        ctx.font = "20px, Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Bonus +20", canvas.width / 2 - 50, canvas.height / 2);
      }

      Paddle(ctx, canvas, paddleProps);
      PaddleHit(ballObj, paddleProps);
      PaddleHit(ballObj2, paddleProps);
      requestAnimationFrame(render);
    };
    render();
  }, []);
  return (
    <div className="">
      <canvas
        id="canvas"
        height="500px"
        width="500px"
        className="bg-slate-600 "
        onMouseMove={(event) => {
          paddleProps.x = event.clientX;
        }}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};
export default Board;
