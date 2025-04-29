package CP.REST.API.SpringBoot.Blogs;

import java.util.List;

import CP.REST.API.SpringBoot.ValidationToken.ValidationToken;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Entity(name = "user_details")
public class User {
    @Id
    @GeneratedValue
    @JsonIgnore
    private long id;

    @Getter
    @Size(min = 2, max = 9, message = "Length of the user name must be greater than 1 and less than 10")
    private String userName;

    @Getter
    @OneToMany(mappedBy = "user")
    private List<Blog> blogs;

    @OneToMany(mappedBy = "following")
    private List<Follow> followers;

    @OneToMany(mappedBy = "follower")
    private List<Follow> followings;

    @Getter
    @Email(message = "Enter a valid Email")
    private String email;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    ValidationToken vToken;

    public User() {

    }

    public User(String userName, String email) {
        this.userName = userName;
        this.email = email;
    }

    public void setBlogs(List<Blog> blogs) {
        this.blogs = blogs;
    }

}
