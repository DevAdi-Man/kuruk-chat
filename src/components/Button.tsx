import React from "react";
import { Text, TouchableOpacity } from "react-native";
type Props = {
  title: string;
  onPress?: () => void;
  className?: string;
  style?: object;
  textName?: string;
  textStyle?: object;
};

const Button = ({ title, onPress, className, style , textName, textStyle}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      className={`${className}`}
    >
      <Text className={`text-center  ${textName}`} style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
