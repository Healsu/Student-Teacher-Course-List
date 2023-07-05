'use strict'


class StudentFunction{

    constructor(){
        this.urlStudent = "http://localhost:8080/api/v1/student";
        this.urlCourse = "http://localhost:8080/api/v1/course"
        


    }

    async fetchStudent(){
        let response = await fetch(this.urlStudent)
        let data = await response.json()
        console.log(data)
        this.UpdateStudentUI(data)
        
    }


    UpdateStudentUI(data){
        document.getElementById("studentList").innerHTML = ""
        let parrentDiv = document.getElementById("studentList");
        for(let dataIndex in data){ 
         let entry = data[dataIndex];
         let name = entry.name; 
         let emailAddress = entry.emailAddress;
         let course = JSON.stringify(entry.course);
         $(parrentDiv).append("Name: "+name+"<br>Email: "+emailAddress+"<br>" + course+ "<br> --------------- <br>") 
        }}

    async uploadStudent() {
            let postData = {
                name: document.getElementById('studentName').value,
                emailAddress: document.getElementById('studentEmail').value
            }
            this.postStudent(postData)
        }


    
    async postStudent(postData){

        let settings = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(postData)
        }
        let data = null
        try {
            console.log(settings)
            let response = await fetch(this.urlStudent, settings)
            data = await response.json()
            console.log("Post Data")
        } catch (error) {
            console.log(error)
        }
        this.fetchStudent();
        return data
        }



     //Search for student
     searchForStudent(){
        let search ={
            emailAddress: document.getElementById("searchStudentMail").value
        }
        this.fetchSearchedStudent(search)
    }

    async fetchSearchedStudent(entry){
        try{
        let response = await fetch(this.urlStudent+"/"+entry.emailAddress);
        this.data = await response.json();
        console.log(this.data);
        this.updateSearchStudent(this.data);
        }catch(err){
            alert("Misspelling / Invalid Student")
        }
        }
    

    updateSearchStudent(data){
        document.getElementById("searchedStudentInfo").innerHTML = ""
        let parrentDiv = document.getElementById("searchedStudentInfo");
         let entry = data;
         let name = entry.name; 
         let emailAddress = entry.emailAddress;
         $(parrentDiv).append("Name: "+name+"<br>Email: "+emailAddress);
       
    }

//---------------------------------------------------Outside Class---------------------------------------------------//



}
function studentTrigger(){
    studentFunction.fetchStudent();
}
function studentPost(){
    studentFunction.uploadStudent();
}
function searchStudent(){
    studentFunction.searchForStudent();
}


var studentFunction = new StudentFunction;