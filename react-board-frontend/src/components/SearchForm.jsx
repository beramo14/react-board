import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

let SearchFormWrapper = styled.div`
    display:flex;
    gap: 5px;
    input[type='text'] {
        width: 230px;
    }
    select {
        width: 120px;
    }
`;
let SearchWordWrapper = styled.div`
    position: relative;
`;
let SearchWordDeleteButton = styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    margin: 0;
    padding: 0;
    border: 0;
    color: gray;
    background-color: transparent;
`;

function SearchForm({setPostList}) {

    console.log("test!!!!!!!")
    let [searchWord, setSearchWord] = useState('');
    let [searchType, setSearchType] = useState('titleOrContent');
    
    return (
        <SearchFormWrapper>
            <SearchWordWrapper>
                <input type="text" className="form-control" value={searchWord} onChange={ (e)=>{setSearchWord(e.target.value)} }/>
                <SearchWordDeleteButton onClick={()=>{setSearchWord('')}}>x</SearchWordDeleteButton>
            </SearchWordWrapper>
            <select className="form-select" onChange={ (e)=>{setSearchType(e.target.value)} }>
                <option value="titleOrContent">제목/내용</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="writer">작성자</option>
            </select>
            <button className="btn btn-primary" onClick={()=>{
                let data = {"searchWord":searchWord,'searchType':searchType}
                console.log(data);
                axios.get('http://localhost:8000/search',{'params':data}).then((res) => {
                    console.log(res.data);
                    setPostList(res.data)
                }).catch((error)=>{
                    console.log(error);
                })
            }}>검색</button>
        </SearchFormWrapper>
    )
}

export default SearchForm;