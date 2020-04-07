import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  ToastAndroid
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { t } from "../../i18n";

import style from "./Register.style";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import colors from "../../core/colors";

import { createUser } from "../../services/user";

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={style.container}>
      <ScrollView contentContainerStyle={style.scroll}>
        <Loader show={loading} background="transparent" />
        <Image
          resizeMode="contain"
          source={require("../../assets/logo.png")}
          style={style.logo}
        />
        <TextInput
          placeholder={t("NAME")}
          underlineColorAndroid={colors.white}
          onChangeText={text => setName(text)}
          value={name}
          returnKeyType="next"
          placeholderTextColor={colors.white}
          textContentType="name"
          style={style.input}
        />
        <TextInput
          placeholder={t("EMAIL")}
          underlineColorAndroid={colors.white}
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          returnKeyType="next"
          placeholderTextColor={colors.white}
          textContentType="emailAddress"
          style={style.input}
        />
        <TextInput
          placeholder={t("PASSWORD")}
          underlineColorAndroid={colors.white}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholderTextColor={colors.white}
          textContentType="password"
          secureTextEntry
          style={style.input}
        />
        <TextInput
          placeholder={t("CONFIRM_PASSWORD")}
          underlineColorAndroid={colors.white}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          placeholderTextColor={colors.white}
          textContentType="password"
          secureTextEntry
          style={style.input}
        />
        <Button
          variant="white"
          title={t("LOGIN")}
          onPress={async () => {
            if (!email || !password || !password || !confirmPassword) {
              ToastAndroid.showWithGravity(
                t("REQUIRED_FIELDS"),
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            } else if (password !== confirmPassword) {
              ToastAndroid.showWithGravity(
                t("EQUAL_PASSWORDS"),
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            } else {
              try {
                setLoading(true);

                await createUser({ email, name, password });

                navigation.dispatch(StackActions.replace("Home"));
              } catch (error) {
                ToastAndroid.showWithGravity(
                  error.message,
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM
                );
              } finally {
                setLoading(false);
              }
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
