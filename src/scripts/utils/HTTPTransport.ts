enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method: METHOD;
    data?: any;
    headers?: Record<string, any>
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {

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
            url = url.concat(this.queryStringify(data));
        }

        return this.request(url, {...options, method: METHOD.GET});
    };
    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {

        return this.request(url, {...options, method: METHOD.POST});
    };
    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {

        return this.request(url, {...options, method: METHOD.PUT});
    };
    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {

        return this.request(url, {...options, method: METHOD.DELETE});
    };
    patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {

        return this.request(url, {...options, method: METHOD.PATCH});
    };

   private request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
        const {method, data, headers} = options;
        console.log(options);
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            if (headers) {
                Object.entries(headers).forEach((value) => {
                    xhr.setRequestHeader(value[0], value[1]);
                })
            }
            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHOD.GET || !data) {
                xhr.send();
            }
            else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
    private queryStringify(data) {
        let query = '?';

        for (let key in data) {
            query += `${key}=${data[key]}&`;
        }

        return query.slice(0, -1);
    }
}
