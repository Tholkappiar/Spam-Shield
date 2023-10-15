package com.count.spamCount.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.count.spamCount.Entity.SpamData;
import com.count.spamCount.Interface.SpamDataRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SpamDataService {
    private final SpamDataRepository repository;

    @Autowired
    public SpamDataService(SpamDataRepository repository) {
        this.repository = repository;
    }

    public SpamData createSpamData(SpamData spamData) {
        // Simply save the provided data
        return repository.save(spamData);
    }

    public List<SpamData> getAllSpamData() {
        // Retrieve all spam data from the database
        return repository.findAll();
    }
    
    public SpamData getSpamDataById(Long id) {
        // Retrieve a specific spam data record by its ID
        Optional<SpamData> result = repository.findById(id);
        return result.orElse(null);
    }

    public void deleteSpamData(Long id) {
        // Delete a specific spam data record by its ID
        repository.deleteById(id);
    }
    
    public List<SpamData> getSpamDataByUid(Long uid) {
        return repository.findByUid(uid);
    }

}
