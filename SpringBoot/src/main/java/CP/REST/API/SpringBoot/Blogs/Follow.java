package CP.REST.API.SpringBoot.Blogs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Entity
public class Follow {

    @Id
    @Getter
    @GeneratedValue
    @JsonIgnore
    private int id;

    @Getter
    @ManyToOne(fetch = FetchType.LAZY)
    private User follower;

    @Getter
    @ManyToOne(fetch = FetchType.LAZY)
    private User following;

    public Follow() {

    }

    public Follow(User follower, User following) {
        this.follower = follower;
        this.following = following;
    }
}
