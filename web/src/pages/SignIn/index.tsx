import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi"
import { Form } from "@unform/web";
import { Link, useHistory } from "react-router-dom";
import { FormHandles } from "@unform/core";
import * as Yup from "yup"

import getValidationErrors from "../../utils/getValidationErrors";
import logoSvg from "../../assets/logo.svg"
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, Background, AnimationContainer } from "./styles";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const { signIn } = useAuth()
    const { addToast } = useToast()
    const history = useHistory()

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape(({
                email: Yup.string().required("O email é obrigatório").email("Digite um e-mail válido"),
                password: Yup.string().required("A senha é obrigatória")
            }))

        await schema.validate(data, {
            abortEarly: false,
        })

        await signIn({
            email: data.email,
            password: data.password
        })

        history.push("/dashboard")
    }catch(err){
        if (err instanceof Yup.ValidationError) {
            // @ts-ignore
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
            
            return
        }

        addToast({
            type: "error",
            title: "Erro na autenticação",
            description: "Ocorreu um erro ao realizar o login, cheque as credenciais"
        })
        }
    },[signIn, addToast, history])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoSvg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu login</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                        <Button type="submit">Entrar</Button>

                        <a href="forgot">Esqueci minha senha</a>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            
            <Background />
        </Container>
    )
}

export default SignIn