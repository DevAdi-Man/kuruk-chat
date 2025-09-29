// utils/dimensions.ts
import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base dimensions (design reference, e.g., iPhone 11 = 375x812)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Scale ratios
const horizontalScale = SCREEN_WIDTH / BASE_WIDTH;
const verticalScale = SCREEN_HEIGHT / BASE_HEIGHT;

// Percentage-based width
export const wp = (percentage: number) => {
  return (SCREEN_WIDTH * percentage) / 100;
};

// Percentage-based height
export const hp = (percentage: number) => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

// Horizontal scaling (for widths, margins, paddings)
export const hs = (size: number) => size * horizontalScale;

// Vertical scaling (for heights, paddings)
export const vs = (size: number) => size * verticalScale;

// Responsive font scaling
export const RF = (size: number) => {
  const newSize = size * horizontalScale; // usually scale by width
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Export screen object
export const SCREEN = {
  WIDTH: SCREEN_WIDTH,
  HEIGHT: SCREEN_HEIGHT,
};
