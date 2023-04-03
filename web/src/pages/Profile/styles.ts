import styled from "styled-components"
import { shade } from "polished"

export const Container = styled.div`
    > header {
        height: 14.4rem;
        background: #28262e;
        display: flex;
        align-items: center;

        div {
            width: 100%;
            max-width: 112rem;
            margin: 0 auto;

            svg {
                color: #999591;
                width: 2.5rem;
                height: 2.5rem;
            }
        }
    }
`

export const AvatarInput = styled.div`
    margin-bottom: 3.2rem;
    align-self: center;
    position: relative;

    img {
        width: 18.6rem;
        height: 18.6rem;
        border-radius: 50%;
    }

    button {
        position: absolute;
        right: 0;
        bottom: 0;

        width: 4.8rem;
        height: 4.8rem;
        border: 0;
        border-radius: 50%;
        background: #ff9900;
        transition: background-color .3s;

        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            height: 2rem;
            width: 2rem;
            color: #312e38;
        }

        &:hover {
            background: ${shade(0.2, "#ff9900")};
        }
    }
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    margin: -17.5rem auto 0;
    width: 100%;

    form {
        margin: 8rem 0;
        width: 34rem;

        display: flex;
        flex-direction: column;
        text-align: center;
    }
    
    h1 {
        font-size: 2rem;
        text-align: left;
        margin-bottom: 2.4rem;
    }
`