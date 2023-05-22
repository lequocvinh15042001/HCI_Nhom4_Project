package com.example.electronicshop.service;

import com.example.electronicshop.communication.request.UserRequest;
import com.example.electronicshop.communication.response.UserResponse;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.map.CommentMapper;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.Comment;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.models.product.Product;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.communication.request.CommentReq;
import com.example.electronicshop.communication.response.CommentRes;
import com.example.electronicshop.repository.CommentRepository;
import com.example.electronicshop.repository.OrderRepository;
import com.example.electronicshop.repository.ProductRepository;
import com.example.electronicshop.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Synchronized;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CommentMapper commentMap;
    private final OrderRepository orderRepository;


    public ResponseEntity<?> findByProductId(String productId, Pageable pageable) {
        Page<Comment> comment= commentRepository.findAllByProduct_IdAndState(new ObjectId(productId),Constant.COMMENT_ENABLE, pageable);
        if (comment.isEmpty()) throw new NotFoundException("Can not found any comment");
        List<CommentRes> resList = comment.getContent().stream().map(commentMap::toAllCommentRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        resp.put("totalQuantity", comment.getTotalElements());
        resp.put("totalPage", comment.getTotalPages());
        if (comment.isEmpty()) throw new NotFoundException("Can not found any comment");
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get comment by product success ", resp));
    }


    @Transactional
    @Synchronized
    public ResponseEntity<ResponseObject> addComment(String userId, CommentReq req) {
        Optional<Comment> comment = commentRepository.findCommentByProduct_IdAndUser_Id(
                new ObjectId(req.getProductId()), new ObjectId(userId));
        if (comment.isPresent()) throw new AppException(HttpStatus.CONFLICT.value(), "You already comment this product");
        Optional<User> user = userRepository.findUserByIdAndState(userId, Constant.USER_ACTIVE);
        if (user.isPresent()) {
                Optional<Product> product = productRepository.findProductByIdAndState(req.getProductId(), Constant.ENABLE);
                if (product.isPresent()) {
                    {
                        Comment newComment = new Comment(req.getContent(), req.getRate(), product.get(), user.get(), Constant.COMMENT_ENABLE, LocalDateTime.now());
                        commentRepository.save(newComment);
                        return ResponseEntity.status(HttpStatus.OK).body(
                                new ResponseObject("true", "Add comment success ", newComment));
                    }
                }
                throw new NotFoundException("Can not found product with id: " + req.getProductId());
        } throw new NotFoundException("Can not found user with id: " + userId);
    }


    @Transactional
    public ResponseEntity<?> editCommentByUser(String id, String userid, CommentReq commentReq) {
//        Optional<Comment> comment = commentRepository.findCommentByIdAndState(id,Constant.COMMENT_ENABLE);
        Optional<Comment> comment = commentRepository.findCommentByIdAndUser_IdAndState(new ObjectId(id),new ObjectId(userid),Constant.COMMENT_ENABLE);
        Optional<User> user = userRepository.findUserByIdAndState(userid,Constant.USER_ACTIVE);
        if(user.isPresent()) {
            if (comment.isPresent()) {
                comment.get().setContent(commentReq.getContent());
                comment.get().setRate(commentReq.getRate());
                comment.get().setLastUpdateDate(LocalDateTime.now());
                commentRepository.save(comment.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Update comment successfully", comment)
                );

            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Cannot edit comment ", ""));
        }throw new NotFoundException("Can not found user with id: " + userid);


    }

    public ResponseEntity<ResponseObject> blockComment(String id) {
        Optional<Comment> comment =commentRepository.findById(id);
        if (comment.isPresent()) {
            comment.get().setState(Constant.COMMENT_BLOCK);
            commentRepository.save(comment.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Block comment successfully ", comment)
            );
        } throw new NotFoundException("Can not found comment with id: "+id);
    }

    public ResponseEntity<ResponseObject> setEnableComment(String id) {
        Optional<Comment> comment =commentRepository.findById(id);
        if (comment.isPresent()) {
            comment.get().setState(Constant.COMMENT_ENABLE);
            commentRepository.save(comment.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", " Comment successfully ", comment)
            );
        } throw new NotFoundException("Can not found comment with id: "+id);
    }
    public ResponseEntity<ResponseObject> findAllComment(Pageable pageable){
        Page<Comment> comment = commentRepository.findAll(pageable);
        List<CommentRes> resList = comment.stream().map(commentMap::toAllCommentRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        resp.put("totalComment", comment.getTotalElements());
        resp.put("totalPage", comment.getTotalPages());
        if(resList.size()>0)
        {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "find all comment successfully ", resp));
        }
        else
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("false", "can't find all comment ", ""));
    }
    @Transactional
    public ResponseEntity<ResponseObject> deleteCommemt(String id) {
        Optional<Comment> comment =commentRepository.findById(id);
        if (comment.isPresent()) {
            try {
                commentRepository.deleteById(comment.get().getId());

            } catch (Exception e) {
                log.error(e.getMessage());
                throw new NotFoundException("Error when delete comment with id: "+id);
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Delete comment successfully ", "")
            );
        } throw new NotFoundException("Can not found comment with id: "+id);
    }

    @Transactional
    public ResponseEntity<ResponseObject> deleteCommemtbyUser(String id,String userid) {
        Optional<User> user = userRepository.findUserByIdAndState(userid,Constant.USER_ACTIVE);
        if(user.isPresent()) {
//            Optional<Comment> comment = commentRepository.findById(id);
            Optional<Comment> comment = commentRepository.findCommentByIdAndUser_IdAndState(new ObjectId(id),new ObjectId(userid),Constant.COMMENT_ENABLE);
            if (comment.isPresent()) {
                try {
                    commentRepository.deleteById(comment.get().getId());
                } catch (Exception e) {
                    log.error(e.getMessage());
                    throw new NotFoundException("Error when delete comment with id: " + id);
                }
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Delete comment successfully ", "")
                );
            }
        }
        throw new NotFoundException("Can not found user with id: "+id);
    }

}