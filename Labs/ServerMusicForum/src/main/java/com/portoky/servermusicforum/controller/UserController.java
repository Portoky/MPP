package com.portoky.servermusicforum.controller;

import com.portoky.servermusicforum.repository.UserRepository;
import com.portoky.servermusicforum.user.Role;
import com.portoky.servermusicforum.user.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/userrole")
    public Role getUserRole(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userDetails = (User) principal;

        return userDetails.getRole();
    }
}
