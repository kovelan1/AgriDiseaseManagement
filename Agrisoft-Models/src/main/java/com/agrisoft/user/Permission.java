package com.agrisoft.user;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "permission")
public class Permission implements Serializable {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
    @Column(name = "name")
    private String name;
	
    @ManyToMany(mappedBy = "permissions")
    @JsonIgnore
	private List<Role> role;
    
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	public List<Role> getRole() {
		return role;
	}
	public void setRole(List<Role> role) {
		this.role = role;
	}
    
    
}
