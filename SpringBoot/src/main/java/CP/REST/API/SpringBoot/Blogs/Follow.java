package CP.REST.API.SpringBoot.Blogs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Follow {

  @JsonProperty("id")
  @Id
  @GeneratedValue
  @JsonIgnore
  private int id;

  @JsonProperty("userName")
  private String userName;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIgnore
  private User user;

  @JsonProperty("celeb")
  private String celeb;
  
  public Follow() {}

  public Follow(String userName) {
    this.userName = userName;
  }

  public void setUser(User user) {
    this.user = user;
    this.celeb = user.getUserName();
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public int getId() {
    return this.id;
  }

  public String getUserName() {
    return this.userName;
  }

  public User getUser() {
    return this.user;
  }

  public String getCeleb() {
    return this.celeb;
  }
}
