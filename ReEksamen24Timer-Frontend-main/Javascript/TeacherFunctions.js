'use strict'


class FetchPost{

    constructor(){
        this.urlTeacher = "http://localhost:8080/api/v1/teacher";
        this.urlCourse = "http://localhost:8080/api/v1/course"
        


    }
    async fetchTeacher(){
        let response = await fetch(this.urlTeacher)
        let data = await response.json()
        console.log(data)
        this.UpdateTeacherUI(data)

    }


    UpdateTeacherUI(data){
        document.getElementById("teacherList").innerHTML = ""
        let parrentDiv = document.getElementById("teacherList");
        for(let dataIndex in data){ 
         let entry = data[dataIndex];
         let name = entry.name; 
         let emailAddress = entry.emailAddress;
         $(parrentDiv).append("Name: "+name+"<br>Email: "+emailAddress + "<br> --------------- <br>") 
        }}

    
     async uploadTeacher() {
            let postData = {
                name: document.getElementById('teacherName').value,
                emailAddress: document.getElementById('teacherEmail').value,
            }
      
                //Ekstra Variable for adding course to teacher (NOT USED ATM)
                let courseData = CourseFunction.translateWordToCourse(document.getElementById('teacherCourse').value)
            this.postTeacher(postData, courseData)
            
            
        }


    
    async postTeacher(postData, courseData){

        let settings = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(postData)
        }
     
     
        let data = null
        try {
            let newresponse = await fetch(this.urlTeacher, settings)
            data = await newresponse.json()
            console.log(data)
            console.log("Data posted")
        } catch (error) {
            console.log(error)
        }
        this.fetchTeacher();
        return data
        }


   




        //Search for teacher
        searchForTeacher(){
            let search ={
                emailAddress: document.getElementById("searchTeacherMail").value
            }
            this.fetchSearchedTeacher(search)
        }

        async fetchSearchedTeacher(entry){
            try{
            let response = await fetch(this.urlTeacher+"/"+entry.emailAddress);
            this.data = await response.json();
            console.log(this.data);
            this.updateSearchTeacher(this.data);
            }catch(err){
                alert("Misspelling / Unvalid Teacher")
            }
            }
        

        updateSearchTeacher(data){
            document.getElementById("searchedTeacherInfo").innerHTML = ""
            let parrentDiv = document.getElementById("searchedTeacherInfo");
             let entry = data;
             let name = entry.name; 
             let emailAddress = entry.emailAddress;
             $(parrentDiv).append("Name: "+name+"<br>Email: "+emailAddress);
           
        }

    }


//---------------------------------------------------Outside Class---------------------------------------------------//

    function Teachertrigger(){
        FetchAndPostFunctions.fetchTeacher();
    }

    function postTeacher(){
        FetchAndPostFunctions.uploadTeacher();
    }
    function searchTeacher(){
        FetchAndPostFunctions.searchForTeacher();
    }




var FetchAndPostFunctions = new FetchPost;