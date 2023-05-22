package com.example.electronicshop.controller;

import com.example.electronicshop.service.StatsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/manage/stats")
public class StatsController {
    private final StatsService statsService;

    @GetMapping(path = "/state")
    public ResponseEntity<?> getCountByState (){
        return statsService.getAllCountByState();
    }

    @GetMapping(path = "/orders")
    public ResponseEntity<?> getStats (@RequestParam(value = "from", defaultValue = "") String from,
                                       @RequestParam(value = "to", defaultValue = "") String to,
                                       @RequestParam("type") String type){
        return statsService.getOrderStatistical(from, to, type);
    }
}
