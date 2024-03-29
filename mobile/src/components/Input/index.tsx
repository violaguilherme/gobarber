import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from "react";
import { useField } from "@unform/core";
import { TextInputProps } from "react-native";

import { Container, TextInput, Icon } from "./styles"

interface InputProps extends TextInputProps {
    name: string
    icon: string
    containerStyle?: {}
}

interface InputValueReference {
    value: string
}

interface InputRef {
    focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
    { name, icon, containerStyle = {} ,...rest }, ref) => {
    const inputElementRef = useRef<any>(null)
    const { registerField, defaultValue = "", fieldName, error } = useField(name)
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

    const [isfocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)

        setIsFilled(!!inputValueRef.current.value)
    }, [])

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus()
        }
    }))

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: "value",
            setValue(ref: any, value) {
                inputValueRef.current.value = value
                inputElementRef.current.setNativeProps({ text: value })
            },
            clearValue() {
                inputValueRef.current.value = ""
                inputElementRef.current.clear()
            }
        })
    }, [fieldName, registerField])

    return (
        <Container style={containerStyle} isFocused={isfocused} isErrored={!!error} >
            <Icon name={icon} size={20} color={isfocused || isFilled ? "#ff9000" : "#666360"} />

            <TextInput 
                ref={inputElementRef}
                keyboardAppearance="dark"
                placeholderTextColor="#666360" 
                defaultValue={defaultValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={value => {
                    inputValueRef.current.value = value
                }}
                {...rest} 
            />
        </Container>
    )
}

export default forwardRef(Input)