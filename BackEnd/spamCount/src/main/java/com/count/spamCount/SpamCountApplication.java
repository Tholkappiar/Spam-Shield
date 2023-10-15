package com.count.spamCount;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SpamCountApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpamCountApplication.class, args);
	}

}
