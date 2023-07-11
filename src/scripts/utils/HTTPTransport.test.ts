import {expect} from 'chai';
import HTTPTransport from './HTTPTransport';
import sinon from 'sinon';


describe('request', () => {

    const request = new HTTPTransport('');
    let requests: Array<any>;


    beforeEach(function () {

        // @ts-ignore
        global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        requests = [];

        // @ts-ignore
        global.XMLHttpRequest.onCreate = function (req) {
            requests.push(req);
        };
    });

    afterEach(function () {
        sinon.restore()

    });

    it('send post to url /login', () => {
        const req = request;
        req.post('/login', {});
        expect(requests[0].url).eq('/login');
        expect(requests[0].method).eq('POST');
    });
    it('convert data to query params for get method ', () => {
        const req = request;
        req.get('/', {
            data: {
                a: 1
            }
        });
        expect(requests[0].url).eq('/?a=1');
    });
});
