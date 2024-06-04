class Pong{
    constructor(html,velocity){
        this.board = document.getElementById(html);
        this.dimension = this.dimension.getContext("2d");
        this.score1=0;
        this.score2=0;
        this.paddleWidth=10;
        this.paddleHeight=100;
        this.radius=10;
        this.velocity=velocity;
        this.key={};
        this.p1 = new Paddle(0,this.board.height/2-this.paddleHeight);
        this.p2 = new Paddle(this.board.width-this.paddleWidth,this.board.height/2-this.paddleHeight);
        this.b = new Ball(this.board.width/2,this.board.height/2,this.radius,this.velocity);
        this.pressKey();
    }
    score(){
        if(this.b.x-this.b.radius<=0){
            score1++;
            this.b.reset();
        }
        else if(this.b.x+this.b.radius>=this.board.width){
            score2++;
            this.b.reset();
        }
    }
    loop(){
        requestAnimationFrame(this.loop.bind(this));
        this.dimension.clearRect(0,0,this.board.width,this.board.height);
        this.play();
        this.show();
    }
    pressKey(){
        window.addEventListener("keydown",(event)=>{
            this.keyState[event.key]=true;
        });
        window.addEventListener("keyup",(event)=>{
            this.keyState[event.key]=false;
        });
        this.loop();
    }
    play(){
        if(this.p1.y<this.board.height&&this.key["w"]) this.p1.yChange=this.p1.velocity;
        else if(this.p1.y>0&&this.key["s"]) this.p1.yChange=-this.p1.velocity;
        else this.p1.yChange=0;
        if(this.p2.y<this.board.height&&this.key["ArrowUp"]) this.p2.yChange=this.p2.velocity;
        else if(this.p2.y>0&&this.key["ArrowDown"]) this.p2.yChange=-this.p2.velocity;
        else this.p2.yChange=0;
        this.p1.position();
        this.p2.position();
        //Collisions
        this.ball.position();
    }
    show(){
        this.p1.show(this.dimension);
        this.p2.show(this.dimension);
        this.b.show(this.dimension);
    }
}