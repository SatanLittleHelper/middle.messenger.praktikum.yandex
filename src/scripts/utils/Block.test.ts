//
// const proxyquire = require ('proxyquire');
// import {expect} from 'chai';
// const sinon = require('sinon');
//
//
// const eventBusMock = {
//     on: sinon.fake(),
//     emit: sinon.fake()
// };
// //@ts-ignore
// const {default: Block} = proxyquire("./Block", {
//     "./eventBus": {
//         default: class {
//             // @ts-ignore
//             emit = eventBusMock.emit;
//             // @ts-ignore
//             on = eventBusMock.on;
//         }
//     }
// });
// describe('Block', () => {
//     class ComponentMock extends Block {
//         // @ts-ignore
//         constructor(props) {
//             super('div', props);
//         }
//     }
//
//     it('Dispatch init after init block', () => {
//         new ComponentMock({});
//
//         expect(eventBusMock.emit.calledWith('init')).to.be.true;
//     });
//
//
//
// });
//
//
// describe('test', () => {
//      it ('first', () => {
//          expect(true).to.be.true
//      })
//  })
