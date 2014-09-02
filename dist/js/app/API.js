define("app/task/script",{global:{},settings:{canvas:{maxWidth:800,proportions:.8},hooks:{}},trialSets:{},stimulusSets:{},mediaSets:{},sequence:[]}),define("app/trial/current_trial",[],function(){var e;return function(t){return t&&(e=t),e}}),define("app/task/adjust_canvas",["jquery","app/task/script","app/trial/current_trial"],function(e,t,n){function i(i){function r(){var t,r;if(s.width){if(!i)return!0;r=s.width,t=r*a}else{var u={width:e(window).innerWidth(),height:e(window).innerHeight()},c=u.height,l=Math.min(s.maxWidth,u.width);c>a*l?(t=l*a,r=l):(t=c,r=c/a)}t-=parseInt(o.$el.css("border-top-width"),10)+parseInt(o.$el.css("border-bottom-width"),10)+parseInt(o.$el.css("margin-top"),10),r-=parseInt(o.$el.css("border-left-width"),10)+parseInt(o.$el.css("border-right-width"),10),o.$el.width(r),o.$el.height(t),o.$el.css("font-size",t*(s.textSize||3)/100),n()&&(n()._layout_collection.refresh(),n()._stimulus_collection.refresh()),window.scrollTo(0,1)}var a,o=this,s=t.settings.canvas||{};if(s.proportions)if(e.isPlainObject(s.proportions)){if("number"!=typeof s.proportions.height||"number"!=typeof s.proportions.width)throw new Error("The canvas proportions object`s height and a width properties must be numeric");a=s.proportions.height/s.proportions.width}else a=s.proportions||.8;setTimeout(r,i?0:500)}return i}),define("text",["module"],function(e){var t,n,i,r,a,o=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],s=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,u=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,c="undefined"!=typeof location&&location.href,l=c&&location.protocol&&location.protocol.replace(/\:/,""),d=c&&location.hostname,p=c&&(location.port||void 0),f={},h=e.config&&e.config()||{};return t={version:"2.0.12",strip:function(e){if(e){e=e.replace(s,"");var t=e.match(u);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:h.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){n=o[t];try{e=new ActiveXObject(n)}catch(i){}if(e){o=[n];break}}return e},parseName:function(e){var t,n,i,r=!1,a=e.indexOf("."),o=0===e.indexOf("./")||0===e.indexOf("../");return-1!==a&&(!o||a>1)?(t=e.substring(0,a),n=e.substring(a+1,e.length)):t=e,i=n||t,a=i.indexOf("!"),-1!==a&&(r="strip"===i.substring(a+1),i=i.substring(0,a),n?n=i:t=i),{moduleName:t,ext:n,strip:r}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,i,r){var a,o,s,u=t.xdRegExp.exec(e);return u?(a=u[2],o=u[3],o=o.split(":"),s=o[1],o=o[0],!(a&&a!==n||o&&o.toLowerCase()!==i.toLowerCase()||(s||o)&&s!==r)):!0},finishLoad:function(e,n,i,r){i=n?t.strip(i):i,h.isBuild&&(f[e]=i),r(i)},load:function(e,n,i,r){if(r&&r.isBuild&&!r.inlineText)return void i();h.isBuild=r&&r.isBuild;var a=t.parseName(e),o=a.moduleName+(a.ext?"."+a.ext:""),s=n.toUrl(o),u=h.useXhr||t.useXhr;return 0===s.indexOf("empty:")?void i():void(!c||u(s,l,d,p)?t.get(s,function(n){t.finishLoad(e,a.strip,n,i)},function(e){i.error&&i.error(e)}):n([o],function(e){t.finishLoad(a.moduleName+"."+a.ext,a.strip,e,i)}))},write:function(e,n,i){if(f.hasOwnProperty(n)){var r=t.jsEscape(f[n]);i.asModule(e+"!"+n,"define(function () { return '"+r+"';});\n")}},writeFile:function(e,n,i,r,a){var o=t.parseName(n),s=o.ext?"."+o.ext:"",u=o.moduleName+s,c=i.toUrl(o.moduleName+s)+".js";t.load(u,i,function(){var n=function(e){return r(c,e)};n.asModule=function(e,t){return r.asModule(e,c,t)},t.write(e,u,n,a)},a)}},"node"===h.env||!h.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(n=require.nodeRequire("fs"),t.get=function(e,t,i){try{var r=n.readFileSync(e,"utf8");0===r.indexOf("﻿")&&(r=r.substring(1)),t(r)}catch(a){i&&i(a)}}):"xhr"===h.env||!h.env&&t.createXhr()?t.get=function(e,n,i,r){var a,o=t.createXhr();if(o.open("GET",e,!0),r)for(a in r)r.hasOwnProperty(a)&&o.setRequestHeader(a.toLowerCase(),r[a]);h.onXhr&&h.onXhr(o,e),o.onreadystatechange=function(){var t,r;4===o.readyState&&(t=o.status||0,t>399&&600>t?(r=new Error(e+" HTTP status: "+t),r.xhr=o,i&&i(r)):n(o.responseText),h.onXhrComplete&&h.onXhrComplete(o,e))},o.send(null)}:"rhino"===h.env||!h.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var n,i,r="utf-8",a=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(a),r)),u="";try{for(n=new java.lang.StringBuffer,i=s.readLine(),i&&i.length()&&65279===i.charAt(0)&&(i=i.substring(1)),null!==i&&n.append(i);null!==(i=s.readLine());)n.append(o),n.append(i);u=String(n.toString())}finally{s.close()}t(u)}:("xpconnect"===h.env||!h.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(i=Components.classes,r=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),a="@mozilla.org/windows-registry-key;1"in i,t.get=function(e,t){var n,o,s,u={};a&&(e=e.replace(/\//g,"\\")),s=new FileUtils.File(e);try{n=i["@mozilla.org/network/file-input-stream;1"].createInstance(r.nsIFileInputStream),n.init(s,1,0,!1),o=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(r.nsIConverterInputStream),o.init(n,"utf-8",n.available(),r.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),o.readString(n.available(),u),o.close(),n.close(),t(u.value)}catch(c){throw new Error((s&&s.path||"")+": "+c)}}),t}),define("text!templates/loading.html",[],function(){return'<style>\n/**\n * Loading page progress bars\n * http://css-tricks.com/css3-progress-bars/\n */\n 	.meter-wrapper{\n 		position: relative;\n		top:50%;\n 	}\n\n	.meter {\n		height: 30px;  /* Can be anything */\n		position: relative;\n		margin-left: auto; margin-right: auto;\n		margin-top:-15px;\n		width:82%;\n		background: #555;\n		-moz-border-radius: 25px;\n		-webkit-border-radius: 25px;\n		border-radius: 25px;\n		padding: 10px;\n		-webkit-box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);\n		-moz-box-shadow   : inset 0 -1px 1px rgba(255,255,255,0.3);\n		box-shadow        : inset 0 -1px 1px rgba(255,255,255,0.3);\n	}\n	.meter > span {\n		display: block;\n		height: 100%;\n		   -webkit-border-top-right-radius: 8px;\n		-webkit-border-bottom-right-radius: 8px;\n			   -moz-border-radius-topright: 8px;\n			-moz-border-radius-bottomright: 8px;\n				   border-top-right-radius: 8px;\n				border-bottom-right-radius: 8px;\n			-webkit-border-top-left-radius: 20px;\n		 -webkit-border-bottom-left-radius: 20px;\n				-moz-border-radius-topleft: 20px;\n			 -moz-border-radius-bottomleft: 20px;\n					border-top-left-radius: 20px;\n				 border-bottom-left-radius: 20px;\n		background-color: rgb(43,194,83);\n		background-image: -webkit-gradient(\n		  linear,\n		  left bottom,\n		  left top,\n		  color-stop(0, rgb(43,194,83)),\n		  color-stop(1, rgb(84,240,84))\n		 );\n		background-image: -moz-linear-gradient(\n		  center bottom,\n		  rgb(43,194,83) 37%,\n		  rgb(84,240,84) 69%\n		 );\n		-webkit-box-shadow:\n		  inset 0 2px 9px  rgba(255,255,255,0.3),\n		  inset 0 -2px 6px rgba(0,0,0,0.4);\n		-moz-box-shadow:\n		  inset 0 2px 9px  rgba(255,255,255,0.3),\n		  inset 0 -2px 6px rgba(0,0,0,0.4);\n		box-shadow:\n		  inset 0 2px 9px  rgba(255,255,255,0.3),\n		  inset 0 -2px 6px rgba(0,0,0,0.4);\n		position: relative;\n		overflow: hidden;\n	}\n	.meter > span:after, .animate > span > span {\n		content: "";\n		position: absolute;\n		top: 0; left: 0; bottom: 0; right: 0;\n		background-image:\n		   -webkit-gradient(linear, 0 0, 100% 100%,\n			  color-stop(.25, rgba(255, 255, 255, .2)),\n			  color-stop(.25, transparent), color-stop(.5, transparent),\n			  color-stop(.5, rgba(255, 255, 255, .2)),\n			  color-stop(.75, rgba(255, 255, 255, .2)),\n			  color-stop(.75, transparent), to(transparent)\n		   );\n		background-image:\n			-moz-linear-gradient(\n			  -45deg,\n			  rgba(255, 255, 255, .2) 25%,\n			  transparent 25%,\n			  transparent 50%,\n			  rgba(255, 255, 255, .2) 50%,\n			  rgba(255, 255, 255, .2) 75%,\n			  transparent 75%,\n			  transparent\n		   );\n		z-index: 1;\n		-webkit-background-size: 50px 50px;\n		-moz-background-size: 50px 50px;\n		-webkit-animation: move 2s linear infinite;\n		   -webkit-border-top-right-radius: 8px;\n		-webkit-border-bottom-right-radius: 8px;\n			   -moz-border-radius-topright: 8px;\n			-moz-border-radius-bottomright: 8px;\n				   border-top-right-radius: 8px;\n				border-bottom-right-radius: 8px;\n			-webkit-border-top-left-radius: 20px;\n		 -webkit-border-bottom-left-radius: 20px;\n				-moz-border-radius-topleft: 20px;\n			 -moz-border-radius-bottomleft: 20px;\n					border-top-left-radius: 20px;\n				 border-bottom-left-radius: 20px;\n		overflow: hidden;\n	}\n\n	.animate > span:after {\n		display: none;\n	}\n\n	@-webkit-keyframes move {\n		0% {\n		   background-position: 0 0;\n		}\n		100% {\n		   background-position: 50px 50px;\n		}\n	}\n\n	.orange > span {\n		background-color: #f1a165;\n		background-image: -moz-linear-gradient(top, #f1a165, #f36d0a);\n		background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #f1a165),color-stop(1, #f36d0a));\n		background-image: -webkit-linear-gradient(#f1a165, #f36d0a);\n	}\n\n	.red > span {\n		background-color: #f0a3a3;\n		background-image: -moz-linear-gradient(top, #f0a3a3, #f42323);\n		background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #f0a3a3),color-stop(1, #f42323));\n		background-image: -webkit-linear-gradient(#f0a3a3, #f42323);\n	}\n\n	.nostripes > span > span, .nostripes > span:after {\n		-webkit-animation: none;\n		background-image: none;\n	}\n</style>\n\n<div class="meter-wrapper">\n	<div class="meter">\n		<span style="width: 0%"></span>\n	</div>\n</div>'}),define("app/task/main_view",["backbone","jquery","./adjust_canvas","app/task/script","text!templates/loading.html"],function(e,t,n,i,r){var a=t.Deferred(),o=e.View.extend({id:"canvas",initialize:function(){this.activate=t.proxy(this.activate,this),this.render=t.proxy(this.render,this),t(window).on("orientationchange resize",t.proxy(this.adjustCanvas,this))},render:function(){return this.adjustCanvas(!0),this},activate:function(){var e=this,n=i.settings.canvas||{};return t(document).ready(function(){n.background&&t("body").css("background-color",n.background),n.canvasBackground&&e.$el.css("background-color",n.canvasBackground),n.borderColor&&e.$el.css("border-color",n.borderColor),n.borderWidth&&e.$el.css("border-width",n.borderWidth),n.css&&e.$el.css(n.css),t("[pi-player]").length?t("[pi-player]").empty().append(e.$el):e.$el.appendTo("body"),e.render(),a.resolve()}),this},loading:function(e){if("pending"!=e.state())return e;this.$el.html(r);var t=this.$(".meter span");return e.progress(function(e,n){t.width((n?e/n*100:0)+"%")})},empty:function(){this.$el.empty()},docReady:function(){return a},adjustCanvas:n});return new o}),define("models/set",["backbone","underscore"],function(e,t){var n=e.Collection.extend({orderList:[],nextPick:0,whereData:function(e){return t.isEmpty(e)?[]:this.filter(function(t){var n=t.get("data")||{};for(var i in e)if(e[i]!==n[i])return!1;return!0})},random:function(){return this.at(Math.floor(Math.random()*this.length)).attributes},exRandom:function(){return this.orderList=this.orderList.length?this.orderList:t.shuffle(t.range(this.length)),this.at(this.orderList.pop()).attributes},bySequence:function(){return this.nextPick<this.length||(this.nextPick=0),this.at(this.nextPick++).attributes},byData:function(e){if(t.isUndefined(e.data))throw console.log(e),new Error("A data property must by defined for byData");var n=t.isString(e.data)?{handle:e.data}:e.data,i=this.whereData(n)[0];if(!i)throw new Error("Inherit by Data failed. Data not found: "+e.data);return i.attributes},getInherited:function(e){if(t.isFunction(e.type))return e.type.call(this,e);switch(e.type){case"bySequence":return this.bySequence();case"byData":return this.byData(e);case"exRandom":return this.exRandom();case"random":default:return this.random()}},inherit:function(e){if(!this.length)throw new Error("You attempted to inherit from an empty set ({"+this.name+"})");var t=this.getInherited(e);if(!t)throw new Error("You tried to inherit from {"+this.name+"} but an appropriate element was not found");return t}});return n}),define("app/sets_constructor",["underscore","models/set"],function(e,t){function n(){function n(n){return e.each(n,function(e,n){i[n]=new t(e),i[n].name=n}),i}var i={};return n}return n}),define("app/trial/trial_sets",["../sets_constructor"],function(e){return new e}),define("app/stimulus/stimulus_sets",["../sets_constructor"],function(e){return new e}),define("app/media/media_sets",["../sets_constructor"],function(e){return new e}),define("models/collection",["underscore"],function(e){var t=function(){this.collection=[],this.pointer=-1};return e.extend(t.prototype,{first:function(){return this.pointer=0,this.collection[this.pointer]},last:function(){return this.pointer=this.collection.length-1,this.collection[this.pointer]},end:function(){return void(this.pointer=this.collection.length)},current:function(){return this.collection[this.pointer]},next:function(){return this.collection[++this.pointer]},previous:function(){return this.collection[--this.pointer]},add:function(t){return arguments.length?(t=e.isArray(t)?t:[t],this.collection=this.collection.concat(t),this):this},at:function(e){return this.collection[e]}}),t}),define("app/sequencer/sourceSequence",["models/collection","underscore"],function(e,t){var n=new e,i=function(e,t){for(var n in t)if(t[n]!==e[n])return!1;return!0};return t.extend(n,{nextWhere:function(e){for(;this.next()&&!i(this.current().data||{},e););return this.current()},lastWhere:function(e){for(;this.previous()&&!i(this.current().data||{},e););return this.current()}}),n}),define("utils/mixer",["underscore"],function(e){var t=function(n,i){var r=[];return e.each(n,function(n){var a,o,s,u=e.isObject(n)?n.mixer:void 0;switch(u){case"random":a=e.shuffle(t(n.data,!0)),o=i?a:t(a),r=r.concat(o);break;case"weightedRandom":var c=e.reduce(n.weights,function(e,t){return e+t}),l=Math.random()*c,d=0;for(s=0;s<n.data.length;s++)if(d+=n.weights[s],d=+d.toFixed(3),d>=l){a=[n.data[s]];break}o=i?a:t(a),r=r.concat(o);break;case"choose":a=e.chain(n.data).shuffle().first(n.n?n.n:1).value(),o=i?a:t(a),r=r.concat(o);break;case"repeat":for(a=t(n.data,!0),s=0;s<n.times;s++)o=i?a:t(a),r=r.concat(o);break;case"wrapper":i?r.push(n):r=r.concat(t(n.data));break;case void 0:r.push(n);break;default:throw new Error("Unknown wrapper "+u)}}),r};return t}),define("utils/preloader",["jquery"],function(e){var t=[],n=[],i=0,r=e.Deferred(),a=function(a,o){if(o=o||"image",-1==e.inArray(a,t)){var s=e.Deferred();switch(o){case"template":require(["text!"+a],function(){s.resolve()},function(){throw new Error("Template not found: "+a)});break;case"image":default:var u=new Image;e(u).on("load",function(){s.resolve()}),e(u).one("error",function(){u.src="",u.src=a,e(u).on("error",function(){throw new Error('Image not found: "'+a+'"')})}),u.src=a}return n.push(s),t.push(a),s.done(function(){i++,r.notify(i,n.length)}),s}return!1};return{add:a,activate:function(){return e.when.apply(e,n).done(function(){r.resolve()}).fail(function(){r.reject()}),r.promise()},reset:function(){t=[],n=[],i=0,r=this.state=e.Deferred()},state:r}}),define("app/task/settings",["./script"],function(e){return e.settings}),define("app/task/build_url",["underscore","./settings"],function(e,t){return function(n,i){var r;return e.isString(t.base_url)?r=t.base_url:e.isObject(t.base_url)&&(r=t.base_url[i]),r?"/"!=r[r.length-1]&&(r+="/"):r="",r+n}}),define("app/sequencer/sequencePreload",["underscore","utils/preloader","app/task/build_url"],function(e,t,n){var i=function(i){e.isUndefined(i.image)||t.add(n(i.image,"image"),"image"),e.isUndefined(i.template)||t.add(n(i.template,"template"),"template")},r=function(e){e.media&&i(e.media)},a=function(e){e.element&&i(e.element)},o=function(t){e.each(t.layout||[],r),e.each(t.stimuli||[],r),e.each(t.input||[],a)},s=function(t){e.each(t,function(t){e.isUndefined(t.mixer)?o(t):s(t.data)})},u=function(t){e.each(t.mediaSets||[],function(t){e.each(t,i)}),e.each(t.stimulusSets||[],function(t){e.each(t,r)}),e.each(t.trialSets||[],function(t){e.each(t,o)}),s(t.sequence)};return function(e,n,a){switch(a&&t.reset(),n){case"media":i(e);break;case"stimulus":r(e);break;case"trial":o(e);break;case"script":default:u(e)}return t.activate()}}),define("app/task/parser",["require","app/task/script","../trial/trial_sets","../stimulus/stimulus_sets","../media/media_sets","../sequencer/sourceSequence","utils/mixer","../sequencer/sequencePreload"],function(e){var t=e("app/task/script"),n=e("../trial/trial_sets"),i=e("../stimulus/stimulus_sets"),r=e("../media/media_sets"),a=e("../sequencer/sourceSequence"),o=e("utils/mixer"),s=e("../sequencer/sequencePreload");return function(){return t.trialSets&&n(t.trialSets),t.stimulusSets&&i(t.stimulusSets),t.mediaSets&&r(t.mediaSets),a.add(o(t.sequence)),s(t)}}),define("app/sequencer/trialSequence",["models/collection"],function(e){return new e}),define("utils/pubsub",["underscore"],function(e){var t={},n={},i={};return t.publish=function(i,r){n[i]&&e.each(n[i],function(e){e.apply(t,r||[])})},t.subscribe=function(t,r){var a;return e.isFunction(r)?a=[]:(a=arguments[1],r=arguments[2]),n[t]||(n[t]={},i[t]=0),n[t][i[t]++]=r,a.push([t,r]),[t,r]},t.unsubscribe=function(t){var i=t[0];n[i]&&e.each(n[i],function(e,r){e==t[1]&&delete n[i][r]})},t}),define("utils/is_touch",[],function(){return"ontouchstart"in window?!0:!1}),define("utils/interface/bindings/click",["jquery","utils/is_touch"],function(e,t){return function(n,i){var r=t?"touchstart":"mousedown",a=i.element?!1:!0,o=e(i.element);n.on=function(t){var n=function(e){t(e,r)};a?e(document).on(r+".interface",'[data-handle="'+i.stimHandle+'"]',n):o.css(i.css||{}).appendTo("#canvas").on(r+".interface",n)},n.off=function(){a?e(document).off(r+".interface",'[data-handle="'+i.stimHandle+'"]'):o.remove()}}}),define("utils/interface/bindings/keypressed",["jquery"],function(e){var t=[];e(document).on("keyup.keypressed",function(e){t[e.which]=!1});var n=function(n){var i=e.isArray(n.key)?n.key:[n.key],r="keydown.interface."+n.handle,a=e.map(i,function(e){return"string"==typeof e?e.toUpperCase().charCodeAt(0):e});this.on=function(n){e(document).on(r,function(i){t[i.which]||-1==e.inArray(i.which,a)||(t[i.which]=!0,n(i,"keydown"))})},this.off=function(){e(document).off(r)}};return function(t,i){e.extend(t,new n(i))}}),define("utils/interface/bindings/keyup",["jquery"],function(e){var t=function(t){var n=e.isArray(t.key)?t.key:[t.key],i="keyup.interface."+t.handle,r=e.map(n,function(e){return"string"==typeof e?e.toUpperCase().charCodeAt(0):e});this.on=function(t){e(document).on(i,function(n){-1!==e.inArray(n.which,r)&&t(n,"keyup")})},this.off=function(){e(document).off(i)}};return function(n,i){e.extend(n,new t(i))}}),define("utils/timeout",["underscore"],function(e){return function(){var t=arguments[0],n=e.isArray(arguments[1])?arguments[1]:[],i=e.isFunction(arguments[1])?arguments[1]:arguments[2],r=0;return t?(r=setTimeout(i,t),n.push(r)):i.call(),r}}),define("utils/simpleRandomize",["underscore"],function(e){var t=function(t,n){if(e.isArray(t)){var i=Math.floor(Math.random()*t.length);return t[i]}if(e.isFunction(t))return t.call(n);if(e.isObject(t)){if(!e.isNumber(t.min)||!e.isNumber(t.max)||t.min>t.max)throw new Error("randomization objects need both a max and a minimum property, also max has to be larger than min");return t.min+(t.max-t.min)*Math.random()}return t};return t}),define("utils/interface/bindings/timeout",["utils/timeout","utils/simpleRandomize"],function(e,t){return function(n,i){var r=function(){var n,r=t(i.duration)||0;return{on:function(t){n=e(r,function(){t({},"timeout")})},off:function(){clearTimeout(n)}}}();n.on=r.on,n.off=r.off}}),define("utils/interface/binder",["jquery","./bindings/click","./bindings/keypressed","./bindings/keyup","./bindings/timeout"],function(e,t,n,i,r){return function(a,o){var s=o.on;if("function"==typeof s){if(a.on=o.on,a.off=o.off,"function"!=typeof a.off)throw new Error("Interface off is not a function for "+o.handle);return!0}switch(s){case"keypressed":n(a,o);break;case"keyup":i(a,o);break;case"click":t(a,o);break;case"timeout":r(a,o);break;case"enter":n(a,e.extend({key:13},o));break;case"space":n(a,e.extend({key:32},o));break;case"esc":n(a,e.extend({key:27},o));break;case"leftTouch":o.element=e("<div>").css({position:"absolute",left:0,width:"30%",height:"100%",background:"#00FF00",opacity:.3}),t(a,o);break;case"rightTouch":o.element=e("<div>").css({position:"absolute",right:0,width:"30%",height:"100%",background:"#00FF00",opacity:.3}),t(a,o);break;case"topTouch":o.element=e("<div>").css({position:"absolute",top:0,width:"100%",height:"30%",background:"#00FF00",opacity:.3}),t(a,o);break;case"bottomTouch":o.element=e("<div>").css({position:"absolute",bottom:0,width:"100%",height:"30%",background:"#00FF00",opacity:.3}),t(a,o);break;default:throw new Error("Unknown interface element "+s)}return!0}}),define("utils/interface/triggerEvent",["utils/pubsub"],function(e){return function(t,n,i,r){var a={timestamp:+new Date,latency:r,handle:i.handle,type:n,e:t};e.publish("input",[a])}}),define("utils/interface/listener",["./binder","./triggerEvent"],function(e,t){return function(n,i){this.handle=n.handle,e(this,n),this.on(function(e,r){t(e,r,n,i.getLatency())}),this.destroy=this.off}}),define("utils/now",[],function(){var e;return window.performance&&(e=performance.now||performance.mozNow||performance.webkitNow||performance.msNow||performance.oNow),e?function(){return e.apply(performance)}:function(){return+new Date}}),define("utils/interface/interface",["jquery","./listener","../is_touch","../now"],function(e,t,n,i){var r=[],a=0;return{getLatency:function(){return i()-a},resetTimer:function(){a=i()},add:function(i){if(!i)throw new Error("Missing input element. Could not add input listener");var a=this,o=e.isArray(i)?i:[i];e.each(o,function(e,i){if("undefined"!=typeof i.touch){if(n&&!i.touch)return!0;if(!n&&i.touch)return!0}var o=new t(i,a);r.push(o)})},remove:function(t){t=e.isArray(t)?t:[t];for(var n=r.length-1;n>=0;n--){var i=r[n];-1!=e.inArray(i.handle,t)&&(i.off(),r.splice(n,1))}},destroy:function(){for(var e in r)r[e].destroy();r=[]}}}),define("models/model",["backbone","underscore"],function(e,t){"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t});var n=e.Model.extend({constructor:function(n,i){var r={};t.each(n,function(e,n){if(t.isObject(e)){var i=Object.create(e),a=this.defaults&&this.defaults[n]&&t.isObject(this.defaults[n])?this.defaults[n]:{};r[n]=t.defaults(i,a)}else r[n]=e},this),e.Model.apply(this,[r,i])}});return n}),define("app/media/media_view",["jquery","backbone","app/task/main_view"],function(e,t,n){var i=n.$el,r=t.View.extend({initialize:function(){this.$el.addClass("stimulus").attr("data-handle",this.model.handle).css("visibility","hidden").css(this.model.get("css")).appendTo(i),this.render()},render:function(){return this.size(),this.place(),this},show:function(){return"image"===this.options.type&&-1!==this.options.image.indexOf("gif")?(window.ActiveXObject||"ActiveXObject"in window?(this.$el.css("visibility","visible"),this.$el[0].src=this.options.image+"#"+Math.random()):(this.$el[0].src="",this.$el[0].src=this.options.image,this.$el.css("visibility","visible")),this):(this.$el.css("visibility","visible"),this)},hide:function(){return this.$el.css("visibility","hidden"),this},size:function(){var e=this.model.get("size");return e.font_size&&this.$el.css("font-size",e.font_size),"auto"!=e.height&&"word"!=this.options.type&&this.$el.height(e.height+"%"),"auto"!=e.width&&this.$el.width(e.width+"%"),this},place:function(){function e(e){return{height:e.outerHeight(),width:e.outerWidth()}}var t,n,r,a,o=e(i),s=e(this.$el),u=this.model.get("location")||{};switch("undefined"==typeof u.top&&"undefined"==typeof u.bottom&&(u.top="center"),"undefined"==typeof u.left&&"undefined"==typeof u.right&&(u.right="center"),u.top){case void 0:case"auto":t="auto";break;case"center":t=(o.height-s.height)/2;break;default:t=o.height*u.top/100}switch(u.bottom){case void 0:case"auto":n="auto";break;case"center":n=(o.height-s.height)/2;break;default:n=o.height*u.bottom/100}switch(u.left){case void 0:case"auto":r="auto";break;case"center":r=(o.width-s.width)/2;break;default:r=o.width*u.left/100}switch(u.right){case void 0:case"auto":a="auto";break;case"center":a=(o.width-s.width)/2;break;default:a=o.width*u.right/100}this.$el.css({top:t,bottom:n,left:r,right:a})}});return r}),define("app/inflator",["jquery","./trial/trial_sets","./stimulus/stimulus_sets","./media/media_sets","app/task/script"],function(e,t,n,i,r){var a=function(e){return"function"==typeof e.customize&&e.customize.apply(e,[e,r.global]),e},o=function(r,s,u){var c,l,d,p;switch(s){case"trial":c=t();break;case"stimulus":c=n();break;case"media":c=i();break;default:throw new Error("Unknown set type "+s)}if(!r.inherit)return!u&&a(r),r;if(l=e.isPlainObject(r.inherit)?r.inherit:{set:r.inherit},!c[l.set])throw new Error("Unknown "+s+"Set: "+l.set);return d=o(c[l.set].inherit(l),s,!0),p=e.extend(!0,{},r),e.each(d,function(t,n){p[t]||(p[t]=e.isArray(d[t])?e.extend(!0,[],n):"object"==typeof d[t]?e.extend(!0,{},n):n)}),d.data&&(p.data=e.extend(!0,{},d.data,p.data)),!u&&a(p),p};return o}),define("utils/html",["jquery","underscore"],function(e,t){var n=function(n,i){if(n.word)n.displayType="element",n.type="word",n.el=e("<div>",{text:n.word});else if(n.image)n.displayType="element",n.type="image",n.el=e("<img>",{src:n.image});else if(n.jquery)n.displayType="element",n.type="jquery",n.el=n.jquery;else if(n.html)n.displayType="element",n.type="html",n.el=e(t.template(n.html,i||{}));else if(n.template){var r=require("text!"+n.template);n.displayType="element",n.type="html";try{n.el=e(t.template(r,i||{}))}catch(a){throw new Error("Templates must be wrapped in an html element such as <span></span>. "+n.inlineTemplate+" is invalid")}}else{if(!n.inlineTemplate)return!1;n.displayType="element",n.type="html";try{n.el=e(t.template(n.inlineTemplate,i||{}))}catch(a){throw new Error("Templates must be wrapped in an html element such as <span></span>. "+n.inlineTemplate+" is invalid")}}};return n}),define("app/media/media_constructor",["jquery","./media_view","../inflator","utils/html","app/task/build_url","app/task/script"],function(e,t,n,i,r,a){return function(o,s){var u=a.global;if("string"==typeof o&&(o={word:o}),!o)throw new Error("Media object not defined for "+s.name());var c=n(o,"media");return c.template&&(c.template=r(c.template,"template")),c.image&&(c.image=r(c.image,"image")),c.source=e.extend({},c),c.model=s,i(c,{global:u,trialData:s.trial.data,stimulusData:s.get("data")}),new t(c)}}),define("app/stimulus/stimulus_model",["require","models/model","app/media/media_constructor","utils/pubsub","underscore","utils/is_touch","app/task/settings"],function(e){var t=e("models/model"),n=e("app/media/media_constructor"),i=e("utils/pubsub"),r=e("underscore"),a=e("utils/is_touch"),o=e("app/task/settings"),s=t.extend({initialize:function(){this.collection.trial&&(this.trial=this.collection.trial),this.attributes.data=this.attributes.data||{},this.attributes.data.handle=this.attributes.data.handle||this.attributes.handle,this.handle=this.attributes.data.handle;var e=this.get(a&&this.get("touchMedia")?"touchMedia":"media");this.media=new n(e,this)},defaults:{size:{height:"auto",width:"auto"},css:{}},activate:function(){var e=this,t=this.handle;this.timeStack=this.timeStack||[],this.pubsubStack=this.pubsubStack||[],i.subscribe("stim:start",e.pubsubStack,function(n){return r.include([t,"All"],n)?void e.media.show():!1}),i.subscribe("stim:setAttr",e.pubsubStack,function(n,i){if(!r.include([t,"All"],n))return!1;if(r.isFunction(i))i.apply(e);else{var a=e.get("data")||{};a=r.extend(a,i),e.set("data",a)}}),i.subscribe("stim:stop",e.pubsubStack,function(n){return r.include([t,"All"],n)?void e.media.hide():!1})},disable:function(){this.media.hide(),this.timeStack=this.timeStack||[],this.pubsubStack=this.pubsubStack||[],r.each(this.pubsubStack,function(e){i.unsubscribe(e)}),this.timeStack=[],this.pubsubStack=[]},name:function(){var e=this.attributes;return e.data.alias?e.data.alias:e.inherit&&e.inherit.set?e.inherit.set:e.handle?e.handle:!1},mediaName:function(){var e=this.media.options.source,t=o.logger&&o.logger.fullpath;if(e.alias)return e.alias;for(var n in e)if("inherit"!=n)return r.contains(["image","template"],n)&&!t?e[n].replace(/^.*[\\\/]/,""):e[n]}});return s}),define("app/stimulus/stimulus_constructor",["./stimulus_model","../inflator"],function(e,t){return function(n,i){var r=t(n,"stimulus");return r.source=n,new e(r,i)}}),define("app/stimulus/stimulus_collection",["backbone","underscore","app/stimulus/stimulus_constructor"],function(e,t,n){var i=e.Collection.extend({model:n,initialize:function(e,t){t||(t={}),this.trial=t.trial},whereData:function(e){return t.isEmpty(e)?[]:this.filter(function(t){var n=t.get("data")||{};for(var i in e)if(e[i]!==n[i])return!1;return!0})},activate:function(){return this.each(function(e){e.activate()}),this},disable:function(){return this.each(function(e){e.disable()}),this},display_all:function(){this.each(function(e){e.media.show()})},hide_all:function(){this.each(function(e){e.media.hide()})},refresh:function(){this.each(function(e){e.media.render()})},get_stimlist:function(){return this.chain().filter(function(e){return!e.get("nolog")}).map(function(e,t){return e.name()||"stim"+t}).value()},get_medialist:function(){return this.chain().filter(function(e){return!e.get("nolog")}).map(function(e,t){return e.mediaName()||"media"+t}).value()}});return i}),define("app/trial/evaluate",["underscore","app/task/script","./current_trial"],function(e,t,n){return function(i,r){var a=t.global,o=n();if(!i)throw new Error("There is an interaction without conditions!!");i=e.isArray(i)?i:[i],r=r||{};var s=!0;if("begin"==r.type){var u=e.reduce(i,function(e,t){return e||"begin"==t.type},!1);if(!u)return!1}return e.each(i,function(t){var n,i,u=!0;switch(t.type){case"begin":"begin"!==r.type&&(u=!1);break;case"inputEquals":e.isArray(t.value)||(t.value=[t.value]),-1===e.indexOf(t.value,r.handle)&&(u=!1);break;case"inputEqualsTrial":r.handle!==o.data[t.property]&&(u=!1);break;case"inputEqualsStim":n={},t.handle&&(n.handle=t.handle),n[t.property]=r.handle,i=o._stimulus_collection.whereData(n),0===i.length&&(u=!1);break;case"inputEqualsGlobal":if("undefined"==typeof t.property)throw new Error('inputEqualsGlobal requires both "property" to be defined');r.handle!==a[t.property]&&(u=!1);break;case"trialEquals":if("undefined"==typeof t.property||"undefined"==typeof t.value)throw new Error('trialEquals requires both "property" and "value" to be defined');t.value!==o.data[t.property]&&(u=!1);break;case"globalEquals":if("undefined"==typeof t.property||"undefined"==typeof t.value)throw new Error('globalEquals requires both "property" and "value" to be defined');t.value!==a[t.property]&&(u=!1);break;case"globalEqualsTrial":if("undefined"==typeof t.globalProp||"undefined"==typeof t.trialProp)throw new Error('globalEqualsTrial requires both "globalProp" and "trialProp" to be defined');a[t.globalProp]!==o.data[t.trialProp]&&(u=!1);break;case"globalEqualsStim":if("undefined"==typeof t.globalProp||"undefined"==typeof t.stimProp)throw new Error('globalEqualsStim requires both "globalProp" and "stimProp" to be defined');n={},t.handle&&(n.handle=t.handle),n[t.stimProp]=a[t.globalProp],i=o._stimulus_collection.whereData(n),0===i.length&&(u=!1);break;case"function":t.value.apply(o,[o,r])||(u=!1);
break;default:throw new Error("Unknown condition type: "+t.type)}s=s&&(t.negate?!u:u)}),s}}),define("app/trial/action_list",["underscore","utils/pubsub","utils/interface/interface","app/task/script"],function(e,t,n,i){var r={showStim:function(e){var n=e.handle||e;t.publish("stim:start",[n])},hideStim:function(e){var n=e.handle||e;t.publish("stim:stop",[n])},setStimAttr:function(e){var n=e.handle,i=e.setter;t.publish("stim:setAttr",[n,i])},setTrialAttr:function(e,n){if("undefined"==typeof e.setter)throw new Error("The setTrialAttr action requires a setter property");t.publish("trial:setAttr",[e.setter,n])},setInput:function(e){if("undefined"==typeof e.input)throw new Error("The setInput action requires an input property");t.publish("trial:setInput",[e.input])},trigger:function(e){if("undefined"==typeof e.handle)throw new Error("The trigger action requires a handle property");t.publish("trial:setInput",[{handle:e.handle,on:"timeout",duration:+e.duration||0}])},removeInput:function(e){if("undefined"==typeof e.handle)throw new Error("The removeInput action requires a handle property");t.publish("trial:removeInput",[e.handle])},"goto":function(e){t.publish("trial:goto",[e])},endTrial:function(){t.publish("trial:end")},resetTimer:function(e,t){t.latency=0,n.resetTimer()},log:function(e,n){t.publish("log",[e,n])},setGlobalAttr:function(t){switch(typeof t.setter){case"function":t.setter.apply(null,[i.global,t]);break;case"object":e.extend(i.global,t.setter);break;default:throw new Error('setGlobalAttr requires a "setter" property')}},custom:function(e,t){if("function"!=typeof e.fn)throw new Error("The custom action requires a fn propery");e.fn.apply(null,[e,t,i.global])}};return r}),define("app/trial/action",["jquery","./action_list"],function(e,t){return function(n,i){var r=!0;if(!n)throw new Error("There is an interaction without actions!!");return n=e.isArray(n)?n:[n],e.each(n,function(e,n){if(!t[n.type])throw new Error("unknown action: "+n.type);"endTrial"===n.type&&(r=!1),t[n.type](n,i)}),r}}),define("app/trial/interactions",["jquery","utils/pubsub","./evaluate","./action"],function(e,t,n,i){var r=[],a=function(t,r){e.each(t,function(e,t){return n(t.conditions,r)?i(t.actions,r):void 0})};return{activate:function(e){t.subscribe("input",r,function(t){a(e,t)}),a(e,{type:"begin",latency:0})},disable:function(){e.each(r,function(){t.unsubscribe(this)})}}}),define("app/trial/trial_constructor",["require","jquery","underscore","utils/pubsub","utils/interface/interface","app/stimulus/stimulus_collection","./interactions","./current_trial","../inflator","app/task/main_view"],function(e){var t=e("jquery"),n=e("underscore"),i=e("utils/pubsub"),r=e("utils/interface/interface"),a=e("app/stimulus/stimulus_collection"),o=e("./interactions"),s=e("./current_trial"),u=e("../inflator"),c=e("app/task/main_view"),l=0,d=function(e){var i=u(e,"trial");if(n.extend(this,i),this.data||(this.data={}),this._source=i,this._id=n.uniqueId("trial_"),this.counter=l++,!this.interactions)throw new Error("Interactions not defined");this._layout_collection=new a(this.layout||[],{trial:this}),this._stimulus_collection=new a(this.stimuli||[],{trial:this}),this._pubsubStack=[],this._next=["next",{}],this.deferred=t.Deferred()};return n.extend(d.prototype,{activate:function(){var e=this;return s(this),this._layout_collection.display_all(),i.subscribe("trial:end",this._pubsubStack,n.bind(this.deactivate,this)),i.subscribe("trial:setAttr",this._pubsubStack,function(t,i){n.isFunction(t)?t.apply(e,[e.data,i]):n.extend(e.data,t)}),i.subscribe("trial:setInput",this._pubsubStack,function(e){r.add(e)}),i.subscribe("trial:removeInput",this._pubsubStack,function(e){"All"==e||n.include(e,"All")?r.destroy():r.remove(e)}),i.subscribe("trial:goto",this._pubsubStack,function(t){e._next=[t.destination,t.properties||{}]}),r.add(this.input||[]),this._stimulus_collection.activate(),r.resetTimer(),o.activate(this.interactions),this.deferred.promise()},deactivate:function(){var e=this;r.destroy(),this._stimulus_collection.disable(),o.disable(),n.each(this._pubsubStack,function(e){i.unsubscribe(e)}),this._pubsubStack=[],s(void 0),document.all&&!document.addEventListener?setTimeout(function(){c.empty(),e.deferred.resolve(e._next[0],e._next[1])},1):(c.empty(),e.deferred.resolve(e._next[0],e._next[1]))},name:function(){return this.data.alias?this.data.alias:this.inherit&&this.inherit.set?this.inherit.set:!1}}),d}),define("app/task/log/post",["jquery","app/task/settings"],function(e,t){var n=function(n){var i=t.logger&&t.logger.url,r=e.Deferred();if(!i)return r.resolve();var a={json:JSON.stringify(n)||""};return e.extend(a,t.metaData||{}),r=e.post(i,a),r=r.then(null,function(){return e.post(i,a)})};return n}),define("app/task/log/log_stack",[],function(){return[]}),define("app/task/log/logger",["require","jquery","utils/pubsub","app/trial/current_trial","app/task/settings","./post","./log_stack"],function(e){var t=e("jquery"),n=e("utils/pubsub"),i=e("app/trial/current_trial"),r=e("app/task/settings"),a=e("./post"),o=e("./log_stack"),s=0,u=t.Deferred().resolve(),c=function(e,t,n,i){var r=this._stimulus_collection.get_stimlist(),a=this._stimulus_collection.get_medialist();return{log_serial:i.length,trial_id:this.counter,name:this.name(),responseHandle:t.handle,latency:Math.floor(t.latency),stimuli:r,media:a,data:e}},l=function(){var e;return o.length-s<=0?u:(e=o.slice(s,o.length),s=o.length,t.when(u,a(e)))};return n.subscribe("log",function(e,t){var n=r.logger||{},a=n.logger?n.logger:c,s=i(),u=a.apply(s,[s.data,t,e,o]);o.push(u)}),n.subscribe("log:send",function(){var e=r.logger&&r.logger.pulse;e&&o.length-s>=e&&l()}),l}),define("app/sequencer/player",["require","./sourceSequence","./trialSequence","app/trial/trial_constructor","app/task/log/logger","app/task/settings","utils/pubsub"],function(e){var t=e("./sourceSequence"),n=e("./trialSequence"),i=e("app/trial/trial_constructor"),r=e("app/task/log/logger"),a=e("app/task/settings"),o=e("utils/pubsub"),s=function(e,u){var c,l;switch(e){case"nextWhere":c=t.nextWhere(u);break;case"previousWhere":c=t.lastWhere(u);break;case"current":c=t.current();break;case"first":c=t.first();break;case"last":c=t.last();break;case"end":c=t.end();break;case"next":default:c=t.next()}c?(l=new i(t.current()),l.activate().done(function(){o.publish("log:send"),s.apply(null,arguments)}),o.publish("trial:activated",[l]),n.add(l)):r().always(function(){a.hooks.endTask?a.hooks.endTask.call():window.location.href=a.redirect||window.location.href})};return s}),define("app/API",["jquery","./task/script","app/task/main_view","app/task/parser","app/sequencer/player","app/task/log/log_stack"],function(e,t,n,i,r,a){function o(n,i,r){var a=t[n+"Sets"]||(t[n+"Sets"]={});"string"!=typeof i?e.extend(!0,a,i):(e.isArray(r)||(r=[r]),a[i]=a[i]?e.merge(a[i],r):r)}var s={},u=!1;return e.extend(s,{addSettings:function(n,i){return t.settings||(t.settings={}),"string"!=typeof n?e.extend(!0,t.settings,n):e.isPlainObject(t.settings[n])?e.extend(!0,t.settings[n],i):t.settings[n]=i,this},addTrialSets:function(e,t){return o("trial",e,t),this},addStimulusSets:function(e,t){return o("stimulus",e,t),this},addMediaSets:function(e,t){return o("media",e,t),this},addSequence:function(n){return e.isArray(n)||(n=[n]),t.sequence=t.sequence?e.merge(t.sequence,n):n,this},addGlobal:function(n){return e.extend(!0,t.global,n),this},getGlobal:function(){return t.global},addScript:function(n){return e.extend(!0,t,n),this},getScript:function(){return t},getLogs:function(){return a},play:function(){if(u)throw new Error("Player has already been activated. You can only call API.play() once per session");u=!0;var e=i();return n.activate().docReady().done(function(){n.loading(e).done(function(){n.empty(),r()}).fail(function(e){throw new Error("loading resource failed, do something about it! (you can start by checking the error log, you are probably reffering to the wrong url - "+e+")")})}),this}}),s});
//# sourceMappingURL=API.js.map