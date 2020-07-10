const data = require('./data');

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
    }
}