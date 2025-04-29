package CP.REST.API.SpringBoot.ValidationToken;

import CP.REST.API.SpringBoot.Email.EmailSenderService;
import CP.REST.API.SpringBoot.Security.JwtAuthenticationResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import CP.REST.API.SpringBoot.Blogs.UserRepo;
import CP.REST.API.SpringBoot.Blogs.User;

import java.util.Optional;

@RestController
@EnableMethodSecurity
public class ValidationTokenRESTController {
    private final UserRepo userRepo;
    private final ValidationRepo validationRepo;
    private final EmailSenderService emailSenderService;

    private final JwtAuthenticationResource jwtAuthenticationResource;

    public ValidationTokenRESTController(UserRepo userRepo, ValidationRepo validationRepo, EmailSenderService emailSenderService, JwtAuthenticationResource jwtAuthenticationResource) {
        this.userRepo = userRepo;
        this.validationRepo = validationRepo;
        this.emailSenderService = emailSenderService;
        this.jwtAuthenticationResource = jwtAuthenticationResource;
    }

    @GetMapping(path = "/cprestapi/generateOTP")
    public ResponseEntity<?> generateToken(@RequestParam(name = "userName") String userName, @RequestParam(name = "email") String email) {
        Optional<User> opUser = this.userRepo.findByUserName(userName);
        User user = opUser.get();
        Optional<ValidationToken> opVToken = this.validationRepo.findByUserName(userName);
        String text;
        opVToken.ifPresent(validationToken -> this.validationRepo.deleteById(validationToken.getId()));
        ValidationToken vToken = new ValidationToken(user);
        vToken.setOTP();
        this.validationRepo.save(vToken);
        text = "Your verification token is: " + vToken.getOTP();
        this.emailSenderService.sendEmail(email, "Verification Token", text);
        return ResponseEntity.ok("OTP sent to your mail");
    }

    @GetMapping(path = "/cprestapi/verifyOTP")
    public ResponseEntity<?> verifyToken(@RequestParam(name = "otp") String otp, @RequestParam(name = "userName") String userName, Authentication authentication) {
        if (otp == null || otp.isEmpty() || userName == null || userName.isEmpty()) return ResponseEntity.badRequest().body("Enter valid OTP");
        Optional<ValidationToken> opVToken = this.validationRepo.findByUserName(userName);
        int myOTP = Integer.parseInt(otp);
        if (opVToken.isPresent() && opVToken.get().getOTP() == myOTP) {
            this.validationRepo.deleteById(opVToken.get().getId());
            return ResponseEntity.ok(this.jwtAuthenticationResource.createToken(authentication));
        } else {
            return ResponseEntity.badRequest().body("Enter valid OTP");
        }
    }
}
