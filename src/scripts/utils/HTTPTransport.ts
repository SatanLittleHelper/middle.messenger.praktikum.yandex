enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

type Options = {
    method: METHOD;
    data?: any;
};

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = Omit<Options, 'method'>;
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

function queryStringify(data) {
    let query = '?';

    for (let key in data) {
        query += `${key}=${data[key]}&`;
    }

    return query.slice(0, -1);
}

class HTTPTransport {

    fetchWithRetry(url, options = {}) {
        const {tries = 1} = options;

        function onError(err){
            const triesLeft = tries - 1;

            if (!triesLeft){
                throw err;
            }

            return this.fetchWithRetry(url, {...options, tries: triesLeft});
        }

        return fetch(url, options);
    }


    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        const { data } = options;
        if (data) {
            url = url.concat(queryStringify(data));
        }

        return this.request(url, {...options, method: METHOD.GET});
    };

    request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
