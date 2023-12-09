package CP.REST.API.SpringBoot.ValidationToken;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import CP.REST.API.SpringBoot.Blogs.User;
import java.util.Random;

@Entity(name = "validation_token")
public class ValidationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne(targetEntity = User.class)
    @JsonIgnore
    User user;

    @Column(name="userName")
    private String userName;

    @Column(name = "otp")
    @JsonIgnore
    private long otp;

    public ValidationToken () {

    }
    public ValidationToken(User user) {
        this.user = user;
        this.userName = user.getUserName();
    }

    public long getId() {
        return this.id;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setOTP() {
        Random random = new Random();
        random.setSeed(random.nextInt());
        this.otp = random.nextInt(899999) + 100000;
    }

    public long getOTP() {
        return this.otp;
    }
}
