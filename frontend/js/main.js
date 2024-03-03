import { mainMenu } from "./chat.js";
import { mainMenu2 } from "./chat2.js";

const app = document.querySelector("#app")

const chat = await mainMenu()
const chat2 = await mainMenu2()

app.innerHTML = ""
app.append(chat, chat2)