package com.mycompany.myapp.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Blog;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.service.BlogService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.errors.EmailAlreadyUsedException;
import com.mycompany.myapp.web.rest.errors.LoginAlreadyUsedException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;

@RestController
@RequestMapping("/api")
public class BlogResource {
    private final BlogService blogService;
    
    public BlogResource(BlogService blogService) {
        this.blogService = blogService;
    }
    
    @PostMapping("/blogs")
    @Timed
    public ResponseEntity<Blog> createBlog(@Valid @RequestBody Blog blog) throws URISyntaxException {
        if (blog.getId() != null) {
            throw new BadRequestAlertException("A new user cannot already have an ID", "userManagement", "idexists");
            // Lowercase the user login before comparing with database
        } else {
            Blog newBlog = blogService.createBlog(blog);
            return ResponseEntity.created(new URI("/api/blogs/" + newBlog.getId()))
                .headers(HeaderUtil.createAlert( "A user is created with identifier ", blog.getTitle()))
                .body(newBlog);
        }
    }

    /**
     * PUT /users : Updates an existing User.
     *
     * @param userDTO the user to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated user
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already in use
     * @throws LoginAlreadyUsedException 400 (Bad Request) if the login is already in use
     */
    @PutMapping("/blogs")
    @Timed
    public Blog updateBlog(@Valid @RequestBody Blog blog) {
        Blog updatedBlog = blogService.updateBlog(blog);
        return updatedBlog;
    }

    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/blogs")
    @Timed
    public List<Blog> getAllUsers() {
    	List<Blog> blogs = blogService.findAll();
    	return blogs;
    }
    
    @GetMapping("/blogs/{id}")
    @Timed
    public Blog getBlog(@PathVariable Long id) {
        return blogService.findOne(id);
    }

    /**
     * DELETE /users/:login : delete the "login" User.
     *
     * @param login the login of the user to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blogs/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert( "A user is deleted with identifier " + id, String.valueOf(id))).build();
    }
}
