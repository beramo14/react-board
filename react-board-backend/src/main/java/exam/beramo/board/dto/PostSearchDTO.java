package exam.beramo.board.dto;

import exam.beramo.board.type.SearchType;
import lombok.Data;

@Data
public class PostSearchDTO {
	
	private SearchType searchType;
	private String searchWord;

}
