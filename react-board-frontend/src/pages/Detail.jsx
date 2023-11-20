import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageTitle } from "../styles/common-styled";
import styled from "styled-components";

let PostTitle = styled.h3`
    border-bottom: 1px solid lightgray;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
        font-size: 1rem;
    }
`;
let PostContent = styled.div`
    border-bottom: 1px solid lightgray;
    padding: 10px;
    margin: 10px 0;
`;

let ControlButtonsWrapper = styled.div`
    * {
        margin-right: 5px;
    }
`;

function Detail() {
    let navigate = useNavigate();

    let [post, setPost] = useState({});

    let {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/detail',{'params':{'id':id}}).then((res) => {
            console.log(res.data);
            setPost(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div>
            <PageTitle>글 상세</PageTitle>
            <PostTitle>{post.title}<span>{post.createdAt}</span></PostTitle>
            <PostContent>
                {post.content}
            </PostContent>
            <ControlButtonsWrapper>
                <Link to="/list" className="btn btn-primary">목록</Link>
                <Link to={"/modify/"+post.id} className='btn btn-warning'>수정</Link>
                <button className="btn btn-danger" onClick={() => {
                    axios.post('http://localhost:8000/delete',{'id':post.id}).then((res) => {
                        console.log(res.data);
                        navigate('/list');
                    }).catch((error) => {
                        console.log(error);
                    })
                }}>삭제</button>
            </ControlButtonsWrapper>
        </div>
    )
}

export default Detail;