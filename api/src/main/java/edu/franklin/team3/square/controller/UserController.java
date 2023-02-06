package edu.franklin.team3.square.controller;

import edu.franklin.team3.square.model.User;
import edu.franklin.team3.square.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(value = "/user", produces = "application/json")
    public ResponseEntity<?> getUserByUserName(@RequestParam String userName) {
        try {
            User searchUser = userService.getUserByUserName(userName);
            if (searchUser == null) {
                throw new Exception();
            }
            return ResponseEntity.status(HttpStatus.OK).body(searchUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Not Found");
        }
    }

    @GetMapping(value = "/user/{id}", produces = "application/json")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User searchUser = userService.getUserById(id);
            if (searchUser == null) {
                throw new Exception();
            }
            return ResponseEntity.status(HttpStatus.OK).body(searchUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Not Found");
        }
    }

    @PostMapping(value = "/user")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(userService.createUser(user));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: There was a problem creating the user. Make sure the username is unique, contains at least one character, and has no spaces");
        }
    }
}