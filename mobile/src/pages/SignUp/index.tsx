import Icon from "react-native-vector-icons/Feather";
import * as Yup from "yup"
import React, { useRef, useCallback } from "react"
import { Image, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import getValidationErrors from "../../utils/getValidationErrors";
import logoImg from "../../assets/logo.png"
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/api";
import { 
    Container, 
    Title, 
    BackToSingIn, 
    BackToSingInText 
} from "./styles";

interface SignUpFormData {
    name: string
    email: string
    password: string
}

const SignUp: React.FC = () => {
    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const formRef = useRef<FormHandles>(null)

    const navigation = useNavigation()

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
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

        Alert.alert("Cadastro realizado com sucesso", "Você já pode realizar login na aplicação")

        navigation.goBack()
    }catch(err){
        if (err instanceof Yup.ValidationError) {
            
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
            
            return
        }

        Alert.alert("Erro no cadastro", "Ocorreu um erro ao realizar o cadastro, tente novamente")
        }
    },[navigation])

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }} 
                behavior={Platform.OS === "ios" ? "padding" : undefined }
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={logoImg} />

                        <Title>Crie sua conta</Title>

                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input 
                                name="name" 
                                icon="user" 
                                placeholder="Nome" 
                                autoCorrect={false}
                                autoCapitalize="words" 
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />

                            <Input 
                                name="email" 
                                icon="mail" 
                                placeholder="E-mail"
                                ref={emailInputRef} 
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />
                            
                            <Input 
                                name="password" 
                                icon="lock" 
                                placeholder="Senha" 
                                ref={passwordInputRef}
                                secureTextEntry 
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => formRef.current?.submitForm()}
                            />

                            <Button onPress={() => formRef.current?.submitForm()}>
                                Entrar
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

        <BackToSingIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />

            <BackToSingInText>
                Voltar para login
            </BackToSingInText>
        </BackToSingIn>
        </>
    )
}

export default SignUp