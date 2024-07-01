
const subscribeButton = document.getElementById('subscribe');
const chatBlock = document.getElementById('chat');
const textInput = document.getElementById('message');
const send =  document.getElementById('send');
const messages = document.getElementById('messages');
subscribeButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    askNotificationPermission();
});


function renderMessage(text) {
    const message = document.createElement('div');
    message.textContent = text?.body;
    messages.appendChild(message);
}

function askNotificationPermission() {
    if (("Notification" in window)) {
        Notification.requestPermission().then((permission) => {
            if(permission === "granted") {
                subscribeButton.style.display = 'none';
                chatBlock.style.display = 'block';
                subscribeOnNotify();
            }
        });
    }
}

function subscribeOnNotify() {
    if (("Worker" in window)) {
        const notifyWorker = new Worker("/javascripts/ws-notify-worker.js");
        notifyWorker.addEventListener('message', function (e) {
            renderMessage(e.data);
        })
        notifyWorker.postMessage({command: 'connect_notifications'});
        send.addEventListener('click', function () {
           notifyWorker.postMessage({command: 'send_message', body: textInput.value})
        });
    }
}

