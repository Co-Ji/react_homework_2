import React from "react";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {} from "./redux/modules/word";
import { db } from "./firebase";

import Card from "./Card";
import WordBox from "./WordBox";

const App = (props) => {
    const history = useHistory();

    return (
        <Container>
            <TitleBox>
                <Title onClick={() => history.push("/")}>영어 단어장</Title>
            </TitleBox>
            <Button
                onClick={() => {
                    history.push("/newWord/:wordNum");
                }}
            >
                +
            </Button>
            <Switch>
                <Content>
                    <Route path="/" exact component={Card} />

                    <Route path="/newWord/:wordNum" component={WordBox} />
                </Content>
            </Switch>
        </Container>
    );
};

const Container = styled.div`
    // width: 50vw;
    // max-width: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TitleBox = styled.div`
    width: 100vw;
    border: none;
    border-bottom: 1px solid green;
`;
const Title = styled.h1`
    width: 100%;
    text-align: center;
    margin: 10px auto;
    cursor: pointer;
`;

const Content = styled.div`
    width: 90vw;
    max-width: 1600px;
    padding-top: 40px;
    // background: beige;

    display: inline-flex;
    flex-flow: row wrap;
    justify-content: center;
`;

const Button = styled.button`
    background-color: deepskyblue;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: none;
    font-size: 40px;
    color: white;
    position: absolute;
    top: 10px;
    right: 50px;
    &:hover {
        background: red;
        cursor: pointer;
    }
`;
export default App;
