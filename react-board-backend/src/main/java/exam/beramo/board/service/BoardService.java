package exam.beramo.board.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import exam.beramo.board.dto.PostSearchDTO;
import exam.beramo.board.model.Post;
import exam.beramo.board.repository.BoardRepository;
import exam.beramo.board.type.SearchType;

@Service
public class BoardService {

	@Autowired
	private BoardRepository boardRepository;
	
	public List<Post> getList(){
		return boardRepository.findAll();
	}
	
	public Post writePost(Post post){
		return boardRepository.save(post);
	}
	
	public Post modifyPost(Post post) {
		Post originalPost = boardRepository.findById(post.getId()).get();
		
		originalPost.setTitle(post.getTitle());
		originalPost.setContent(post.getContent());
		
		return boardRepository.save(originalPost);
	}
	
	public Optional<Post> getPostDetail(Post post) {
		return boardRepository.findById(post.getId());
	}
	
	public void deletePost(Post post) {
		boardRepository.deleteById(post.getId());
	}

	public List<Post> getSerchList(PostSearchDTO postSearch) {
		
		SearchType searchType =  postSearch.getSearchType();
		
		switch(searchType) {
			case titleOrContent : 
				return boardRepository.findPostsByTitleContainingOrContentContaining(postSearch.getSearchWord(), postSearch.getSearchWord());
			case title : 
				return boardRepository.findPostsByTitleContainingOrContentContaining(postSearch.getSearchWord(), null);
			case content : 
				return boardRepository.findPostsByTitleContainingOrContentContaining(null, postSearch.getSearchWord());
			case writer : 
				return boardRepository.findPostsByWriter(postSearch.getSearchWord());
		}
		
		return null;
	}
}
