import React, { useCallback, useRef } from "react";
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from "react-icons/fi"
import { Form } from "@unform/web"
import { FormHandles } from "@unform/core";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup"

import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";
import { Container, Content, AvatarInput } from "./styles";

interface ProfileFormData {
    name: string
    email: string
    password: string
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const history = useHistory()

    const { addToast } = useToast()
    const { user } = useAuth()

    const handleSubmit = useCallback(async (data: ProfileFormData) => {
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

            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

            <Content>
                <Form 
                    ref={formRef} 
                    initialData={{ name: user.name, email: user.email }}
                    onSubmit={handleSubmit}>
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name} />
                        
                        <button type="button">
                            <FiCamera />
                        </button>
                    </AvatarInput>                    
                    
                    <h1>Meu perfil</h1>

                    <Input name="name" icon={FiUser} placeholder="Name" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        containerStyle={{ marginTop: 24 }} 
                        name="old_password" 
                        icon={FiLock} 
                        type="password" 
                        placeholder="Senha atual" 
                    />
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
                        placeholder="Confirmar senha" 
                    />
                    
                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default Profile