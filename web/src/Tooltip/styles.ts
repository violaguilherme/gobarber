import styled from "styled-components";

export const Container = styled.div`
    position: relative;

    span {
        width: 16rem;
        background: #ff9000;
        padding: .8rem;
        border-radius: .4rem;
        font-size: 1.4rem;
        font-weight: 500;
        opacity: 0;
        transition: opacity .4s;
        visibility: hidden;

        color: #312e32;
        position: absolute;
        bottom: calc(100% + 1.2rem);
        left: 50%;
        transform: translateX(-50%);

        &::before {
            content: "";
            border-style: solid;
            border-color: #ff9000 transparent;
            border-width: .6rem .6rem 0 .6rem;
            top: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    &:hover span {
        opacity: 1;
        visibility: visible;
    }
` 