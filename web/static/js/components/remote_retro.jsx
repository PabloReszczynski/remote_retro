import React, { Component } from "react"
import MultiBackend from "react-dnd-multi-backend"
import HTML5toTouch from "react-dnd-multi-backend/lib/HTML5toTouch"
import { DragDropContext } from "react-dnd"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { actions, selectors } from "../redux"
import stages from "../configs/stages"

import * as AppPropTypes from "../prop_types"

import Room from "./room"
import Alert from "./alert"
import Error from "./error"
import DoorChime from "./door_chime"
import StageHelp from "./stage_help"

export class RemoteRetro extends Component {
  // Trigger analytics events on page load and stage changes
  componentDidMount() {
    const { stage } = this.props
    hj("trigger", stage)
  }

  componentDidUpdate(prevProps) {
    const { stage } = this.props
    if (prevProps.stage !== stage) { hj("trigger", stage) }
  }

  render() {
    const {
      presences,
      ideas,
      retroChannel,
      stage,
      alert,
      error,
      currentUser,
      facilitatorName,
      isTabletOrAbove,
      retro,
      actions,
    } = this.props

    const viewportMetaContent = stage === stages.GROUPING && !alert ? "width=1440" : "width=device-width, initial-scale=1"

    return (
      <div className={stage}>
        <MetaTags>
          <meta name="viewport" content={viewportMetaContent} />
        </MetaTags>
        <Room
          currentUser={currentUser}
          facilitatorName={facilitatorName}
          presences={presences}
          ideas={ideas}
          stage={stage}
          actions={actions}
          browser={browser}
          retroChannel={retroChannel}
          isTabletOrAbove={isTabletOrAbove}
        />
        <Alert config={alert} />
        <Error config={error} />
        <DoorChime presences={presences} />
        <StageHelp retro={retro} actions={actions} />
      </div>
    )
  }
}

RemoteRetro.propTypes = {
  retroChannel: AppPropTypes.retroChannel.isRequired,
  presences: AppPropTypes.presences.isRequired,
  ideas: AppPropTypes.ideas.isRequired,
  stage: AppPropTypes.stage.isRequired,
  alert: PropTypes.object,
  error: PropTypes.object,
  actions: AppPropTypes.actions.isRequired,
  currentUser: AppPropTypes.presence,
  facilitatorName: PropTypes.string,
  isTabletOrAbove: PropTypes.bool.isRequired,
  retro: AppPropTypes.retro.isRequired,
}

RemoteRetro.defaultProps = {
  /*
  / account for initial render occurring before ephemeral 'presence' state
  / is sent by server, as that event necessarily arrives *after*
  / the channel is joined
  */
  currentUser: {
    is_facilitator: false,
    token: window.userToken,
  },
  facilitatorName: "",
  alert: null,
  error: null,
}

const mapStateToProps = state => {
  const { stage, facilitator_id } = state.retro /* eslint-disable-line camelcase */
  return {
    ...state,
    stage,
    currentUser: selectors.getCurrentUserPresence(state),
    facilitatorName: selectors.getUserById(state, facilitator_id).name,
    isTabletOrAbove: selectors.isTabletOrAbove(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

const RemoteRetroDragAndDropContext = DragDropContext(MultiBackend(HTML5toTouch))(RemoteRetro)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteRetroDragAndDropContext)
