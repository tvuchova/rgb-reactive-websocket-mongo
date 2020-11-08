package com.rgb.spring.boot.reactive.websocket.mogodb.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.rgb.spring.boot.reactive.websocket.mogodb.entity.RgbSlider;

public interface RgbSubscriptionRepository extends ReactiveMongoRepository<RgbSlider, String> {

}
