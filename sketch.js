//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro / 2

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//placar do jogo
let meusPontos = 0;
let pontosOponente= 0;

let colidiu = false;

//sons do jogo
let ponto;
let raquetada;
let trilha;

//chance de erro do inimigo
let erroOponente;
let acertoOponente;

function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha();
  mostraRaquete(xRaquete, yRaquete);
  movimentaBolinha();
  toqueNaBorda();
  movimentaRaquete();
  //verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente); // Verifica colisão com a raquete do oponente
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  movimentaRaqueteOponenteComDelay();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function toqueNaBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  } 
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}


function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    if (yRaquete > 0)
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)){
    if (yRaquete + raqueteAltura < height)
    yRaquete += 10
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;  
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = (yBolinha - (yRaqueteOponente + raqueteAltura / 2)) * 0.08;
  yRaqueteOponente += velocidadeYOponente;
}

function movimentaRaqueteOponenteComDelay() {
  const atraso = Math.random() * 1000 + 500; // Atraso aleatório entre 400 e 900 milissegundos
  setTimeout(function() {
    velocidadeYOponente = (yBolinha - (yRaqueteOponente + raqueteAltura + raio / 2)) * 0.08;
    yRaqueteOponente += velocidadeYOponente;
  }, atraso);
}


function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha - raio < 0){
    pontosOponente += 1
    ponto.play()
    erroOponente = 0;
  }
  if (xBolinha + raio > width) {
    meusPontos += 1
    ponto.play();
    erroOponente -= acertoOponente;
    acertoOponente *= -1;
  }
}