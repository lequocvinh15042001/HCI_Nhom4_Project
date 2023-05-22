package com.example.electronicshop.service;

import com.example.electronicshop.communication.request.*;
import com.example.electronicshop.communication.response.UserResponse;
import com.example.electronicshop.config.CloudinaryConfig;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.map.UserMap;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.models.enity.UserImage;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final UserMap userMapper;
    private final CloudinaryConfig cloudinary;
    private final PasswordEncoder passwordEncoder;


    public ResponseEntity<ResponseObject> findAll(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        List<UserResponse> userResList = users.stream().map(userMapper::thisUserRespone).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", userResList);
        resp.put("totalUsers", users.getTotalElements());
        resp.put("totalPage", users.getTotalPages());
        if (userResList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get all user", resp));
        throw new NotFoundException("Can not found any user");
    }

    public ResponseEntity<ResponseObject> findAllByRole(String role,Pageable pageable) {
        Page<User> users = userRepository.findUsersByRole(role,pageable);
        List<UserResponse> userResList = users.stream().map(userMapper::thisUserRespone).collect(Collectors.toList());
        if (userResList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get all user", userResList));
        throw new NotFoundException("Can not found any user");
    }


    public  ResponseEntity<?> setRoleByAdmin(String id, RoleUserRequest roleUserRequest)
    {
        Optional<User>user = userRepository.findById(id);
        if(user.isPresent()) {
            user.get().setRole(roleUserRequest.getRole());
            userRepository.save(user.get());
            UserResponse res = userMapper.thisUserRespone(user.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get user success", res));
        }
        else
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("false", "Can't not find user ", ""));
    }


    public ResponseEntity<?> findUserById(String id) {
        Optional<User> user = userRepository.findUserByIdAndState(id, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            UserResponse res = userMapper.thisUserRespone(user.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get user success", res));
        } else {

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Can't not find user ", ""));
        }
    }

    public ResponseEntity<?> updateUserAvatar(String id, MultipartFile file) {
        Optional<User> user = userRepository.findUserByIdAndState(id, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            if (file != null && !file.isEmpty()) {
                try {
                    String imgUrl = cloudinary.uploadImage(file, user.get().getAvatar());
                    user.get().setAvatar(imgUrl);
                    userRepository.save(user.get());
                } catch (IOException e) {
                    throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Error when upload image");
                }
            }
            UserResponse res = userMapper.thisUserRespone(user.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Update user success", res));
        }
        throw new NotFoundException("Can not found user with id " + id );
    }



    @Transactional
    public ResponseEntity<?> updateUser(String id, UserRequest userReq) {
        Optional<User> user = userRepository.findUserByIdAndState(id, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            user.get().setName(userReq.getName());
            user.get().setPhone(userReq.getPhone());
//            user.get().setAddress(userReq.getAddress());
                userRepository.save(user.get());
            UserResponse userRes = userMapper.thisUserRespone(user.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Update info user successfully", userRes)
            );

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot update info user ", ""));
    }
    public ResponseEntity<ResponseObject> updateEmailUser(String id, String email){

            Optional<User> foundUser = userRepository.findById(id);
            if(foundUser.isPresent() && email!=null){
                foundUser.get().setEmail(email);
                foundUser.get().setState(Constant.USER_ACTIVE);
                try{
                    userRepository.save(foundUser.get());
                }
                catch (Exception e){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            new ResponseObject("failed", "Email  already exist", "")
                    );
                }
                UserResponse userRes = userMapper.thisUserRespone(foundUser.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Update email user successfully", userRes)
                );
            }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot update email user ", "")
        );
    }
    public ResponseEntity<ResponseObject> updateResetPassUser(String id, ResetPassRequest resetPassRequest){

            Optional<User> foundUser = userRepository.findById(id);
            if(foundUser.isPresent() && resetPassRequest!=null){
                foundUser.get().setPassword(passwordEncoder.encode(resetPassRequest.getResetpass()));
                try{
                    userRepository.save(foundUser.get());
                }
                catch (Exception e){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            new ResponseObject("failed", "Email or Phone already exist", "")
                    );
                }
                UserResponse userRes = userMapper.thisUserRespone(foundUser.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Update pass user successfully", userRes)
                );

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot update pass user ", "")
        );
    }

    @Transactional
    public ResponseEntity<?> UnblockUser(String id) {
        Optional<User> user = userRepository.findUserByIdAndState(id, Constant.USER_NOT_ACTIVE);
        if (user.isPresent()) {
            user.get().setState(Constant.USER_ACTIVE);
            userRepository.save(user.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Unblock user success", user));
        }
        throw new NotFoundException("Can not find use");
    }

    @Transactional
    public ResponseEntity<?> deletedUser(String id) {
        Optional<User> user = userRepository.findUserByIdAndState(id, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            user.get().setState(Constant.USER_NOT_ACTIVE);
            userRepository.save(user.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Delete user success", ""));
        }
        throw new NotFoundException("Can not find use");
    }
    @Transactional
    public ResponseEntity<?> updatePassword(String id, ChangePassword req) {
        Optional<User> user = userRepository.findUserByIdAndState(id, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            if (passwordEncoder.matches(req.getOldpass(), user.get().getPassword())
                    && !req.getNewpass().equals(req.getOldpass())) {
                user.get().setPassword(passwordEncoder.encode(req.getNewpass()));
                userRepository.save(user.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Change password success", ""));
            } else throw new AppException(HttpStatus.UNPROCESSABLE_ENTITY.value(), "Your old password is wrong" +
                    " or same with new password");
        }
        throw new NotFoundException("Can not found user with id" );
    }

}
