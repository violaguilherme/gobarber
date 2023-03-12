import React, { useCallback, useRef } from "react";
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi"
import { Form } from "@unform/web"
import * as Yup from "yup"

import { Container, Content, Background } from "./styles";
import logoSvg from "../../assets/logo.svg"
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FormHandles } from "@unform/core";
import getValidationErrors from "../../utils/getValidationErrors";

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape(({
                name: Yup.string().required("O nome é obrigatório"),
                email: Yup.string().required("O email é obrigatório").email("Digite um e-mail válido"),
                password: Yup.string().min(6, "Mínimo de 6 dígitos")
            }))

        await schema.validate(data, {
            abortEarly: false,
        })
    }catch(err){
            // @ts-ignore
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
        }
    },[])

    return (
        <Container>
            <Background />

            <Content>
                <img src={logoSvg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Name" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="create-account">
                    <FiArrowLeft />
                    Voltar para login
                </a>
            </Content>
        </Container>
    )
}

export default SignUp