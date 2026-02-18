package com.example.ems_backend.Controller;

import com.example.ems_backend.Dto.EmployeeDto;
import com.example.ems_backend.Service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/employees")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class EmployeeController {
    EmployeeService employeeService;

    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getAnEmployee(@PathVariable("id") Long id) {
        EmployeeDto employeeDto = employeeService.getEmployee(id);
       return ResponseEntity.ok(employeeDto);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees()
    {
      List<EmployeeDto> employeeDtos= employeeService.getAllEmployees();
       return  ResponseEntity.ok(employeeDtos);

    }

    @PostMapping
    public ResponseEntity<EmployeeDto> addEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long id,@RequestBody EmployeeDto employeeDto)
    {
      EmployeeDto savedEmployee= employeeService.updateEmployee(id,employeeDto);
      return  ResponseEntity.ok(savedEmployee);
    }

    @DeleteMapping("{id}")
    public  ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id)
    {
         employeeService.deleteEmployee(id);
         return ResponseEntity.ok("REMOVED SUCCESSFULLY");
    }
}
