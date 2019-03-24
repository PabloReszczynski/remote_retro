import React from "react"
import { spy } from "sinon"
import { shallow } from "enzyme"

import ViewportMetaTag from "../../web/static/js/components/viewport_meta_tag"
import { RemoteRetro } from "../../web/static/js/components/remote_retro"
import STAGES from "../../web/static/js/configs/stages"

const { IDEA_GENERATION, CLOSED } = STAGES

describe("RemoteRetro component", () => {
  const mockRetroChannel = {}
  const stubUser = { given_name: "Mugatu" }
  const defaultProps = {
    currentUser: stubUser,
    retroChannel: mockRetroChannel,
    isTabletOrAbove: true,
    presences: [],
    browser: { orientation: "landscape" },
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

  // we can't afford to have this integration break, as it could b0rk
  it("renders a ViewportMetaTag, passing stage, alert, and browser orientation", () => {
    const wrapper = shallow(
      <RemoteRetro
        {...defaultProps}
        alert={{ derp: "herp" }}
        browser={{ orientation: "portrait" }}
        stage="lobby"
      />
    )

    expect(wrapper.find(ViewportMetaTag).props()).to.eql({
      alert: { derp: "herp" },
      stage: "lobby",
      browserOrientation: "portrait",
    })
  })
})
