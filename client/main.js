import { Template } from "meteor/templating"
import { ReactiveVar } from "meteor/reactive-var"

import "./main.html"
import "./exporturls"

Template.hello.onCreated(function helloOnCreated() {})

Template.hello.helpers({})

Template.hello.events({
  "click button"(event, instance) {
    Meteor.call("exporturls.insert", (error) => {
      console.log("called add export url", error)
    })
  },
})
