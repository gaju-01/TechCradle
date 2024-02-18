package CP.REST.API.SpringBoot.Blogs;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepo extends JpaRepository<Blog, Integer> {
    Optional<Blog> findByTitle(String title);
}
