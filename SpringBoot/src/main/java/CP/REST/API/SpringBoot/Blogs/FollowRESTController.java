package CP.REST.API.SpringBoot.Blogs;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import CP.REST.API.SpringBoot.Security.AllowAccessForResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * @RestController is used to indicate that the class contain the controller methods that interact handling
 * the HTTP requests.
 * @EnableWebSecurity is used to enable the authorization semantics annotations such as,
 * @Secured
 * @PreAuthorize
 * @PostAuthorize And,
 * @AllowAccessForResource is a custom annotation that is used for pre-authorization at method level.
 * These annotations helps users to access the resources based on their assigned roles and
 * maintain separation of  concerns.
 */
@RestController
@EnableMethodSecurity
public class FollowRESTController {

    private FollowRepo followRepo;
    private UserRepo userRepo;

    public FollowRESTController(FollowRepo followRepo, UserRepo userRepo) {
        this.followRepo = followRepo;
        this.userRepo = userRepo;
    }

    @AllowAccessForResource
    @PostMapping("/cprestapi/followers")
    public ResponseEntity<Follow> makeFollowers(
            @RequestParam(name = "user") String user,
            @RequestBody Follow follow
    ) {
        Optional<User> opUser = this.userRepo.findByUserName(user);
        User gotUser = opUser.get();
        follow.setUser(gotUser);
        this.followRepo.save(follow);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("{id}")
                .buildAndExpand(follow.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @AllowAccessForResource
    @GetMapping("/cprestapi/followers/{user}")
    public List<Follow> getFollowers(@PathVariable String user) {
        Optional<User> opUser = this.userRepo.findByUserName(user);
        User gotUser = opUser.get();
        List<Follow> getList = this.followRepo.findByUser(gotUser);
        return getList;
    }

    @AllowAccessForResource
    @GetMapping("/cprestapi/followers/check")
    public String checkIsPresent(
            @RequestParam(name = "parent") String parent,
            @RequestParam(name = "child") String child
    ) {
        Optional<User> opUser = this.userRepo.findByUserName(parent);
        User gotUser = opUser.get();
        List<Follow> getList = this.followRepo.findByUser(gotUser);
        for (Follow x : getList) {
            if (x.getUserName().equals(child)) {
                return "YES";
            }
        }
        return "NO";
    }

    @AllowAccessForResource
    @GetMapping("/cprestapi/following")
    public List<String> following(@RequestParam(name = "parent") String parent) {
        List<Follow> getList = this.followRepo.findByUserName(parent);
        List<String> ans = new ArrayList<>();
        for (Follow x : getList) {
            ans.add(x.getCeleb());
        }
        return ans;
    }

    @AllowAccessForResource
    @DeleteMapping("/cprestapi/removeUser")
    public String removeFollower(@RequestParam(name = "parent") String parent, @RequestParam(name = "child") String child) {
        Optional<User> opUser = this.userRepo.findByUserName(parent);
        User user = opUser.get();
        List<Follow> opFollowUser = this.followRepo.findByUserNameAndUser(user, child);
        Follow follow = opFollowUser.get(0);
        this.followRepo.delete(follow);
        return "OK";
    }
}
