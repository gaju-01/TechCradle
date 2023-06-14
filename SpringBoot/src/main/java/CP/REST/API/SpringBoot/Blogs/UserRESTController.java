package CP.REST.API.SpringBoot.Blogs;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import CP.REST.API.SpringBoot.Exceptions.BasicUserDefinedException;
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
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("{/id}")
                .buildAndExpand(createdUser.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PostMapping(path = "/cprestapi/users/{name}/blogs")
    public ResponseEntity<Blog> createBlog(@PathVariable String name, @RequestBody @Valid Blog blog) {
        Optional<User> user = this.userRepo.findByUserName(name);
        if (user.isEmpty()) {
            throw new BasicUserDefinedException("User does not exsists");
        }

        blog.setUser(user.get());
        Blog createdBlog = this.blogRepo.save(blog);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("{/id}")
                .buildAndExpand(createdBlog.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

}
