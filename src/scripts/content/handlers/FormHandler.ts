

class  FormHandler {
    private form: HTMLFormElement;

    constructor() {
        this.init();
    }

    private init () {

        this.form  = document.querySelector('form');
        console.log(this.form);
        this.form.addEventListener('submit', ((event) => this._collectInputsData(event)));
    }

    private _collectInputsData(event) {

        event.preventDefault();

        const inputs = { ...this.form.querySelectorAll('input') };
        const data: Array<any> = Object.values(inputs).filter(item => item.value);
        const result = Object.fromEntries(data.map((item) => [item.name, item.value]));
        console.log(result);

     }

}

export default FormHandler;

