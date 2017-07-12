import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  customPropTypes,
  getElementType,
  META,
  SUI,
} from '../../lib'

/**
 * A Breakpoint can control visibility of content.
 */
export default class Breakpoint extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** A row can appear only for a specific device, or screen sizes. */
    only: customPropTypes.onlyProp(SUI.VISIBILITY).isRequired,

    /** Breakpoints definition. */
    points: PropTypes.shape({
      computer: PropTypes.number.isRequired(),
      largeScreen: PropTypes.number.isRequired(),
      mobile: PropTypes.number.isRequired(),
      tablet: PropTypes.number.isRequired(),
      widescreen: PropTypes.number.isRequired(),
    }),

    /** The number of milliseconds to throttle invocations to. */
    wait: PropTypes.number,
  }

  static defaultProps = {
    points: {
      computer: 992,
      largeScreen: 1200,
      mobile: 320,
      tablet: 768,
      widescreen: 1920,
    },
    wait: 200,
  }

  static _meta = {
    name: 'Breakpoint',
    type: META.TYPES.ADDON,
  }

  constructor(...args) {
    super(...args)
    this.state = { width: window.innerWidth }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleUpdate)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleUpdate)
  }

  // ----------------------------------------
  // Breakpoint matchers
  // ----------------------------------------

  computer = () => {
    const { points: { computer } } = this.props
    const { width } = this.state

    return width >= computer
  }

  largeScreen = () => {
    const { points: { largeScreen, widescreen } } = this.props
    const { width } = this.state

    return width >= largeScreen && width < widescreen
  }

  mobile = () => {
    const { points: { mobile, tablet } } = this.props
    const { width } = this.state

    return width >= mobile && width < tablet
  }

  tablet = () => {
    const { points: { computer, tablet } } = this.props
    const { width } = this.state

    return width >= tablet && width < computer
  }

  widescreen = () => {
    const { points: { widescreen } } = this.props
    const { width } = this.state

    return width >= widescreen
  }

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  visible = () => {
    const { only } = this.props
    const points = only.replace('large screen', 'largeScreen').split(' ')

    return _.some(points, point => _.invoke(this, point))
  }

  // ----------------------------------------
  // Event handlers
  // ----------------------------------------

  handleUpdate = () => {
    const { wait } = this.props

    _.throttle(this.updateState, wait)
  }

  updateState = () => this.setState({ width: window.innerWidth })

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {
    const { children } = this.props
    const ElementType = getElementType(Breakpoint, this.props)

    if (this.visible()) return <ElementType>{ children }</ElementType>
    return null
  }
}


