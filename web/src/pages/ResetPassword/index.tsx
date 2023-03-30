import React, { useCallback, useRef } from "react";
import { FiLock } from "react-icons/fi"
import { Form } from "@unform/web";
import { useHistory, useLocation } from "react-router-dom";
import { FormHandles } from "@unform/core";
import * as Yup from "yup"

import getValidationErrors from "../../utils/getValidationErrors";
import logoSvg from "../../assets/logo.svg"
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, Background, AnimationContainer } from "./styles";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";

interface ResetPasswordFormData {
    password: string
    password_confirmation: string
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const location = useLocation()
    
    const { addToast } = useToast()
    
    const history = useHistory()

    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape(({
                password: Yup.string().required("A senha é obrigatória"),
                password_confirmation: Yup.string().oneOf([Yup.ref("password"), null],
                "confirmação incorreta"
                )
            }))

        await schema.validate(data, {
            abortEarly: false,
        })

        const { password, password_confirmation } = data

        const token = location.search.replace("?token=", "")

        if(!token) {
            throw new Error()
        }

        await api.post("/password/reset", {
            password,
            password_confirmation,
            token
        })

        history.push("/")

    }catch(err){
        if (err instanceof Yup.ValidationError) {
            // @ts-ignore
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
            
            return
        }

        addToast({
            type: "error",
            title: "Erro ao resetar sua senha",
            description: "Ocorreu um erro ao resetar sua senha, tente novamente"
        })
        }
    },[addToast, history, location.search])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoSvg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Resetar senha</h1>

                        <Input 
                            name="password" 
                            icon={FiLock} 
                            type="password" 
                            placeholder="Nova senha" 
                        />
                        <Input 
                            name="password_confirmation" 
                            icon={FiLock} 
                            type="password" 
                            placeholder="Confirme sua senha" 
                        />

                        <Button type="submit">Alterar senha</Button>
                    </Form>
                </AnimationContainer>
            </Content>
            
            <Background />
        </Container>
    )
}

export default ResetPassword