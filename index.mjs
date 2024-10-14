import psList from "ps-list";
import { windowManager } from "node-window-manager";
import dotenv from 'dotenv';

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
                window = windowManager.getWindows()[i].getTitle().split('\\').pop();
                console.log(window);
                break;
            }
        }
    }
}
update();