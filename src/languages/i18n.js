import I18n from "react-native-i18n";
import en from "./en";
import zh from "./ch";
import DeviceInfo from "react-native-device-info";

// 获取用户手机设置的语言
let initialLanguage = DeviceInfo.getDeviceLocale();

// 多语言退化，例如en-US,en-GB退化为en
I18n.fallbacks = true;
// I18n.defaultLocale = "zh"
// 多语言支持，导入不同语言对象
I18n.translations = {
	en,
	zh
};

if (initialLanguage === "en-US") {
    I18n.locale = "en";
} else {
    I18n.locale = "zh";
}

export default I18n;