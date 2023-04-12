import React, { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker"

import { useAuth } from "../../hooks/auth";
import { 
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenDatePickerButton,
    OpenDatePickerButtonText,
} from "./styles";
import api from "../../services/api";
import { Platform } from "react-native";

export interface Providers {
    id: string
    name: string
    avatar_url: string
}

interface RouteParams {
    providerId: string
}

interface DayAvailabilityItem {
    hour: number
    available: boolean
}

const CreateAppointment: React.FC = () => {
    const route = useRoute()
    const RouteParams = route.params as RouteParams

    const { user } = useAuth()
    const { goBack } = useNavigation()

    const [providers, setProviders] = useState<Providers[]>([])
    const [selectedProvider, setSelectedProvider] = useState(RouteParams.providerId)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [dayAvailability, setDayAvailability] = useState<DayAvailabilityItem[]>([])

    useEffect(() => {
        api.get("providers").then((response) => {
            setProviders(response.data)
        })
    }, [setProviders])

    useEffect(() => {
        api.get(`providers/${selectedProvider}/day-availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate()
            }
        }).then((response) => {
            setDayAvailability(response.data)
        })
    }, [selectedDate, selectedProvider])

    const navigateBack = useCallback(() => {
        goBack()
    }, [goBack])

    const handleSelectedProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId)
    }, [setSelectedProvider])

    const handleToggleDatePicker = useCallback(() => {
        setShowDatePicker((state) => !state)
    }, [])

    const handleDateChange = useCallback((event: any, date: Date | undefined) => {
        if (Platform.OS === "android") {
            setShowDatePicker(false)
        }

        if (date) {
            setSelectedDate(date)
        }
    }, [setShowDatePicker, setSelectedDate])

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack} >
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>

            <ProvidersListContainer>
                <ProvidersList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={(provider) => provider.id}
                    renderItem={({ item: provider }) => (
                        <ProviderContainer 
                            selected={provider.id === selectedProvider}
                            onPress={() => handleSelectedProvider(provider.id)}
                        >
                            <ProviderAvatar source={{ uri: provider.avatar_url }} />

                            <ProviderName 
                                selected={provider.id === selectedProvider}>{provider.name}
                            </ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProvidersListContainer>
            
            <Calendar>
                <Title>Escolha a data</Title>

                <OpenDatePickerButton onPress={handleToggleDatePicker}>
                    <OpenDatePickerButtonText>Selecionar outra Data</OpenDatePickerButtonText>
                </OpenDatePickerButton>

                {showDatePicker && (
                    <DateTimePicker
                        onChange={handleDateChange} 
                        mode="date"
                        display="calendar"
                        textColor="#f4ede8"        
                        value={selectedDate}
                    />
                )}
            </Calendar>
        </Container>
    )
}

export default CreateAppointment