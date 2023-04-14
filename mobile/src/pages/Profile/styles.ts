import styled from "styled-components/native";
import { Platform } from "react-native"

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 0 30px ${Platform.OS === "android" ? 150 : 40}px;
    background-color: #312E38;
`

export const BackButton = styled.TouchableOpacity`
    margin-top: 170px;
`
export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
    height: 146px;
    width: 146px;
    border-radius: 73px;
    align-self: center;
`

export const Title = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: "RobotoSlab-Medium";
    margin: 24px 0;
`