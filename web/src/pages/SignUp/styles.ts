import styled from "styled-components"
import { shade } from "polished"

import signUpBackgroundImage from "../../assets/sign-up-background.png"

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;

`
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;

    width: 100%;
    max-width: 70rem;

    form {
        margin: 8rem 0;
        width: 34rem;
        text-align: center;
    }

    h1 {
        margin-bottom: 2.4rem;
    }

    a {
        display: block;
        margin-top: 2.4rem;
        color: #f4ede8;

        transition: color .3s;
        text-decoration: none;

        &:hover {
            color: ${shade(0.2, "#f4ede8")};
        }
    }

    > a {
        display: flex;
        align-items: center;
        margin-top: 2.4rem;

        color: #f4ede8;
        transition: color .3s;

        &:hover {
            color: ${shade(0.2, "#f4ede8")};
        }

        svg {
            margin-right: 1.4rem;
        }
    }
`

export const Background = styled.div`
    flex: 1;
    background: url(${signUpBackgroundImage}) no-repeat center;
    background-size: cover;
`