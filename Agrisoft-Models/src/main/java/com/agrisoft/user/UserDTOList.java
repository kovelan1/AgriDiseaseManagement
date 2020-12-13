package com.agrisoft.user;

import java.util.List;

public class UserDTOList {

	private List<UserDto> list;
	
	public UserDTOList() {
		// TODO Auto-generated constructor stub
	}
	

	public UserDTOList(List<UserDto> list) {
		super();
		this.list = list;
	}


	public List<UserDto> getList() {
		return list;
	}

	public void setList(List<UserDto> list) {
		this.list = list;
	}
	
	
}
