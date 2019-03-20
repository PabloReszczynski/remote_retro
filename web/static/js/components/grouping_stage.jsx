import React from "react"
import { Preview as TouchEventDragPreview } from "react-dnd-multi-backend"

import LowerThird from "./lower_third"
import GroupingStageIdeaCard from "./grouping_stage_idea_card"

import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/idea_generation_stage.css"

// specification for rendering a drag preview on touch devices
// https://github.com/LouisBrunner/dnd-multi-backend/tree/master/packages/react-dnd-multi-backend#preview
const generateTouchEventDragPreview = (type, item, styles) => {
  return <GroupingStageIdeaCard touchEventDragPreviewStyles={styles} idea={item.draggedIdea} />
}

const GroupingStage = props => {
  const { ideas } = props

  return (
    <div className={styles.wrapper}>
      <div style={{ flex: 1 }}>
        {ideas.map(idea => (
          <GroupingStageIdeaCard idea={idea} key={idea.id} />
        ))}
      </div>
      <LowerThird {...props} />
      <TouchEventDragPreview generator={generateTouchEventDragPreview} />
    </div>
  )
}

GroupingStage.propTypes = {
  ideas: AppPropTypes.ideas.isRequired,
}

export default GroupingStage
