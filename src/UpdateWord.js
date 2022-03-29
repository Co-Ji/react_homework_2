import React from "react";
import TextCategory from "./TextCategory";
import InputText from "./InputText";
import styled from "styled-components";

const UpdateWord = (props) => {
    const category = ["단어", "병음", "의미", "예문", "해석"];

    return (
        <Container>
            <Title>단어 수정하기</Title>
            {category.map((element, index) => (
                <TextBox key={index - 123}>
                    <TextCategory category={category[index]} />
                    <InputText />
                </TextBox>
            ))}

            <button
                style={{
                    height: "30px",
                    width: "150px",
                    display: "block",
                    margin: "20px",
                }}
            >
                저장하기
            </button>
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

export default UpdateWord;
