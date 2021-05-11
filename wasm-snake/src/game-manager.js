import { Game, Vector } from '../../pkg/app'

import CONFIG from './config'
import { View } from './view'
import { Controller } from './controller'
import Storage from './storage'

export class GameManager {
    constructor() {
        this.restart();
        this.view = new View(
            this.game.width,
            this.game.height,
            this.render.bind(this)
        );
        this.controller = new Controller(
            this.on_stop.bind(this)
        );
    }
    
    on_stop() {
        const now = Date.now();
        if (this.stop_time) {
            this.stop_time = undefined;
            this.last_update = this.time + now - this.last_update;
        } else {
            this.stop_time = now;
        }
    }



    tick() {
        if(!this.stop_time) {
            const last_update = Date.now();
            if(this.last_update) {
                this.game.process(last_update - this.last_update, this.controller.movement);
                if(this.game.is_over()) {
                    this.restart();
                    return;
                }
                if(this.game.score > Storage.get_best_score()) {
                    localStorage.setItem('best_score', this.game.score);
                    Storage.set_best_score(this.game.score);
                }
            }
            this.last_update = last_update;
            this.render();
        }
    }

    restart() {
        this.game = new Game(
            CONFIG.WIDTH,
            CONFIG.HEIGHT,
            CONFIG.SNAKE_SPEED,
            CONFIG.SNAKE_LENGTH,
            new Vector(
                CONFIG.SNAKE_DIRECTION_X,
                CONFIG.SNAKE_DIRECTION_Y
            )
        );

        console.log(this.game);
        this.last_update = undefined;
        this.stop_time = undefined;
    }
    
    render() {
        this.view.render(
            this.game.food_location,
            this.game.get_snake(),
            this.game.score,
            Storage.get_best_score()
        );
    }

    run() {
        setInterval(this.tick.bind(this), 1000 / CONFIG.FPS);
    }
}
