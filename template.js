const data = require('./data');
const {ipcMain} = require('electron');

module.exports = {
    initialTemplate:null,
    generateTrayTemplate(win) {
        let template = [
            { 'label': 'Cursos' },
            { type: 'separator' }
        ];
        let courses = data.getCoursesName();
        courses.forEach((course)=>{
            let menuItem = {
                label:course,
                type:'radio',
                click:()=>{
                    win.send('changed-course',course)
                }
            }
            template.push(menuItem)
        })
        this.initialTemplate = template
        return template;
    },
    addCourseTrade(course,win){
        this.initialTemplate.push({
            label:course,
            type:'radio',
            checked:true,
            click:()=>{
                win.send('changed-course',course)
            }
        })
        return this.initialTemplate
    },
    generateMainMenuTemplate(app){
        let templateMenu = [
            {
                label: 'View',
                submenu: [
                  { role: 'reload' },
                  { role: 'forcereload' },
                  { role: 'toggledevtools' },
                  { type: 'separator' },
                  { role: 'resetzoom' },
                  { role: 'zoomin' },
                  { role: 'zoomout' },
                  { type: 'separator' },
                  { role: 'togglefullscreen' }
                ]
            },
            {
                label: 'Window',
                submenu: [
                    { role: 'minimize' },
                    {   
                        label: 'Close',
                        role: 'close' 
                    }
                  ]
            },
            {
                label: 'About',
                submenu:[
                    {
                        label:'Learn more',
                        click: ()=>{
                            ipcMain.emit('abrir-janela-sobre')
                        }
                    }
                ]
            }
    ];
        if (process.platform=='darwin'){
            // coloca o nome do app na primeira posição do array
            templateMenu.unshift({
                label: app.getName(),
                submenu:[
                    {label:'Item 1'}
                ]
            });
        }
        return templateMenu
    }
}