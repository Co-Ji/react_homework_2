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
                <CardBox key={word.id} completed={word.voca.completed}>
                    <Text style={{ color: "red", fontSize: "3em" }}>
                        {word.voca.name}
                    </Text>
                    <Text
                        style={{
                            marginTop: "-10px",
                            marginBottom: "15px",
                            color: "hotpink",
                        }}
                    >
                        [{word.voca.sign}]
                    </Text>
                    <Text>{word.voca.meaning_name}</Text>
                    <Text>{word.voca.sentence}</Text>
                    <Text>{word.voca.meaning_sentence}</Text>
                    <ButtonBox>
                        <Button onClick={() => completedWordcard(word.id)}>
                            <CardIcon
                                src="/images/complete.png"
                                alt="completeIcon"
                            />
                        </Button>
                        <Button onClick={() => updateWordcard(i)}>
                            <CardIcon
                                src="/images/update.png"
                                alt="updateIcon"
                            />
                        </Button>
                        <Button onClick={() => removeWordcard(word.id)}>
                            <CardIcon
                                src="/images/delete.png"
                                alt="deleteIcon"
                            />
                        </Button>
                    </ButtonBox>
                </CardBox>
            ))}
            <AddButton
                onClick={() => {
                    history.push("/newWord/:wordNum");
                }}
            >
                <AddIcon src="/images/addWord.png" alt="addWordIcon" />
            </AddButton>
        </>
    );
};

const CardBox = styled.div`
    width: 35vw;
    max-width: 400px;
    min-width: 300px;
    min-height: 300px;
    height: auto;
    margin: 10px 10px;
    padding: 10px;

    border: 1px solid pink;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    justify-content: space-around;

    position: relative;

    background: ${(props) => (props.completed ? "beige" : "#ffdc90")};
`;

const Text = styled.span`
    width: 375px;
    margin: 1px;
    font-size: 2em;
`;

const ButtonBox = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const Button = styled.button`
    background: transparent;
    border: none;
`;

const CardIcon = styled.img`
    width: 26px;
    cursor: pointer;
    opacity: 0.4;
    &: hover {
        opacity: 1;
    }
`;

const AddButton = styled.button`
    background-color: transparent;
    border: none;
    position: fixed;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
`;

const AddIcon = styled.img`
    width: 100px;
    height: 100px;
    background: transparent;
    &:hover {
        transform: rotate(15deg);
    }
`;

export default Card;
