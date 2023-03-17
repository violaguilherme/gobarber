import React from "react"
import Icon from "react-native-vector-icons/Feather";
import { Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

                        <Input name="name" icon="user" placeholder="Nome" />

                        <Input name="email" icon="mail" placeholder="E-mail" />
                        
                        <Input name="password" icon="lock" placeholder="Senha" />

                        <Button onPress={() => {}}>
                            Entrar
                        </Button>
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