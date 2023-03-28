import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail } from "react-icons/fi"
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import { FormHandles } from "@unform/core";
import * as Yup from "yup"

import getValidationErrors from "../../utils/getValidationErrors";
import logoSvg from "../../assets/logo.svg"
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, Background, AnimationContainer } from "./styles";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";

interface ForgotPasswordFormData {
    email: string
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const { addToast } = useToast()

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape(({
                email: Yup.string().required("O email é obrigatório").email("Digite um e-mail válido"),
            }))

        await schema.validate(data, {
            abortEarly: false,
        })

        await api.post("/password/forgot", {
            email: data.email
        })

        addToast({
            type: "success",
            title: "E-mail de Recuperação enviado",
            description: 
            "Enviamos um e-mail para confirmar a recuperação de senha, favor checar sua caixa de entrada"
        })

    }catch(err){
        if (err instanceof Yup.ValidationError) {
            // @ts-ignore
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
            
            return
        }

        addToast({
            type: "error",
            title: "Erro na recuperação de senha",
            description: "Ocorreu um erro ao tentar recuperar a senha"
        })
        }
    },[addToast])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoSvg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar senha</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail" />

                        <Button type="submit">Recuperar</Button>
                    </Form>

                    <Link to="/">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>
            
            <Background />
        </Container>
    )
}

export default ForgotPassword