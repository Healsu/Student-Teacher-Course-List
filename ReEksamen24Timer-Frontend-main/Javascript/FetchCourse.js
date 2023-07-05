'use strict'


//Course fetch is mainly used to fetch and supposedly add course to the OneToMany relation of Student/Teacher
class courseFetch{

    constructor(){
        this.urlCourse = "http://localhost:8080/api/v1/course"
    }

    async fetchCourse(){
        let response = await fetch(this.urlCourse)
        let data = await response.json()
        console.log(data)
        this.UpdateCourseUI(data)
        
    }


    UpdateCourseUI(data){
        document.getElementById("courseInfo").innerHTML = ""
        let parrentDiv = document.getElementById("courseInfo");
        for(let dataIndex in data){ 
         let entry = data[dataIndex];
         let name = entry.name; 
         let startDate = entry.startDate;
         let endDate = entry.endDate;
         let ectsPoints = entry.ectsPoints;
         let maxStudents = entry.maxStudents;
         $(parrentDiv).append(`<div>
    
         <p>${name}, Start Date:  
         ${startDate}, End Date: 
         ${endDate}, Ects Point:
         ${ectsPoints}, Max Students:
         ${maxStudents}</p>
         
         </div>`)  }}


    //Translates the word given to become the entire object of an object in the course list (backend)
    async translateWordToCourse(course){
        
        try{
            let response = await fetch(this.urlCourse+"/"+course);
            console.log(response)
            this.data = await response.json();
            console.log(this.data);
            
            }catch(err){
                alert("Error in finding course")
            }

    }
    

}
//---------------------------------------------------Outside Class---------------------------------------------------//

function fetchCourse(){
    CourseFunction.fetchCourse();
}


var CourseFunction = new courseFetch;