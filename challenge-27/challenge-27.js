(function(win, doc) {
  'use strict';

  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.
  
  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elmento do DOM, podem
  ser métodos estáticos.
  
  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false
  
  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */
  
  // API DOM
  
  function DOM(nodeSelector) {
      this.element = doc.querySelectorAll(nodeSelector);
      
      this.on = function (event, callback) {
        Array.prototype.forEach.call(this.element, function(nodeItem) {
          nodeItem.addEventListener(event, callback, false);
        });
      }
      
      this.off = function (event, callback) {
        Array.prototype.forEach.call(this.element, function(nodeItem) {
          nodeItem.removeEventListener(event, callback);
        });
      }
  }
  
  DOM.prototype.get = function () {
    return this.element;
  }
  
  DOM.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this.element, callback);
  }
  
  DOM.prototype.map = function (callback) {
    return Array.prototype.map.call(this.element, callback);
  }
  
  DOM.prototype.filter = function (callback) {
    return Array.prototype.filter.call(this.element, callback);
  }
  
  DOM.prototype.reduce = function (callback) {
    return Array.prototype.reduce.call(this.element, callback);
  }
  
  DOM.prototype.reduceRight = function (callback) {
    return Array.prototype.reduceRight.call(this.element, callback);
  }
  
  DOM.prototype.every = function (callback) {
    return Array.prototype.every.call(this.element, callback);
  }
  
  DOM.prototype.some = function (callback) {
    return Array.prototype.some.call(this.element, callback);
  }
  
  //Metodos Estaticos
  
  DOM.isArray = function (element) {
    return Array.isArray(element);
  }
  
  DOM.isObject = function (element) {
    return typeof element === 'object';
  }
  
  DOM.isFunction = function (element) {
    return Object.prototype.toString.call(element) === '[object Function]';
  }
  
  DOM.isNumber = function (element) {
    return typeof element === 'number';
  }
  
  DOM.isString = function (element) {
    return typeof element === 'string';
  }
  
  DOM.isBoolean = function (element) {
    return typeof element === 'boolean';
  }
  
  DOM.isNull = function (element) {
    return Object.prototype.toString.call(element) === '[object Null]' || Object.prototype.toString.call(element) === '[object Undefined]';
  }
  
  DOM.prototype.showTest = function () {
    return 'Test!!!!!!!';
  }
  
  
  
  
  
  
  // Testes
  
  var $a = new DOM('[data-js="link"]');
  $a.on('click', function handleClick(e) {
    e.preventDefault();
    console.log('clicou');
    $a.off('click', handleClick);
  });
  
  console.log('Elementos selecionados:', $a.get());
  console.log('$a é filho de body?', $a.get()[0].parentNode === document.body);

  console.log('forEach', $a.forEach(function(item) { console.log(item)}));
  
  $a.element = $a.map(function(item, index) { 
    item.setAttribute('data-js', index+1); 
    return item;
  });
  console.log('map', $a);
  
  var filterValue = $a.filter(function(item) { 
    return Number(item.getAttribute('data-js')) > 1;
  });
  console.log('filter', filterValue);
  
  var reduceValue = $a.reduce(function(accumulator, currentValue) {
      return Number(accumulator.getAttribute('data-js')) + Number(currentValue.getAttribute('data-js'));
    }
  );
  console.log('reduce', reduceValue);
  
  var reduceRightValue = $a.reduceRight(function(accumulator, currentValue) {
      return Number(accumulator.getAttribute('data-js')) + Number(currentValue.getAttribute('data-js'));
  });
  console.log('reduceRight', reduceRightValue);
  
  var everyValue = $a.every(function(item) { 
    return Number(item.getAttribute('data-js')) > 1;
  });
  console.log('every', everyValue);
  
  
  var someValue = $a.some(function(item) { 
    return Number(item.getAttribute('data-js')) > 1;
  });
  console.log('some', someValue);

  // Métodos estáticos

  console.log('isArray', DOM.isArray([1, 2, 3]));
  
  console.log('isObject', DOM.isObject({prop: 1}));
  
  console.log('isFunction', DOM.isFunction(function() {}));
  
  console.log('isNumber', DOM.isNumber('numero'));
  console.log('isNumber', DOM.isNumber(2));
  
  console.log('isString', DOM.isString('numero'));
  console.log('isNumber', DOM.isNumber(1));
  
  console.log('isBoolean', DOM.isBoolean('numero'));
  console.log('isBoolean', DOM.isBoolean(false));
  
  console.log('isNull', DOM.isNull(null));
  console.log('isNull', DOM.isNull('dasdas'));
  console.log('isNull', DOM.isNull(undefinedVar));
  var undefinedVar;
  console.log('isNull', DOM.isNull(undefined));
  
  console.log('showTest', DOM.prototype.showTest());
    
})(window, document);