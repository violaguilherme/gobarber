import Icon from "react-native-vector-icons/Feather";
import React, { useRef } from "react"
import { Image, ScrollView, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import logoImg from "../../assets/logo.png"
import Input from "../../components/Input";
import Button from "../../components/Button";
import { 
    Container, 
    Title, 
    BackToSingIn, 
    BackToSingInText 
} from "./styles";

const SignUp: React.FC = () => {
    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const formRef = useRef<FormHandles>(null)

    const navigation = useNavigation()

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

                        <Form ref={formRef} onSubmit={(data) => {console.log(data)}}>
                            <Input 
                                name="name" 
                                icon="user" 
                                placeholder="Nome" 
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