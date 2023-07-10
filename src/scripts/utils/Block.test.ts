import sinon from 'sinon';
import proxyquire from 'proxyquire';
import {expect} from 'chai';


const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake()
};

const {default: Block} = proxyquire('./Block.ts', {
    './eventBus.ts': {
        default: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        }
    }
});

describe('Block', () => {
    class ComponentMock extends Block {
        constructor(props: any) {
            super('div', props);
        }
    }

    it('Dispatch init after init block', () => {
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith('init')).to.be.true;
    });

    it('Dispatch CDM after block dispatchComponentDidMount', () => {
        const component = new ComponentMock({});
        component.dispatchComponentDidMount();

        expect(eventBusMock.emit.calledWith('CDM')).to.be.true;
    });

    it('Dispatch CDU after set new props in block', () => {
        const component = new ComponentMock({});
        component.setProps({a: 'a'});

        expect(eventBusMock.emit.calledWith('CDU')).to.be.true;
    });

});
