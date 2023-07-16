package CP.REST.API.SpringBoot.Blogs;

import CP.REST.API.SpringBoot.Exceptions.BasicUserDefinedException;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class UserRESTController {

  private UserRepo userRepo;
  private BlogRepo blogRepo;

  @Autowired
  public UserRESTController(UserRepo userRepo, BlogRepo blogRepo) {
    this.userRepo = userRepo;
    this.blogRepo = blogRepo;
  }

  @GetMapping(path = "/cprestapi/users")
  public List<User> getAllUsers() {
    return this.userRepo.findAll();
  }

  @PostMapping(path = "/cprestapi/users")
  public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
    User createdUser = this.userRepo.save(user);
    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("{/id}")
      .buildAndExpand(createdUser.getId())
      .toUri();
    return ResponseEntity.created(location).build();
  }

  @PostMapping(path = "/cprestapi/users/{name}/blogs")
  public ResponseEntity<Blog> createBlog(
    @PathVariable String name,
    @RequestBody @Valid Blog blog
  ) {
    Optional<User> user = this.userRepo.findByUserName(name);
    if (user.isEmpty()) {
      throw new BasicUserDefinedException("User does not exsists!!");
    }
    if (blog.getDescription().length() < 10) {
      throw new BasicUserDefinedException(
        "Description should be minimum of 10 characters!!"
      );
    }

    blog.setUser(user.get());
    Blog createdBlog = this.blogRepo.save(blog);
    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("{/id}")
      .buildAndExpand(createdBlog.getId())
      .toUri();
    return ResponseEntity.created(location).build();
  }

  @GetMapping(path = "/cprestapi/users/checkuser")
  public String checkUser(@RequestParam(name = "user") String user) {
    Optional<User> opUser = this.userRepo.findByUserName(user);
    if (opUser.isEmpty()) {
      return "NO";
    } else {
      return "YES";
    }
  }
}
