package CP.REST.API.SpringBoot.APIKEY;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
public class APIDetailsService {

    APIDetailsInterface apiDetailsInterface;

    @Autowired
    public APIDetailsService(GeminiAPIDetails geminiAPIDetails) {
        this.apiDetailsInterface = geminiAPIDetails;
    }
    public String getAPIKey() throws IOException {
        return this.apiDetailsInterface.getAPIKey();
    }
}
