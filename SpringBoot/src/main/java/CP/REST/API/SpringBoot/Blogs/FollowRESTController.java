package CP.REST.API.SpringBoot.Blogs;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class FollowRESTController {
    private FollowRepo followRepo;
    private UserRepo userRepo;

    public FollowRESTController(FollowRepo followRepo, UserRepo userRepo) {
        this.followRepo = followRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/cprestapi/following")
    public ResponseEntity<Follow> makeFollowers(@RequestParam(name = "user") String user,
            @RequestBody Follow follow) {
        Optional<User> opUser = this.userRepo.findByUserName(user);
        User gotUser = opUser.get();
        follow.setUser(gotUser);
        this.followRepo.save(follow);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").buildAndExpand(follow.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/cprestapi/following/{user}")
    public List<Follow> getFollowers(@PathVariable String user) {
        Optional<User> opUser = this.userRepo.findByUserName(user);
        User gotUser = opUser.get();
        List<Follow> getList = this.followRepo.findByUser(gotUser);
        return getList;
    }

    @GetMapping("/cprestapi/following/check")
    public String checkIsPresent(@RequestParam(name = "parent") String parent,
            @RequestParam(name = "child") String child) {
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
}
