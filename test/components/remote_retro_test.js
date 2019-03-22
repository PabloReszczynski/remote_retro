import React from "react"
import { spy } from "sinon"
import { shallow } from "enzyme"

import { RemoteRetro } from "../../web/static/js/components/remote_retro"
import STAGES from "../../web/static/js/configs/stages"

const { IDEA_GENERATION, GROUPING, CLOSED } = STAGES

describe("RemoteRetro component", () => {
  const mockRetroChannel = {}
  const stubUser = { given_name: "Mugatu" }
  const defaultProps = {
    currentUser: stubUser,
    retroChannel: mockRetroChannel,
    isTabletOrAbove: true,
    presences: [],
    actions: {},
    ideas: [],
    stage: IDEA_GENERATION,
    facilitatorName: "Daniel Handpan",
    retro: { stage: IDEA_GENERATION },
  }

  context("when the component mounts", () => {
    it("triggers a hotjar event, passing the stage", () => {
      const hotjarSpy = spy(global, "hj")

      mountWithConnectedSubcomponents(
        <RemoteRetro {...defaultProps} stage={CLOSED} />
      )

      expect(hotjarSpy).calledWith("trigger", CLOSED)
    })
  })

  context("when in the grouping stage", () => {
    const stage = GROUPING

    context("when there is an alert object", () => {
      const alert = { header: "Love", body: "is all there is" }

      it("renders a viewport meta tag with a width of the device width to ensure readability of the alert", () => {
        const wrapper = shallow(
          <RemoteRetro {...defaultProps} stage={stage} alert={alert} />
        )

        expect(
          wrapper.find("meta[name='viewport']").prop("content")
        ).to.match(/width=device-width/)
      })
    })

    context("when there is no alert object provided", () => {
      it("sets viewport to 1440 to ensure mobile and desktop boards are identical", () => {
        const wrapper = shallow(
          <RemoteRetro {...defaultProps} stage={stage} alert={null} />
        )

        expect(
          wrapper.find("meta[name='viewport']").prop("content")
        ).to.eql("width=1440")
      })
    })
  })

  context("when in a stage *other* than grouping", () => {
    const stage = IDEA_GENERATION

    it("sets a viewport width to the device width regardless of alert status", () => {
      const potentialAlertCases = [null, { body: "You've broken your mind" }]

      potentialAlertCases.forEach(alertCase => {
        const wrapper = shallow(
          <RemoteRetro {...defaultProps} stage={stage} alert={alertCase} />
        )

        expect(
          wrapper.find("meta[name='viewport']").prop("content")
        ).to.match(/width=device-width/)
      })
    })
  })
})
