import psList from "ps-list";
import { windowManager } from "node-window-manager";
import dotenv from 'dotenv';
import { Client } from "discord-rpc";

const client = new Client({transport:"ipc"})
const start = new Date();
dotenv.config();

async function update() {
    const apps = await psList();
    let app;
    for(const process of apps){
        if(process.name === "sai.exe"){
            app = process;
            break;
        }
    }

    let window;
    if(app){
        for (let i = 0; i < windowManager.getWindows().length; i++) {
            if(!windowManager.getWindows()[i].processId == app.pid)
            {
                break;
            }
            if(windowManager.getWindows()[i].getTitle().split(" - ")[0]=="SAI"){
                if(windowManager.getWindows()[i].getTitle()!="SAI"){
                    let saiRemove = windowManager.getWindows()[i].getTitle().replace("SAI - ", "");
                    window = "Editing: " + saiRemove.split('\\').pop();
                    console.log(window);
                    break;
                }
                else{
                    window = "Starting a New Canvas"
                }
                
                break;
            }
        }
    }

    client.setActivity({
        state: window,
        startTimestamp: start,
        largeImageKey: 'sailogo', // Use the image key you uploaded
        largeImageText: 'Paint Tool Sai',
    }, app ? app.pid : null)
}
client.on("ready",()=>{
    console.log("Online");
    update();
    setInterval(update,5000);
});

console.log("Connecting...");
client.login({clientId:process.env.DISCORD_APP_ID})
