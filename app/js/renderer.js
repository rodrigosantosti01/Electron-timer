const { ipcRenderer } = require('electron');
const timer = require('./timer.js')
const data = require('../../data');

let addButton= document.querySelector('.botao-adicionar');
let field = document.querySelector('.campo-adicionar');
let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let studyTime = document.querySelector('.tempo');
let course = document.querySelector('.curso');
let images = ['img/play-button.svg','img/stop-button.svg'] 
let play = false;


window.onload = () =>{
    data.loadDataFromJson(course.textContent)
        .then((data)=>{
            studyTime.textContent = data.studyTime
        })
        .catch(()=>{

        })
}



linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});


botaoPlay.addEventListener('click',function(){
    if (play){
        botaoPlay.src = images[0];
        timer.stop(course.textContent);
        play=false;
        new Notification("Electron timer", {
            body: `The course ${course.textContent} has been stoped!!`,
            icon: 'img/stop-button.png'
        });
   }
    else{
        botaoPlay.src = images[1];
        timer.play(studyTime)
        play=true;
        new Notification("Electron timer", {
            body: `The course ${course.textContent} has been started!!`,
            icon: 'img/play-button.png'
        });
    }

});



ipcRenderer.on('changed-course',(event,courseName)=>{
    if (play) {
        timer.stop(course.textContent);
        play=false;
    }
    botaoPlay.src = images[0];
    data.loadDataFromJson(courseName)
        .then((data)=>{
            studyTime.textContent = data.studyTime;
        })
        .catch(()=>{
            studyTime.textContent = '00:00:00';
        })
    course.textContent = courseName;
})


// shortcut stop and start timer
ipcRenderer.on('shortcut-start-stop',()=>{
    let newEvent = new MouseEvent('click');
    botaoPlay.dispatchEvent(newEvent);    

});


addButton.addEventListener('click',function(){

    if(field.value==''){
        return; 
    }

    let newCourse = field.value;
    course.textContent = newCourse;
    studyTime.textContent = '00:00:00';
    field.value= '';
    ipcRenderer.send('updateCourse',newCourse);
})