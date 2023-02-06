package edu.franklin.team3.square.controller;

import edu.franklin.team3.square.model.TestEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping("/getmessage")
    TestEntity getMessage() {
        return new TestEntity("Hello world!");
    }
}
