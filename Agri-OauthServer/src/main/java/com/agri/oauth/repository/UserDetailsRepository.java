package com.agri.oauth.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.agrisoft.user.User;

import java.util.Optional;


public interface UserDetailsRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String name);
	
}
