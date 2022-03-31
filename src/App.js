import React from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import {} from "./redux/modules/word";
import { db } from "./firebase";

import Card from "./Card";
import WordBox from "./WordBox";

const App = (props) => {
    const history = useHistory();

    return (
        <>
            <GlobalStyle />
            <Container>
                <TitleBox>
                    <Title onClick={() => history.push("/")}>
                        My English Vocabulary
                    </Title>
                </TitleBox>
                <Switch>
                    <Content>
                        <Route path="/" exact component={Card} />

                        <Route path="/newWord/:wordNum" component={WordBox} />
                    </Content>
                </Switch>
            </Container>
        </>
    );
};

const GlobalStyle = createGlobalStyle`


* {
    font-family: 'Nanum Pen Script', cursive;
}

  body {
      background: #101010
  }

`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;

const TitleBox = styled.div`
    margin: 40px;
    width: 800px;
    height: 80px;
    color: #0077af;
`;
const Title = styled.h1`
    text-align: center;
    margin: 10px auto;
    cursor: pointer;
    font-size: 70px;
`;

const Content = styled.div`
    // background: red;
    width: 85vw;
    max-width: 1600px;
    padding-top: 40px;
    height: 100%;

    display: inline-flex;
    flex-flow: row wrap;
    justify-content: center;
`;

export default App;
