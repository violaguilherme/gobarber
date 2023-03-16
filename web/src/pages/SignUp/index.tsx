import React, { useCallback, useRef } from "react";
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi"
import { Form } from "@unform/web"
import { FormHandles } from "@unform/core";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup"

import logoSvg from "../../assets/logo.svg"
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/api";
import { Container, Content, Background, AnimationContainer } from "./styles";
import { useToast } from "../../hooks/toast";

interface SignUpFormData {
    name: string
    email: string
    password: string
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    
    const history = useHistory()

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
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

        await api.post("/users", data)

        history.push("/")

        addToast({
            type: "success",
            title: "Cadastro realizado!",
            description: "Você já pode realizar seu login"
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
            title: "Erro no cadastro",
            description: "Ocorreu um erro ao realizar o cadastro, tente novamente"
        })
    }

    },[history, addToast])

    return (
        <Container>
            <Background />

            <Content>
                <AnimationContainer>
                    <img src={logoSvg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu Cadastro</h1>

                        <Input name="name" icon={FiUser} placeholder="Name" />
                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                        <Button type="submit">Cadastrar</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para login
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
}

export default SignUp