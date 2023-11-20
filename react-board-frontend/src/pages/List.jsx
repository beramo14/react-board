import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PageTitle } from "../styles/common-styled";
import SearchForm from "../components/SearchForm";

let PostListTable = styled.table`
    width: 100%;
    tr{
        border-bottom: 1px solid lightgray;
    }
    th, td {
        padding: 5px 0;
        text-align: center;
    }
    td.title {
        text-align: left;
    }
`;

let ListControl = styled.div`
    display: flex;
    justify-content: space-between;
`;


function List() {

    let [postList, setPostList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/list').then((res)=>{
            console.log(res.data);
            setPostList(res.data);
        }).catch((error)=>{
            console.log(error)
        })
    }, []);

    return (
        <div>
            <PageTitle>글 목록</PageTitle>
            <ListControl>
                <SearchForm setPostList={setPostList}/>
                <Link to='/write' className='btn btn-success'>글 작성</Link>
            </ListControl>
            <PostListTable>
                <thead>
                    <tr>
                        <th width='6%'>#</th>
                        <th width='50%'>제목</th>
                        <th width='14%'>작성자</th>
                        <th width='30%'>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        postList.map((post)=>{
                            return (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td className="title">
                                        <Link to={'/detail/'+post.id}>{post.title}</Link>
                                    </td>
                                    <td>{post.writer}</td>
                                    <td>{new Date(post.createdAt).toLocaleString()}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </PostListTable>
        </div>
    )
}

export default List;