import React from "react";
import {
  RectButtonProps,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface IConfirmButton extends RectButtonProps {
  title: string;
}

export default function ConfirmButton({ title, ...rest }: IConfirmButton) {
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>
  );
}
