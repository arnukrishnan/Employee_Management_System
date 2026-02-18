package com.example.ems_backend.Mapper;

import com.example.ems_backend.Dto.EmployeeDto;
import com.example.ems_backend.Model.Employee;

public class EmployeeMapper {

    public static Employee  mapToEmployee(EmployeeDto employeeDto)
    {
        return new Employee(employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmailId());
    }

    public static EmployeeDto mapToEmployeeDto(Employee employee)
    {
        return new EmployeeDto(employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmailId());
    }
}
