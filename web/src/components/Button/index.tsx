import React, { ButtonHTMLAttributes } from "react"

import { Container } from "./styles"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> 

const Button: React.FC<ButtonProps> = (props) => (
    <Container>
        <button {...props} />
    </Container>
)

export default Button