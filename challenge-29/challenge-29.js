(function(win, doc) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app() {
    var $carrosTable = new DOM('table');
    var $marca_modelo = new DOM('[data-js="marca_modelo"]');
    var $ano = new DOM('[data-js="ano"]');
    var $placa = new DOM('[data-js="placa"]');
    var $cor = new DOM('[data-js="cor"]');
    var $img_url = new DOM('[data-js="img_url"]');
    var $cadastrarButton = new DOM('[type="submit"]');
    var ajax = new XMLHttpRequest();
    
    ajax.open('GET', 'company.json');
    ajax.send();
    
    function fillCompany(companyJson) {
      /* global DOM */
      var $name = new DOM('[data-js="empresa_nome"]');
      var $phone = new DOM('[data-js="empresa_telefone"]');
      
      $name.element[0].textContent = companyJson.name;
      $phone.element[0].textContent = companyJson.phone;
    }
    
    function handleReadyStateChange() {
      if (ajax.status === 200 && ajax.readyState === 4) {
        var json = JSON.parse(ajax.responseText);
        fillCompany(json);
      }
    }
    
    function handleClickSubmitButton(event) {
      event.preventDefault();
      var tr = doc.createElement('tr');
      
      var td_marca_modelo = doc.createElement('td');
      var marca_modelo = doc.createTextNode($marca_modelo.get()[0].value);
      td_marca_modelo.appendChild(marca_modelo);
      var td_ano = doc.createElement('td');
      var ano = doc.createTextNode($ano.get()[0].value);
      td_ano.appendChild(ano);
      var td_placa = doc.createElement('td');
      var placa = doc.createTextNode($placa.get()[0].value);
      td_placa.appendChild(placa);
      var td_cor = doc.createElement('td');
      var cor = doc.createTextNode($cor.get()[0].value);
      td_cor.appendChild(cor);
      var td_img_url = doc.createElement('td');
      var img_url = doc.createTextNode($img_url.get()[0].value);
      td_img_url.appendChild(img_url);
      
      tr.appendChild(td_marca_modelo);
      tr.appendChild(td_ano);
      tr.appendChild(td_placa);
      tr.appendChild(td_cor);
      tr.appendChild(td_img_url);
      
      $carrosTable.get()[0].appendChild(tr);
    }
  
    ajax.addEventListener('readystatechange', handleReadyStateChange, false);
    $cadastrarButton.on('click', handleClickSubmitButton);
  }

  win.app = app;
  app();

})(window, document);
