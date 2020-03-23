import React, { useState } from "react";
import { Image, SafeAreaView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk";

import style from "./Login.style";

import Button from "../../components/Button";
import Loader from "../../components/Loader";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={style.container}>
      <Loader show={loading} />
      <Image
        resizeMode="contain"
        source={require("../../assets/logo.png")}
        style={style.logo}
      />
      <Button
        variant="white"
        startIcon="facebook"
        iconColor="#3b5998"
        title="Login com o Facebook"
        onPress={async () => {
          setLoading(true);

          await LoginManager.logInWithPermissions(["public_profile", "email"]);
          const token = await AccessToken.getCurrentAccessToken();
          const credential = firebase.auth.FacebookAuthProvider.credential(
            token.accessToken
          );
          const user = await firebase.auth().signInWithCredential(credential);

          const dataUser = {
            ...user.additionalUserInfo.profile,
            picture: user.additionalUserInfo.profile.picture.data.url,
            providerId: user.additionalUserInfo.providerId,
            dateUpdated: firestore.Timestamp.fromDate(new Date())
          };

          if (user.additionalUserInfo.isNewUser) {
            dataUser.dateCreated = firestore.Timestamp.fromDate(new Date());
          }

          await firestore()
            .collection("users")
            .doc(user.user.uid)
            .set(dataUser);

          setLoading(false);

          navigation.dispatch(StackActions.replace("Home"));
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
