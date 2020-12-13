package com.agri.disease.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agri.disease.exception.ResourceNotFoundException;
import com.agri.disease.repository.DiseaseRecordRepository;
import com.agri.disease.repository.DiseaseRepository;
import com.agrisoft.disease.Disease;
import com.agrisoft.disease.DiseaseRecord;

@Service
public class DiseaseService {

	@Autowired DiseaseRepository diseaseRepository;
	
	@Autowired DiseaseRecordRepository recordRepository;
	
	
	public List<Disease> getAllDisease() {
		
		return diseaseRepository.findAll();
	}

	public Disease createDisease(Disease disease) {
		
		return diseaseRepository.save(disease);
	}

	public Disease getDiseaseById(long id) throws ResourceNotFoundException {
		return diseaseRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Disease not found"));
	}

	public Disease updateDisease(long id, Disease disease) throws ResourceNotFoundException {
		disease.setId(id);
		return diseaseRepository.save(disease);
	}

	public void deleteDisease(long id) {
		diseaseRepository.deleteById(id);
		
	}

	
	
	
}
