package CP.REST.API.SpringBoot.Blogs;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUserName(String name);
    Optional<User> findByEmail(String email);
}
