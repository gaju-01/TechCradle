package CP.REST.API.SpringBoot.Blogs;

import CP.REST.API.SpringBoot.Email.EmailSenderService;
import CP.REST.API.SpringBoot.Exceptions.BasicUserDefinedException;
import CP.REST.API.SpringBoot.Security.AllowAccessForResource;
import CP.REST.API.SpringBoot.Security.AllowAccessForResourceV2;
import jakarta.validation.Valid;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * @RestController is used to indicate that the class contain the controller methods that interact handling
 * the HTTP requests.
 * @EnableWebSecurity is used to enable the authorization semantics annotations such as,
 * @Secured
 * @PreAuthorize
 * @PostAuthorize And,
 * @AllowAccessForResource and @AllowAccessForResourceV2 are custom annotation that are used for pre-authorization at method level.
 * These annotations help users to access the resources based on their assigned roles and
 * maintain separation of  concerns.
 */
@RestController
@EnableMethodSecurity
public class UserRESTController {

    private UserRepo userRepo;
    private BlogRepo blogRepo;
    private FollowRepo followRepo;
    private EmailSenderService emailSenderService;

    @Autowired
    public UserRESTController(UserRepo userRepo, BlogRepo blogRepo, FollowRepo followRepo,
                              EmailSenderService emailSenderService) {
        this.userRepo = userRepo;
        this.blogRepo = blogRepo;
        this.followRepo = followRepo;
        this.emailSenderService = emailSenderService;
    }

    @AllowAccessForResourceV2
    @GetMapping(path = "/cprestapi/users")
    public List<User> getAllUsers() {
        return this.userRepo.findAll();
    }

    @AllowAccessForResourceV2
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

    @AllowAccessForResource
    @PostMapping(path = "/cprestapi/users/{name}/blogs")
    public ResponseEntity<Blog> createBlog(
            @PathVariable String name,
            @RequestBody @Valid Blog blog) {
        Optional<User> user = this.userRepo.findByUserName(name);
        if (user.isEmpty()) {
            throw new BasicUserDefinedException("User does not exsists!!");
        }

        blog.setUser(user.get());
        Blog createdBlog = this.blogRepo.save(blog);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("{/id}")
                .buildAndExpand(createdBlog.getId())
                .toUri();

        Optional<User> me = this.userRepo.findByUserName(name);
        List<Follow> list = this.followRepo.findByUser(me.get());
        String id = createdBlog.getTitle();
        list.forEach(it -> {
            User follower = this.userRepo.findByUserName(it.getUserName()).get();
            String email = follower.getEmail();
            String link = "http://localhost:3000/home/blog/";
            String text = name + " has contributed a new blog\n Follow the link: " + link + "\n title of the blog is" + id;
            emailSenderService.sendEmail(email, "Blog Alert!!", text);
        });

        return ResponseEntity.created(location).build();
    }

    @AllowAccessForResourceV2
    @GetMapping(path = "/cprestapi/users/checkuser")
    public String checkUser(@RequestParam(name = "user") String user, @RequestParam(name = "email") String email) {
        Optional<User> opUser = this.userRepo.findByUserName(user);
        Optional<User> opUser1 = this.userRepo.findByEmail(email);
        if (opUser.isEmpty()) {
            if (opUser1.isEmpty()) {
                return "NO";
            } else {
                return "NOTOK";
            }
        } else {
            if (opUser.get().getEmail().equals(email)) {
                return "OK";
            } else {
                return "NOTOK";
            }
        }
    }
}
