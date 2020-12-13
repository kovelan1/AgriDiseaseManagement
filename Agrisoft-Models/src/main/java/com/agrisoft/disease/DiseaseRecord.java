package com.agrisoft.disease;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class DiseaseRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="disease_id")
	private Disease disease;
	private String plant;
	private Address address;
	private String imageString;
	private String farmer;
	private String description;
	private String responsibleOfficer;
	private boolean answred;
	private boolean visited;
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Colombo")
	private Date answredAt;
	private String location;
	private String sugessions;
	private int daysToHavest;
	
	@CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Colombo")
    @Column(name = "created_at", nullable = false)
    private Date createdAt;


    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Colombo")
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    public DiseaseRecord() {
		// TODO Auto-generated constructor stub
	}

	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public Disease getDisease() {
		return disease;
	}


	public void setDisease(Disease disease) {
		this.disease = disease;
	}


	public String getImageString() {
		return imageString;
	}


	public void setImageString(String imageString) {
		this.imageString = imageString;
	}


	public String getFarmer() {
		return farmer;
	}


	public void setFarmer(String farmer) {
		this.farmer = farmer;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getResponsibleOfficer() {
		return responsibleOfficer;
	}


	public void setResponsibleOfficer(String responsibleOfficer) {
		this.responsibleOfficer = responsibleOfficer;
	}


	public boolean isAnswred() {
		return answred;
	}


	public void setAnswred(boolean answred) {
		this.answred = answred;
	}


	public boolean isVisited() {
		return visited;
	}


	public void setVisited(boolean visited) {
		this.visited = visited;
	}


	public Date getAnswredAt() {
		return answredAt;
	}


	public void setAnswredAt(Date answredAt) {
		this.answredAt = answredAt;
	}


	public Date getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}


	public Date getUpdatedAt() {
		return updatedAt;
	}


	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getPlant() {
		return plant;
	}

	public void setPlant(String plant) {
		this.plant = plant;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getSugessions() {
		return sugessions;
	}

	public void setSugessions(String sugessions) {
		this.sugessions = sugessions;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public int getDaysToHavest() {
		return daysToHavest;
	}

	public void setDaysToHavest(int daysToHavest) {
		this.daysToHavest = daysToHavest;
	}
	
		
    
    
}
