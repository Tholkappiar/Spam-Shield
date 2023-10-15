package com.count.spamCount.Interface;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.count.spamCount.Entity.SpamData;

public interface SpamDataRepository extends JpaRepository<SpamData, Long> {
//	SpamData findByDateAndUid(String date, Long uid);
	 List<SpamData> findByUid(Long uid);
}
