import socketio from 'socket.io-client';

const socket = socketio(process.env.REACT_APP_API_URL, {
    autoConnect: false,
});

function subscribeToNewPed(subscribeFunction){
    socket.on('novo-ped', subscribeFunction);
}

function subscribeToStatusPed(subscribeFunction){
    socket.on('status-ped', subscribeFunction);
}

function subscribeToNewAgenda(subscribeFunction){
    socket.on('novo-agenda', subscribeFunction);
}

function connect(idestab, idusuario) {
    socket.io.opts.query = { idestab, idusuario };
    socket.connect();
};
 
function disconnect(){
    if (socket.connected) {
        socket.disconnect();
    };
};

export {
    connect,
    disconnect,
    subscribeToNewPed,
    subscribeToStatusPed,
    subscribeToNewAgenda
};