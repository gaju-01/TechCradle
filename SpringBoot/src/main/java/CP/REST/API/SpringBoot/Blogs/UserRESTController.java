package CP.REST.API.SpringBoot.Blogs;

import CP.REST.API.SpringBoot.Email.EmailSenderService;
import jakarta.validation.Valid;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class UserRESTController {

    private UserRepo userRepo;
    private BlogRepo blogRepo;
    private FollowRepo followRepo;
    private EmailSenderService emailSenderService;

    @Autowired
    public UserRESTController(UserRepo userRepo, BlogRepo blogRepo, FollowRepo followRepo, EmailSenderService emailSenderService) {
        this.userRepo = userRepo;
        this.blogRepo = blogRepo;
        this.followRepo = followRepo;
        this.emailSenderService = emailSenderService;
    }

    @PostMapping(path = "/cprestapi/users/{name}/blogs")
    public ResponseEntity<?> createBlog(@PathVariable String name,  @RequestBody @Valid Blog blog, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) return ResponseEntity.badRequest().body(bindingResult.getAllErrors().get(0).getDefaultMessage());
        Optional<User> opUser = this.userRepo.findByUserName(name);
        if (opUser.isEmpty()) return ResponseEntity.badRequest().body("User does not exists");

        blog.setUser(opUser.get());
        Blog createdBlog = this.blogRepo.save(blog);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("{/id}").buildAndExpand(createdBlog.getId()).toUri();

        List<Follow> list = this.followRepo.findByFollowing(opUser.get());
        String id = createdBlog.getTitle();
        list.forEach(it -> {
            User follower = it.getFollower();
            String email = follower.getEmail();
            String link = "https://tech-cradle.vercel.app/home/blog/";
            String text = name + " has contributed a new blog\n Follow the link: " + link + "\n title of the blog is" + id;
            emailSenderService.sendEmail(email, "Blog Alert!!", text);
        });

        return ResponseEntity.created(location).build();
    }

    @PostMapping(path = "/cprestapi/users/createUser")
    public ResponseEntity<?> createUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors().get(0).getDefaultMessage());
        }
        Optional<User> opUserByUserName = this.userRepo.findByUserName(user.getUserName());
        Optional<User> opUserByEmail = this.userRepo.findByEmail(user.getEmail());
        if(opUserByUserName.isEmpty() && opUserByEmail.isEmpty()) {
            this.userRepo.save(user);
        } else if(!(opUserByUserName.isPresent() && opUserByEmail.isPresent() && opUserByUserName.get().getEmail().equals(user.getEmail()))){
            return ResponseEntity.badRequest().body("Enter the valid user name and email");
        }
        return ResponseEntity.ok("User verified");
    }
}
