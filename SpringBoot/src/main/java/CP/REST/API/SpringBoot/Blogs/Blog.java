package CP.REST.API.SpringBoot.Blogs;

import java.time.LocalTime;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import jakarta.persistence.GeneratedValue;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Blog {
    @JsonProperty("id")
    @Id
    @GeneratedValue
    @JsonIgnore
    private int id;

    @JsonProperty("title")
    @Size(min = 2)
    private String title;

    @JsonProperty("description")
    @Size(min = 10)
    private String description;

    @JsonProperty("lastmodified")
    private LocalTime lastmodified;

    @JsonProperty("price")
    private long price;

    @JsonProperty("sDesc")
    private String sDesc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    private String userName;

    public Blog() {

    }

    public Blog(String title, String description, long price, String sDesc) {
        this.title = title;
        this.description = description;
        this.lastmodified = LocalTime.now();
        this.price = price;
        this.sDesc = sDesc;
    }

    public void setID(int id) {
        this.id = id;
        this.lastmodified = LocalTime.now();
    }

    public void setUser(User user) {
        this.user = user;
        this.userName = user.getUserName();
    }

    public void setTitle(String title) {
        this.title = title;
        this.lastmodified = LocalTime.now();
    }
    public void setPrice(long price) {
        this.price = price;
        this.lastmodified = LocalTime.now();
    }

    public void setsDesc(String sDesc) {
        this.sDesc = sDesc;
        this.lastmodified = LocalTime.now();
    }
    public void setDescription(String description) {
        this.description = description;
        this.lastmodified = LocalTime.now();
    }

    public int getId() {
        return this.id;
    }

    public String getDescription() {
        return this.description;
    }

    public String getTitle() {
        return this.title;
    }

    public LocalTime getLastModified() {
        return this.lastmodified;
    }

    public User getUser() {
        return this.user;
    }

    public String getUserName() {
        return this.userName;
    }

    public long getPrice() {
        return this.price;
    }
    public String getsDesc() {
        return this.sDesc;
    }
}
