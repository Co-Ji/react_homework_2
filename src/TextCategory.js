import React from "react";
import styled from "styled-components";

const TextCategory = (props) => {
    // console.log(props.category);

    return (
        <div>
            <label>
                단어
                <input
                    type="text"
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />
            </label>
        </div>
    );
};

const Category = styled.p`
    display: block;
    width: 90%;
    height: 20px;
    margin: 0 10px;
    font-size: 14px;
`;

export default TextCategory;
