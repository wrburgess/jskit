/* jshint esnext: true */
import Events from "backbone-events-standalone";
import _ from "lodash";
import s from "./string";
import BaseController from "./controller";

var clone = _.clone;
var extend = _.extend;
var first = _.first;

export default class Application {
  constructor() {
    this.Controllers = {};
    this.Dispatcher = clone(Events);
  }

  createController(name, attrs) {
    var dispatcher = attrs.dispatcher || this.Dispatcher;
    if (attrs.dispatcher) delete attrs.dispatcher;

    name = s.constantize(name);
    extend(attrs, { name: name });

    class Controller extends BaseController {}
    extend(Controller.prototype, attrs);
    this[`${attrs.name}Controller`] = Controller;
    this.Controllers[name] = new Controller(dispatcher, attrs);

    return this.Controllers[name];
  }
}
