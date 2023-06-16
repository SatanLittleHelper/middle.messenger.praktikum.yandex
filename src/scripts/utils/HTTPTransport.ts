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
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>


export class HTTPTransport {
    private readonly url: string;

    constructor(url: string ) {
         this.url  = url;
    }

    // fetchWithRetry: HTTPMethod = (url, options = {}) => {
    //     const {tries = 1} = options;
    //
    //     function onError(err){
    //         const triesLeft = tries - 1;
    //
    //         if (!triesLeft){
    //             throw err;
    //         }
    //
    //         return this.fetchWithRetry(url, {...options, tries: triesLeft});
    //     }
    //
    //     return fetch(url, options);
    // }


    get: HTTPMethod = (url= this.url, options  = {}) => {
        const { data } = options;
        if (data) {
            url = url.concat(this.queryStringify(data));
        }

        return this.request(url, {...options, method: METHOD.GET});
    };
    post: HTTPMethod = (url, options = {})  => {
        return this.request(url, {...options, method: METHOD.POST})
    };
    put: HTTPMethod = (url = this.url, options = {}) => {

        return this.request(url, {...options, method: METHOD.PUT});
    };
    delete: HTTPMethod = (url = this.url, options = {}) => {

        return this.request(url, {...options, method: METHOD.DELETE});
    };
    patch: HTTPMethod = (url= this.url, options = {}) => {

        return this.request(url, {...options, method: METHOD.PATCH});
    };

   private request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
        const {method, data, headers} = options;
        const reqUrl = this.url + url;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, reqUrl);

            if (headers) {
                Object.entries(headers).forEach((value) => {
                    xhr.setRequestHeader(value[0], value[1]);
                })
            }
            xhr.withCredentials = true;

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
        }).then((req) => {
            console.log(req);
            return  JSON.parse(req.response);
        });;
    };
    private queryStringify(data: Record<string, any>) {
        let query = '?';

        for (let key in data) {
            query += `${key}=${data[key]}&`;
        }

        return query.slice(0, -1);
    }
}
