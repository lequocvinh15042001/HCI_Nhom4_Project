package com.example.electronicshop.map;

import com.example.electronicshop.models.enity.Comment;
import com.example.electronicshop.communication.response.CommentRes;
import org.springframework.stereotype.Service;

@Service
public class CommentMapper {
    public CommentRes toCommentRes(Comment req) {
        return new CommentRes(req.getId(), req.getContent(), req.getRate(),
                req.getState(), req.getUser().getName(), req.getCreatedDate());
    }
    public CommentRes toAllCommentRes(Comment req){
        return new CommentRes(req.getId(), req.getContent(), req.getRate(),
                req.getState(), req.getUser().getId(),req.getUser().getAvatar(),req.getUser().getName(),req.getProduct().getId(),req.getProduct().getName() ,req.getCreatedDate(),req.getLastUpdateDate());
    }

}
