import React from "react";
import { GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";

import { Container, Title } from "./styles";

interface IButton extends RectButtonProps {
  title: string;
  color?: string;
}

export default function Button({ title, color, ...rest }: IButton) {
  const theme = useTheme();

  return (
    <GestureHandlerRootView>
      <Container {...rest} color={color ? color : theme.colors.main}>
        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>
  );
}
