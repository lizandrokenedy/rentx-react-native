import React from "react";

import { Container } from "./styles";

import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import {
  BorderlessButtonProps,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface IBackButton extends BorderlessButtonProps {
  color?: string;
  onPress: () => void;
}

export default function BackButton({ color, ...rest }: IBackButton) {
  const theme = useTheme();

  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <MaterialIcons
          name="chevron-left"
          size={24}
          color={color ? color : theme.colors.text}
        />
      </Container>
    </GestureHandlerRootView>
  );
}
