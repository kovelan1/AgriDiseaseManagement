package com.agrisoft.disease;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import com.agrisoft.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
public class Disease {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	private String discription;
	private String sollution;
	@Enumerated(EnumType.STRING)
	private ImpectLevel impectLevel;
	private String enteredBy;
	private String spreadingOn;
	
	@CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Colombo")
    @Column(name = "created_at", nullable = false)
    private Date createdAt;
	
	@OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, fetch=FetchType.LAZY)
	@JsonIgnore
	private List<DiseaseRecord> diseaseRecord;
	
	public Disease() {
		// TODO Auto-generated constructor stub
	}
	
	public Disease(long id, String name, String discription, String sollution, ImpectLevel impectLevel,String spreadingOn,
			String enteredBy, Date createdAt, List<DiseaseRecord> diseaseRecord) {
		super();
		this.id = id;
		this.name = name;
		this.discription = discription;
		this.sollution = sollution;
		this.impectLevel = impectLevel;
		this.enteredBy = enteredBy;
		this.createdAt = createdAt;
		this.diseaseRecord = diseaseRecord;
		this.spreadingOn=spreadingOn;
	}



	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDiscription() {
		return discription;
	}

	public void setDiscription(String discription) {
		this.discription = discription;
	}

	public String getSollution() {
		return sollution;
	}

	public void setSollution(String sollution) {
		this.sollution = sollution;
	}

	public ImpectLevel getImpectLevel() {
		return impectLevel;
	}

	public void setImpectLevel(ImpectLevel impectLevel) {
		this.impectLevel = impectLevel;
	}

	public String getEnteredBy() {
		return enteredBy;
	}

	public void setEnteredBy(String enteredBy) {
		this.enteredBy = enteredBy;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public List<DiseaseRecord> getDiseaseRecord() {
		return diseaseRecord;
	}

	public void setDiseaseRecord(List<DiseaseRecord> diseaseRecord) {
		this.diseaseRecord = diseaseRecord;
	}

	public String getSpreadingOn() {
		return spreadingOn;
	}

	public void setSpreadingOn(String spreadingOn) {
		this.spreadingOn = spreadingOn;
	}	
	
	

}
