const jsonfile = require('jsonfile-promised');
const fs = require('fs');


module.exports = {
    saveData(course,studyTime){
        let filePath = `${__dirname}/data/${course}.json`

        if(fs.existsSync(filePath)){
            // just save
            this.saveTimeToCourse(filePath,studyTime)
        }
        else{
            //  create and save
            this.createFile(filePath,{})
                .then(()=>{
                    // save Data
                    this.saveTimeToCourse(filePath,studyTime)
                })
        }
    },
    saveTimeToCourse(filePath,studyTime){
        let datas = {
            lastTime: new Date().toISOString(),
            studyTime: studyTime
        } 
        jsonfile.writeFile(filePath,datas,{spaces:2})
            .then(()=>{

            })
            .catch(()=>{

            })
    },
    createFile(filename,jsonData){
        return jsonfile.writeFile(filename,jsonData)
            .then((response)=>{

            })
            .catch((error)=>{

            })
    },
    loadDataFromJson(course){
        let filePath = `${__dirname}/data/${course}.json`
        return jsonfile.readFile(filePath)
    },
    getCoursesName(){
        let files = fs.readdirSync(`${__dirname}/data/`);
        let courses = files.map((file)=>{
            return file.substr(0, file.lastIndexOf('.'));
        })
        return courses
    }
}