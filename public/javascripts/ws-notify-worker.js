let socket;

onmessage = (e) => {
    const command = e.data?.command;
    switch (command) {
        case "connect_notifications": {
            connect();
            break;
        }
        case "send_message": {
            socket.send(JSON.stringify({type: 'message', body: e.data?.body}))
            break;
        }
        default: {
            console.log(command);
        }
    }
};

function connect() {
    if(!socket) {
        socket = new WebSocket("ws://localhost:8080");
        socket.addEventListener("message", (event) => {
            const text = event.data;
            new Notification("New message from chat", { body: text});
            postMessage({type: 'new_message', body: text});
        });
    }
    return socket;
}
