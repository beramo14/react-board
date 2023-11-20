import WriteForm from "../components/WriteForm";
import { PageTitle } from "../styles/common-styled";

function Write() {

    return (
        <div>
            <PageTitle>글 작성</PageTitle>
            <WriteForm writeType={'write'}/>
        </div>
    )
}

export default Write;