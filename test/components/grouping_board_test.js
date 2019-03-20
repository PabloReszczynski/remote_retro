import sinon from "sinon"

import { dropTargetSpec } from "../../web/static/js/components/grouping_board"

describe("GroupingBoard", () => {
  describe("dropTargetSpec", () => {
    describe("#drop", () => {
      let ideaDroppedInNewLocation

      beforeEach(() => {
        ideaDroppedInNewLocation = sinon.spy()

        const props = {
          actions: {
            ideaDroppedInNewLocation,
          },
        }

        const monitor = {
          getSourceClientOffset: () => ({ x: 78, y: 106 }),
          getItem: () => ({
            draggedIdea: {
              id: 54,
              body: "New consultant wrote tests without us even asking!",
            },
          }),
        }

        dropTargetSpec.drop(props, monitor)
      })

      it("invokes the ideaDroppedInNewLocation action with attrs of the idea from the drag", () => {
        expect(ideaDroppedInNewLocation).to.have.been.calledWithMatch({
          id: 54,
          body: "New consultant wrote tests without us even asking!",
        })
      })

      // the 1px increment helps account for border
      it("also includes the x/y client offsets from the drag, adding 1 to the x value", () => {
        expect(ideaDroppedInNewLocation).to.have.been.calledWithMatch({
          x: 79,
          y: 106,
        })
      })
    })
  })
})
