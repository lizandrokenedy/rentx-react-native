import React from "react";
import { ActivityIndicator } from "react-native";
import {
  GestureHandlerRootView,
  RectButtonProps,
} from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";

import { Container, Title } from "./styles";

interface IButton extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export default function Button({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}: IButton) {
  const theme = useTheme();

  return (
    <GestureHandlerRootView>
      <Container
        {...rest}
        color={color ? color : theme.colors.main}
        enabled={enabled}
        style={{ opacity: !enabled || loading ? 0.5 : 1 }}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.shape} />
        ) : (
          <Title>{title}</Title>
        )}
      </Container>
    </GestureHandlerRootView>
  );
}
