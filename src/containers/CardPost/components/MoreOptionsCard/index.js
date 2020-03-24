import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/core";

import MoreOptions from "../../../../components/MoreOptions";

import { deletePost } from "../../../../services/post";

const MoreOptionsCardComponent = ({ post }) => {
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
        { text: "Confirmar", onPress: async () => await deletePost(post.id) }
      ],
      { cancelable: false }
    );
  };

  return (
    <MoreOptions
      style={{ position: "absolute", right: 10, top: 15 }}
      options={["Editar", "Excluir", "Salvar", "Denunciar"]}
      actions={[onEdit, onDelete, () => {}, () => {}]}
    />
  );
};

MoreOptionsCardComponent.propTypes = {
  post: PropTypes.object.isRequired
};

export default MoreOptionsCardComponent;
