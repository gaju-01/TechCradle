package CP.REST.API.SpringBoot.Blogs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity(name = "Profile")
public class Profile {
    @JsonIgnore
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @JsonProperty("user")
    @OneToOne(targetEntity = User.class)
    User user;

    @JsonProperty("profilePic")
    String fileName;

    @JsonProperty("path")
    String filePath;

    @JsonProperty("type")
    String type;

    public Profile() {

    }

    public Profile(User user) {
        this.user = user;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
    public void setType(String fileType) {
        this.type = fileType;
    }

    public String getFileName() {
        return this.fileName;
    }
    public long getId() {
        return this.id;
    }

    public User getUser() {
        return this.user;
    }
}
