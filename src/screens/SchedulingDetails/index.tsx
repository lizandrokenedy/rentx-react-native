import React, { useEffect, useState } from "react";
import Accessory from "../../components/Accessory";
import BackButton from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import {
  ParamListBase,
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuote,
  RentalPriceTotal,
} from "./styles";
import Button from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../ultils/getAccessoryIcon";
import { format } from "date-fns";
import { getPlatformDate } from "../../ultils/getPlatformDate";
import { api } from "../../services/api";
import { Alert } from "react-native";

interface IRentalPeriod {
  start: string;
  end: string;
}

interface Params {
  car: CarDTO;
  dates: string[];
}

export default function SchedulingDetails() {
  const theme = useTheme();
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod
  );
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    const response = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [...response.data.unavailable_dates, ...dates];

    await api.post("/schedules_byuser", {
      user_id: 1,
      car,
    });

    await api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => navigation.navigate("SchedulingComplete"))
      .catch(() => Alert.alert("Não foi possível confirmar o agendamento."));

    // navigation.navigate("CarDetails" as never);
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuote>
              R$ {car.rent.price} x{dates.length} diárias
            </RentalPriceQuote>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
