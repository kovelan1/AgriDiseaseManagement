package com.agri.disease;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EntityScan(basePackages = {"com.agrisoft.disease","com.agrisoft.common"})
@EnableResourceServer
public class AgriDiseaseServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgriDiseaseServiceApplication.class, args);
	}

}
