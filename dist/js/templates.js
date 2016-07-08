(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['about.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"container\">\n    <div class=\"col-md-12\">\n        <h2>Eorzea Timers - An Open Source Project.</h2>\n        <h3 class=\"bordered-header\">Version: "
    + container.escapeExpression(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"version","hash":{},"data":data}) : helper)))
    + " (<a target=\"_blank\" href=\"https://github.com/tnbKristi/eorzea_timers/releases\">release notes</a>)</h3>\n        \n        <p>Please report bugs and data errors at the Github repository <a target=\"_blank\" href=\"https://github.com/tnbKristi/eorzea_timers\">here</a>, or contribute to the code via pull request. <br/> Keep in mind I am a real human with a job, and disrespectful comments &amp; angry demands will be ignored.</p>\n\n        <p>Thanks for your kind support and appreciation for this project.</p>\n\n        <h3 class=\"bordered-header\">App Features</h3>\n        <ul>\n            <li>Uses LocalStorage to save your preferences and watch lists.</li>\n            <li>Add your own custom timers! Saved via LocalStorage until you remove them.</li>\n            <li>Slots, and x/y coordinates included with all known unspoiled node locations.</li>\n            <li>Incredibly easy to update and contribute! <a target=\"_blank\" href=\"https://github.com/tnbKristi/eorzea_timers\">Learn more here.</a></li>\n        </ul>\n\n        <h3 class=\"bordered-header\">F.A.Q</h3>\n\n        <h4>The time seems off by ~3 Eorzean minutes. What's up with that?</h4>\n        <p>Eorzean time is calculated from Epoch time -- one hour is 2 minutes, 55 seconds Earth time. Because of this, sometimes the math that rounds the time up or down can be off by about 30 seconds.</p>\n        <p>If your time is off by much more than 3 minutes, your computer/phone's time may be off. Check out <a href=\"http://time.is/\" target=\"_blank\">http://time.is/</a> to see if it's a time sync issue.</p>\n\n        <h4>There's a bunch of other timers out there. Why make another one?</h4>\n        <p>A few reasons, actually!</p>\n        <ul>\n            <li>I'm a web developer + huge gathering crazie. I wanted to build something that was exactly what I wanted as I spend a LOT of time gathering and staring at this timer screen. :)</li>\n            <li>There isn't an open-source project for timers. I'd rather share my work and hope others help make it better.</li>\n            <li>I frankly didn't like the look/feel or features of what exists currently!</li>\n        </ul>\n        <p>I think it's great that there are lots of options, and I encourage you to <i>not</i> use mine if it doesn't work for you. :) </p>\n\n        <h4>Can you add [insert feature here]?</h4>\n\n        <p>Probably! Please make an suggestion as an issue on the github repo <a target=\"_blank\" href=\"https://github.com/tnbKristi/eorzea_timers\">here</a>!\n    </div>\n</div>";
},"useData":true});
templates['clock.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"time","hash":{},"data":data}) : helper)));
},"useData":true});
templates['custom-timer.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <div class=\"form-group form-inline form-time\" data-index=\""
    + alias4(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">\n                        <div class=\"input-group col-md-3\">\n                            <div class=\"input-group-addon\">hour</div>\n                            <input type=\"number\" name=\"hour\" data-parsley-range=\"[1, 12]\" value=\""
    + alias4(((helper = (helper = helpers.hour || (depth0 != null ? depth0.hour : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hour","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" required data-parsley-errors-messages-disabled />\n                        </div>\n                        <div class=\"input-group col-md-3\">\n                            <div class=\"input-group-addon\">minute</div>\n                            <input type=\"number\" name=\"min\" value=\""
    + alias4(((helper = (helper = helpers.min || (depth0 != null ? depth0.min : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"min","hash":{},"data":data}) : helper)))
    + "\" data-parsley-range=\"[0, 59]\" class=\"form-control\" required data-parsley-errors-messages-disabled />\n                        </div>\n                        <div class=\"input-group col-md-3\">\n                            <select class=\"form-control\" name=\"mer\" value=\""
    + alias4(((helper = (helper = helpers.meridien || (depth0 != null ? depth0.meridien : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"meridien","hash":{},"data":data}) : helper)))
    + "\" required data-parsley-errors-messages-disabled >\n                                <option value=\"AM\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.meridien : depth0),"AM",{"name":"is","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >AM</option>\n                                <option value=\"PM\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.meridien : depth0),"PM",{"name":"is","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >PM</option>\n                            </select>\n                        </div>\n                    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " selected";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"clearfix\">\n    <form class=\"col-md-12\">\n        <div class=\"form-group\">\n            <label>Name</label>\n            <input type=\"text\" name=\"name\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" required data-parsley-errors-messages-disabled data-parsley-maxlength=\"100\" />\n        </div>\n        <div class=\"form-group\">\n            <label>Location</label>\n            <input type=\"text\" name=\"location\" value=\""
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" />\n        </div>\n        <div class=\"row\">\n            <div class=\"form-group col-md-4\">\n                <label>Slot</label>\n                <input type=\"text\" name=\"slot\" value=\""
    + alias4(((helper = (helper = helpers.slot || (depth0 != null ? depth0.slot : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slot","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" />\n            </div>\n\n            <div class=\"form-group col-md-8\">\n                <div class=\"row\">\n                    <label>Position</label>\n                    <div class=\"form-group form-inline\">\n                        <div class=\"input-group col-md-4\">\n                            <div class=\"input-group-addon\">x</div>\n                            <input type=\"number\" name=\"xpos\" value=\""
    + alias4(((helper = (helper = helpers.xPos || (depth0 != null ? depth0.xPos : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"xPos","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" />\n                        </div>\n                        <div class=\"input-group col-md-4\">\n                            <div class=\"input-group-addon\">y</div>\n                            <input type=\"number\" name=\"ypos\" value=\""
    + alias4(((helper = (helper = helpers.yPos || (depth0 != null ? depth0.yPos : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"yPos","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" />\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label class=\"times-label\">\n                Time\n            </label>\n            <div class=\"times-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.times : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n        <div class=\"form-group\">\n            <label>Duration</label>\n            <div class=\"form-group form-inline\">\n                <div class=\"input-group col-md-3\">\n                    <div class=\"input-group-addon\">hours</div>\n                    <input type=\"number\" name=\"duration-hours\" value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.duration_obj : depth0)) != null ? stack1.hours : stack1), depth0))
    + "\" data-parsley-range=\"[0, 23]\" class=\"form-control\" required data-parsley-errors-messages-disabled />\n                </div>\n                <div class=\"input-group col-md-3\">\n                    <div class=\"input-group-addon\">minutes</div>\n                    <input type=\"number\" name=\"duration-min\" value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.duration_obj : depth0)) != null ? stack1.minutes : stack1), depth0))
    + "\" data-parsley-range=\"[0, 59]\" class=\"form-control\" required data-parsley-errors-messages-disabled  />\n                </div>\n            </div>\n        </div>\n        <div class=\"form-actions align-right\">\n            <a class=\"btn btn-primary btn-save\">Save</a>\n            <a class=\"btn btn-default btn-close\" data-dismiss=\"modal\">Cancel</a>\n        </div>\n    </form>\n</div>";
},"useData":true});
templates['embedcode.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul class=\"nav nav-tabs\">\n  <li role=\"presentation\" class=\"active\"><a href=\"#light-widget\" data-toggle=\"tab\">Light</a></li>\n  <li role=\"presentation\"><a href=\"#dark-widget\" data-toggle=\"tab\">Dark</a></li>\n</ul>\n<div class=\"tab-content\">\n    <div class=\"tab-pane active\" id=\"light-widget\">\n        <iframe src=\"http://eorzea-timers.com/widget.html\" width=\"100%\" height=\"130px\" style=\"border:0;\"></iframe>\n        <hr />\n        <h4>Copy + paste this wherever you want to display your timer:</h4>\n        <p class=\"small\">(note: background is actually transparent)</p>\n        <pre>\n&lt;iframe src=\"http://eorzea-timers.com/widget.html\" width=\"100%\" height=\"130px\" style=\"border:0;\"&gt;&lt;/iframe&gt;\n        </pre>\n    </div>\n    <div class=\"tab-pane\" id=\"dark-widget\">\n        <iframe src=\"http://eorzea-timers.com/widget-dark.html\" width=\"100%\" height=\"130px\" style=\"border:0;\"></iframe>\n        <hr />\n        <h4>Copy + paste this wherever you want to display your timer:</h4>\n        <p class=\"small\">(note: background is actually transparent)</p>\n        <pre>\n&lt;iframe src=\"http://eorzea-timers.com/widget-dark.html\" width=\"100%\" height=\"130px\" style=\"border:0;\"&gt;&lt;/iframe&gt;\n        </pre>\n    </div>\n</div>\n";
},"useData":true});
templates['empty.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['error.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h3>Something went wrong</h3>\n<p>"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n<p>Try refreshing the page. If the problem persists, please report it as an issue at the code repo on Github with <b>detailed instructions</b> on how to reproduce. Thank you!</p>";
},"useData":true});
templates['modal.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <h4 class=\"modal-title\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n        <div class=\"modal-header\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"modal-body\"></div>\n    </div>\n</div>";
},"useData":true});
templates['node-popup.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <span class=\"icon "
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"type","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.nodeList : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "                <div class=\"node-info\">\n                    <h2>\n                        "
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " \n                        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_collectable : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_ephemeral : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    </h2>\n                    <h4 class=\"title\">\n                        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.slot : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    </h4>\n                </div>\n                <div class=\"node-footer\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-cube\"></i>";
},"7":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-star\"></i>";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return " [slot "
    + container.escapeExpression(((helper = (helper = helpers.slot || (depth0 != null ? depth0.slot : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"slot","hash":{},"data":data}) : helper)))
    + "]";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <div class=\"location\">"
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + ", "
    + alias4(((helper = (helper = helpers.pos || (depth0 != null ? depth0.pos : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pos","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "            <div class=\"node-info\">\n                <h2>\n                    "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.node : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n                    "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.node : depth0)) != null ? stack1.is_collectable : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.node : depth0)) != null ? stack1.is_ephemeral : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                </h2>\n                <h4 class=\"title\">\n                    "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.node : depth0)) != null ? stack1.slot : stack1),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                </h4>\n            </div>\n            <div class=\"node-footer\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.node : depth0)) != null ? stack1.location : stack1),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " [slot "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.node : depth0)) != null ? stack1.slot : stack1), depth0))
    + "]";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <div class=\"location\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.node : depth0)) != null ? stack1.location : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.node : depth0)) != null ? stack1.pos : stack1), depth0))
    + "</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"node-content "
    + alias4(((helper = (helper = helpers.classes || (depth0 != null ? depth0.classes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classes","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"node-heading\">\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.nodeList : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <h3><span class=\"time\">"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</span></h3>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.nodeList : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"form-actions align-right\">\n        <a class=\"btn btn-default btn-close\" data-dismiss=\"modal\">Close</a>\n    </div>\n</div>";
},"useData":true});
templates['node.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " [slot "
    + container.escapeExpression(((helper = (helper = helpers.slot || (depth0 != null ? depth0.slot : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"slot","hash":{},"data":data}) : helper)))
    + "]";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <span class=\"time-remaining\">[\n                    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.earth_time_remaining : depth0)) != null ? stack1.minutes : stack1), depth0))
    + "m "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.earth_time_remaining : depth0)) != null ? stack1.seconds : stack1), depth0))
    + "s\n                ]</span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-star\"></i>";
},"7":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-book\"></i>";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.scrip : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n                        <span class=\"scrip-rating\"><i class=\"icon "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.scrip : depth0)) != null ? stack1.icon : stack1), depth0))
    + "\"></i></span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "                        <i class=\"fa fa-cube\"></i>\n                ";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"location\">"
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + ", "
    + alias4(((helper = (helper = helpers.pos || (depth0 != null ? depth0.pos : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pos","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "            <a class=\"btn btn-primary btn-xs btn-edit\"><i class=\"fa fa-pencil\"></i></a>\n            <a class=\"btn btn-danger btn-xs btn-delete\"><i class=\"fa fa-times\"></i></a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"node-content "
    + alias4(((helper = (helper = helpers.classes || (depth0 != null ? depth0.classes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classes","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"node-heading\">\n        <span class=\"icon "
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"></span>\n        <span class=\"time\">"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</span>\n\n        <div class=\"node-info\"> \n            <span class=\"title\">\n                "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.slot : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            </span>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isActive : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            <div class=\"inline-block\">\n                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_ephemeral : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_legendary : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_collectable : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            </div>\n        </div>\n    </div>\n    <div class=\"node-body\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isCustom : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n</div>";
},"useData":true});
templates['widget-nodelist.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "    <span class=\"icon "
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
    + "\"></span><span class=\"badge\">"
    + alias1(container.lambda(depth0, depth0))
    + "</span> \n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p class=\"small\">nodes active now:</p>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.active : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['widget.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"clock-region\"></div>\n<div class=\"nodes-region\"></div>\n<a href=\"http://eorzea-timers.com\" target=\"_blank\">eorzea-timers.com</a>";
},"useData":true});
templates['custom-timer/time-slot.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"form-group form-inline form-time\">\n    <div class=\"input-group col-md-3\">\n        <div class=\"input-group-addon\">hour</div>\n        <input type=\"range\" name=\"hour\" value=\"\" class=\"form-control\" data-parsley-range=\"[1, 12]\" data-parsley-errors-messages-disabled />\n    </div>\n    <div class=\"input-group col-md-3\">\n        <div class=\"input-group-addon\">minute</div>\n        <input type=\"range\" name=\"min\" value=\"\" class=\"form-control\" data-parsley-range=\"[0, 59]\" data-parsley-errors-messages-disabled />\n    </div>\n    <div class=\"input-group col-md-3\">\n        <select name=\"meridien\" class=\"form-control\" value=\"\">\n            <option>AM</option>\n            <option>PM</option>\n        </select>\n    </div>\n    <a class=\"rem-time btn btn-sm btn-danger\"><i class=\"fa fa-minus\"></i></a>\n</div>";
},"useData":true});
templates['home/home.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<div class=\"container\">\n    <div class=\"jumbotron-region\"></div>\n    <div class=\"col-md-12\">\n        <div class=\"row\">\n            <div class=\"col-md-9\">\n                <div class=\"nodes-filter\">\n                    <div class=\"filter-label\">Filter by:</div>\n                    <div class=\"btn-group filter-menu\">\n                        <div class=\"btn btn-primary btn-sm "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.filteringBy : depth0),"all",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " all\" data-target=\"all\">All</div>\n                        <div class=\"btn btn-primary btn-sm "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.filteringBy : depth0),"botany",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " botany\" data-target=\"botany\"><span class=\"icon botany\"></span> Botany</div>\n                        <div class=\"btn btn-primary btn-sm "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.filteringBy : depth0),"mining",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " mining\" data-target=\"mining\"><span class=\"icon mining\"></span>  Mining</div>\n                        <div class=\"btn btn-primary btn-sm "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.filteringBy : depth0),"fishing",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " fishing\" data-target=\"fishing\"><span class=\"icon fishing\"></span>  Fishing</div>\n                        <div class=\"btn btn-primary btn-sm "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.filteringBy : depth0),"custom",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " custom\" data-target=\"custom\"><span class=\"icon custom\"></span> Custom</div>\n                    </div>                        \n                </div>\n                <div class=\"nodes-filter\">\n                    <div class=\"filter-label\">Special attributes:</div>                        \n                    <div class=\"btn-group attr-menu\">\n                        <div class=\"btn btn-default btn-sm "
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.attrFilters : depth0),"is_collectable",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is_collectable\" data-target=\"is_collectable\"><span class=\"fa fa-cube\"></span> Collectable</div>\n                        <div class=\"btn btn-default btn-sm "
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.attrFilters : depth0),"is_ephemeral",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is_ephemeral\" data-target=\"is_ephemeral\"><span class=\"fa fa-star\"></span> Ephemeral</div>\n                        <div class=\"btn btn-default btn-sm "
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.attrFilters : depth0),"is_legendary",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is_legendary\" data-target=\"is_legendary\"><span class=\"fa fa-book\"></span> Legendary</div>\n                        <div class=\"btn btn-default btn-sm "
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.attrFilters : depth0),"red_scrip",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " scrip red_scrip\" data-target=\"red_scrip\"><span class=\"icon red_scrip\"></span></div>\n                        <div class=\"btn btn-default btn-sm "
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.attrFilters : depth0),"blue_scrip",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " scrip blue_scrip\" data-target=\"blue_scrip\"><span class=\"icon blue_scrip\"></span></div>\n                    </div>                        \n                </div>\n            </div>\n            <div class=\"col-md-3 align-right\">\n                <div class=\"btn-group\">\n                    <a class=\"btn btn-default new-timer-btn btn-lg\"><i class=\"fa fa-plus\"></i> New Timer</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"search-menu col-md-6\">\n                <div class=\"filter-list-form\">\n                    <div class=\"form-group\">\n                        <label>Filter List:</label>\n                        <input type=\"text\" class=\"form-control node-search-input\" />\n                        <small>Search by: Name or Location</small>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-12\">\n        <h3>Active Nodes:</h3>\n        <div class=\"active-nodes-region\">\n            <div class=\"nodes-list active-nodes\"></div>\n        </div>\n    </div>\n    <div class=\"col-md-12\">\n        <h3>Up Next Hour:</h3>\n        <div class=\"next-hour-nodes-region\"></div>\n    </div>\n    <div class=\"col-md-12\">\n        <h3>In 2 Hours:</h3>\n        <div class=\"two-hour-nodes-region\"></div>\n    </div>\n    <div class=\"col-md-12\">\n        <h3>After That:</h3>\n        <div class=\"other-nodes-region\"></div>\n    </div>\n</div>\n<div class=\"new-timer-modal-region\" id=\"new-timer-modal\"></div>";
},"useData":true});
templates['home/jumbotron.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"collapse-toggle\">\n    <a class=\"toggle-link btn btn-default\">\n        <i class=\"fa\"></i>\n    </a>\n</div>\n<div class=\"jumbo-content\">\n    <div class=\"clock-region\"></div>\n    <p>Eorzean Time</p>    \n</div>\n";
},"useData":true});
templates['main-nav/main-nav.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<a href=\"#\" class=\"navbar-brand\">Eorzea Timers <small>v"
    + container.escapeExpression(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</small></a>\n<div class=\"pull-left\">\n    <a class=\"css-toggle menu-link "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.colorScheme : depth0),"dark",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " light\" data-target=\"light\"><i class=\"fa fa-sun-o\"></i></a>\n    <a class=\"css-toggle menu-link "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.colorScheme : depth0),"light",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " dark\" data-target=\"dark\"><i class=\"fa fa-moon-o\"></i></a>\n</div>\n<div class=\"clock-region pull-right\"></div>\n<a class=\"pull-right menu-link menu-toggle\" data-toggle=\"collapse\" href=\"#menu\"><i class=\"fa fa-bars\"></i></a>\n<div class=\"menu-region pull-right\"></div>\n";
},"useData":true});
templates['main-nav/menu.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <li class=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isActive : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                <a href=\"#"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.watchCount : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </a>\n            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " active";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <span class=\"badge\">"
    + container.escapeExpression(((helper = (helper = helpers.watchCount || (depth0 != null ? depth0.watchCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"watchCount","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <ul class=\"nav navbar-nav\" id=\"menu\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.menuItems : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <li class=\"embed\"><a class=\"embed-link\">Embed</a></li>\n    </ul>\n";
},"useData":true});
templates['watch-list/base.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"container\">\n    <div class=\"col-md-12\">\n        <h3>\n            Watch List \n            <a class=\"watch-settings-link btn btn-default btn-sm\"><i class=\"fa fa-cog\"></i> preferences</a>\n            <a class=\"btn btn-sm btn-default pull-right clear-list\"><i class=\"fa fa-times\"></i> clear all</a>\n        </h3>\n    </div>\n    <div class=\"watched-nodes-region\"></div>    \n</div>\n<div class=\"modal-region\" id=\"watch-list-modal\"></div>\n";
},"useData":true});
templates['watch-list/node.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <a class=\"btn btn-danger btn-xs btn-delete\"><i class=\"fa fa-times\"></i></a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <span class=\"scrip-rating pull-right\"><i class=\"icon "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.scrip : depth0)) != null ? stack1.icon : stack1), depth0))
    + "\"></i> </span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-cube\"></i>";
},"7":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-star\"></i>";
},"9":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-book\"></i>";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"small\"><i>time remaining:</i></div>\n        <div class=\"earth-time time-remaining\">\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.earth_time_remaining : depth0)) != null ? stack1.minutes : stack1), depth0))
    + "m "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.earth_time_remaining : depth0)) != null ? stack1.seconds : stack1), depth0))
    + "s\n        </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "        <div class=\"small\"><i>time until:</i></div>\n        <div class=\"earth-time time-until\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.untilHours : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.earth_time_until : depth0)) != null ? stack1.minutes : stack1), depth0))
    + "m "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.earth_time_until : depth0)) != null ? stack1.seconds : stack1), depth0))
    + "s\n        </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.earth_time_until : depth0)) != null ? stack1.hours : stack1), depth0))
    + "h\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"slot\">[slot "
    + container.escapeExpression(((helper = (helper = helpers.slot || (depth0 != null ? depth0.slot : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"slot","hash":{},"data":data}) : helper)))
    + "]</div>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"location footer-section\">"
    + container.escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"location","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"pos\">"
    + container.escapeExpression(((helper = (helper = helpers.pos || (depth0 != null ? depth0.pos : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"pos","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <div class=\"weather footer-section\">\n                <b>Weather:</b>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.weather : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    <span class=\"section-item\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(data && data.last),{"name":"unless","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </span>\n";
},"24":function(container,depth0,helpers,partials,data) {
    return ",";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"bait footer-section\">\n            <b>Bait: </b>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.bait : depth0),{"name":"each","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <span class=\"section-item\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(data && data.last),{"name":"unless","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"node-content "
    + alias4(((helper = (helper = helpers.classes || (depth0 != null ? depth0.classes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classes","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isCustom : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"node-heading\">\n        <span class=\"icon type "
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"></span>\n        <span class=\"time\">"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</span>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.scrip : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"node-body\">\n        <div class=\"title\">\n            "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_collectable : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_ephemeral : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_legendary : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.slot : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"node-footer\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.location : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.pos : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.weather : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.bait : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n</div>";
},"useData":true});
templates['watch-list/preferences.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "checked ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <div class=\"radio\">\n                    <label class=\"radio-inline\">\n                        <input type=\"radio\" name=\"alarm-style\" id=\"alarm-style2\" value=\"desktop\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"desktop",((stack1 = (depth0 != null ? depth0.alarm : depth0)) != null ? stack1.type : stack1),{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " />\n                        Desktop Notification (needs permission)\n                    </label>\n                </div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].alarm : depths[1])) != null ? stack1.sound : stack1),{"name":"is","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "selected ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "\n<form>\n    <div class=\"form-group\">\n        <label>Notification Time</label>\n        <div class=\"form-inline\">\n            <div class=\"radio\">\n                <label class=\"radio-inline\">\n                    <input type=\"radio\" name=\"alarm-time\" id=\"alarm-time0\" value=\"none\" "
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.alarm : depth0)) != null ? stack1.time : stack1),{"name":"unless","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " />\n                    None (disable)\n                </label>\n            </div>\n            <div class=\"radio\">\n                <label class=\"radio-inline\">\n                    <input type=\"radio\" name=\"alarm-time\" id=\"alarm-time1\" value=\"0\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.alarm : depth0)) != null ? stack1.time : stack1),"0",{"name":"is","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " />\n                    0 hours (at time)\n                </label>\n            </div>\n            <div class=\"radio\">\n                <label class=\"radio-inline\">\n                    <input type=\"radio\" name=\"alarm-time\" id=\"alarm-time2\" value=\"1\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.alarm : depth0)) != null ? stack1.time : stack1),"1",{"name":"is","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " />\n                    1 Hour\n                </label>\n            </div>\n            <div class=\"radio\">\n                <label class=\"radio-inline\">\n                    <input type=\"radio\" name=\"alarm-time\" id=\"alarm-time3\" value=\"2\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.alarm : depth0)) != null ? stack1.time : stack1),"2",{"name":"is","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " />\n                    2 Hours\n                </label>\n            </div>\n            <div class=\"radio\">\n                <label class=\"radio-inline\">\n                    <input type=\"radio\" name=\"alarm-time\" id=\"alarm-time2\" value=\"3\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.alarm : depth0)) != null ? stack1.time : stack1),"3",{"name":"is","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " />\n                    3 Hours\n                </label>\n            </div>\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label>Notice Style</label>\n        <div class=\"form-inline\">\n            <div class=\"radio\">\n                <label class=\"radio-inline\">\n                    <input type=\"radio\" name=\"alarm-style\" id=\"alarm-style1\" value=\"alert\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,"alert",((stack1 = (depth0 != null ? depth0.alarm : depth0)) != null ? stack1.type : stack1),{"name":"is","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " />\n                    Browser alert\n                </label>\n            </div>\n            <div class=\"radio\">\n                <label class=\"radio-inline\">\n                    <input type=\"radio\" name=\"alarm-style\" id=\"alarm-style2\" value=\"popup\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,"popup",((stack1 = (depth0 != null ? depth0.alarm : depth0)) != null ? stack1.type : stack1),{"name":"is","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " />\n                    In-window pop-up\n                </label>\n            </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.desktop : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"form-group row\">\n        <div class=\"col-md-8\">\n        <label>Alert Sound</label>\n        <select class=\"form-control sound-option-list\" name=\"alarm-sound\">\n            <option value=\"none\">No Sound</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.soundList : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\n        </div>\n        <div class=\"sound-preview pull-left hidden\">\n            <i class=\"fa fa-play play\"></i>\n            <i class=\"fa fa-stop stop\"></i>\n        </div>\n    </div>\n    <div class=\"form-actions align-right\">\n        <a class=\"btn btn-primary btn-save\">Save</a>\n        <a class=\"btn btn-default btn-close\" data-dismiss=\"modal\">Cancel</a>\n    </div>\n</form>\n\n\n\n";
},"useData":true,"useDepths":true});
})();