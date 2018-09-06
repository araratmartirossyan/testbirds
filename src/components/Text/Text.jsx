import React, { Component } from 'react'
import { node, string, bool, number } from 'prop-types'
import cx from 'classnames'
import './Text.css'

export default class Text extends Component {
  render() {
    const {
      component,
      block,
      children,
      size,
      weight,
      lineHeight,
      color,
      uppercase,
      required
    } = this.props
    const Tag = component
    const height = lineHeight && `${lineHeight}px`
      
    return (
      <Tag
        className={cx({
          text: true,
          block: block,
          uppercase: uppercase,
          required: required
        })}
        style={{
          fontSize: size,
          fontWeight: weight,
          lineHeight: height,
          color: color
        }}
      >
        {children}
      </Tag>
    )
  }
}

Text.propTypes = {
  component: string,
  uppercase: bool,
  block: bool,
  size: string,
  color: string,
  children: node,
  weight: number,
  required: bool
}

Text.defaultProps = {
  component: 'p',
  block: false,
  children: '',
  size: '14px',
  weight: 400,
  color: 'gray',
  uppercase: false,
  required: false
}
