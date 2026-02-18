package com.example.ems_backend.Service;

import com.example.ems_backend.Dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    //GET
    List<EmployeeDto> getAllEmployees();
    EmployeeDto getEmployee(Long id);

    //POST
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    //PUT
    EmployeeDto updateEmployee(Long id,EmployeeDto employeeDto);

    //DELETE
    void deleteEmployee(Long id);


}
