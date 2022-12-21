const defaultNickName = ["violetteduncan26", "Aonora", "OldGirlNoraArlani", "Ombreline", "Elias_of_Keliwich", "Fahliilyol", "ChiaraCadrich", "HawthorneAbendsen"];
let me = defaultNickName[Math.floor(Math.random()*defaultNickName.length)];
let socketId;
const server = 'http://127.0.0.1:3000'
const socket = io(server);

(function () {
    document.querySelector("#myName").value = me;
    socket.on('all', (data) => {
        console.log(data);
        addMessageToConversation(data.sender, data.time, data.content);
    })

    socket.on('connect', (msg) => {
        socketId = socket.id;
        socket.emit("register_user", {name:me});
    });

    socket.on('new_user', (user) => {
        let userList = document.querySelector(".member-list");
        let li = document.createElement('li');
        let userSpan = document.createElement('span');
        userSpan.classList.add('status');
        userSpan.classList.add('online');
        userSpan.innerText = user.name;
        li.appendChild(userSpan);
        userList.appendChild(li);
    });
})()

let formulaire = document.forms.message_form;
formulaire.addEventListener("submit", (e) => {
    me = document.querySelector("#myName").value;
    if(typeof me === 'undefined' || me == ""){
        return;
    }
    e.preventDefault();
    if (formulaire.message.value != "") {
        emitMessage({
            sender : me,
            content : formulaire.message.value
        });
        formulaire.message.value = "";
    }
}, false);

function emitMessage(message) {
    socket.emit("message_all", message);
}

function addMessageToConversation(sender, time, content) {
    let conversation = document.querySelector("#current_conv");

    let name = document.createElement('div');
    name.classList.add("name");

    let name_span = document.createElement('span');
    switch (sender) 
    { 
        case me:
        name_span.classList.add("me"); 
        name_span.innerText = "Moi";
        break;

        default:
            name_span.innerText = sender;
            break;
    }

    name.appendChild(name_span);

    let message = document.createElement('div');
    message.classList.add("message");

    let message_content = document.createElement('p');
    message_content.innerText = content;

    let message_time = document.createElement('span');
    message_time.classList.add("msg-time");
    let date = new Date(time);
    message_time.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    message.appendChild(message_content);
    message.appendChild(message_time);
    
    let li = document.createElement('li');
    li.appendChild(name);
    li.appendChild(message);
    conversation.appendChild(li);
}