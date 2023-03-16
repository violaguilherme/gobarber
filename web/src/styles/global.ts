import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    :root {
        font-size: 62.5%;
    }
    
    body {
        background: #312E38;
        color: #FFF;
        -webkit-font-smoothing: antialiased;
    }
    
    body, input, button {
        font-size: 1.6rem;
        font-family: "Roboto Slab", "serif";
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }

    button {
        cursor: pointer;
    }

`