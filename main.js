const { app, BrowserWindow,ipcMain,Tray,Menu,globalShortcut}  = require('electron');
const templateGenerator = require('./template')
const data = require('./data');

let mainWindow=null;
let tray = null


app.on('ready', () => {
 
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

   
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    let icon = `${__dirname}/app/img/icon-tray.png`;
    // courses menu list
    tray = new Tray(icon)

    // Generate template with templateGenerator
    let template = templateGenerator.generateTrayTemplate(mainWindow);
    const trayMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(trayMenu)

    // Build main menu 
    let templateMenu = templateGenerator.generateMainMenuTemplate(app);
    let mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    // shortcut stop and start timer
    globalShortcut.register('CmdOrCtrl+Shift+S', () => {
        mainWindow.send('shortcut-start-stop');
    });

});


let sobreWindow = null;

ipcMain.on('abrir-janela-sobre', () => {
    if(sobreWindow == null) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 240
        });
        sobreWindow.on('closed', () => {
            sobreWindow = null;
        });
    }
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});



ipcMain.on('curso-parado',(event,course,studyTime)=>{
   data.saveData(course,studyTime) 
})


ipcMain.on('updateCourse',(event,newCourse)=>{
    let newTemplate = templateGenerator.addCourseTrade(newCourse,mainWindow)
    const newTrayMenu = Menu.buildFromTemplate(newTemplate)
    tray.setContextMenu(newTrayMenu)
})