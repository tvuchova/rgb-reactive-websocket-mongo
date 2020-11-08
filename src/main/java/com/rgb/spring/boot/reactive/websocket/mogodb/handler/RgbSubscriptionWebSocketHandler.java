package com.rgb.spring.boot.reactive.websocket.mogodb.handler;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;

import com.rgb.spring.boot.reactive.websocket.mogodb.entity.RgbSlider;
import com.rgb.spring.boot.reactive.websocket.mogodb.repository.RgbSubscriptionRepository;

import reactor.core.publisher.Mono;

@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class RgbSubscriptionWebSocketHandler implements WebSocketHandler {

	private final RgbSubscriptionRepository repository;

	public RgbSubscriptionWebSocketHandler(RgbSubscriptionRepository repository) {
		this.repository = repository;
	}

	@Override
	public Mono<Void> handle(WebSocketSession session) {
		return session.send(
				session.receive().map(rgb -> new RgbSlider(rgb.getPayloadAsText())).flatMap(repository::save)
						.map(s -> session.textMessage(s.getRgbValue())));
	}
}
