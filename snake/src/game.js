// @flow

import type { Config, Direction, Pos, Segment } from './types';
import {
  createFood,
  didLose,
  nullThrows,
  paintCell,
  seq,
  validMove,
} from './util';

class Snake {
  body: Array<Segment> = seq(5)
    .map(i => ({ x: i, y: 0, didPivot: false, direction: 'right' }))
    .reverse();
  moves: Array<Direction> = [];

  queueMove(keycode: number): void {
    if (this.moves.length >= 3) {
      return;
    }
    const curDir =
      this.moves.length > 0
        ? this.moves[this.moves.length - 1]
        : this.body[0].direction;

    switch (keycode) {
      case 37:
        if (validMove(curDir, 'left')) {
          this.moves.push('left');
        }
        break;
      case 38:
        if (validMove(curDir, 'up')) {
          this.moves.push('up');
        }
        break;
      case 39:
        if (validMove(curDir, 'right')) {
          this.moves.push('right');
        }
        break;
      case 40:
        if (validMove(curDir, 'down')) {
          this.moves.push('down');
        }
        break;
      default:
        return;
    }
  }
}

export default class Game {
  accumulator: number = 0;
  config: Config;
  ctx: CanvasRenderingContext2D;
  food: Pos;
  gameOver: boolean;
  interval: number;
  score: number;
  scoreElement: HTMLElement;
  snake: Snake;

  constructor(config: Config, ctx: CanvasRenderingContext2D) {
    this.config = config;
    this.ctx = ctx;
    this.scoreElement = nullThrows(document.getElementById('score'));
    this.init();
  }

  init(): void {
    this.food = createFood(this.config);
    this.gameOver = false;
    this.setScore(0);
    this.snake = new Snake();
    this.interval = setInterval(() => {
      this.update(this.config.speed);
      this.render();
    }, 4);
  }

  onKeyDown = (e: KeyboardEvent): void => {
    if (this.gameOver) {
      this.init();
      return;
    }
    this.snake.queueMove(e.keyCode);
  };

  render() {
    const { height, width } = this.config;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, width, height);

    for (const bodyCell of this.snake.body) {
      paintCell(this.config, this.ctx, bodyCell);
    }

    paintCell(this.config, this.ctx, this.food);
  }

  setScore(newScore: number): void {
    this.score = newScore;
    this.scoreElement.innerHTML = `${this.score}`;
  }

  update(speed: number) {
    const { height, width } = this.config;

    this.accumulator += speed;
    for (let i = this.snake.body.length - 1; i >= 0; --i) {
      if (this.snake.body[i].direction === 'right') {
        this.snake.body[i].x += speed;
      } else if (this.snake.body[i].direction === 'left') {
        this.snake.body[i].x -= speed;
      } else if (this.snake.body[i].direction === 'up') {
        this.snake.body[i].y -= speed;
      } else if (this.snake.body[i].direction === 'down') {
        this.snake.body[i].y += speed;
      }

      if (this.accumulator >= 1 && i !== 0 && this.snake.body[i - 1].didPivot) {
        this.snake.body[i].didPivot = true;
        this.snake.body[i].direction = this.snake.body[i - 1].direction;
        this.snake.body[i - 1].didPivot = false;
      }
    }

    if (this.accumulator >= 1 && this.snake.moves.length > 0) {
      this.snake.body[0].direction = this.snake.moves.shift();
      this.snake.body[0].didPivot = true;
    }

    if (this.accumulator < 1) {
      return;
    }
    this.accumulator = 0;

    if (didLose(this.snake.body, this.config, this.snake.body[0])) {
      this.gameOver = true;
      clearInterval(this.interval);
      return;
    }

    if (
      this.snake.body[0].x === this.food.x &&
      this.snake.body[0].y === this.food.y
    ) {
      let { direction, x, y } = this.snake.body[this.snake.body.length - 1];
      if (direction === 'right') {
        x -= 1;
      } else if (direction === 'left') {
        x += 1;
      } else if (direction === 'up') {
        y += 1;
      } else if (direction === 'down') {
        y -= 1;
      }
      this.setScore(this.score + 1);
      this.food = createFood(this.config);
      this.snake.body.push({ didPivot: false, direction, x, y });
    }
  }
}