window.onload = () => {
    const stage = document.getElementById('stage')
    const context = stage.getContext('2d')
    document.addEventListener('keydown', keyPush)
    let velGame = 200
    let tempo = setInterval(game, velGame);

    const vel = 1;
    var vx = 0;
    var vy = 0;
    var px = 10;
    var py = 15;
    var tp = 20;
    var qtp = 20;
    var appleX = Math.floor(Math.random() * qtp);
    var appleY = Math.floor(Math.random() * qtp);

    var trail = [];
    tail = 5;

    function game() {
        px += vx
        py += vy

        if (px < 0) {
            px = qtp - 1
        }
        if (px > qtp - 1) {
            px = 0
        }
        if (py < 0) {
            py = qtp - 1
        }
        if (py > qtp - 1) {
            py = 0
        }

        context.fillStyle = '#000';
        context.fillRect(0, 0, stage.width, stage.height);

        context.fillStyle = 'red';
        context.fillRect(appleX * tp, appleY * tp, tp, tp);

        context.fillStyle = '#ccc';
        for (let i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * tp, trail[i].y * tp, tp, tp)
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0
                tail = 5
            }
        }

        trail.push({ x: px, y: py })
        while (trail.length > tail) {
            trail.shift();
        }

        if (appleX == px && appleY == py) {
            tail++
            appleX = Math.floor(Math.random() * qtp)
            appleY = Math.floor(Math.random() * qtp)
            velGame -= 5
            clearInterval(tempo)
            tempo = setInterval(game, velGame)
            console.log(velGame)
            for (let i = 0; i < trail.length; i++) {
                if (trail[i].x == appleX && trail[i].y == appleY) {
                    appleX = Math.floor(Math.random() * qtp)
                    appleY = Math.floor(Math.random() * qtp)
                }
            }
        }
    }

    function keyPush(event) {
        if(vx == -vel && event.keyCode == 39){
            return
        }
        if (vx == vel && event.keyCode == 37) {
            return
        }
        if (vy == -vel && event.keyCode == 40) {
            return
        }
        if (vy == vel && event.keyCode == 38) {
            return
        }
        switch (event.keyCode) {
            case 37: //esquerda
                vx = -vel
                vy = 0
                break;
            case 38: //cima
                vy = -vel
                vx = 0
                break;
            case 39: //direita
                vx = vel
                vy = 0
                break;
            case 40: //baixo
                vy = vel
                vx = 0
                break;
        }

    }


}