import React, { useState, useEffect } from "react";
import { createWord, updatedWord } from "./redux/modules/word";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const WordBox = (props) => {
    //수정할 단어의 인덱스와 수정할 단어
    const wordNum = props.match.params.wordNum;
    const presentWord = useSelector((state) => state.word.list[wordNum]?.voca);
    //수정해야 하는 페이지일 경우 기존에 저장된 단어를 불러온다.
    useEffect(() => {
        if (isNaN(wordNum)) {
            console.log("불러올 단어 없음, 단어를 새로 추가해주세요.");
        } else {
            setForm(presentWord);
        }
    }, []);
    //단어를 저장할 틀
    const [form, setForm] = useState({
        name: "",
        sign: "",
        meaning_name: "",
        sentence: "",
        meaning_sentence: "",
    });
    //각각 input에 입력한 값을 넣기 위한 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    // 저장, 수정할 단어를 리덕스에 디스패치한다.
    const dispatch = useDispatch();
    const saveWord = (form) => {
        dispatch(createWord(form));
    };
    const updateWord = (form) => {
        dispatch(updatedWord(form, wordNum));
    };

    // 저장하기 버튼을 누를 때 저장하기 위한 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        isNaN(wordNum) ? saveWord(form) : updateWord(form);
    };

    return (
        <Container>
            <Title>{isNaN(wordNum) ? "단어 추가하기" : "단어 수정하기"}</Title>

            <form onSubmit={handleSubmit}>
                <TextBox>
                    <label>
                        단어
                        <Line
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </label>
                </TextBox>
                <TextBox>
                    <label>
                        발음
                        <Line
                            type="text"
                            name="sign"
                            value={form.sign}
                            onChange={handleChange}
                        />
                    </label>
                </TextBox>
                <TextBox>
                    <label>
                        의미
                        <Line
                            type="text"
                            name="meaning_name"
                            value={form.meaning_name}
                            onChange={handleChange}
                        />
                    </label>
                </TextBox>
                <TextBox>
                    <label>
                        예문
                        <Line
                            type="text"
                            name="sentence"
                            value={form.sentence}
                            onChange={handleChange}
                        />
                    </label>
                </TextBox>
                <TextBox>
                    <label>
                        해석
                        <Line
                            type="text"
                            name="meaning_sentence"
                            value={form.meaning_sentence}
                            onChange={handleChange}
                        />
                    </label>
                </TextBox>
                <div>
                    <button type="submit">저장하기</button>
                </div>
            </form>
        </Container>
    );
};

const Container = styled.div`
    background-color: aliceblue;
    width: 100vw;
    max-width: 400px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
`;
const Title = styled.div`
    font-size: 20px;
    margin: 20px;
`;

const TextBox = styled.div`
    width: 100%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Line = styled.input`
    display: block;
    width: 90%;
    height: 30px;
    font-size: 20px;
    margin: 0 10px;
    background: transparent;
    border: none;
    border-bottom: 2px solid #ccc;
`;
export default WordBox;
