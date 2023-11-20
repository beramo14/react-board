package exam.beramo.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import exam.beramo.board.model.Post;

public interface BoardRepository extends JpaRepository<Post, Long> {
	
	List<Post> findPostsByTitleContainingOrContentContaining(String searchWord1, String searchWord2);
	List<Post> findPostsByWriter(String searchWord);
	
}
