class Player
{
   constructor(name,x,y,d,s,c,t)
   {
        this.name = name;
        this.alive = true;
        this.timer = 0;
        
        //x position
        this.x = x;
        
        //y position
        this.y = y;
        
        //direction
        this.d = d;
        
        //speed
        this.s = s;
        
        //color
        this.c = c;
        
        //trail
        this.t = t;
        
        
       
   }
   
   display()
   {
       if(this.name == Player1)
       {
           getColor(player1);
       }
       else
       {
           getColor(player2);
       }
        
        noStroke();
        rect(this.x,this.y,10,10);
        

       
   }
   
   move()
   {
       if(this.d == "up")
       {
           this.y = this.y - this.s;
       }
       if(this.d == "down")
       {
           this.y = this.y + this.s;
       }
       if(this.d == "right")
       {
           this.x = this.x + this.s;
       }
       if(this.d == "left")
       {
           this.x = this.x - this.s;
       }
   }
   
   checkHit()
   {
       //cycles through every player's path to check for collisions
       for(var j = 0; j < players.length; j++)
       {
           for(i = 0; i < players[j].t.length; i++)
           {
               if(dist(players[j].t[i].x, players[j].t[i].y ,this.x, this.y) < 4)
               {
                   this.die();
               }
           }
       }
       
   }
   
   checkBounds()
   {
       if(this.x > 1000 || this.x < 0 || this.y > 1000 || this.y < 0)
       {
           this.die()
           
       }
   }
   
   die()
   {
       this.s = 0;
       this.alive = false;
       this.x = 2000;
       this.t.splice(0,this.t.length);
   }
}

function setup() 
{
    createCanvas(1000, 1000);
    rectMode(CENTER);
    noStroke();
    textFont('impact');
    player1 = new Player("Player 1",750,500,"up",5,"blue",t1);
    player2 = new Player("Player 2",250,500,"up",5,"red",t2);
    players.push(player1);
    players.push(player2);
		r = random(100,255);
		g = random(100,255);
		b = random(100,255);

		r2 = random(1,3);
		g2 = random(1,3);
		b2 = random(1,3);
	
}

var player1;
var player2;

var t1 = new Array();
var t2 = new Array();
var players = new Array();

var wins1 = 0;
var wins2 = 0;

var score1 = false;
var score2 = false;

var size = 100;
var size2 = 1;
var str = 1;
var str2 = .25;

var r;
var g;
var b;

var r2;
var g2;
var b2;

var rot = 0;

var timer = 0;

var scene = "menu"

var selected = 1;

function draw() 
{
    if(scene == "menu")
    {
        menu();
    }
    if(scene == "game1")
    {
        game1();   
    }
    if(scene == "game2")
    {
        game2();   
    }
    if(scene == "options")
    {
        options();
    }
}

/*------------------------------SCENE FUNCTIONS-------------------------------*/
function menu()
{
    drawBackground();
    textSize(300);
    fill(255);
    text("TRON",190,300);
    
    fill(0,150);
    rect(500,500,400,100,30);
    
    rect(500,650,400,100,30);
    
    rect(500,800,400,100,30);
    
    noStroke();
    textSize(90);
    fill(255);
    text("1   PLAYER",340,535);
    text("2  PLAYER",340,685);
    text("OPTIONS",350,835);
    
    //button clicks
        //1 player
    if(mouseX > 300 && mouseX < 700)
    {
        if(mouseY > 450 && mouseY < 550)
        {
            if(mouseIsPressed)
            {
                mouseX = 2000;
                scene = "game1";
            }
        }       
    }
    
        //2 player
    if(mouseX > 300 && mouseX < 700)
    {
        if(mouseY > 600 && mouseY < 700)
        {
            if(mouseIsPressed)
            {
                mouseX = 2000;
                scene = "game2";
            }
        }       
    }
    
        //options
    if(mouseX > 300 && mouseX < 700)
    {
        if(mouseY > 750 && mouseY < 850)
        {
            if(mouseIsPressed)
            {
                mouseX = 2000;
                scene = "options";
            }
        }       
    }
}

function game1()
{
    if(player1.alive)
    {
        background(0);
        drawGrid();
        updatePlayer(player1);
        keyboard();
        player1.timer += 1/60;
        
        textSize(50);
        text(round(player1.timer),100,100);
    }
    else
    {
        drawBackground();
        textSize(180);
        fill(255);
        text("GAME OVER!",80,200);
        
        fill(0,200)
        rect(500,500,400,100,30);
        
        rect(500,700,400,100,30);
        
        noStroke();
        textSize(90);
        fill(255);
        text("RETRY",400,535);
        text("QUIT",420,735);
        textSize(50);
        getColor(player1);
        text("You survived "+ round(player1.timer)+" seconds", 270,290);
        
        //button clicks
            //retry
        if(mouseX > 300 && mouseX < 700)
        {
            if(mouseY > 450 && mouseY < 550)
            {
                if(mouseIsPressed)
                {
                    player1.alive = true;
                    player1.x = 750;
                    player1.y = 500;
                    player1.d = "up";
                    player1.s = 5;
                    player1.timer = 0;
                }
            }       
        }
        
            //quit
        if(mouseX > 300 && mouseX < 700)
        {
            if(mouseY > 650 && mouseY < 750)
            {
                if(mouseIsPressed)
                {
                    mouseX = 2000;
                    scene = "menu";
                    player1.alive = true;
                    player1.x = 750;
                    player1.y = 500;
                    player1.d = "up";
                    player1.s = 5;
                    player1.timer = 0;
                }
            }       
        }
    }
    
}

function game2()
{
    if(player1.alive ||player2.alive)
    {
        background(0);
        drawGrid();
        updatePlayer(player1);
        updatePlayer(player2);
        keyboard();
        if(player1.alive)
        {
            player1.timer += 1/60;
        }
        
        if(player2.alive)
        {
            player2.timer += 1/60;
        }

    }
    else
    {
        if(player1.timer > player2.timer)
        {
           if(!score1)
           {
               wins1 ++;
               score1 = true;
           }
        }
        else if(player1.timer < player2.timer)
        {
            if(!score2)
            {
               wins2 ++;
               score2 = true;
            }
        }
        drawBackground();
        textSize(180);
        fill(255);
        text("GAME OVER!",80,200);
        
        fill(0,200);
        rect(500,500,400,100,30);
        
        rect(500,700,400,100,30);
        
        rect(500,320,600,100,30);
        
        noStroke();
        textSize(90);
        fill(255);
        text("RETRY",400,535);
        text("QUIT",420,735);
        textSize(50);
        getColor(player1)
        text("WINS: "+ wins1, 590,340);
        getColor(player2);
        text("WINS: "+ wins2, 270,340);
        
        //button clicks
            //retry
        if(mouseX > 300 && mouseX < 700)
        {
            if(mouseY > 450 && mouseY < 550)
            {
                if(mouseIsPressed)
                {
                    //reset players
                    
                    player1.alive = true;
                    player1.x = 750;
                    player1.y = 500;
                    player1.d = "up";
                    player1.s = 5;
                    player1.timer = 0;
                    
                    player2.alive = true;
                    player2.x = 250;
                    player2.y = 500;
                    player2.d = "up";
                    player2.s = 5;
                    player2.timer = 0;
                    
                    score1 = false;
                    score2 = false;
                }
            }       
        }
        
            //quit
        if(mouseX > 300 && mouseX < 700)
        {
            if(mouseY > 650 && mouseY < 750)
            {
                if(mouseIsPressed)
                {
                    mouseX = 2000;
                    scene = "menu";
                    
                    //reset players
                    player1.alive = true;
                    player1.x = 750;
                    player1.y = 500;
                    player1.d = "up";
                    player1.s = 5;
                    
                    player2.alive = true;
                    player2.x = 250;
                    player2.y = 500;
                    player2.d = "up";
                    player2.s = 5;
                    wins1 = 0;
                    wins2 = 0;
                    
                    score1 = false;
                    score2 = false;                    
                }
            }       
        }
    }
}

function options()
{
    background(0);
    drawBackground();
    fill(0,200);
    //player box
    rect(500,180,350,300,30);
    rect(500,100,300,100,30);
    
    //color box
    rect(500,525,500,350,30);
    
    //back box
    rect(500,800,400,100,30);
    strokeWeight(3);
    //player select
    if(selected == 1)
    {
        stroke(255,204,0)
    }
    else
    {
        stroke(255);
    }
    getColor(player1);
    rect(400,250,100,100,30);
    
    if(selected == 2)
    {
        stroke(255,204,0)
    }
    else
    {
        stroke(255);
    }
    getColor(player2);
    rect(600,250,100,100,30);
    
    //color boxes
    stroke(255);
    fill(255,0,0)
    rect(350,450,100,100,30);
    fill(255,153,0);
    rect(500,450,100,100,30);
    fill(255,255,0);
    rect(650,450,100,100,30);
    
    fill(0,255,0)
    rect(350,600,100,100,30);
    fill(0,153,255);
    rect(500,600,100,100,30);
    fill(255,0,255);
    rect(650,600,100,100,30);

    
    noStroke();
    textSize(90);
    fill(255);
    text("BACK",400,835);
    
    
    text("PLAYER",375,135);
    text("1",380,285);
    
    text("2",580,285);
    
    //BUTTONS
    
    //p1
    if(mouseX > 350 && mouseX < 450)
    {
        if(mouseY > 200 && mouseY < 300)
        {
            if(mouseIsPressed)
            {
                selected = 1;
            }
        }       
    }
    
    //p2
    if(mouseX > 550 && mouseX < 650)
    {
        if(mouseY > 200 && mouseY < 300)
        {
            if(mouseIsPressed)
            {
                selected = 2;
            }
        }       
    }
    
    //red
    if(mouseX > 300 && mouseX < 400)
    {
        if(mouseY > 400 && mouseY < 500)
        {
            if(mouseIsPressed)
            {
                if(selected == 1 && player2.c != "red")
                {
                    player1.c = "red";
                }
                else if(selected == 2 && player1.c != "red")
                {
                    player2.c = "red";
                }
            }
        }       
    }
    
    //orange
    if(mouseX > 450 && mouseX < 550)
    {
        if(mouseY > 400 && mouseY < 500)
        {
            if(mouseIsPressed)
            {
                if(selected == 1 && player2.c != "orange")
                {
                    player1.c = "orange";
                }
                else if(selected == 2 && player1.c != "orange")
                {
                    player2.c = "orange";
                }
            }
        }       
    }
    
    //yellow
    if(mouseX > 600 && mouseX < 700)
    {
        if(mouseY > 400 && mouseY < 500)
        {
            if(mouseIsPressed)
            {
                if(selected == 1 && player2.c != "yellow")
                {
                    player1.c = "yellow";
                }
                else if(selected == 2 && player1.c != "yellow")
                {
                    player2.c = "yellow";
                }
            }
        }       
    }
    
    //green
    if(mouseX > 300 && mouseX < 400)
    {
        if(mouseY > 550 && mouseY < 650)
        {
            if(mouseIsPressed)
            {
                if(selected == 1 && player2.c != "green")
                {
                    player1.c = "green";
                }
                else if(selected == 2 && player1.c != "green")
                {
                    player2.c = "green";
                }
            }
        }       
    }
    
    //blue
    if(mouseX > 450 && mouseX < 550)
    {
        if(mouseY > 550 && mouseY < 650)
        {
            if(mouseIsPressed)
            {
                if(selected == 1 && player2.c != "blue")
                {
                    player1.c = "blue";
                }
                else if(selected == 2 && player1.c != "blue")
                {
                    player2.c = "blue";
                }
            }
        }       
    }
    
    //pink
    if(mouseX > 600 && mouseX < 700)
    {
        if(mouseY > 550 && mouseY < 650)
        {
            if(mouseIsPressed)
            {
                if(selected == 1 && player2.c != "pink")
                {
                    player1.c = "pink";
                }
                else if(selected == 2 && player1.c != "pink")
                {
                    player2.c = "pink";
                }
            }
        }       
    }
    
    //options
    if(mouseX > 300 && mouseX < 700)
    {
        if(mouseY > 750 && mouseY < 850)
        {
            if(mouseIsPressed)
            {
                mouseX = 2000;
                scene = "menu";
            }
        }       
    }
}
/*----------------------------------------------------------------------------*/



function coordinate(x,y)
{
    this.x = x;
    this.y = y;
}

function updatePlayer(p)
{
    //player paths
    p.t.push(new coordinate(p.x,p.y));
    
    //color
    if(p.name == "Player 1")
    {
         getColor(player1);
    }
    
    if(p.name == "Player 2")
    {
         getColor(player2);
    }
    
    //draws paths
    for(i = 0; i < p.t.length; i++)
    {
        rect(p.t[i].x,p.t[i].y,10,10);
    }
    
    //player functions
    if(this.alive)
    {
        p.display();
    }
    p.move();
    p.checkHit();
    p.checkBounds();
    
    
}

function keyboard()
{
    //player 1
    if(keyIsDown(UP_ARROW) && player1.d != "down")
    {
        player1.d = "up";
    }
    else if(keyIsDown(DOWN_ARROW) && player1.d != "up")
    {
        player1.d = "down";
    }
    else if(keyIsDown(LEFT_ARROW) && player1.d != "right")
    {
        player1.d = "left";
    }
    else if(keyIsDown(RIGHT_ARROW) && player1.d != "left")
    {
        player1.d = "right";
    }
    
    //player 2
    if(keyIsDown(87) && player2.d != "down")
    {
        player2.d = "up";
    }
    else if(keyIsDown(83) && player2.d != "up")
    {
        player2.d = "down";
    }
    else if(keyIsDown(65) && player2.d != "right")
    {
        player2.d = "left";
    }
    else if(keyIsDown(68) && player2.d != "left")
    {
        player2.d = "right";
    }
}

function drawBackground()
{
    background(1,0,0,40);
    noFill();
    stroke(255,255,255);
    for(i = 100; i < 1000; i+=200)
    {
        for(j = 100; j < 1000; j+=200)
        {
            translate(i,j);
            rotate(rot);
            strokeWeight(str);
            rect(0,0,size,size);
            resetMatrix();
        }
    }
    

    if(timer % 100 < 50)
    {
        size+=size2;
        g+=g2;
        if(str > 1)
        {
            r+=r2;
            str-=str2;
        }
    }
    
    if(timer %100 >= 50)
    {
        b+=b2;
        if(str < 20)
        {
            str+=str2;
        }
        rot+=2*PI/1000;
    
    }
    
    if(size < 100|| size > 700)
    {
        size2 *= -1;
    }
    
    if(r < 50 || r > 255)
    {
        r2*=-1;
    }
    if(g < 50 || g > 255)
    {
        g2*=-1;
    }
    if(b < 50 || b > 25)
    {
        b2*=-1;
    }
    timer++;
}

function getColor(p)
{
    switch(p.c)
    {
        case "blue":
            fill(0,153,255);
            break;
        case "red":
            fill(255,0,0);
            break;
        case "green":
            fill(0,255,0);
            break;
        case "yellow":
            fill(255,255,0);
            break;
        case "orange":
            fill(255,153,0);
            break;
        case "pink":
            fill(255,0,255);
    }
}

function drawGrid()
{
    stroke(255,100);
    strokeWeight(3);
    for(i = 0; i < 10; i++)
    {
        line(i*100,0,i*100,1000);
    }
    
    for(i = 0; i < 10; i++)
    {
        line(0,i*100,1000,i*100);
    }
    
    strokeWeight(1);
    for(i = 0; i < 20; i++)
    {
        line(i*50,0,i*50,1000);
    }
    
    for(i = 0; i < 20; i++)
    {
        line(0,i*50,1000,i*50);
    }
    
    noStroke();
}