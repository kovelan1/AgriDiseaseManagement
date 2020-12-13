package com.agri.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agrisoft.user.Role;
import com.agrisoft.user.User;

import java.lang.String;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String>{

	//public User findByUsername(String user_name);
	List<User> findByRoleAndWorkingLocation(Role role,String workinglocation);
	
	List<User> findByRole(Role role);
	
	boolean existsById(String id);
	
	
	
		
}
