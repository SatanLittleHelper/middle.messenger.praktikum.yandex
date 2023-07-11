import sinon from "sinon";
import PathRouter, {TRouteConstructor} from "./Router";
import {expect} from "chai";
import Block from '../Block'

describe('Router', () => {
    let BlockMock: Block;
    //@ts-ignore
    let getContentFake = sinon.stub();
    let destroyFake = sinon.stub()
    let router: PathRouter;

    beforeEach(() => {
        getContentFake.returns(document.createElement('div'));
        destroyFake.returns("Destroyed")
        BlockMock = class {
            //@ts-ignore
            getContent = getContentFake;
            destroy = destroyFake;
        } as unknown as Block
        router = new PathRouter('#app');
    })

    afterEach(() => {
        sinon.restore();
    })

    it('метод use должен вернуть инстанс роутера', () => {
        const params: TRouteConstructor = {
            //@ts-ignore
            block: BlockMock,
            exact: true,
            needAuth: true,
            onUnautorized: () => true,
            pathname: '/',
            props: {},
            redirectPath: '/'
        }
        const result = router.use(params);

        expect(result).to.eq(router);
    });

    it('Должен отрисовать страницу после запуска роутера', () => {
        const params: TRouteConstructor = {
            //@ts-ignore
            block: BlockMock,
            exact: true,
            needAuth: true,
            onUnautorized: () => true,
            pathname: '/',
            props: {},
            redirectPath: '/'
        }
        router.use(params).start();

        expect(getContentFake.callCount).to.eql(1);
    });

    describe('back()', () => {
        it('Должен отрисовать предыдушию страницу', () => {
            const params: TRouteConstructor = {
                //@ts-ignore
                block: BlockMock,
                exact: true,
                needAuth: true,
                onUnautorized: () => true,
                pathname: '/',
                props: {},
                redirectPath: '/'
            }
            router.use(params).start();

            router.back();

            expect(getContentFake.callCount).to.eql(2);
        })
    });
    describe('404', () => {
        let BlockMockError: Block;
        BlockMockError = class {
            getContent = getContentFake;
        } as unknown as Block

        it('should be redirect to /404 at path not in route', () => {
            const params: TRouteConstructor = {
                //@ts-ignore
                block: BlockMock,
                exact: true,
                needAuth: false,
                onUnautorized: () => false,
                pathname: '/',
                props: {},
                redirectPath: ''
            }
            const errorPageParams: TRouteConstructor = {
                //@ts-ignore
                block: BlockMockError,
                exact: true,
                needAuth: false,
                onUnautorized: () => false,
                pathname: '/404',
                props: {},
                redirectPath: ''
            }
            router.use(params).use(errorPageParams).start();
            router.go('/test')
            // @ts-ignore
            const result = router._currentRoute._pathname

            expect(result).to.be.eq('/404');

        })
    })
})
