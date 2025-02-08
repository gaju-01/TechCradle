package CP.REST.API.SpringBoot.APIKEY;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class GeminiAPIDetails implements APIDetailsInterface {

    @Override
    public String getAPIKey() throws IOException {
        JsonMapper jsonMapper = new JsonMapper();
        JsonNode jsonNode = jsonMapper.readTree(new File("src/main/resources/GeminiSecret.json"));
        return jsonNode.get("GEMINI_APIKEY").asText();
    }
}
