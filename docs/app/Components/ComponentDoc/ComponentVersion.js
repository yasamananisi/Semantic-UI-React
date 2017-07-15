import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import { Label } from 'src'

export default class ComponentVersion extends PureComponent {
  static propTypes = {
    version: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
  }

  computeVersions = () => {
    const { version } = this.props

    if (typeof version === 'string') return [version, null]
    return version
  }

  render() {
    const [SUIR, SUI] = this.computeVersions()

    return (
      <div>
        {<Label as='a' color='teal' content={SUIR} size='tiny' title={`Available from Semantic UI React ${SUIR}`} />}
        {SUI && <Label as='a' color='teal' content={SUI} size='tiny' title={`Available from Semantic UI ${SUI}`} />}
      </div>
    )
  }
}
