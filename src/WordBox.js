import React, { useState, useEffect } from "react";
import { createWordFB, updatedWordFB } from "./redux/modules/word";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const WordBox = (props) => {
    const history = useHistory();
    //수정할 단어의 인덱스와 수정할 단어, 수정할 단어의 아이디.
    const wordNum = props.match.params.wordNum;
    const presentWord = useSelector((state) => state.word.list[wordNum]?.voca);
    const presentWordId = useSelector((state) => state.word.list[wordNum]?.id);
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
        completed: false,
    });
    //각각 input에 입력한 값을 넣기 위한 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    // 저장, 수정할 단어를 리덕스에 디스패치한다.
    const dispatch = useDispatch();
    const saveWord = (form) => {
        dispatch(createWordFB(form));
        window.alert("저장완료!");
        window.location.reload();
    };
    const updateWord = (form) => {
        dispatch(updatedWordFB(form, presentWordId));
        window.alert("수정완료!");
        props.history.push("/");
    };

    // 저장하기 버튼을 누를 때 저장하기 위한 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        isNaN(wordNum) ? saveWord(form) : updateWord(form);
    };

    return (
        <Container>
            <Title style={{ fontSize: "40px" }}>
                {isNaN(wordNum) ? "New Word" : "Correct Word"}
            </Title>
            <form onSubmit={handleSubmit}>
                <TextBox>
                    <Label>
                        English
                        <Line
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </Label>
                </TextBox>
                <TextBox>
                    <Label>
                        Pronunciation
                        <Line
                            type="text"
                            name="sign"
                            value={form.sign}
                            onChange={handleChange}
                        />
                    </Label>
                </TextBox>
                <TextBox>
                    <Label>
                        Korean
                        <Line
                            type="text"
                            name="meaning_name"
                            value={form.meaning_name}
                            onChange={handleChange}
                        />
                    </Label>
                </TextBox>
                <TextBox>
                    <Label>
                        Example
                        <Line
                            type="text"
                            name="sentence"
                            value={form.sentence}
                            onChange={handleChange}
                        />
                    </Label>
                </TextBox>
                <TextBox>
                    <Label>
                        Meaning
                        <Line
                            type="text"
                            name="meaning_sentence"
                            value={form.meaning_sentence}
                            onChange={handleChange}
                        />
                    </Label>
                </TextBox>
                <SaveBox>
                    <Button type="submit">
                        <ButtonIcon src="/images/save.png" alt="saveIcon" />
                    </Button>
                    <Button type="button" onClick={() => history.push("/")}>
                        <ButtonIcon src="/images/home.png" alt="homeIcon" />
                    </Button>
                </SaveBox>
            </form>
        </Container>
    );
};

const Container = styled.div`
    background-color: #ffdc90;
    max-width: 500px;
    margin: 0 auto;

    border: 1px solid pink;

    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    font-size: 25px;
    margin: 50px auto;
`;

const TextBox = styled.div`
    margin: 10px;
    display: flex;
`;

const Label = styled.label`
    width: 60vw;
    max-width: 450px;
    height: 70px;
    font-size: 20px;
`;
const Line = styled.input`
    width: 100%;
    height: 30px;
    font-size: 25px;
    background: transparent;

    border: none;
    border-bottom: 1px solid #bbb;
`;

const SaveBox = styled.div`
    height: 140px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const Button = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
`;
const ButtonIcon = styled.img`
    width: 50px;
    height: 50px;
    background: transparent;
    &:hover {
        transform: rotate(-5deg);
    }
`;

export default WordBox;
