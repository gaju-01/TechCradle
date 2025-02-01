package CP.REST.API.SpringBoot.Blogs;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepo extends JpaRepository<Follow, Integer> {
    List<Follow> findByUser(User user);

    List<Follow> findByCeleb(String celeb);

    List<Follow> findByUserName(String userName);

    @Query("SELECT f from Follow f WHERE f.user = :user AND f.userName = :userName")
    List<Follow> findByUserNameAndUser(@Param("user") User user, @Param("userName") String userName);
}
