package com.agri.disease.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agrisoft.disease.DiseaseRecord;
import java.lang.String;

public interface DiseaseRecordRepository extends JpaRepository<DiseaseRecord, Long>{

	List<DiseaseRecord>findByResponsibleOfficerOrderByCreatedAtDesc(String officer);
	
	List<DiseaseRecord> findByFarmerOrderByCreatedAtDesc(String farmer);
	
}