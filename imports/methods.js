import { Meteor } from "meteor/meteor"
import { ExportUrls } from "./api/exporturls"
import { urls } from "./urls"
import { check } from "meteor/check"
import { Random } from "meteor/random"
const bound = Meteor.bindEnvironment((callback) => {
  callback()
})

Meteor.methods({
  async "exporturls.insert"() {
    let id = await ExportUrls.insert({
      progress: 0,
      url: Random.choice(urls),
      createdAt: new Date(),
    })
    let timer = setInterval(
      () =>
        bound(async () => {
          let current = await ExportUrls.findOne({ _id: id })
          // console.log("current: ", current)
          if (current.progress >= 100) {
            clearInterval(timer)
          } else {
            await ExportUrls.update(id, { $set: { progress: current.progress + 5 } }, {}, () =>
              console.log("update progress for id", id, current.progress + 5)
            )
          }
        }),
      1000
    )
    console.log("Adding export url: ", id)
  },
  async "exporturls.delete"(id) {
    console.log("deleting export url: ", id)
    check(id, String)
    return await ExportUrls.remove(id)
  },
})
