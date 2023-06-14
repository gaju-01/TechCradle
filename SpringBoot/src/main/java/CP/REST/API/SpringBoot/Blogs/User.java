package CP.REST.API.SpringBoot.Blogs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Size;

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

    public User() {

    }

    public User(int id, String userName) {
        this.id = id;
        this.userName = userName;
    }

    public void setID(int id) {
        this.id = id;
    }

    public void setBlogs(List<Blog> blogs) {
        this.blogs = blogs;
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
}
