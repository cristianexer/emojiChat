const nicknameModal = document.getElementById('nicknameModal');
const chatInput = document.getElementById('messageForm');
const messageBox = document.getElementById('messageBox');
const chatInner = document.getElementById('chatInner');
const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const port = 8080;

const emotionMap = {
    "anger": "😡",
    "disgust": "🤮",
    "fear": "😰",
    "joy": "😁",
    "sadness": "😞",
    "error": "🐞",
    "warning": "⚠️"
};
var nickname = "none";
var socket;
let enters = 0;
let sendButton = 0;

$('#nicknameForm').submit(e => {
    e.preventDefault();
    nickname = e.target.nickname.value;

    $(nicknameModal).remove();

    socket.send(JSON.stringify({
        event: 'message',
        data: {
            nickname: 'Emojy',
            message: `Hi ${nickname} ! and welcome to emojy chat.`
        },
    }));

    return false;
});

$('#nicknameFormButton').on('click', e => $('#nicknameForm').submit());


const cleanEmotion = () => {
    $('#emotions .emoji').text('');
    $('#emotions .emotion').text('');
    $('#emotions').removeClass('show');
};

const showEmotion = (emotion) => {
    $('#emotions .emoji').text(emotionMap[emotion]);
    $('#emotions .emotion').text(emotion);
    $('#emotions').addClass('show');
};

const showEmoji = (type, error) => {
    $('#emotions .emoji').text(emotionMap[type]);
    $('#emotions .emotion').text(error);
    $('#emotions').addClass('show');
};

$('#emotions').click(e => {
    $(this).removeClass('show');
})




socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}`);


socket.onopen = function () {


    socket.onmessage = function (data) {
        let response = JSON.parse(data.data);
        if (response.nickname != nickname) {
            let div = document.createElement('div');
            div.classList.add('col-12');
            div.classList.add('my-2');
            div.innerHTML = `<span class="badge badge-secondary receivedMessage"><span class="nickname my-1 text-left">${response.nickname}</span><span class="message text-left my-1 py-1">${response.message}</span></span>`;
            chatInner.appendChild(div);
        }

    }



    $(chatInput).submit((e) => {
        e.preventDefault();
        if (e.target.message.value !== '') {
            let div = document.createElement('div');
            div.classList.add('col-12');
            div.classList.add('text-right');
            div.classList.add('my-2');
            div.innerHTML = `<span class="badge badge-primary sentMessage"><span class="nickname my-1 text-left">${nickname}</span><span class="message text-left my-1 py-1">${e.target.message.value}</span></span>`;
            chatInner.appendChild(div);
            socket.send(JSON.stringify({
                event: 'message',
                data: {
                    nickname: nickname,
                    message: e.target.message.value
                },
            }));
            e.target.message.value = '';
    
        }
        return false;
    });
    
    
    
    $(messageBox).on('keydown', (e) => {
        cleanEmotion();
        if (e.which === 13) {
            if (enters === 0) {
                enters++;
                callIBM();
                return false;
            }
            if (enters === 1) {
                e.preventDefault()
                $(chatInput).submit();
                e.target.value = '';
                enters = 0;
                return false;
            }
        }
        cleanEmotion();
        enters = 0;
    });
    
    
    
    $('#messageBoxSend').on('click', e => {
        cleanEmotion();
    
        if (sendButton === 0) {
            sendButton++;
            callIBM();
            return false;
        }
        if (sendButton === 1) {
            e.preventDefault()
            $(chatInput).submit();
            messageBox.value = '';
            sendButton = 0;
            return false;
        }
    
        cleanEmotion();
        sendButton = 0;
    });
    
    const notEnoughText = (text) => {
        if (text.charAt(text.length - 1) === ' ')
            text.slice(0, text.length - 1);
    
        return (text.split(' ').length <= 1);
    };
    
    
    
    function callIBM() {
        if (messageBox.value == '' && messageBox.value == ' ') {
            showEmoji('warning', "No message");
        } else if (notEnoughText(messageBox.value)) {
            showEmoji('warning', "More text");
        } else {
            $.ajax({
                url: `${window.location.href}message`,
                type: 'POST',
                data: {
                    item: messageBox.value,
                    nickname: nickname
                },
                success: function (result) {
                    let emotion = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b);
                    showEmotion(emotion);
    
                },
                error: function (error) {
                    if (error.status == 500)
                        showEmoji('error', "More text");
                    else
                        showEmoji('error', error.statusText);
                }
            });
        }
    }

};

