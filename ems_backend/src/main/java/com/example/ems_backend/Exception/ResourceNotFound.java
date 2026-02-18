package com.example.ems_backend.Exception;

public class ResourceNotFound extends RuntimeException{
   public   ResourceNotFound(String s)
    {
        super(s);
    }
}
