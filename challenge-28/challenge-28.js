(function(win, doc) {
  'use strict';

  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  
  http://apps.widenet.com.br/busca-cep/api-de-consulta
  https://github.com/da2k/curso-javascript-ninja/issues/2048
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
  
  // Challenge 28
  
  var $submitButton = new DOM('input[type="submit"]');
  var $cepInput = new DOM('input[name="cep"]');
  var $statusSpan = new DOM('span[data-js="status"]');
  var $cepSpan = new DOM('span[data-js="cep"]');
  var $logradouroSpan = new DOM('span[data-js="logradouro"]');
  var $bairroSpan = new DOM('span[data-js="bairro"]');
  var $estadoSpan = new DOM('span[data-js="estado"]');
  var $cidadeSpan = new DOM('span[data-js="cidade"]');
  var ajax = new XMLHttpRequest();
  var ajaxStates = {
    //0: function() {}, // not send
    //1: function() {}, // open
    //2: function() {}, // headers received
    3: function(cep) { return 'Buscando informações para o CEP [CEP]...'.replace('[CEP]', cep); }, // loading
    4: function(cep, cepStatus) {
      if (cepStatus) {
        return 'Endereço referente ao CEP [CEP]:'.replace('[CEP]', cep);
      }
      return "Não encontramos o endereço para o CEP [CEP].".replace('[CEP]', cep);
    }// finished
  };
  
  function cleanCpf(cpf) {
    return cpf.replace(/\D/g, '');
  }
  
  function fillForm(cepJson) {
    $cepSpan.element[0].firstChild.nodeValue = cepJson.code;
    $logradouroSpan.element[0].firstChild.nodeValue = cepJson.address;
    $bairroSpan.element[0].firstChild.nodeValue = cepJson.district;
    $estadoSpan.element[0].firstChild.nodeValue = cepJson.state;
    $cidadeSpan.element[0].firstChild.nodeValue = cepJson.city;
  }
  
  function updateStatus(ajaxReadyState, cepStatus, cep) {
    $statusSpan.element[0].firstChild.nodeValue = ajaxStates[ajaxReadyState](cep, cepStatus);
  }
  
  function isStatusOk(status) {
    return (status === 200);
  }
  
  ajax.addEventListener('readystatechange', function () {
    if (isStatusOk(ajax.status) && ajaxStates[ajax.readyState]) {
      var cepJson = JSON.parse(ajax.responseText);
      updateStatus(ajax.readyState, cepJson.status, cleanCpf($cepInput.get()[0].value));
      if (ajax.readyState) {
        fillForm(cepJson);
      }
    }
  })
  
  $submitButton.on('click', function(event) {
    event.preventDefault();
    var cep = cleanCpf($cepInput.get()[0].value);
    ajax.open('GET', '//apps.widenet.com.br/busca-cep/api/cep.json?code=' + cep);
    ajax.send();
  });
  
})(window, document);
