package CP.REST.API.SpringBoot.Blogs;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepo extends JpaRepository<Blog, Integer> {
    Optional<Blog> findByTitle(String title);

    @Query("SELECT b.title from Blog b WHERE b.userName = :userName")
    List<String> findBlogTitlesByUserName(@Param("userName") String userName);
}
