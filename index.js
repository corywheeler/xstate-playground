const xstate = require('xstate');

const promiseMachine = new xstate.Machine({
    id: 'promise',
    initial: 'pending',
    states: {
        pending: {
            on: {
                RESOLVE: 'resolved',
                REJECT: 'rejected',
            }
        },
        resolved: {
            type: 'final'
        },
        rejected: {
            type: 'final'
        }
    }
});

const promiseService = xstate.interpret(promiseMachine).onTransition(state => {
    console.log(state.value);
});

promiseService.start();

promiseService.send('REJECT');
