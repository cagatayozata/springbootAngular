package com.ozata.cagatay.student;

import com.ozata.cagatay.exceptions.NotFoundException;
import com.ozata.cagatay.redis.Jedis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // for Angular connection
public class StudentController {

    Jedis main = new Jedis();

    @Autowired
    StudentRepository studentRepository;

    // GET ALL STUDENTS
    @GetMapping("/students")
    public List<Student> getStudents(){

        return studentRepository.findAll();

    }

    // GET A STUDENT BY ID
    @GetMapping("/students/{id}")
    public Student getStudent(@PathVariable(value = "id") int id){

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());

        // add to Redis
       //main.addtoRedis(student.getId(), student.getName(),student.getSchool(),student.getCgpa());

        return student;

    }

    // CREATE A NEW STUDENT
    @PostMapping("/students")
    public Student addStudent(@Valid @RequestBody Student student) {

        return studentRepository.save(student);

    }

    // UPDATE A STUDENT RECORD
    @PutMapping("/students/{id}")
    public Student updateStudent(@PathVariable(value = "id") int id,
                                 @Valid @RequestBody Student newstudent){

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());

        student.setName(newstudent.getName());
        student.setSchool(newstudent.getSchool());
        student.setCgpa(newstudent.getCgpa());

        return studentRepository.save(student);

    }

    // DELETE A STUDENT
    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable(value = "id") int id){

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());

        studentRepository.delete(student);

        return ResponseEntity.ok(student);

    }


}
