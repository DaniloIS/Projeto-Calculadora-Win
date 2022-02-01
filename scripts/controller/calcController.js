class CalcController {

    constructor() {

        this._operation = [];
        this.initButtonEvent();
        
    }

    clearEntry() {

    }

    clearAll() {

    }

    addOperation(value) {
        this._operation.push(value);
        console.log(this._operation)
    }

    execBtn(value) {

        switch(value) {

            case 'CE':
                this.clearEntry();
            break;
            case 'C':
                this.clearAll();
            break;
            case '←':
                this.addOperation(value);
            break;
            case '+':
                this.addOperation(value);
            break;
            case '-':
                this.addOperation(value);
            break;
            case 'X':
                this.addOperation(value);
            break;
            case '%':
                this.addOperation(value);
            break;
            case '√':
                this.addOperation(value);
            break;
            case 'x²':
                this.addOperation(value);
            break;
            case '¹/x':
                this.addOperation(value);
            break;
            case '÷':
                this.addOperation(value);
            break;
            case '±':
                this.addOperation(value);
            break;
            case ',':
                
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
                this.addOperation(value);
            break;
        }
    }

    initButtonEvent() {

        let buttons = document.querySelectorAll('.container [type=button]');
    
        buttons.forEach(btn => {
            btn.addEventListener('click', e => {
                this.execBtn(btn.innerHTML);
            });
        });
    
    }



}