import React, { useCallback, useEffect, useMemo, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Platform, Alert } from "react-native";
import { format } from "date-fns";

import api from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { 
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    Content,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenDatePickerButton,
    OpenDatePickerButtonText,
    Schedule,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentButtonText,
} from "./styles";

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
    const { goBack, navigate } = useNavigation()

    const [providers, setProviders] = useState<Providers[]>([])
    const [selectedProvider, setSelectedProvider] = useState(RouteParams.providerId)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedHour, setSelectedHour] = useState(0)
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

    const handleSelectedHour = useCallback((hour: number) => {
        setSelectedHour(hour)
    }, [])

    const handleCreateAppointment = useCallback(async () => {
        try {
            const date = new Date(selectedDate)

            date.setHours(selectedHour)
            date.setMinutes(0)

            await api.post("appointments", {
                provider_id: selectedProvider,
                date
            })

            navigate("AppointmentCreated", { date: date.getTime() })
        } catch {
            Alert.alert(
                "Erro ao cria agendamento",
                "Ocorreu um erro ao criar agendamento, tente novamente"
            )
        }
    }, [selectedDate, navigate, selectedHour, selectedProvider])

    const morningAvailability = useMemo(() => {
        return dayAvailability
            .filter(({ hour }) => hour < 12)
            .map(({ hour, available }) => {
                return {
                    hour,
                    available,
                    hourFormatted: format(new Date().setHours(hour), "HH:00")
                }
            })
    }, [dayAvailability])

    const afternoonAvailability = useMemo(() => {
        return dayAvailability
            .filter(({ hour }) => hour >= 12)
            .map(({ hour, available }) => {
                return {
                    hour,
                    available,
                    hourFormatted: format(new Date().setHours(hour), "HH:00")
                }
            })
    }, [dayAvailability])

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack} >
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>

            <Content>
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

                <Schedule>
                    <Title>Escolha o horário</Title>

                    <Section>
                        <SectionTitle>Manhã</SectionTitle>
                    
                        <SectionContent>
                            {morningAvailability.map(({ hourFormatted, hour, available }) => (
                                <Hour
                                    enabled={available} 
                                    selected={selectedHour === hour}
                                    available={available} 
                                    key={hourFormatted}
                                    onPress={() => handleSelectedHour(hour)}
                                >
                                    <HourText 
                                        selected={selectedHour === hour}>{hourFormatted}
                                    </HourText>
                                </Hour>
                            ))}
                        </SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Tarde</SectionTitle>

                        <SectionContent>
                            {afternoonAvailability.map(({ hourFormatted, hour, available }) => (
                                <Hour 
                                    enabled={available}
                                    selected={selectedHour === hour}
                                    available={available} 
                                    key={hourFormatted}
                                    onPress={() => handleSelectedHour(hour)}
                                >
                                    <HourText 
                                        selected={selectedHour === hour}>{hourFormatted}
                                    </HourText>
                                </Hour>
                            ))}
                        </SectionContent>
                    </Section>
                </Schedule>

                <CreateAppointmentButton onPress={handleCreateAppointment}>
                    <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
                </CreateAppointmentButton>
            </Content>
        </Container>
    )
}

export default CreateAppointment