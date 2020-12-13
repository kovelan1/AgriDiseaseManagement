package com.agri.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EntityScan(basePackages = {"com.agrisoft.user","com.agrisoft.common"})
@EnableResourceServer
public class AgriUserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgriUserServiceApplication.class, args);
	}

}
