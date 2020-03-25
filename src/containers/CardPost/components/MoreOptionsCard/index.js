import React from "react";
import PropTypes from "prop-types";
import { Alert, ToastAndroid } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/core";
import { firebase } from "@react-native-firebase/auth";

import MoreOptions from "../../../../components/MoreOptions";

import { deletePost } from "../../../../services/post";
import { savePost } from "../../../../services/user";

const MoreOptionsCardComponent = ({ post, author }) => {
  const navigation = useNavigation();
  const objectDispatch = navigation.dangerouslyGetParent() || navigation;

  const onEdit = () => {
    objectDispatch.dispatch(StackActions.push("FormPost", { post }));
  };

  const onDelete = () => {
    Alert.alert(
      "",
      "Tem certeza que deseja deletar essa sugestão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await deletePost(post.id);
              ToastAndroid.showWithGravity(
                "Postagem deletada com sucesso",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            } catch {
              ToastAndroid.showWithGravity(
                "Erro ao deletar postagem",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const onSave = async () => {
    try {
      await savePost(firebase.auth().currentUser.uid, post.id);
      ToastAndroid.showWithGravity(
        "Postagem salva com sucesso",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } catch {
      ToastAndroid.showWithGravity(
        "Erro ao salvar postagem",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  let options = ["Salvar", "Denunciar"];
  let actions = [onSave, () => {}];

  if (author.id === firebase.auth().currentUser.uid) {
    options = ["Editar", "Excluir", ...options];
    actions = [onEdit, onDelete, ...actions];
  }

  return (
    <MoreOptions
      style={{ position: "absolute", right: 5, top: 10 }}
      options={options}
      actions={actions}
    />
  );
};

MoreOptionsCardComponent.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
};

export default MoreOptionsCardComponent;
