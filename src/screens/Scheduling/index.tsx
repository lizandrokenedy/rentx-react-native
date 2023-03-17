import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import BackButton from "../../components/BackButton";

import {
  ParamListBase,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";

import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";
import Button from "../../components/Button";
import Calendar, { IDayProps, IMarkedDateProps } from "../../components/Calendar";
import { generateInterval } from "../../components/Calendar/generateInterval";

export default function Scheduling() {
  const [markedDates, setMarkedDates] = useState<IMarkedDateProps>(
    {} as IMarkedDateProps
  );
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>(
    {} as IDayProps
  );
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails");
    // navigation.navigate("CarDetails" as never);
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: IDayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>15/03/2023</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
