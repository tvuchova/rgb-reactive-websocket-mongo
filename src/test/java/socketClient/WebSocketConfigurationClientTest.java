package socketClient;

import jdk.nashorn.internal.ir.annotations.Ignore;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import org.springframework.web.reactive.socket.client.WebSocketClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.concurrent.atomic.AtomicLong;

@Ignore
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class WebSocketConfigurationClientTest {
    private final WebSocketClient socketClient = new ReactorNettyWebSocketClient();

    @Test
    public void testNotificationsOnUpdates() throws Exception {
        int count = 1;
        AtomicLong counter = new AtomicLong();
        URI uri = URI.create("ws://localhost:8080/event/rgb");
        socketClient.execute(uri, (WebSocketSession session) -> {
            Mono<WebSocketMessage> out = Mono.just(session.textMessage("12,13,14"));
            Flux<String> in = session
                    .receive()
                    .map(WebSocketMessage::getPayloadAsText);


            return session
                    .send(out)
                    .thenMany(in)
                    .doOnNext(str -> counter.incrementAndGet())
                    .then();

        }).subscribe();

        Thread.sleep(1000);

        Assertions.assertEquals(counter.get(), count);
    }
}