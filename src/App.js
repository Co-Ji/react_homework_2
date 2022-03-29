import React from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import Card from "./Card";
import WordBox from "./WordBox";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const App = (props) => {
    const history = useHistory();

    return (
        <Container>
            <TitleBox>
                <Title>영어 단어장</Title>
            </TitleBox>
            <Switch>
                <Content>
                    <Route path="/" exact component={Card} />

                    <Route path="/newWord/:wordNum" component={WordBox} />
                </Content>
            </Switch>
            <button
                onClick={() => {
                    history.push("/newWord/:wordNum");
                }}
            >
                단어추가하기
            </button>
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

export default App;
