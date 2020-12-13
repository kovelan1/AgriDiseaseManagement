package com.agri.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

	@Override
	public void configure(WebSecurity web) throws Exception {
	    web.ignoring().antMatchers("/api/user/signup-user",
	    						   "/api/user/{userId}/image/download",
	    						   "/actuator/health",
	    						   "/api/user/registrationConfirmation",
	    						   "/api/user/isAvailable/{userName}",
	    						   "/api/user-service/health",
	    						   "api/user/resend/token");
	   
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
}
