import { useParams } from "react-router-dom";
import WriteForm from "../components/WriteForm";
import { PageTitle } from "../styles/common-styled";

function Modify() {

    let {id} = useParams();

    return (
        <div>
            <PageTitle>글 수정</PageTitle>
            <WriteForm writeType={'modify'} id={id}/>
        </div>
    )

}

export default Modify;