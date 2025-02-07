package CP.REST.API.SpringBoot.Blogs;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
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
    @Size(min = 1)
    @Lob
    private String description;

    @JsonProperty("lastmodified")
    private LocalDate lastmodified;

    @JsonProperty("sDesc")
    private String sDesc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    private String userName;

    public Blog() {

    }

    public Blog(String title, String description, String sDesc) {
        this.title = title;
        this.description = description;
        this.lastmodified = LocalDate.now();
        this.sDesc = sDesc;
    }

    public void setID(int id) {
        this.id = id;
        this.lastmodified = LocalDate.now();
    }

    public void setUser(User user) {
        this.user = user;
        this.userName = user.getUserName();
    }

    public void setTitle(String title) {
        this.title = title;
        this.lastmodified = LocalDate.now();
    }

    public void setsDesc(String sDesc) {
        this.sDesc = sDesc;
        this.lastmodified = LocalDate.now();
    }

    public void setDescription(String description) {
        this.description = description;
        this.lastmodified = LocalDate.now();
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

    public LocalDate getLastModified() {
        return this.lastmodified;
    }

    public User getUser() {
        return this.user;
    }

    public String getUserName() {
        return this.userName;
    }

    public String getsDesc() {
        return this.sDesc;
    }
}
