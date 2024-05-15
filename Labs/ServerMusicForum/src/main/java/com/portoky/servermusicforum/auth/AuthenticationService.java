package com.portoky.servermusicforum.auth;

import com.portoky.servermusicforum.config.JwtService;
import com.portoky.servermusicforum.entity.Artist;
import com.portoky.servermusicforum.repository.ArtistRepository;
import com.portoky.servermusicforum.repository.UserRepository;
import com.portoky.servermusicforum.user.Role;
import com.portoky.servermusicforum.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ArtistRepository artistRepository;
    public AuthenticationResponse register(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        userRepository.save(user);
        if(user.getRole() == Role.ARTIST){
            Artist newRegisteredArtist = new Artist();
            newRegisteredArtist.setName(user.getUsername());
            String bio = user.getUsername() + " - created on " + new Date();
            newRegisteredArtist.setBiography(bio);
            artistRepository.save(newRegisteredArtist);
        }
        String jwtToken = jwtService.generateToken(user);
        return  AuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        )); //does all the job
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return  AuthenticationResponse.builder()
                .token(jwtToken).build();
    }
}
