import { Template } from "meteor/templating"
import { ReactiveVar } from "meteor/reactive-var"
import { ExportUrls } from "../imports/api/exporturls"
import { ReactiveDict } from "meteor/reactive-dict"

import "./exporturls.html"

const IS_LOADING_STRING = "isLoading"

Template.exporturls.onCreated(function exporturlsOnCreated() {
  this.state = new ReactiveDict()

  const handler = Meteor.subscribe("exporturls.all")
  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready())
  })
})

Template.exporturls.helpers({
  exporturls() {
    return ExportUrls.find({})
  },
  isLoading() {
    const instance = Template.instance()
    return instance.state.get(IS_LOADING_STRING)
  },
})
Template.urlitem.helpers({
  progressNot100p(progress) {
    return progress < 100
  },
  double(i) {
    return i * 2
  },
})
Template.urlitem.events({
  "click button"(event, instance) {
    console.log("click delete", instance.data._id)
    Meteor.call("exporturls.delete", instance.data._id, (error) => {
      console.log("called add export url", error)
    })
  },
})

Template.exporturls.events({})
