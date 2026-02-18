package com.example.ems_backend.Service;

import com.example.ems_backend.Dto.EmployeeDto;
import com.example.ems_backend.Exception.ResourceNotFound;
import com.example.ems_backend.Mapper.EmployeeMapper;
import com.example.ems_backend.Model.Employee;
import com.example.ems_backend.Repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EmployeeServiceImplementation implements EmployeeService {
    EmployeeRepository employeeRepository;

    // getting all employees
    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> allEmployee = employeeRepository.findAll();
        return allEmployee
                .stream()
                .map(n -> EmployeeMapper.mapToEmployeeDto(n))
                .collect(Collectors.toList());
    }

    //getting an employee
    @Override
    public EmployeeDto getEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Employee is not exist " + id));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    // adding a new employee
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    //updating an employee
    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Employee is not exist " + id));

        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmailId(employeeDto.getEmailId());

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    //delete an employee
    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Employee is not exist " + id));

        employeeRepository.deleteById(id);
    }
}
