package CP.REST.API.SpringBoot.Blogs;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
    @Size(min = 2, message = "Enter the valid user name")
    private String userName;

    @JsonProperty("posts")
    @OneToMany(mappedBy = "user")
    private List<Blog> blogs;

    @JsonProperty("followers")
    @OneToMany(mappedBy = "user")
    private List<Follow> followers;

    public User() {

    }

    public User(String userName) {
        this.userName = userName;
    }

    public void setID(int id) {
        this.id = id;
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
