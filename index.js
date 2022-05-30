//process.env.NODE_ENV['ntba_fix_319'] = 0;
const telegrambot = require("node-telegram-bot-api");

const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

const bot = new telegrambot(token, { polling: true });

///////////VARIÁVEIS//////////////

var altura;
var peso;
var alturaComTudo;
var pesoComTudo;

var vaiDigitarAltura = true;
var iniciou = true;
var vaiCalcular = true;

var quadrado;
var calculo;

///////////FUNÇÕES////////////////

function reset() {
  peso = null;
  pesoComTudo = null;
  altura = null;
  alturaComTudo = null;
  vaiDigitarAltura = true;
  iniciou = true;
  vaiCalcular = true;
  quadrado = null;
  calculo = null;
}

/////////////////

bot.on("text", (msg) => {
  if (iniciou) {
    bot.sendMessage(msg.chat.id, "Digite seu peso, " + msg.from.first_name);

    vaiDigitarAltura = true;
    iniciou = false;
    vaiCalcular = false;
  } else if (vaiDigitarAltura) {
    bot.sendMessage(msg.chat.id, "Digite sua Altura, " + msg.from.first_name);
    vaiDigitarAltura = false;
    iniciou = false;
    vaiCalcular = true;

    pesoComTudo = msg.text;
    peso = pesoComTudo.replace(/[^0-9]/g, "");
  } else if (vaiCalcular) {
    alturaComTudo = msg.text;
    altura = alturaComTudo.replace(/[^0-9]/g, "");
    altura = altura / 100;
    quadrado = altura * altura;

    calculo = peso / quadrado;

    if (calculo < 18.5 && calculo > 0.1) {
      bot.sendMessage(
        msg.chat.id,
        "Você está magro com esse indice: " + calculo
      );
    } else if (calculo >= 18.5 && calculo < 24.9) {
      bot.sendMessage(
        msg.chat.id,
        "Você está normal com esse indice: " + calculo
      );
    } else if (calculo >= 25 && calculo < 29.9) {
      bot.sendMessage(
        msg.chat.id,
        "Você está com sobre peso com esse indice: " + calculo
      );
    } else if (calculo >= 30 && calculo < 39.9) {
      bot.sendMessage(
        msg.chat.id,
        "Você está com obesidade com esse indice: " + calculo
      );
    } else if (calculo > 40 && calculo < 99999) {
      bot.sendMessage(
        msg.chat.id,
        "Você está com obesidade grave com esse indice: " + calculo
      );
    } else if ((calculo = isNaN || calculo < 0.1))
      bot.sendMessage(
        msg.chat.id,
        "Digite números, não temos como calcular sem números. \n Vamos tentar novamente, " +
          msg.from.first_name
      );

    console.log(calculo);
    console.log(peso);
    console.log(altura);

    reset();
  }
});
