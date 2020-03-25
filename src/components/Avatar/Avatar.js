import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";

import style from "./Avatar.style";

const IMAGE_DEFAULT =
  "https://i6b8b4u5.stackpathcdn.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";

const Avatar = ({ picture, size }) => (
  <Image style={[style.userImage, style[size]]} source={{ uri: picture }} />
);

Avatar.propTypes = {
  size: PropTypes.oneOf(["small", "regular", "large"]),
  picture: PropTypes.string
};

Avatar.defaultProps = {
  picture: IMAGE_DEFAULT,
  size: "regular"
};

export default Avatar;
