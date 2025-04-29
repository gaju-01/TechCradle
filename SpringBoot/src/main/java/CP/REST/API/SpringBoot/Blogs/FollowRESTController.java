package CP.REST.API.SpringBoot.Blogs;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class FollowRESTController {

    private UserRepo userRepo;
    private FollowRepo followRepo;

    public FollowRESTController(FollowRepo followRepo, UserRepo userRepo) {
        this.userRepo = userRepo;
        this.followRepo = followRepo;
    }

    @PostMapping("/cprestapi/follow")
    public ResponseEntity<?> makeFollowing(@RequestParam(name = "follower") String follower, @RequestParam(name = "following") String  following) {
        User followerEntity = this.userRepo.findByUserName(follower).get(), followingEntity = this.userRepo.findByUserName(following).get();
        Follow followEntity = new Follow(followerEntity, followingEntity);
        this.followRepo.save(followEntity);
        return ResponseEntity.ok("You are now following " + following);
    }

    @GetMapping("/cprestapi/followers/{userName}")
    public ResponseEntity<?> getFollowers(@PathVariable String userName) {
        User followingEntity = this.userRepo.findByUserName(userName).get();
        List<Follow> followers = this.followRepo.findByFollowing(followingEntity);
        List<String> followerUserNames = new ArrayList<>();
        for (Follow followEntity: followers) {
            followerUserNames.add(followEntity.getFollower().getUserName());
        }
        return ResponseEntity.ok(followerUserNames);
    }

    @GetMapping("/cprestapi/following/{userName}")
    public ResponseEntity<?> getFollowing(@PathVariable String userName) {
        User followerEntity = this.userRepo.findByUserName(userName).get();
        List<Follow> following = this.followRepo.findByFollower(followerEntity);
        List<String> followingUserNames = new ArrayList<>();
        for (Follow followEntity: following) {
            followingUserNames.add(followEntity.getFollowing().getUserName());
        }
        return ResponseEntity.ok(followingUserNames);
    }

    @DeleteMapping("/cprestapi/removeFollowing")
    public ResponseEntity<?> removeFollowing(@RequestParam(name = "following") String following, @RequestParam(name = "follower") String follower) {
        User followingEntity = this.userRepo.findByUserName(following).get(), followerEntity = this.userRepo.findByUserName(follower).get();
        List<Follow> followersFollowingList = this.followRepo.findByFollowingAndFollower(followingEntity, followerEntity);
        Follow followEntity = followersFollowingList.get(0);
        this.followRepo.delete(followEntity);
        return ResponseEntity.ok("Unfollowed " + following);
    }

    @GetMapping("/cprestapi/followers/check")
    public ResponseEntity<?> checkIsPresent(@RequestParam(name = "following") String following, @RequestParam(name = "follower") String follower) {
        User followingEntity = this.userRepo.findByUserName(following).get();
        List<Follow> getList = this.followRepo.findByFollowing(followingEntity);
        boolean isFollowing = false;
        for (Follow x : getList) {
            if (x.getFollower().getUserName().equals(follower)) {
                isFollowing = true;
                break;
            }
        }
        return ResponseEntity.ok(isFollowing);
    }
}
