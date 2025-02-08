package CP.REST.API.SpringBoot.APIKEY;

import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public interface APIDetailsInterface {
    String getAPIKey() throws IOException;
}
