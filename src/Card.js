import React from "react";
import styled from "styled-components";
import {
    loadWordFB,
    completedWordFB,
    removeWordFB,
} from "./redux/modules/word";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Card = (props) => {
    //유즈히스토리 사용하기 위해 선언
    const history = useHistory();
    //디스패치 사용하기 위해 선언
    const dispatch = useDispatch();

    //데이터를 FB에서 리덕스스토어로 보내는 함수
    React.useEffect(() => {
        dispatch(loadWordFB());
    }, []);
    //리덕스스토어에서 리스트 불러오기
    const wordsList = useSelector((state) => state.word.list);

    // console.log(wordsList);
    // console.log(wordsList[0].voca.completed);
    const removeWordcard = (wordList_id) => {
        dispatch(removeWordFB(wordList_id));
    };
    // 완료하기 함수
    const completedWordcard = (wordList_id) => {
        dispatch(completedWordFB(wordList_id));
    };
    // 수정하기 함수
    const updateWordcard = (index) => {
        history.push(`/newWord/${index}`);
    };

    return (
        <>
            {wordsList.map((word, i) => (
                <Box key={word.id} completed={word.voca.completed}>
                    <Text>{word.voca.name}</Text>
                    <Text>{word.voca.sign}</Text>
                    <Text>{word.voca.meaning_name}</Text>
                    <Text>{word.voca.sentence}</Text>
                    <Text>{word.voca.meaning_sentence}</Text>
                    <ButtonBox>
                        <Button onClick={() => completedWordcard(word.id)}>
                            완
                        </Button>
                        <Button onClick={() => updateWordcard(i)}>수</Button>
                        <Button onClick={() => removeWordcard(word.id)}>
                            삭
                        </Button>
                    </ButtonBox>
                </Box>
            ))}
        </>
    );
};

const Box = styled.div`
    width: 40vw;
    max-width: 500px;
    min-width: 300px;
    height: 150px;
    margin: 10px 10px;
    padding: 10px;

    border: 2px solid green;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    justify-content: space-evenly;

    position: relative;

    background: ${(props) => (props.completed ? "beige" : "transparent")};
`;

const Text = styled.div`
    margin: 2px;
    font-size: 12px;
`;

const ButtonBox = styled.div`
    width: 90px;
    display: flex;
    justify-content: space-evenly;

    // background: red;

    position: absolute;
    top: 10px;
    right: 10px;
`;

const Button = styled.button`
    margin: 2px;
    width: 25px;
`;

export default Card;
