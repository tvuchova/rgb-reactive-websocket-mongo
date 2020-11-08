package com.rgb.spring.boot.reactive.websocket.mogodb.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@EntityScan("com.rgb.spring.boot.reactive.websocket.mogodb.entity")
@EnableReactiveMongoRepositories("com.rgb.spring.boot.reactive.websocket.mogodb.repository")
@SpringBootApplication(scanBasePackages = "com.rgb.spring.boot.reactive.websocket.mogodb")
public class SpringReactiveWebSocketMongoDbApp {

	public static void main(String[] args) {
		SpringApplication.run(SpringReactiveWebSocketMongoDbApp.class, args);
	}

}
