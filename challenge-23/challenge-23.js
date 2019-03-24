(function(win, doc) {
    'use strict';
    
    /*
    Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
    As regras são:
    
    - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
    diretamente;
    - O input deve iniciar com valor zero;
    - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
    - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
    multiplicação(x) e divisão(÷);
    - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
    que irá limpar o input, deixando-o com valor 0;
    
    - A cada número pressionado, o input deve atualizar concatenando cada valor
    digitado, como em uma calculadora real;
    - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
    operação no input. Se o último caractere no input já for um símbolo de alguma
    operação, esse caractere deve ser substituído pelo último pressionado.
    Exemplo:
    - Se o input tem os valores: "1+2+", e for pressionado o botão de
    multiplicação (x), então no input deve aparecer "1+2x".
    - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
    input;
    - Ao pressionar o botão "CE", o input deve ficar zerado.
    */
    
    var $buttonsNumber = doc.querySelectorAll('button[data-js="bt-num"]');
    var $buttonsOp = doc.querySelectorAll('button[data-js="bt-op"]');
    var $buttonCe = doc.querySelector('button[data-js="bt-ce"]');
    var $buttonResult = doc.querySelector('button[data-js="bt-result"]');
    var inputVisor = doc.querySelector('[data-js="visor"]');
    
    var operations = {
        '+': function(op1, op2) { return op1 + op2; },
        '-': function(op1, op2) { return op1 - op2; },
        '*': function(op1, op2) { return op1 * op2; },
        '/': function(op1, op2) { return op1 / op2; }
    };
    
    function incrementVisor() {
        inputVisor.value += this.value;
    }
    
    function clearVisor() {
        inputVisor.value = 0;
    }
    
    function calculateResult() {
        inputVisor.value = adjustVisor(inputVisor.value);
        var visorNumbers = inputVisor.value.match(/\d+/g);
        var visorOps = inputVisor.value.match(/\D+/g);
        inputVisor.value = visorNumbers.reduce(function(accumulator, currentValue) {
            return operations[visorOps.shift()](+accumulator, +currentValue);
        });
    }
    
    function isLastCharOp(str) {
        var lastChar = str.substr(-1);
        return /\D/.test(lastChar);
    }
    
    function removeLastChar(str) {
        return str.slice(0, -1);
    }
    
    function adjustVisor(str) {
        if (isLastCharOp(str)) {
            return removeLastChar(str);
        }
        
        return str;
    }
    
    $buttonsNumber.forEach(function(item) {
        item.addEventListener('click', incrementVisor, false);
    });
    
    
    $buttonsOp.forEach(function(item) {
        item.addEventListener('click', function() {
            console.log('clicou no op', this.value);
            inputVisor.value = adjustVisor(inputVisor.value);
            incrementVisor.call(this);
        }, false);
    });
    
    $buttonCe.addEventListener('click', clearVisor, false);
    
    $buttonResult.addEventListener('click', calculateResult, false);

})(window, document);
