import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
    button {
    height: 5.6rem;
    width: 100%;
    margin-top: 1.6rem;

    background: #ff9000;
    color: #312e38;

    border: 0;
    border-radius: 1rem;
    border: .1rem solid #232129;

    font-weight: 500;
    padding: 0 1.6rem;
    transition: background-color .3s;

    &:hover {
        background: ${shade(0.2, "#ff9000")};
    }
    }
`