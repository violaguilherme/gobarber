import styled, { css } from "styled-components";

import Tooltip from "../../Tooltip";

interface ContainerProps {
    isFocused: boolean
    isFilled: boolean
    isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
    background: #232129;
    border-radius: 1rem;
    padding: 1.6rem;
    width: 100%;

    border: .1rem solid #232129;
    color: #666360;
    
    display: flex;
    align-items: center;
    
    & + div {
        margin-top: .8rem;
    }

    ${(props) => props.isErrored && css`
        border-color: #c53030;
    `}

    ${(props) => props.isFocused && css`
        color: #ff9000;
        border-color: #ff9000;
    `}

    ${(props) => props.isFilled && css`
        color: #ff9000;
    `}

    input {
        color: #f4ede8;
        flex: 1;
        background: transparent;
        border: 0;

        &::placeholder {
            color: #666360;
        }

    }

    svg {
        margin-right: 1.6rem;
    }
`

export const Error = styled(Tooltip)`
    margin-left: 1.6rem;
    height: 2rem;

    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }

`