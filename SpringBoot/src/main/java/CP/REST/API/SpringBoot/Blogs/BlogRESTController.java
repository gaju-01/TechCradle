package CP.REST.API.SpringBoot.Blogs;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import CP.REST.API.SpringBoot.Exceptions.BasicUserDefinedException;
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
// @EnableMethodSecurity
public class BlogRESTController {
    private BlogRepo repo;

    @Autowired
    public BlogRESTController(BlogRepo repo) {
        this.repo = repo;
    }

    // @AllowAccessForResource
    @GetMapping(path = "/cprestapi/blogs")
    public List<Blog> getAllBlogs() {
        return this.repo.findAll();
    }

    // @AllowAccessForResource
    @GetMapping(path = "/cprestapi/blogs/findblog")
    public String findBlog(@RequestParam(name = "title") String title) throws BasicUserDefinedException {
        if (title == null || title.equals("")) {
            throw new BasicUserDefinedException("Title should be minimum of 2 characters!!");
        }

        Optional<Blog> blog = this.repo.findByTitle(title);
        if (blog.isEmpty()) {
            return "The title is available";
        } else {
            return "The title is not available";
        }
    }

    // @AllowAccessForResource
    @PatchMapping(path = "/cprestapi/{name}/blogs/updateblog")
    public ResponseEntity<Blog> updateBlog(@PathVariable String name, @RequestBody Blog blog) {
        Optional<Blog> optionalBlog = this.repo.findByTitle(blog.getTitle());

        Blog myBlog = optionalBlog.get();
        if (myBlog.getUserName().equals(name)) {
            myBlog.setDescription(blog.getDescription());
            myBlog.setPrice(blog.getPrice());
            myBlog.setsDesc(blog.getsDesc());
            this.repo.save(myBlog);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(myBlog.getId())
                    .toUri();
            return ResponseEntity.created(location).build();
        } else {
            throw new BasicUserDefinedException("You are not the author of this blog!! So you cannot modify the blog!!");
        }
    }

    // @AllowAccessForResource
    @DeleteMapping(path = "/cprestapi/{name}/blogs/deleteblog")
    public void deleteBlog(@PathVariable String name, @RequestParam(name = "title") String title) {
        Optional<Blog> optionalBlog = this.repo.findByTitle(title);
        Blog blog = optionalBlog.get();
        if (!blog.getUserName().equals(name)) {
            throw new BasicUserDefinedException(
                    "You are not the author of this blog!! So you cannot delete the blog!!");
        } else {
            this.repo.delete(blog);
        }
    }

    @GetMapping(path = "/cprestapi/{name}/blogs/getblogtitles")
    public ResponseEntity<List<String>> getBlogTitles(@PathVariable String name) {
        List<String> blogs = this.repo.findBlogTitlesByUserName(name);
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }
}
