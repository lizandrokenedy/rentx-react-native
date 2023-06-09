import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import ConfirmButton from "../../components/ConfirmButton";

import { Container, Content, Title, Message, Footer } from "./styles";

import {
  ParamListBase,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";

export default function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  function handleConfirm() {
    navigation.navigate("Home");
    // navigation.navigate("CarDetails" as never);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só procisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
