import { Meteor } from "meteor/meteor"
import { ExportUrls } from "../exporturls"

Meteor.publish("exporturls.all", function () {
  return ExportUrls.find()
})
