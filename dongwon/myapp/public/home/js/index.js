function absPx(px1,px2) {
    px1 = px1.split('px')[0];
    if(px1>px2) return px1-px2;
    else return px2-px1;
}
class DongAvoidGame {
    constructor(el,width,height) {
        /* make game board */
        const board = document.createElement('div');
        board.id = "game-board";
        board.style.width = width + 'px';
        board.style.height = height + 'px';
        board.style.backgroundImage = "url('images/background.png')";
        
        board.addEventListener('dead',(e)=>{
            /* ddong에 맞으면 dead event가 발생한다. */
            this.recordScore();
        });

        this.player = new Player(board);
        this.DdongMaker = new DdongMaker(board,width);

        /* # 게임이 시작됨과 동시에 score를 기록해 <span id="score">0</span>를 바꿔준다. */

        el.appendChild(board);
    }

    restart() {
        /* # 재시작 메소드, 로직도 구현해야한다. */
        console.log("restart")
    }
    recordScore() {
        /* # 사망처리 메소드 */
        /* score를 기록을 중지한다.*/
    }

}

class DdongMaker {
    constructor(gameEl,width){
        const ddongMaker = document.createElement('div');
        ddongMaker.id = "ddong-maker";
        ddongMaker.style.position = "absolute";
        ddongMaker.style.top = "0px";
        ddongMaker.style.width = width + "px";
        
        this.dom = ddongMaker;
        gameEl.appendChild(ddongMaker);
        this.ddongList = [];
        this.dropDdong();
        /* # 반복적으로 Ddong을 drop 하는 메소드 추가 
            # 0~500 사이의 랜덤한 위치에 ddong을 일정 주기로 생성해야한다. 
        */
    }

    dropDdong(){/* ddong을 생성해 drop 하는 메소드 */
        this.ddongList.push(new Ddong(this.dom,300));
    }
}

class Ddong {
    constructor(parent,position){
        const ddong = document.createElement('div');
        ddong.className = "ddong";
        ddong.style.position= "absolute";
        ddong.style.width="30px";
        ddong.style.height="30px";
        ddong.style.left = position + "px";
        ddong.style.backgroundImage = "url('images/ddong.png')";
        parent.appendChild(ddong);

        let top = 0;
        const dropping = setInterval(()=>{
            top += 5;
            ddong.style.top = top + "px";
            if(top > 480) {
                const dist = absPx(document.getElementById('player').style.left,position); // character와 ddong의 가로 거리 절댓값
                // # dist가 30(character의 hitbox)보다 작으면 사망처리
                if(dist < 30){
                    ddong.dispatchEvent(new Event('dead',{bubbles: true}));
                    ddong.remove();
                }
            }
            if(top > 580) {
                ddong.remove();
                clearInterval(dropping);
            }
        },50);
    }


}

class Player {
    constructor(gameEl){
        console.log(gameEl)
        const character = document.createElement('div');
        character.id="player";
        character.style.width="50px";
        character.style.height="100px";
        character.style.backgroundImage = "url('images/player.png')";

        character.style.position = "absolute";
        character.style.left = "0px";
        character.style.bottom = "89px";
        
        this.initKeyEvent(character);
        gameEl.appendChild(character);

        this.hitBox = {
            width:30,
            height:100,
        }
        this.position = 0;
        this.moveInterval = null;
    }

    initKeyEvent(el) {
        const self = this;
        window.addEventListener('keydown',(event)=>{
            if(self.moveInterval == null) {
                if(event.key == 'a'){
                    self.moveInterval = setInterval(()=>{
                        self.position-=2;
                        el.style.left = `${self.position}px`;
                    },10)
                }
                if(event.key == 'd'){
                    self.moveInterval = setInterval(()=>{
                        self.position+=2;
                        el.style.left = `${self.position}px`;
                    },10)
                }
            }
        })
        window.addEventListener('keyup',(event)=>{
            if(event.key == 'a' || event.key == 'd'){
                if(self.moveInterval) {
                    clearInterval(self.moveInterval);
                    self.moveInterval = null;
                }
            }
        })
    }
}

function ajax(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",encodeURI(url) , true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

/*html이 완전히 로드되면 실행할 코드 */
window.onload = function(){
    ajax('/userInfo',(data)=>{
        document.getElementById("name").innerText = JSON.parse(data).name;
        /* # 같은 방식으로 score를 가져와 <span id="high-score">0</span>를 갱신하세요. */
    });

    ajax('/game/getHighScore',(data)=>{
        /* # 같은 방식으로 score를 가져와 최고유저의 이름과 score를 갱신하세요.*/
    });
    const gameBoard = document.getElementById('game-screen');
    const game = new DongAvoidGame(gameBoard,500,700);

    window.addEventListener('keypress',(event)=>{
        if(event.key == 'r') {
            game.restart();
        }
    })
}