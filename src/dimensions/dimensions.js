import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const isSmallScreen = width < 375; 