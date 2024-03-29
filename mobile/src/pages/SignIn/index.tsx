import Icon from "react-native-vector-icons/Feather";
import * as Yup from "yup"
import React, { useCallback, useRef } from "react";
import { Image, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import getValidationErrors from "../../utils/getValidationErrors";
import logoImg from "../../assets/logo.png"
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { 
    Container, 
    Title, 
    ForgotPassword, 
    ForgotPasswordText, 
    CreateAccountButton, 
    CreateAccountButtonText 
} from "./styles";

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const navigation = useNavigation()

    const { signIn } = useAuth()

    const handleSignIn = useCallback(async (data: SignInFormData) => {
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

    }catch(err){
        if (err instanceof Yup.ValidationError) {
            
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
            
            return
        }

        Alert.alert("Erro na autenticação", "Ocorreu um erro ao realizar o login, cheque as credenciais")
        }
    },[signIn])

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

                        <Title>Faça seu login</Title>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input 
                                name="email" 
                                icon="mail" 
                                placeholder="E-mail" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
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
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                            />

                            <Button onPress={() => {
                                formRef.current?.submitForm()
                            }}>
                                Entrar
                            </Button>
                        </Form>

                        <ForgotPassword onPress={() => {}} >
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

        <CreateAccountButton onPress={() => navigation.navigate("SignUp")} >
            <Icon name="log-in" size={20} color="#ff9000" />

            <CreateAccountButtonText>
                Criar conta
            </CreateAccountButtonText>
        </CreateAccountButton>
        </>
    )
}

export default SignIn