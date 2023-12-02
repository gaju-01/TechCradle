package CP.REST.API.SpringBoot.Blogs;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name = "user_details")
public class User {
    @JsonProperty("id")
    @Id
    @GeneratedValue
    @JsonIgnore
    private int id;

    @JsonProperty("userName")
    @Size(min = 2, message = "Length of the user name must be greater than 1")
    private String userName;

    @JsonProperty("posts")
    @OneToMany(mappedBy = "user")
    private List<Blog> blogs;

    @JsonProperty("followers")
    @OneToMany(mappedBy = "user")
    private List<Follow> followers;

    @JsonProperty("email")
    @Email(message = "Enter a valid Email")
    private String email;

    public User() {

    }

    public User(String userName, String email) {
        this.userName = userName;
        this.email = email;
    }

    public void setID(int id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setBlogs(List<Blog> blogs) {
        this.blogs = blogs;
    }

    public void setFollowers(List<Follow> followers) {
        this.followers = followers;
    }

    public int getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

    public List<Blog> getBlogs() {
        return this.blogs;
    }

    public String getUserName() {
        return this.userName;
    }

    public List<Follow> getFollowers() {
        return this.followers;
    }
}
