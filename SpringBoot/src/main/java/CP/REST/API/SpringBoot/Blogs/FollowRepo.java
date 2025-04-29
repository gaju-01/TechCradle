package CP.REST.API.SpringBoot.Blogs;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepo extends JpaRepository<Follow, Integer> {
    List<Follow> findByFollowing(User following);

    List<Follow> findByFollower(User follower);

    @Query("SELECT f from Follow f WHERE f.following = :following AND f.follower = :follower")
    List<Follow> findByFollowingAndFollower(@Param("following") User following, @Param("follower") User follower);
}
