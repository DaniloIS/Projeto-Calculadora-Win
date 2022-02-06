class CalcController {

    constructor() {

        this._operation = [];
        this._displayCalcTopEl = document.querySelector("#displayTop");
        this._displayCalcEl = document.querySelector("#display");
        this.initButtonEvent();
        
    }

    get displayCalcTop() {

        return this._displayCalcTopEl.innerHTML;

    }

    set displayCalcTop(value) {

        
        this._displayCalcTopEl.innerHTML = value;

    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        if(value.toString().length > 10){
            this.setError();
            return false;
        }

        this._displayCalcEl.innerHTML = value;

    }

    clearEntry() {

    }

    clearAll() {

    }

    setError() {

        this.displayCalc = "Error"

    }

    // Realiza a operação
    getResult() {

        try {
            return eval(this._operation.join(""));
        } catch (e) {
            setTimeout(() => {
                this.setError();
            }, 1);
        }

    }

    calc() {

        let last = '';

        this._lastOperation = this.getLastItem();

        if(this._operation.length < 3) {
            // Realiza a ultma operação
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperation, this._lastNumber];

        }

        if(this._operation.length > 3) {

            last = this._operation.pop();

            this._lastNumber = this.getResult();

        } else if(this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }

        let result = this.getResult();

        if(last == '%') {

            result /= 100;

            this._operation = [result];

        } else {

            this._operation = [result];

            if(last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();

    }

    // Pega o ultimo item
    getLastItem(isOperator = true) {

        let lastItem;

        for(let i = this._operation.length-1; i >= 0; i--) {

            // Pega o ultimo operador
            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }

        }

        if(!lastItem) {

            lastItem = (isOperator) ? this._lastOperation : this._lastNumber;

        }

        return lastItem;

    }

    // Add o novo valor digitado no ultimo indice do array
    setLastOperation(value) {

        this._operation[this._operation.length-1] = value;

    }

    // Coloca os ultimos valores digitados no display da calculadora
    setLastNumberToDisplayTop(value) {

        

        this.displayCalcTop = value;

    }

    // Coloca o ultimo numero no display da calculadora
    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }

    // Varifica se é ou não um operador
    isOperator(value) {

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    }

    // Pega o ultimo valor do array operation
    getlastOperation() {

        return this._operation[this._operation.length-1];

    }

    // Add o valor ao array ou realiza a operação se tiver mais de três valores no array
    pushOperation(value) {

        this._operation.push(value);

        console.log(this._operation.length);
        if(this._operation.length >= 2) {
            console.log(this._operation.join(""));
            this.setLastNumberToDisplayTop(this._operation.join(""));
        }

        if(this._operation.length > 3) {

            this.calc();

        }

    }

    // Add novo valor ao array

    addOperation(value) {

        if(isNaN(this.getlastOperation())) {
            //O ultimo valor não é um número ou está vazio

            if(this.isOperator(value)) {
                //O ultimo valor é um operador entra trocar operador

                this.setLastOperation(value);

            } else {
                //O ultimo valor está vazio então add ao array
                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        } else {
            //O ultimo valor é um número
        
            if(this.isOperator(value)) {
                //Novo valor é um operador 
                this.pushOperation(value);

            } else {
                //Novo valor é um número concatena com o ultimo número
                let newValue = this.getlastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();

            }
            

        }

    }

    // Adiciona o ponto

    addDot() {

        let lastOperation = this.getlastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOperation) || !lastOperation) {

            this.pushOperation('0.');

        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }

    // Identificando botão clicado

    execBtn(value) {

        switch(value) {

            case 'CE':
                this.clearEntry();
            break;
            case 'C':
                this.clearAll();
            break;
            case ',':
                this.addDot();
            break;

            case '=':
                this.calc();
            break;

            
            case '√':
            break;
            case 'x²':
            break;
            case '¹/x':
            break;
            case '÷':
                this.setLastNumberToDisplayTop();
                this.addOperation('/');
            break;
            case '±':
            break;
            case '←':
            break;
            case 'X':
                this.setLastNumberToDisplayTop();
                this.addOperation('*');
            break;
            case '+':
            case '-':
            case '%':
                this.setLastNumberToDisplayTop();
                this.addOperation(value);
            break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
            break;
        }
    }

    // Inicia o evento inicial do botão

    initButtonEvent() {

        let buttons = document.querySelectorAll('.container [type=button]');
    
        buttons.forEach(btn => {
            btn.addEventListener('click', e => {
                this.execBtn(btn.innerHTML);
            });
        });
    
    }



}