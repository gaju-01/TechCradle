package CP.REST.API.SpringBoot.Security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Authentication {
    @GetMapping("/cprestapi/auth")
    public String basicAuthCheck() {
        return "Success!!";
    }
}
