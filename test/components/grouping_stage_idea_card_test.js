import React from "react"
import { mount } from "enzyme"

import { GroupingStageIdeaCard } from "../../web/static/js/components/grouping_stage_idea_card"

describe("<GroupingStageIdeaCard />", () => {
  let wrapper
  let idea
  let html

  describe("when the given idea has x and y attributes", () => {
    beforeEach(() => {
      idea = { id: 5, body: "hello", x: 53, y: 109 }
      wrapper = mount(<GroupingStageIdeaCard idea={idea} />)
      html = wrapper.html()
    })

    it("applies fixed position inline styling", () => {
      expect(html).to.match(/style="position: fixed/i)
    })

    it("applies inline styling mapping the y value to 'top'", () => {
      expect(html).to.match(/style=".* top: 109px/i)
    })

    it("applies inline styling mapping the x value to 'left'", () => {
      expect(html).to.match(/style=".* left: 53px/i)
    })
  })

  describe("when the given idea *lacks* x and y attributes", () => {
    beforeEach(() => {
      idea = { id: 9, body: "goodbye" }
      wrapper = mount(<GroupingStageIdeaCard idea={idea} />)
      html = wrapper.html()
    })

    it("applies no inline styling", () => {
      expect(html).to.not.match(/style=/i)
    })
  })
})
