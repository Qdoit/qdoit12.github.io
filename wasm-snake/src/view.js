const getRange = length => [...Array(length).keys()]

export class View {
    constructor(game_width, game_height, on_view_change = () => {}) {
        this.game_width = game_width;
        this.game_height = game_height;
        this.container = document.getElementById('container');
        this.on_view_change = on_view_change;

        this.set_up();

        window.addEventListener('resize', () => {
            const [child] = this.container.children;
            if(child) {
                this.container.removeChild(child);
            }
            this.set_up();
            this.on_view_change();
        });
    }
    

    set_up() {
        console.log("Setting up...");
        const { width, height } = this.container.getBoundingClientRect();
        this.unitOnScreen = Math.min(
            width / this.game_width,
            height / this.game_height
        );
        this.project_distance = distance => distance * this.unitOnScreen;
        this.project_position = position => position.scale_by(this.unitOnScreen);

        const canvas = document.createElement('canvas');
        this.container.appendChild(canvas);
        this.context = canvas.getContext('2d');
        canvas.setAttribute('width', this.project_distance(this.game_width));
        canvas.setAttribute('height', this.project_distance(this.game_height));
    }

    render(food, snake, score, best_score) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.globalAlpha = 0.5;
        this.context.fillStyle = '#8AA29E';
        getRange(this.game_width).forEach(column => 
            getRange(this.game_height)
            .filter(row => (column + row) % 2 == 1)
            .forEach(row =>
                this.context.fillRect(
                    column * this.unitOnScreen,
                    row * this.unitOnScreen,
                    this.unitOnScreen,
                    this.unitOnScreen
                )
            )
        );
        this.context.globalAlpha = 1;

        const projected_food = this.project_position(food);
        this.context.beginPath();
        this.context.arc(
            projected_food.x,
            projected_food.y,
            this.unitOnScreen / 2.5,
            0,
            2 * Math.PI
        );
        this.context.fillStyle = '#EB9486';
        this.context.fill();

        this.context.lineWidth = this.unitOnScreen;
        this.context.strokeStyle = '#FADF7F';
        this.context.beginPath();
        snake.map(this.project_position)
        .forEach(({x, y}) => this.context.lineTo(x, y));
        this.context.stroke();

        document.getElementById('current-score').innerText = score;
        document.getElementById('best-score').innerText = best_score;
    }
} 
