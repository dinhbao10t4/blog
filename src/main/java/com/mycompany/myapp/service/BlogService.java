package com.mycompany.myapp.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mycompany.myapp.domain.Blog;
import com.mycompany.myapp.repository.BlogRepository;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class BlogService {
	private final Logger log = LoggerFactory.getLogger(BlogService.class);
	
	private final BlogRepository blogRepository;
	
	public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }
	
	public List<Blog> findAll(){
		return blogRepository.findAll();
	}
	
	public Blog createBlog(Blog blog) {
		return blogRepository.save(blog);
	}
	
	public Blog updateBlog(Blog blog) {
		return blogRepository.save(blog);
	}
	
	public Blog findOne(Long id) {
		return blogRepository.findOne(id);
	}
	
	public void deleteBlog(Long id) {
		blogRepository.delete(id);
	}
}
