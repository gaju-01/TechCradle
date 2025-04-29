package CP.REST.API.SpringBoot.Blogs;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Entity
public class Blog {

    @Getter
    @Id
    @GeneratedValue
    @JsonIgnore
    private int id;

    @Getter
    @Size(min = 2, message = "The title should have minimum of 2 characters")
    private String title;

    @Lob
    @Getter
    private String description;

    private LocalDate lastmodified;

    @Getter
    @Size(min = 5, message = "The short description should have minimum of 4 characters")
    private String shortDescription;

    @Getter
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Blog() {

    }

    public Blog(String title, String description, String shortDescription) {
        this.title = title;
        this.description = description;
        this.lastmodified = LocalDate.now();
        this.shortDescription = shortDescription;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTitle(String title) {
        this.title = title;
        this.lastmodified = LocalDate.now();
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
        this.lastmodified = LocalDate.now();
    }

    public void setDescription(String description) {
        this.description = description;
        this.lastmodified = LocalDate.now();
    }

}
