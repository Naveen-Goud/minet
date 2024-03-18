package com.minet.userservice.user.service;

import com.minet.userservice.user.dto.*;
import com.minet.userservice.user.entity.User;
import com.minet.userservice.user.exception.NotFoundException;
import com.minet.userservice.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired JwtGeneratorImpl jwtGenerator;
    @Override
    public UserDto getUser(LoginDto loginDto) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                    UserDto userDto = new UserDto();
                    userDto.setId(user.getId());
                    userDto.setEmail(user.getEmail());
                    userDto.setName(user.getName());
                    return userDto;
                } else {
                    throw new NotFoundException("Invalid password");
                }
            } else {
                throw new NotFoundException("User Not Found");
            }
        } catch (Exception e) {
            throw new NotFoundException("User Not Found");
        }
    }

    @Override
    public UserDto createUser(SignupDto signupDto) {
            Optional<User> userOptional=userRepository.findByEmail(signupDto.getEmail());
            if(userOptional.isPresent()){
                throw new IllegalArgumentException("User already Exists");
            }
            else {
                User user= new User();
                user.setEmail(signupDto.getEmail());
                user.setName(signupDto.getName());
                user.setPassword(passwordEncoder.encode(signupDto.getPassword()));
                User savedUser= userRepository.save(user);
                UserDto userDto=new UserDto();
                userDto.setId(savedUser.getId());
                userDto.setName(savedUser.getName());
                userDto.setEmail(savedUser.getEmail());
                return userDto;
            }


    }

    public boolean validateToken(String token) {
        return jwtGenerator.validateToken(token);
    }
    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> {
                    UserDto userDto = new UserDto();
                    userDto.setId(user.getId());
                    userDto.setEmail(user.getEmail());
                    userDto.setName(user.getName());
                    return userDto;
                })
                .collect(Collectors.toList());
    }


    @Override
    public UserDto getUserDetailsFromToken(AuthDto authDto){
        try {
            User user= new User();
            user.setName(authDto.getName());
            user.setEmail(authDto.getEmail());


            User isUser=userRepository.findByEmail(user.getEmail()).orElse(null);
            if(isUser!=null){
                UserDto userDto= new UserDto();
                userDto.setId(isUser.getId());
                userDto.setName(isUser.getName());
                userDto.setEmail(isUser.getEmail());

                return userDto;
            }
            userRepository.save(user);

            UserDto userDto= new UserDto();
            userDto.setId(user.getId());
            userDto.setName(user.getName());
            userDto.setEmail(user.getEmail());

            return (userDto);
        }catch (Exception e){
            throw new NotFoundException(e.getMessage());
        }
    }

}
