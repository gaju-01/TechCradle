package CP.REST.API.SpringBoot.Blogs;

import java.net.URI;
import java.util.*;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class BlogRESTController {
    private BlogRepo blogRepo;
    private  UserRepo userRepo;
    @Autowired
    public BlogRESTController(BlogRepo blogRepo, UserRepo userRepo) {
        this.userRepo = userRepo;
        this.blogRepo = blogRepo;
    }

    @GetMapping(path = "/cprestapi/blogs")
    public ResponseEntity<?> getAllBlogs() {
        List<Blog> blogList = this.blogRepo.findAll();
        List<Map<String, String>> blogMappings = new ArrayList<>();
        blogList.forEach(blog -> {
            Map<String, String> blogMapping = new HashMap<>();
            blogMapping.put("title", blog.getTitle());
            blogMapping.put("userName", blog.getUser().getUserName());
            blogMapping.put("description" , blog.getDescription());
            blogMapping.put("shortDescription", blog.getShortDescription());
            blogMappings.add(blogMapping);
        });

        return ResponseEntity.ok(blogMappings);
    }

    @GetMapping(path = "/cprestapi/blogs/findblog")
    public ResponseEntity<?> findBlog(@RequestParam(name = "title") String title) {
        Optional<Blog> opBlog = this.blogRepo.findByTitle(title);
       if(opBlog.isEmpty()) return ResponseEntity.ok().body("The title is available");
       else return ResponseEntity.badRequest().body("The title is not available");
    }

    @PatchMapping(path = "/cprestapi/{name}/blogs/updateblog")
    public ResponseEntity<?> updateBlog(@PathVariable String name, @RequestBody @Valid  Blog blog, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) return ResponseEntity.badRequest().body(bindingResult.getAllErrors().get(0).getDefaultMessage());
        Optional<Blog> optionalBlog = this.blogRepo.findByTitle(blog.getTitle());

        Blog myBlog = optionalBlog.get();
        if (myBlog.getUser().getUserName().equals(name)) {
            myBlog.setDescription(blog.getDescription());
            myBlog.setShortDescription(blog.getShortDescription());
            this.blogRepo.save(myBlog);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(myBlog.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.badRequest().body("Enter the valid title or you are not the author of the blog");
        }
    }

    @DeleteMapping(path = "/cprestapi/{name}/blogs/deleteblog")
    public ResponseEntity<?> deleteBlog(@PathVariable String name, @RequestParam(name = "title") String title) {
        Optional<Blog> optionalBlog = this.blogRepo.findByTitle(title);
        Blog blog = optionalBlog.get();
        if (!blog.getUser().getUserName().equals(name)) {
            return ResponseEntity.badRequest().body("Enter the valid title or you are not the author of the blog");
        } else {
            this.blogRepo.delete(blog);
            return ResponseEntity.ok("Successfully deleted the blog");
        }
    }

    @GetMapping(path = "/cprestapi/{name}/blogs/getblogtitles")
    public ResponseEntity<?> getBlogTitles(@PathVariable String name) {
        User userEntity = this.userRepo.findByUserName(name).get();
        List<String> blogs = this.blogRepo.findBlogTitlesByUser(userEntity);
        return ResponseEntity.ok(blogs);
    }
}
