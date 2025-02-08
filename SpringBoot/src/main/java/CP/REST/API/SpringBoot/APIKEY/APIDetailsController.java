package CP.REST.API.SpringBoot.APIKEY;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class APIDetailsController {

    private final APIDetailsService apiDetailsService;
    @Autowired
    public APIDetailsController(APIDetailsService apiDetailsService) {
        this.apiDetailsService = apiDetailsService;
    }
    @GetMapping(path = "/cprestapi/textgenerator/apikey")
    public ResponseEntity<String> getAPIKey() throws IOException {
        return ResponseEntity.ok(apiDetailsService.getAPIKey());
    }
}
