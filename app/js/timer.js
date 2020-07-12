const moment = require('moment')
const {ipcRenderer } = require('electron')
let segundos=0;
let timer;
let tempo;
module.exports = {
    play(el){
        tempo = moment.duration(el.textContent)
        segundos = tempo.asSeconds();
        clearInterval(timer)
        timer = setInterval(()=>{
            segundos ++ ;
            el.textContent = this.segundosParaTempo(segundos)

        },1000);

    },
    segundosParaTempo(segundos){
        return moment().startOf('day').seconds(segundos).format('HH:mm:ss')
    },
    stop(curso){
        clearInterval(timer)
        let studyTime = this.segundosParaTempo(segundos);
        ipcRenderer.send('curso-parado',curso,studyTime);
    }
 
}