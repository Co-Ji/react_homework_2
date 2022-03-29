import React from "react";
import styled from "styled-components";

const InputText = (props) => {
    console.log(props.propsList);

    return <Line onChange={props.function}>{props.propsList}</Line>;
    // 함수를 props로 받는다. (e) => setWord({...word, [category.en]: e.target.value}
};

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

export default InputText;
