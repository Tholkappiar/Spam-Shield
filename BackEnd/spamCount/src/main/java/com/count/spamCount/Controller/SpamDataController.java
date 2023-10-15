package com.count.spamCount.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.count.spamCount.Entity.SpamData;
import com.count.spamCount.Service.SpamDataService;

@RestController
@RequestMapping("/spamdata")

public class SpamDataController {
    private final SpamDataService service;

    @Autowired
    public SpamDataController(SpamDataService service) {
        this.service = service;
    }
    
    @GetMapping("/all")
    public List<SpamData> getAllSpamData() {
        return service.getAllSpamData();
    }
    
    @GetMapping("/{id}")
    public SpamData getSpamDataById(@PathVariable Long id) {
        return service.getSpamDataById(id);
    }
    
    @PostMapping("/post")
    public SpamData createSpamData(@RequestBody SpamData spamData) {
        return service.createSpamData(spamData);
    }

//    @PutMapping("/{id}")
//    public SpamData updateSpamData(@PathVariable Long id, @RequestBody SpamData updatedSpamData) {
//        return service.updateSpamData(id, updatedSpamData);
//    }

    @DeleteMapping("/{id}")
    public void deleteSpamData(@PathVariable Long id) {
        service.deleteSpamData(id);
    }
    
    @GetMapping("/byuid/{uid}")
    public List<SpamData> getSpamDataByUid(@PathVariable Long uid) {
        return service.getSpamDataByUid(uid);
    }

}
