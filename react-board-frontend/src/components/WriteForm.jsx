import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

let WriterAndTitleForm = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    div.writer-input-wrapper {
        width: 200px;
    }
    div.title-input-wrapper {
        width: 100%;
    }
`;

let ControlButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .btn {
        margin-right: 5px;
    }
`;

function WriteForm({writeType, id}) {

    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [writer, setWriter] = useState('');
    
    useEffect(() => {
        if(writeType === 'modify') {
            axios.get('http://localhost:8000/detail').then((res) => {
                console.log(res.data);
                setTitle(res.data.title);
                setContent(res.data.content);
                setWriter(res.data.writer)
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [])
    
    return (
        <div>
            <hr/>
            <WriterAndTitleForm>
                <div className="writer-input-wrapper">
                    <label htmlFor="writer">작성자</label>
                    <input type="text" id="writer" className="form-control" defaultValue={writer} disabled={writeType === 'modify'} onChange={(e)=>{setWriter(e.target.value)}}/>
                </div>
                <div className="title-input-wrapper">
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" className="form-control" defaultValue={title} onChange={(e) => {setTitle(e.target.value)}} />
                </div>
            </WriterAndTitleForm>

            <label htmlFor="content">글내용</label>
            <textarea id="content" className="form-control" defaultValue={content} onChange={(e) => {setContent(e.target.value)}}></textarea>

            <hr/>
            <ControlButtonsWrapper>
                <Link to='/list' className='btn btn-primary'>목록</Link>
                {
                    writeType==='write' ? <WriteButton writer={writer} title={title} content={content}/> : null
                }
                {
                    writeType==='modify' ? <ModifyButton writer={writer} id={id} title={title} content={content}/> : null
                }
            </ControlButtonsWrapper>
            <hr/>
        </div>
    )
}

function WriteButton({writer, title, content}) {
    const navigate = useNavigate();
    return (
        <button className="btn btn-success" onClick={() => {
            let writeData = {'writer':writer, 'title':title, 'content':content};
            axios.post('http://localhost:8000/write', writeData).then((res) => {
                navigate('/list');
            }).catch((error) => {
                console.log(error);
            })
        }}>작성</button>
    )
}

function ModifyButton({id, title, content}) {
    const navigate = useNavigate();
    return (
        <button className="btn btn-success" onClick={() => {
            let modifyData = {'id':id, 'title':title, 'content':content};
            axios.post('http://localhost:8000/modify', modifyData).then((res) => {
                navigate('/detail/'+id);
            }).catch((error) => {
                console.log(error);
            })
        }}>수정</button>
    )
}



export default WriteForm;