
export function collectInputsData(event) {

        event.preventDefault();
        const inputs = { ...event.target.querySelectorAll('input') };
        const data: Array<any> = Object.values(inputs).filter(item => item.value);
        const result = Object.fromEntries(data.map((item) => [item.name, item.value]));
        console.log(result);

     }




