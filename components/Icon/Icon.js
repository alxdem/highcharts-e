import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Block from './Icon.style';
import * as icons from './static';

const iconNames = Object.keys(icons);

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.oneOf(iconNames),
    fill: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    fit: PropTypes.bool
  };

  render() {
    const { name, fill, fit, height: _height, width: _width } = this.props;
    const SvgIcon = icons[name];

    const height = fit ? '100%' : height ? height : null;
    const width = fit ? '100%' : width ? width : null;

    const conditionalProps = {};
    if (height !== null) conditionalProps.height = height;
    if (width !== null) conditionalProps.width = width;

    return <Block fill={fill} as={SvgIcon} {...conditionalProps} />;
  }
}
