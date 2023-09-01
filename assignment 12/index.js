class Student {
    constructor(name) {
        this.name = name;
        this.grade = [];
    }


    addGrade(subject, grade) {
        this.grade.push(new Grade(subject, grade));
    }
}

class Grade {
    constructor(subject, grade) {
        this.subject = subject;
        this.grade = grade;
    }
}

class StudentService {
    static url = 'https://64eeabbf219b3e2873c3646f.mockapi.io/students';


    static getAllStudents() {
        return $.get(this.url);
    }

    static getStudent(id) {
        return $.get(this.url + `/${id}`);
    }

    static createStudent(Student) {
        return $.post(this.url, Student);
    }

    static updateStudent(Student) {
        return $.ajax({
            url: this.url + `/${Student._id}`,
            datatype: 'json',
            data: JSON.stringify(Student),
            contentType: `application/json`,
            type: 'PUT'
        });

    }

    static deleteStudent(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}


class DomManager {
    static Students;

    static getAllStudents() {
        StudentService.getAllStudents().then(Students => this.render(Students));
    }

    static deleteStudent(id){
        StudentService.deleteStudent(id)
            .then(()=> {
                return StudentService.getAllStudents();
            })
            .then((Student)=> this.render(Student));
    }

    static render(Students) {
        this.Students = Students;
        $('#app').empty();
        for (let Student of Students) {
            $("#app").prepend(
                `<div id=${Student.id}" class="card">
                    <div class="card-header">
                        <h2>${Student.name}</h2>
                        <button class="btn btn-danger" onClick="DomManager.deleteStudent('${Student._id}')">Delete</button>
                    </div>
                    <div class='card-body'>
                        <div class="card">
                            <div class='row'>
                                <div class="col-sm">
                                    <input type='text' id="${Student._id}-subject" class='form-control' placeholder="Subject Name">
                                </div>
                                <div class="col-sm">
                                    <input type='text' id="${Student._id}-grade" class='form-control' placeholder="Grade Name">
                                </div>
                            </div>
                            <button id="${Student._id}-new-subject" onclick="DomManager.addSubject('${Student._id}')" class="btn btn-primary form-control">add</button>
                        </div>
                            
                    
                    </div>
                
                </div><br>
                `
            
            );
            console.log(Student)
            for(grade of Student.grade){
                $(`#${Student._id}`).find('.card-body').append(
                    `<p>
                        <span id="name-${grade._id}"><strong>Subject:</strong> ${grade.subject}</span>
                        <span id="name-${grade._id}"><strong>grade:</strong> ${grade.grade}</span>
                        <button class="btn btn-danger " onclick="DomManager.deleteGrade('${student._id}', '${grade._id}')">delete room</button>
                    </p>
                    
                    `
                )
            }
        }
    }   
}

DomManager.getAllStudents()
console.log(StudentService.getAllStudents())