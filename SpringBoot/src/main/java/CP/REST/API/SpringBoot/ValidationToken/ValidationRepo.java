package CP.REST.API.SpringBoot.ValidationToken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ValidationRepo extends JpaRepository<ValidationToken, Long> {
    Optional<ValidationToken> findByUserName(String userName);
}
