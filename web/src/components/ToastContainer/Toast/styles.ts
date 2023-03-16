import { animated } from "react-spring"
import styled, { css } from "styled-components"

interface ContainerProps {
    type?: "success" | "error" | "info"
    hasDescription: boolean
}

const toastTypeVariations = {
    info: css`
        background: #ebf8ff;
        color: #3172b7;
    `,
    success: css`
        background: #e6fffa;
        color: #2e656a;
    `,
    error: css`
        background: #fddede;
        color: #c53030;
    `
}

export const Container = styled(animated.div)<ContainerProps>`
    width: 36rem;
    position: relative;
    padding: 1.6rem 3rem 1.6rem 1.6rem;
    
    border-radius: 1rem;
    box-shadow: .2rem .2rem .8rem rgba(0, 0, 0, 0.2);

    display: flex;

    background: #ebf8ff;
    color: #3172b7;

    ${(props) => toastTypeVariations[props.type || "info"]}

    & + div {
        margin-top: .8rem;
    }

    > svg {
        margin: .4rem 1.2rem 0 0;
    }

    div {
        flex: 1;

        p {
            margin-top: .4rem;
            font-size: 1.4rem;
            opacity: 0.8;
            line-height: 2rem;
        }
    }

    button {
        position: absolute;
        right: 1.6rem;
        top: 1.9rem;
        opacity: 0.6;
        border: 0;
        background: transparent;
        color: inherit;
    }

    ${props => !props.hasDescription && css`
        align-items: center;

        svg {
            margin-top: 0;
        }
    `}
`