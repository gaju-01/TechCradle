package CP.REST.API.SpringBoot.ValidationToken;

import CP.REST.API.SpringBoot.Email.EmailSenderService;
import CP.REST.API.SpringBoot.Exceptions.BasicUserDefinedException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import CP.REST.API.SpringBoot.Blogs.UserRepo;
import CP.REST.API.SpringBoot.Blogs.User;

import java.util.Optional;
import java.util.Random;

@RestController
public class ValidationTokenRESTController {
    private final UserRepo userRepo;
    private final ValidationRepo validationRepo;
    private final EmailSenderService emailSenderService;

    public ValidationTokenRESTController(UserRepo userRepo, ValidationRepo validationRepo, EmailSenderService emailSenderService) {
        this.userRepo = userRepo;
        this.validationRepo = validationRepo;
        this.emailSenderService = emailSenderService;
    }

    @GetMapping(path = "/cprestapi/validate/gt")
    public String generateToken(@RequestParam(name = "userName") String userName, @RequestParam(name = "email") String email) {
        Optional<User> opUser = this.userRepo.findByUserName(userName);
        User user = opUser.get();
        Optional<ValidationToken> opVToken = this.validationRepo.findByUserName(userName);
        String text;
        if (opVToken.isPresent()) {
            this.validationRepo.deleteById(opVToken.get().getId());
        }
        ValidationToken vToken = new ValidationToken(user);
        vToken.setOTP();
        this.validationRepo.save(vToken);
        text = "Your verification token is: " + vToken.getOTP();
        this.emailSenderService.sendEmail(email, "Verification Token", text);
        return "OK";
    }

    @GetMapping(path = "/cprestapi/verify/gt")
    public String verifyToken(@RequestParam(name = "otp") String otp, @RequestParam(name = "userName") String userName) {
        if(otp == null || otp.length() != 6) {
            throw new BasicUserDefinedException("Enter the valid otp");
        }
        Optional<ValidationToken> opVToken = this.validationRepo.findByUserName(userName);
        int myOTP = Integer.parseInt(otp);
        if (opVToken.isPresent()) {
            if (myOTP != 0 && opVToken.get().getOTP() == myOTP) {
                this.validationRepo.deleteById(opVToken.get().getId());
                return "YES";
            } else {
                this.validationRepo.deleteById(opVToken.get().getId());
                throw new BasicUserDefinedException("Enter the valid otp");
            }
        } else {
            throw new BasicUserDefinedException("Enter the valid otp");
        }
    }
}
