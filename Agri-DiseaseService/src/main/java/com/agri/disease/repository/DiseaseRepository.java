package com.agri.disease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agrisoft.disease.Disease;

public interface DiseaseRepository extends JpaRepository<Disease, Long>{

}
