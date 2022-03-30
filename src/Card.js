import React from "react";
import styled from "styled-components";
import { removeWord, completedWord } from "./redux/modules/word";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Card = (props) => {
    //유즈히스토리 사용하기 위해 선언
    const history = useHistory();
    //디스패치 사용하기 위해 선언
    const dispatch = useDispatch();
    //리덕스스토어에서 리스트 불러오기
    const wordsList = useSelector((state) => state.word.list);
    console.log(wordsList);
    //저장하기 함수
    const removeWordcard = (index) => {
        dispatch(removeWord(index));
    };
    // 완료하기 함수
    const completedWordcard = (index) => {
        dispatch(completedWord(index));
    };
    // 수정하기 함수
    const updateWordcard = (index) => {
        history.push(`/newWord/${index}`);
    };

    return (
        <>
            {wordsList.map((word, i) => (
                <Box
                    key={
                        wordsList[i].voca.name +
                        wordsList[i].voca.meaning_sentence +
                        i
                    }
                    completed={wordsList[i].completed}
                >
                    <Text>{wordsList[i].voca.name}</Text>
                    <Text>{wordsList[i].voca.sign}</Text>
                    <Text>{wordsList[i].voca.meaning_name}</Text>
                    <Text>{wordsList[i].voca.sentence}</Text>
                    <Text>{wordsList[i].voca.meaning_sentence}</Text>
                    <ButtonBox>
                        <Button onClick={() => completedWordcard(i)}>완</Button>
                        <Button onClick={() => updateWordcard(i)}>수</Button>
                        <Button onClick={() => removeWordcard(i)}>삭</Button>
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
