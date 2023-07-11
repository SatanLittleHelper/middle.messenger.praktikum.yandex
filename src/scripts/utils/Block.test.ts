import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake()
};

const { default: Block } = proxyquire('./Block.ts', {
    './eventBus.ts': {
        default: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        }
    }
});
beforeEach(() => {

});
describe('Block', () => {
    class ComponentMock extends Block {
    };

    let block: ComponentMock;

    beforeEach(() => {
        //@ts-ignore
        block = new ComponentMock({});

    });

    it('Должен диспатчить init событие после инициализации', () => {
        expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.INIT)).to.be.true;
    });
    it('Should be dispatch CDM event', () => {
        block.dispatchComponentDidMount();
        expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.FLOW_CDM)).to.be.true;
    });
    it('Should be dispatch CDU event, after setProps', () => {
        block.setProps({ test: 'test' });
        expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.FLOW_CDU)).to.be.true;
    });
    it('Should be dispatch RENDER event, after setProps', () => {
        block.setProps({ test: 'test' });
        expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.FLOW_RENDER)).to.be.true;
    });

});
