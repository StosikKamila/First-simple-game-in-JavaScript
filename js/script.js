

const gamePlane = document.createElement("div");

// gamePlane.innerText = "GAMEPLANE"

gamePlane.style.cssText = 
`background-color: #070914;
height:100vh;
width:100vw;
position:relative;`
document.body.append(gamePlane);
//TWORZENIE SCIANY (DO CHODZENIA)
function makeWall([w, h, x, y, typ = "wall"]){
    console.log(typ);
    const wall = document.createElement("div");
    wall.style.cssText =`
        display:flex;
        justify-content:center;
        align-items:center;
        position:absolute;
        background-color: #00f7f7;
        width: ${w}vw;
        height: ${h}vh;
        position:absolute;
        left: ${x}vw;
        top: ${y}vh;
        `;
        wall.className = typ;
        if(typ != "wall") {
            wall.innerText = typ;
        }
    gamePlane.append(wall);
}
// makeWall(20, 10, 0, 0)
// makeWall(10, 20, 90, 80)
const mapa = [
    [20, 50, 0, 25, 'START'],
    [30, 30, 20, 35],
    [30, 10, 50, 40],
    [20, 50, 80, 25, 'META']
]

for(const wall of mapa){
    makeWall(wall)
}

const startButton = document.querySelector(".START");
const metaButton = document.querySelector(".META");
const allWalls = document.querySelectorAll(".META, .START, .wall");
//WALLS
for(const singleWall of allWalls){
    singleWall.addEventListener("mousemove", e => {
        e.stopPropagation();
        // console.log(e)
            })
}
const game = {
    start(){
        console.log("GAME STARTED.")
        startButton.removeEventListener("click", game.start)
        metaButton.addEventListener("mouseover", game.over)
        document.addEventListener("mousemove", game.wallListening)
    },
    wallListening(e){
        game.over(false)
        // console.log("detect")
    },
    over(result){

        if( result){
            // jeśli prawda
            // console.log("You win!")
            guide.show("Wygrałeś!", "Ale możesz zagrać jeszcze raz...", true)

        }else{
            // jeśli fałsz
            // console.log("You lost!")
            guide.show("Przegrałeś!", "Spróbuj jeszcze raz", true);
            const img = document.createElement("div");
            img.style.cssText = `
            position:absolute;
            top:0;
            height:100%; 
            width:100%;
            background-size:contain;
            background-position:center;
            background-repeat:no-repeat;
            background-image:url(https://st.depositphotos.com/1001911/1438/v/600/depositphotos_14382605-stock-illustration-crying-emoticon.jpg);
            `
            document.body.append(img)
            setTimeout(()=>{img.remove() }, 1500)
        }

        document.removeEventListener("mousemove", game.wallListening)
        startButton.addEventListener("click", game.start)
        metaButton.removeEventListener("mouseover", game.over)
    }
}
startButton.addEventListener("click", game.start)

const guide = {
    init(){
        this.dom = document.createElement("div");
        this.dom.className = "guide";

        // this.dom.innerText = "GUIDE";
        this.wrapper = document.createElement("div");
        this.wrapper.style.cssText = `
            background-color: #26302f;
            color:#c1f7f0;
            text-align:center;
            padding:30px;
            
            border-radius:20px;
            box-shadow: 0 0 20px #000;
        `;
        this.tittle = document.createElement("h1");
        this.tittle.innerText = "Hello";
        this.message = document.createElement("p");
        this.message.innerText = "Word";
        this.button = document.createElement("button");
        this.button.innerText = "OK";

        // this.button.addEventListener("click", this.close);
        this.button.addEventListener("click", () => {
            this.close()
        })
        this.wrapper.append(this.tittle);
        this.wrapper.append(this.message);
        this.wrapper.append(this.button);
        this.dom.append(this.wrapper);
        document.body.append(this.dom);
    },
    close(){
        
        guide.dom.style.display = "none";
    },
    show(tittle, message, showLink = false){
        this.tittle.innerText = tittle;
        this.message.innerText = message;
        this.dom.style.display = "flex";

        if(showLink){
            const a = document.createElement("a");
            a.href="http://google.com";
            this.wrapper.append(a);
            a.innerText = "Ten link"
        }
    }
}
guide.init();
guide.show("Witaj w grze",
`Twoim zadaniem jest kliknąć na start i dotrzeć kursorem po niebieskich polach do mety`
);