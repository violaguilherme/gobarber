import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
    
`
export const Header = styled.header`
    padding: 3.2rem;
    background: #28262e
`
export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    max-width: 120rem;
    margin: 0 auto;

    > img {
        height: 8rem;
    }

    button {
        margin-left: auto;
        background: transparent;
        border: 0;

        svg {
            color: #999591;
            width: 2rem;
            height: 2rem;
        }
    }

`
export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 8rem;

    img {
        width: 5.6rem;
        height: 5.6rem;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 1.6rem;
        line-height: 2.4rem;

        span {
            color: #f4ede8;
        }

        strong {
            color: #ff9000;
        }
    }
`

export const Content = styled.main`
    max-width: 120rem;
    margin: 6.4rem auto;
    display: flex;
`

export const Schedule = styled.div`
    flex: 1;
    margin-right: 12rem;

    h1 {
        font-size: 3.6rem;
    }

    p {
        display: flex;
        margin-top: .8rem;
        color: #ff9000;
        font-weight: 500;

        span {
            display: flex;
            align-items: center;
        }

        span + span::before {
            content: "";
            width: .1rem;
            height: 1.6rem;
            background: #ff9000;
            margin: 0 .8rem;
        }
    }
`
export const NextAppointment = styled.div`
    margin-top: 6.4rem;

    > strong {
        color: #999591;
        font-size: 2rem;
        font-weight: 400;
    }

    div {
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 1.6rem 2.4rem;
        border-radius: 1rem;
        margin-top: 2.4rem;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            height: 80%;
            width: .1rem;
            left: 0;
            top: 10%;
            background: #ff9000;
        }

        img {
            width: 8rem;
            height: 8rem;
            border-radius: 50%;
        }

        strong {
            margin-left: 2.4rem;
            color: #fff;
        }

        span {
            margin-left: auto;
            display: flex;
            align-items: center;
            color: #999591;

            svg {
                color: #ff9000;
                margin-right: .8rem;
            }
        }
    }
`

export const Section = styled.section`
    margin-top: 4.8rem;

    > strong {
        color: #999591;
        font-size: 2rem;
        line-height: 2.6rem;
        border-bottom: .1rem solid #3e3b47;
        display: block;
        padding-bottom: 1.6rem;
        margin-bottom: 1.6rem;
    }
`

export const Appointment = styled.div`
    display: flex;
    align-items: center;

    & + div {
        margin-top: 1.6rem;
    }

    span {
        margin-left: auto;
        display: flex;
        align-items: center;
        color: #f4ede8;

        svg {
            color: #ff9000;
            margin-right: .8rem;
        }
    }

    div {
        display: flex;
        align-items: center;
        flex: 1;

        background: #3e3b47;
        padding: 1.6rem 2.4rem;
        border-radius: 1rem;
        margin-left: 2.4rem;

        img {
            width: 5.6rem;
            height: 5.6rem;
            border-radius: 50%;
        }

        strong {
            margin-left: 2.4rem;
            color: #fff;
            font-size: 2rem;
        }
    }
`

export const Calendar = styled.aside`
    width: 38rem;
    
    .DayPicker {
        font-size: 1.5rem;
        background: #28262e;
        border-radius: 1rem;
    }

    .DayPicker-wrapper {
        padding-bottom: 0;
    }

    .DayPicker,
    .DayPicker-Month {
        width: 100%;
    }

    .DayPicker-Month {
        border-collapse: separate;
        border-spacing: .8rem;
        margin: 1.6rem;
    }

    .DayPicker-Day {
        width: 4rem;
        height: 4rem;
    }

    .DayPicker-Day--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 1rem;
        color: #fff;
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
        background: ${shade(0.2, '#3e3b47')};
    }

    .DayPicker-Day--today {
        font-weight: normal;
    }

    .DayPicker-Day--disabled {
        color: #666360 !important;
        background: transparent !important;
    }

    .DayPicker-Day--selected {
        background: #ff9000 !important;
        border-radius: 1rem;
        color: #232129 !important;
    }
`