package CP.REST.API.SpringBoot.Blogs;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepo extends JpaRepository<Follow, Integer> {
  List<Follow> findByUser(User user);
  List<Follow> findByCeleb(String celeb);
  List<Follow> findByUserName(String username);
}
