import sinon from 'sinon';
import proxyquire from 'proxyquire';
import {expect} from 'chai';


const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake()
};

const {default: Block} = proxyquire("./Block.ts", {
    "eventBus.ts": {
        default: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        }
    }
});
describe('Block', () => {
    class ComponentMock extends Block {
        // @ts-ignore
        constructor(props) {
            super('div', props);
        }
    }

    it('Dispatch init after init block', () => {
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith('init')).to.be.true;
    });



});

