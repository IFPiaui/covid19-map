// Menu Responsivo
const menuToggle = document.querySelector(".menu-toggle");
const secaoMenu = document.querySelector(".secao-menu");

let showMenu = true;

menuToggle.addEventListener("click", () => {
  document.body.style.overflow = showMenu ? "hidden" : "initial";

  secaoMenu.classList.toggle("on", showMenu);
  showMenu = !showMenu;
});

// Funções globais
function sumirElemento(elemento) {
  elemento.style.display = "none";
}

function aparecerElemento(elemento) {
  elemento.style.display = "block";
}

function addArray(array, elemento) {
  const posicao = array.indexOf(elemento);

  if (posicao === -1) {
    array.push(elemento);
  }
}

function removeArray(array, elemento) {
  const posicao = array.indexOf(elemento);

  if (posicao !== -1) {
    array.splice(posicao, 1);
  }
}

function atualizarAba(componentesDefault, componentesNaoDefault) {
  componentesDefault.map((componente) => aparecerElemento(componente));
  componentesNaoDefault.map((componente) => sumirElemento(componente));
}

function tratarTransicaoDeExibicaoElementos(
  array,
  elemento,
  componentesDefault,
  componentesNaoDefault
) {
  array.map((e) => {
    if (e === elemento) {
      removeArray(componentesNaoDefault, elemento);
      addArray(componentesDefault, elemento);
    } else {
      removeArray(componentesDefault, e);
      addArray(componentesNaoDefault, e);
    }
  });
}

// Abas (Piaui e Brasil)
const abaBrasil = document.querySelector("#aba-brasil");
const abaPiaui = document.querySelector("#aba-piaui");
const barraBrasil = abaBrasil.nextElementSibling;
const barraPiaui = abaPiaui.nextElementSibling;
const cardsDados = document.querySelectorAll(".card-dados");
const selecoesDeAbas = document.querySelectorAll(".selecao-abas");
const cardsMapas = document.querySelectorAll(".card-mapa");
const componentesBrasil = document.querySelectorAll("[componente-brasil]");
const componentesPiaui = document.querySelectorAll("[componente-piaui]");
let componentesPiauiDefault = [];
let componentesPiauiNaoDefault = [];
let componentesBrasilDefault = [];
let componentesBrasilNaoDefault = [];

componentesPiaui.forEach((componentePi) =>
  componentePi.hasAttribute("default")
    ? componentesPiauiDefault.push(componentePi)
    : componentesPiauiNaoDefault.push(componentePi)
);

componentesBrasil.forEach((componenteBr) =>
  componenteBr.hasAttribute("default")
    ? componentesBrasilDefault.push(componenteBr)
    : componentesBrasilNaoDefault.push(componenteBr)
);

atualizarAba(componentesPiauiDefault, componentesPiauiNaoDefault);
componentesBrasil.forEach((componente) => sumirElemento(componente));

function ativaBarraPiaui() {
  aparecerElemento(barraPiaui);
  sumirElemento(barraBrasil);

  atualizarAba(componentesPiauiDefault, componentesPiauiNaoDefault);
  componentesBrasil.forEach((componente) => sumirElemento(componente));
}

function ativaBarraBrasil() {
  aparecerElemento(barraBrasil);
  sumirElemento(barraPiaui);

  atualizarAba(componentesBrasilDefault, componentesBrasilNaoDefault);
  componentesPiaui.forEach((componente) => sumirElemento(componente));
}

abaBrasil.addEventListener("click", () => {
  ativaBarraBrasil();
});

abaPiaui.addEventListener("click", () => {
  ativaBarraPiaui();
});

// Abas (Gráfico) - BR
const abaGraficoBrConfirmados = document.querySelector(
  "#aba-grafico-br-confirmados"
);
const abaGraficoBrObitosAcumulados = document.querySelector(
  "#aba-grafico-br-obitos-acumulados"
);
const abaGraficoBrNovosObitos = document.querySelector(
  "#aba-grafico-br-novos-obitos"
);
const barraGraficoBrConfirmados = abaGraficoBrConfirmados.nextElementSibling;
const barraGraficoBrObitosAcumulados =
  abaGraficoBrObitosAcumulados.nextElementSibling;
const barraGraficoBrNovosObitos = abaGraficoBrNovosObitos.nextElementSibling;
const graficoBrConfirmados = document.querySelector("#grafico-br-confirmados");
const graficoBrNovosObitos = document.querySelector("#grafico-br-novos-obitos");
const graficoBrObitosAcumulados = document.querySelector(
  "#grafico-br-obitos-acumulados"
);
const graficosBr = [
  graficoBrConfirmados,
  graficoBrNovosObitos,
  graficoBrObitosAcumulados,
];
const barrasGraficoBr = [
  barraGraficoBrConfirmados,
  barraGraficoBrNovosObitos,
  barraGraficoBrObitosAcumulados,
];

abaGraficoBrConfirmados.addEventListener("click", () => {
  tratarTransicaoDeExibicaoElementos(
    graficosBr,
    graficoBrConfirmados,
    componentesBrasilDefault,
    componentesBrasilNaoDefault
  );
  tratarTransicaoDeExibicaoElementos(
    barrasGraficoBr,
    barraGraficoBrConfirmados,
    componentesBrasilDefault,
    componentesBrasilNaoDefault
  );

  atualizarAba(componentesBrasilDefault, componentesBrasilNaoDefault);
});

abaGraficoBrObitosAcumulados.addEventListener("click", () => {
  tratarTransicaoDeExibicaoElementos(
    graficosBr,
    graficoBrObitosAcumulados,
    componentesBrasilDefault,
    componentesBrasilNaoDefault
  );
  tratarTransicaoDeExibicaoElementos(
    barrasGraficoBr,
    barraGraficoBrObitosAcumulados,
    componentesBrasilDefault,
    componentesBrasilNaoDefault
  );

  atualizarAba(componentesBrasilDefault, componentesBrasilNaoDefault);
});

abaGraficoBrNovosObitos.addEventListener("click", () => {
  tratarTransicaoDeExibicaoElementos(
    graficosBr,
    graficoBrNovosObitos,
    componentesBrasilDefault,
    componentesBrasilNaoDefault
  );
  tratarTransicaoDeExibicaoElementos(
    barrasGraficoBr,
    barraGraficoBrNovosObitos,
    componentesBrasilDefault,
    componentesBrasilNaoDefault
  );

  atualizarAba(componentesBrasilDefault, componentesBrasilNaoDefault);
});

// Abas (Mapa) - PI
const abaMapaPiConfirmados = document.querySelector("#aba-mapa-pi-confirmados");
const abaMapaPiObitos = document.querySelector("#aba-mapa-pi-obitos");
const barraAbaMapaPiConfirmados = abaMapaPiConfirmados.nextElementSibling;
const barraAbaMapaPiObitos = abaMapaPiObitos.nextElementSibling;
const mapaPiConfirmados = document.querySelector("#mapa-pi-confirmados");
const mapaPiObitos = document.querySelector("#mapa-pi-obitos");

abaMapaPiConfirmados.addEventListener("click", () => {
  aparecerElemento(barraAbaMapaPiConfirmados);
  sumirElemento(barraAbaMapaPiObitos);

  removeArray(componentesPiauiNaoDefault, mapaPiConfirmados);
  addArray(componentesPiauiDefault, mapaPiConfirmados);

  removeArray(componentesPiauiDefault, mapaPiObitos);
  addArray(componentesPiauiNaoDefault, mapaPiObitos);

  atualizarAba(componentesPiauiDefault, componentesPiauiNaoDefault);
});

abaMapaPiObitos.addEventListener("click", () => {
  aparecerElemento(barraAbaMapaPiObitos);
  sumirElemento(barraAbaMapaPiConfirmados);

  removeArray(componentesPiauiNaoDefault, mapaPiObitos);
  addArray(componentesPiauiDefault, mapaPiObitos);

  removeArray(componentesPiauiDefault, mapaPiConfirmados);
  addArray(componentesPiauiNaoDefault, mapaPiConfirmados);

  atualizarAba(componentesPiauiDefault, componentesPiauiNaoDefault);
});

// Abas (Gráfico) - PI
const abaGraficoPiConfirmados = document.querySelector(
  "#aba-grafico-pi-confirmados"
);
const abaGraficoPiObitos = document.querySelector("#aba-grafico-pi-obitos");
const abaGraficoPiDoencas = document.querySelector("#aba-grafico-pi-doencas");
const abaGraficoPiNovosCasos = document.querySelector(
  "#aba-grafico-pi-novos-casos"
);
const barraGraficoPiConfirmados = abaGraficoPiConfirmados.nextElementSibling;
const barraGraficoPiObitos = abaGraficoPiObitos.nextElementSibling;
const barraGraficoPiDoencas = abaGraficoPiDoencas.nextElementSibling;
const barraGraficoPiNovosCasos = abaGraficoPiNovosCasos.nextElementSibling;
const graficoPiConfirmados = document.querySelector("#grafico-pi-confirmados");
const graficoPiObitos = document.querySelector("#grafico-pi-obitos");
const graficoPiDoencas = document.querySelector("#grafico-pi-doencas");
const graficoPiNovosCasos = document.querySelector("#grafico-pi-novos-casos");

const graficosPi = [
  graficoPiConfirmados,
  graficoPiDoencas,
  graficoPiNovosCasos,
  graficoPiObitos,
];

const barrasGraficoPi = [
  barraGraficoPiConfirmados,
  barraGraficoPiDoencas,
  barraGraficoPiNovosCasos,
  barraGraficoPiObitos,
];

abaGraficoPiConfirmados.addEventListener("click", () => {
  tratarTransicaoDeExibicaoElementos(
    graficosPi,
    graficoPiConfirmados,
    componentesPiauiDefault,
    componentesPiauiNaoDefault
  );
  tratarTransicaoDeExibicaoElementos(
    barrasGraficoPi,
    barraGraficoPiConfirmados,
    componentesPiauiDefault,
    componentesPiauiNaoDefault
  );

  atualizarAba(componentesPiauiDefault, componentesPiauiNaoDefault);
});

abaGraficoPiObitos.addEventListener("click", () => {
  tratarTransicaoDeExibicaoElementos(
    graficosPi,
    graficoPiObitos,
    componentesPiauiDefault,
    componentesPiauiNaoDefault
  );
  tratarTransicaoDeExibicaoElementos(
    barrasGraficoPi,
    barraGraficoPiObitos,
    componentesPiauiDefault,
    componentesPiauiNaoDefault
  );

  atualizarAba(componentesPiauiDefault, componentesPiauiNaoDefault);
});

abaGraficoPiDoencas.addEventListener("click", () => {
  tratarTransicaoDeExibicaoElementos(
    graficosPi,
    graficoPiDoencas,
    componentesPiauiDefault,
    componentesPiauiNaoDefault
  );
  tratarTransicaoDeExibicaoElementos(
    barrasGraficoPi,
    barraGraficoPiDoencas,
    componentesPiauiDefault,
    componentesPiauiNaoDefault
  );

  atualizarAba(componentesPiauiDefault, componentesPiauiNaoDefault);
});

abaGraficoPiNovosCasos.addEventListener("click", () => {
  tratarTransicaoDeExibicaoElementos(
    graficosPi,
    graficoPiNovosCasos,
    componentesPiauiDefault,
    componentesPiauiNaoDefault
  );
  tratarTransicaoDeExibicaoElementos(
    barrasGraficoPi,
    barraGraficoPiNovosCasos,
    componentesPiauiDefault,
    componentesPiauiNaoDefault
  );

  atualizarAba(componentesPiauiDefault, componentesPiauiNaoDefault);
});
