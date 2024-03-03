import { anyIelements, aElements, anyElement } from "./elements.js"

export async function mainMenu() {

    let  ws = new WebSocket("wss:api.chat.tesseractmaks.tech/api/v1/chat/ws/")
    


    const chatBlock = await chatForm()

    // Chat section
    const chatFormElem = chatBlock.querySelector('#cht-form');

    ws.onmessage = function(evt) {
        let recived_msg = evt.data
        let chatForm = document.querySelector("#cht-form")

        const rowSnd = document.createElement("div")
        const rowRsv = document.createElement("div")

        const dots = document.querySelector('#dots')

        

        let cleanMsg = JSON.parse(recived_msg)
        rowRsv.textContent = cleanMsg["username"] + ": " + cleanMsg["message"]

        console.log(cleanMsg["is_me"],"++")
        if (cleanMsg["is_me"]) {
            console.log(cleanMsg["is_me"],"--")
            rowRsv.classList.add("chat-msg-send")
            dots.append(rowRsv)
           
        }else{
            rowRsv.classList.add("chat-msg-rsv")
            dots.append(rowRsv)
            
        };
        // rowSnd.classList.add("chat-msg-send")
        // rowSnd.textContent = chatForm.msg.value
        // dots.append(rowSnd)
        // chatForm.prepend(dots)
        chatForm.msg.value = ""
  }

     chatFormElem.addEventListener("submit", async function(e) {
        await wSocket(ws)
        e.preventDefault()

    })
    return chatBlock
};


async function chatForm() {
    
    let mainDiv = anyElement("div")
    mainDiv.setAttribute("id", "chat-bl")

    let formDiv = anyElement("div", ["chat-popup"])
    formDiv.setAttribute("id", "myForm")
    formDiv.innerHTML = '\
    <form action=""class="form-container" id="cht-form">\
        <div id="dots" class="area-ch"></div>\
        <label for="msg"></label>\
        <textarea placeholder="Введите сообщение.." name="msg" value="" required></textarea>\
        <button type="submit" class="btn">Отправить</button>\
    </form>'
    // let chatForm = formDiv.querySelector("#cht-form")
    // chatForm.msg.value = recived_msg
    

    mainDiv.append(formDiv)
  

    return mainDiv
}

export  function btnChat() {
    let mainDiv = anyElement("div", ["btn-chat-popup"])
    mainDiv.setAttribute("id", "btn-chat")
    mainDiv.innerHTML = '<button class="open-button">ЧАТ</button>'
}


function openForm() {
	let myForm = document.querySelector("#myForm").setAttribute("style", "display:block")
	let btnChat = document.querySelector("#btn-chat").setAttribute("style", "display:none")
	// console.log(chatBlock)
  }
  
function closeForm() {
	document.querySelector("#myForm").style.display = "none"
	document.querySelector("#btn-chat").style.display = "block"
  }

  function buttonElement(content, classes = [], idElem) {
    const button = document.createElement("button")

    if (classes.length) {
        button.classList.add(...classes)
    }

    if (content) {
        button.textContent = content
    }

    if (idElem) {
        button.id = idElem
    }

    return button
}


export async function wSocket(ws) {
    let chatForm = document.querySelector("#cht-form")
    // console.log(chatForm.msg.value,"=-=")
    let username = "user-1";
    
    console.log(username)

    // ws.send(chatForm.textarea.value)
    ws.send(JSON.stringify({"message": chatForm.msg.value, "username": username}))

   
    ws.onclose = async function() {
        console.log("Close  -Track   Websockett!!!!!!!!11")
    }
}

