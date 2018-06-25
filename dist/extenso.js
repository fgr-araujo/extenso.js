/*!
 * Extenso.js v0.4.6
 * (c) 2015-2018 Matheus Alves
 * License: MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["extenso"] = factory();
	else
		root["extenso"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function normalizar(numero) {
  const normal = numero.toString().trim().replace(/(\.|-)/g, "");

  if (/^0+$/.test(normal)) return "0";
  return normal.replace(/^0+/, "");
}

module.exports = normalizar;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function separarDecimal(numero) {
  return numero.split(",");
}

module.exports = separarDecimal;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const a999 = __webpack_require__(10);
const eNegativo = __webpack_require__(5);
const normalizar = __webpack_require__(0);
const separarClasses = __webpack_require__(16);
const classesRestantes = __webpack_require__(17);

function acimaMil(numero, eFeminino) {
  const normalizado = normalizar(numero);

  if (normalizado < 1000) return a999(normalizado, eFeminino);

  const separados = separarClasses(normalizado);
  const quantiaDeClasses = separados.length - 1;
  const classes = classesRestantes.slice(0, quantiaDeClasses).reverse();

  const preExtenso = separados.map((valor, indice) => classes[indice] ? `${valor} ${classes[indice]}` : valor).filter(valor => !/^000/.test(valor)).map(valor => valor.replace(/^0+/, "")).map(valor => valor.replace(/^(1\s.*)ões$/, "$1ão")).map(valor => valor.replace(/^1\smil\b/, "mil"));

  const porExtenso = preExtenso.map((valor, indice, array) => {
    if (array.length - 1 === indice) {
      if (valor < 100 || valor > 99 && valor % 100 === 0) {
        return `e ${valor}`;
      }
    }
    return valor;
  }).map((valor, indice, array) => {
    if (indice < array.length - 2) return `${valor},`;
    return valor;
  }).map(valor => valor.replace(/\d+/, algarismos => a999(algarismos, eFeminino))).join(" ");

  return porExtenso;
}

module.exports = acimaMil;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function eInteiro(numero) {
  const re = /^(\s*-)?(((\d|\d{2}|\d{3}))((\.\d{3})+)?|\d+)$/;

  return re.test(numero.toString().trim());
}

module.exports = eInteiro;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const separarDecimal = __webpack_require__(1);

function eDecimal(numero) {
  return separarDecimal(numero).length === 2;
}

module.exports = eDecimal;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function eNegativo(numero) {
  return (/^-/.test(numero.toString().trim())
  );
}

module.exports = eNegativo;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const eValido = __webpack_require__(7);
const eInteiro = __webpack_require__(3);
const eDecimal = __webpack_require__(4);
const eNegativo = __webpack_require__(5);
const emDecimal = __webpack_require__(8);
const emReal = __webpack_require__(18);
const maiorQueMil = __webpack_require__(2);

function extenso(numero, opcoes) {
  numero = numero.toString();
  opcoes = opcoes || {};

  if (!eValido(numero)) return NaN;

  const eFeminino = Boolean(opcoes.feminino);
  const paraReal = Boolean(opcoes.real);
  const paraInteiro = eInteiro(numero);
  const paraDecimal = eDecimal(numero);
  const paraNegativo = eNegativo(numero);

  var porExtenso;

  if (paraReal) porExtenso = emReal(numero);else if (paraInteiro) porExtenso = maiorQueMil(numero, eFeminino);else if (paraDecimal) porExtenso = emDecimal(numero, eFeminino);else return NaN;

  return paraNegativo ? `menos ${porExtenso}` : porExtenso;
}

module.exports = extenso;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const eInteiro = __webpack_require__(3);
const separarDecimal = __webpack_require__(1);

function eValido(numero) {
    const partes = separarDecimal(numero);
    const [parteInteira, parteDecimal] = partes;

    if (partes.length === 1) return eInteiro(parteInteira);

    return partes.length === 2 ? eInteiro(parteInteira) && /^\d+$/.test(parteDecimal) : false;
}

module.exports = eValido;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const decimais = __webpack_require__(9);
const separarDecimal = __webpack_require__(1);
const normalizar = __webpack_require__(0);
const maiorQueMil = __webpack_require__(2);

function pluralizar(ePlural) {
  return ePlural ? "s" : "";
}

function obterNome(numero) {
  const tamanho = numero.length;
  const ePlural = numero > 1;

  if (tamanho === 1) return `décimo${pluralizar(ePlural)}`;
  if (tamanho === 2) return `centésimo${pluralizar(ePlural)}`;

  const resto = tamanho % 3;
  const nome = decimais[tamanho - resto];

  if (resto === 0) return nome;
  if (resto === 1) return `décimo${pluralizar(ePlural)} de ${nome}`;
  if (resto === 2) return `centésimo${pluralizar(ePlural)} de ${nome}`;
}

function emDecimal(numero, eFeminino) {
  const partes = separarDecimal(numero);
  const [parteInteira, parteDecimal] = partes;
  const parteDecimalNome = obterNome(parteDecimal);
  const extensoDecimalNormal = maiorQueMil(parteDecimal);
  const extensoInteira = maiorQueMil(parteInteira, eFeminino);
  const extensoDecimal = `${extensoDecimalNormal} ${parteDecimalNome}`;

  if (/^0+$/.test(parteDecimal)) return extensoInteira;
  if (/^0+$/.test(parteInteira)) return extensoDecimal;
  if (normalizar(parteInteira) > 1) return `${extensoInteira} inteiros e ${extensoDecimal}`;
  return `${extensoInteira} inteiro e ${extensoDecimal}`;
}

module.exports = emDecimal;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {"3":"milésimo","6":"milionésimo","9":"bilionésimo","12":"trilionésimo","15":"quatrilionésimo","18":"quintilionésimo","21":"sextilionésimo","24":"septilionésimo","27":"octilionésimo","30":"nonilionésimo","33":"decilionésimo","36":"undecilionésimo","39":"duodecilionésimo"}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const centenas = __webpack_require__(11);
const normalizar = __webpack_require__(0);
const a99 = __webpack_require__(12);

function a999(numero, eFeminino) {
  numero = normalizar(numero);

  if (numero < 99) return a99(numero, eFeminino);
  if (numero === "100") return "cem";
  if (numero % 100 === 0) return centenas[numero / 100 - 1];

  const resto = numero % 100;
  const centena = numero - resto;
  const restoExtenso = a99(resto, eFeminino);
  const centenaExtenso = centenas[centena / 100 - 1];

  return `${centenaExtenso} e ${restoExtenso}`;
}

module.exports = a999;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = ["cento","duzentos","trezentos","quatrocentos","quinhentos","seiscentos","setecentos","oitocentos","novecentos"]

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const dezenas = __webpack_require__(13);
const normalizar = __webpack_require__(0);
const a9 = __webpack_require__(14);

function a99(numero, eFeminino) {
  numero = normalizar(numero);

  if (numero < 10) return a9(numero, eFeminino);
  if (numero < 20) return dezenas[numero - 10];

  const unidade = numero % 10;
  const dezena = numero - unidade;
  const dezenaExtenso = dezenas[8 + dezena / 10];
  const unidadeExtenso = a9(unidade, eFeminino);

  if (unidade === 0) return dezenaExtenso;

  return `${dezenaExtenso} e ${unidadeExtenso}`;
}

module.exports = a99;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = ["dez","onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove","vinte","trinta","quarenta","cinquenta","sessenta","setenta","oitenta","noventa"]

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const unidades = __webpack_require__(15);
const normalizar = __webpack_require__(0);

function a9(numero, eFeminino) {
  numero = normalizar(numero);

  const porExtenso = unidades[numero];

  return eFeminino ? porExtenso.replace(/^um$/, "uma").replace(/^dois$/, "duas") : porExtenso;
}

module.exports = a9;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = ["zero","um","dois","três","quatro","cinco","seis","sete","oito","nove"]

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function separarClasses(numero) {

  // Porderia ser usado `Number.toLocaleString`,
  // mas para isso o número deveria ser tratado como
  // `Number` e não retornaria um valor desejado quando
  // um número com mais de 16 algarismos fosse passado.
  return numero.split("").reverse().join("").split(/(\d{3})/).filter(valor => valor).map(valor => valor.split("").reverse().join("")).reverse();
}

module.exports = separarClasses;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = ["mil","milhões","bilhões","trilhões","quatrilhões","quintilhões","sextilhões","septilhões","octilhões","nonilhões","decilhões","undecilhões","duodecilhões"]

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const eDecimal = __webpack_require__(4);
const separarDecimal = __webpack_require__(1);
const normalizar = __webpack_require__(0);
const maiorQueMil = __webpack_require__(2);

function emReal(numero) {
  if (eDecimal(numero)) {
    const partes = separarDecimal(numero);
    const [parteInteira, parteDecimal] = partes;

    let extensoReal = maiorQueMil(parteInteira);
    let extensoCentavos = maiorQueMil(parteDecimal);

    extensoReal = normalizar(parteInteira) < 2 ? extensoReal + " real" : extensoReal + " reais";

    extensoCentavos = normalizar(parteDecimal) < 2 ? extensoCentavos + " centavo" : extensoCentavos + " centavos";

    if (parteDecimal > 99) return undefined;
    if (/^0+$/.test(parteInteira) && /^0+$/.test(parteDecimal)) return "zero real";
    if (/^0+$/.test(parteInteira)) return extensoCentavos;
    if (/^0+$/.test(parteDecimal)) return extensoReal;

    return `${extensoReal} e ${extensoCentavos}`;
  }

  if (/^0*$/.test(numero)) return "zero real";

  return normalizar(numero) < 2 ? maiorQueMil(numero) + " real" : maiorQueMil(numero) + " reais";
}

module.exports = emReal;

/***/ })
/******/ ]);
});