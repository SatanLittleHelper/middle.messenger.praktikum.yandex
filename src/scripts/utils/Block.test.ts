// import sinon from 'sinon';
// import proxyquire from 'proxyquire';
// import {expect} from 'chai';
// import Events from '../Events';
//
// const eventBusMock = {
//     on: sinon.fake(),
//     emit: sinon.fake()
// };
//
// const {default: Block} = proxyquire('./Block.ts', {
//     '../EventBus.ts': {
//         default: class {
//             emit = eventBusMock.emit;
//             on = eventBusMock.on;
//         }
//     }
// });
//
// describe('Block', () => {
//     class ComponentMock extends Block {
//         constructor(props) {
//             super('div', props);
//         }
//     }
//
//     it('Должен диспатчить init событие после инициализации', () => {
//         new ComponentMock({});
//
//         expect(eventBusMock.emit.calledWith(Events.INIT)).to.be.true;
//     });
//
//     it('Должен диспатчить CDM событие при вызове dispatchComponentDidMount', () => {
//         const component = new ComponentMock({});
//         component.dispatchComponentDidMount();
//
//         expect(eventBusMock.emit.calledWith(Events.CDM)).to.be.true;
//     });
//
//     it('Должен диспатчить CDU событие при вызове setProps', () => {
//         const component = new ComponentMock({});
//         component.setProps({a:'a'});
//
//         expect(eventBusMock.emit.calledWith(Events.CDU)).to.be.true;
//     });
//
// });
