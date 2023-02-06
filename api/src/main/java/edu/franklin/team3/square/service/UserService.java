package edu.franklin.team3.square.service;

import java.util.Optional;
import org.apache.commons.lang3.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.franklin.team3.square.model.User;
import edu.franklin.team3.square.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName).get();
    }

    public User getUserById(long id) {
        return userRepository.findById(id).get();
    }

    public User createUser(User user) throws Exception {
        if(StringUtils.isBlank(user.getUserName()) || StringUtils.isBlank(user.getDisplayName())) {
            throw new Exception("User name and display name is required");
        }

        Optional<User> u1 = userRepository.findByUserName(user.getUserName());

        if (u1.isPresent()) {
            throw new Exception("Username already exists.");
        } else {
            return userRepository.save(new User(user.getUserName(), user.getDisplayName()));
        }
    }
}
