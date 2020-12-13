package com.agrisoft.common;

import com.agrisoft.user.Address;

public class UserDetails {
	
	 private String username;
	 private String firstName;
	 private String lastName;
	 private String middleName;
	 private Address address;
	 private String mobileNumber;
	 
	 public UserDetails() {
		// TODO Auto-generated constructor stub
	}
	 
	public UserDetails(String username, String firstName, String lastName, String middleName, Address address,
			String mobileNumber) {
		super();
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.middleName = middleName;
		this.address = address;
		this.mobileNumber = mobileNumber;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	 
	 

}
