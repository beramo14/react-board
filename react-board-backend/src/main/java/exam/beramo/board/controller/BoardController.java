package exam.beramo.board.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import exam.beramo.board.dto.PostSearchDTO;
import exam.beramo.board.model.Post;
import exam.beramo.board.service.BoardService;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@Slf4j
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	
	//게시물 리스트 GET
	@GetMapping("/list")
	public ResponseEntity<?> getList() {
		
		List<Post> postList = boardService.getList();
		return ResponseEntity.ok().body(postList);
	}
	@GetMapping("/search")
	public ResponseEntity<?> getSearchList(PostSearchDTO postSearch) {
		log.info("{}, {}", postSearch.getSearchType(), postSearch.getSearchWord());
		
		List<Post> postList = boardService.getSerchList(postSearch);
		return ResponseEntity.ok().body(postList);
	}
	
	//글 작성
	@PostMapping("/write")
	public ResponseEntity<?> doWrite(@RequestBody Post post) {
		Post savedPost = boardService.writePost(post);
		return ResponseEntity.ok().body(savedPost);
	}
	
	@PostMapping("/modify")
	public ResponseEntity<?> doModify(@RequestBody Post post) {
		Post savedPost = boardService.modifyPost(post);
		return ResponseEntity.ok().body(savedPost);
	}
	
	@GetMapping("/detail")
	public ResponseEntity<?> getPostDetail(Post post) {
		
		Optional<Post> findedPost = boardService.getPostDetail(post);
		
		if(findedPost.isPresent() == true) {
			return ResponseEntity.ok().body(findedPost.get());
		} else {
			return ResponseEntity.badRequest().body(post.getId());
		}
	}
	
	@PostMapping("/delete")
	public ResponseEntity<?> doDelete(@RequestBody Post post) {
		boardService.deletePost(post);
		return ResponseEntity.ok().body(null);
	}
	
}
