!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,a){return void 0===a&&(a="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(a),a}:e(jQuery)}(function(e){"use strict";e.extend(e.FE.POPUP_TEMPLATES,{"image.insert":"[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]","image.edit":"[_BUTTONS_]","image.alt":"[_BUTTONS_][_ALT_LAYER_]","image.size":"[_BUTTONS_][_SIZE_LAYER_]"}),e.extend(e.FE.DEFAULTS,{imageInsertButtons:["imageBack","|","imageUpload","imageByURL"],imageEditButtons:["imageReplace","imageAlign","imageRemove","|","imageLink","linkOpen","linkEdit","linkRemove","-","imageDisplay","imageStyle","imageAlt","imageSize"],imageAltButtons:["imageBack","|"],imageSizeButtons:["imageBack","|"],imageUploadURL:"https://i.froala.com/upload",imageUploadParam:"file",imageUploadParams:{},imageUploadToS3:!1,imageUploadMethod:"POST",imageMaxSize:10485760,imageAllowedTypes:["jpeg","jpg","png","gif","svg+xml"],imageResize:!0,imageResizeWithPercent:!1,imageRoundPercent:!1,imageDefaultWidth:300,imageDefaultAlign:"center",imageDefaultDisplay:"block",imageSplitHTML:!1,imageStyles:{"fr-rounded":"Rounded","fr-bordered":"Bordered"},imageMove:!0,imageMultipleStyles:!0,imageTextNear:!0,imagePaste:!0,imagePasteProcess:!1,imageMinWidth:16,imageOutputSize:!1}),e.FE.PLUGINS.image=function(t){function a(){var e=t.popups.get("image.insert"),a=e.find(".fr-image-by-url-layer input");a.val(""),he&&a.val(he.attr("src")),a.trigger("change")}function i(){var e=t.$tb.find('.fr-command[data-cmd="insertImage"]'),a=t.popups.get("image.insert");if(a||(a=O()),v(),!a.hasClass("fr-active"))if(t.popups.refresh("image.insert"),t.popups.setContainer("image.insert",t.$tb),e.is(":visible")){var i=e.offset().left+e.outerWidth()/2,n=e.offset().top+(t.opts.toolbarBottom?10:e.outerHeight()-10);t.popups.show("image.insert",i,n,e.outerHeight())}else t.position.forSelection(a),t.popups.show("image.insert")}function n(){var a=t.popups.get("image.edit");a||(a=c()),t.popups.setContainer("image.edit",e(t.opts.scrollableContainer)),t.popups.refresh("image.edit");var i=he.offset().left+he.outerWidth()/2,n=he.offset().top+he.outerHeight();t.popups.show("image.edit",i,n,he.outerHeight())}function r(){v()}function s(e){if(!e.hasClass("fr-dii")&&!e.hasClass("fr-dib")){var a=e.css("float");e.css("float","none"),"block"==e.css("display")?(e.css("float",a),t.opts.imageEditButtons.indexOf("imageAlign")>=0&&(0===parseInt(e.css("margin-left"),10)&&(e.attr("style")||"").indexOf("margin-right: auto")>=0?e.addClass("fr-fil"):0===parseInt(e.css("margin-right"),10)&&(e.attr("style")||"").indexOf("margin-left: auto")>=0&&e.addClass("fr-fir")),e.addClass("fr-dib")):(e.css("float",a),t.opts.imageEditButtons.indexOf("imageAlign")>=0&&("left"==e.css("float")?e.addClass("fr-fil"):"right"==e.css("float")&&e.addClass("fr-fir")),e.addClass("fr-dii")),e.css("margin",""),e.css("float",""),e.css("display",""),e.css("z-index",""),e.css("position",""),e.css("overflow",""),e.css("vertical-align","")}}function o(){for(var a="IMG"==t.$el.get(0).tagName?[t.$el.get(0)]:t.$el.get(0).querySelectorAll("img"),i=0;i<a.length;i++){var n=e(a[i]);(t.opts.imageEditButtons.indexOf("imageAlign")>=0||t.opts.imageEditButtons.indexOf("imageDisplay")>=0)&&s(n),n.attr("width")&&(n.css("width",n.width()),n.removeAttr("width")),t.opts.imageTextNear||n.removeClass("fr-dii").addClass("fr-dib"),t.opts.iframe&&n.on("load",t.size.syncIframe)}}function l(){var a,i=Array.prototype.slice.call(t.$el.get(0).querySelectorAll("img")),n=[];for(a=0;a<i.length;a++)n.push(i[a].getAttribute("src")),e(i[a]).toggleClass("fr-draggable",t.opts.imageMove),""===i[a].className&&i[a].removeAttribute("class"),""===i[a].getAttribute("style")&&i[a].removeAttribute("style");if(ke)for(a=0;a<ke.length;a++)n.indexOf(ke[a].getAttribute("src"))<0&&t.events.trigger("image.removed",[e(ke[a])]);ke=i}function f(){ve||q();var a=t.$wp||e(t.opts.scrollableContainer);a.append(ve),ve.data("instance",t);var i=a.scrollTop()-("static"!=a.css("position")?a.offset().top:0),n=a.scrollLeft()-("static"!=a.css("position")?a.offset().left:0);n-=t.helpers.getPX(a.css("border-left-width")),i-=t.helpers.getPX(a.css("border-top-width")),ve.css("top",(t.opts.iframe?he.offset().top:he.offset().top+i)-1).css("left",(t.opts.iframe?he.offset().left:he.offset().left+n)-1).css("width",he.get(0).getBoundingClientRect().width).css("height",he.get(0).getBoundingClientRect().height).addClass("fr-active")}function d(e){return'<div class="fr-handler fr-h'+e+'"></div>'}function g(a){if(!t.core.sameInstance(ve))return!0;if(a.preventDefault(),a.stopPropagation(),t.$el.find("img.fr-error").left)return!1;t.undo.canDo()||t.undo.saveStep(),be=e(this),be.data("start-x",a.pageX||a.originalEvent.touches[0].pageX),be.data("start-width",he.width()),be.data("start-height",he.height());var i=he.width();if(t.opts.imageResizeWithPercent){var n=he.parentsUntil(t.$el,t.html.blockTagsQuery()).get(0)||t.$el.get(0);he.css("width",(i/e(n).outerWidth()*100).toFixed(2)+"%")}else he.css("width",i);ye.show(),t.popups.hideAll(),ne()}function p(a){if(!t.core.sameInstance(ve))return!0;if(be&&he){if(a.preventDefault(),t.$el.find("img.fr-error").left)return!1;var i=a.pageX||(a.originalEvent.touches?a.originalEvent.touches[0].pageX:null);if(!i)return!1;var n=be.data("start-x"),r=i-n,s=be.data("start-width");if((be.hasClass("fr-hnw")||be.hasClass("fr-hsw"))&&(r=0-r),t.opts.imageResizeWithPercent){var o=he.parentsUntil(t.$el,t.html.blockTagsQuery()).get(0)||t.$el.get(0);s=((s+r)/e(o).outerWidth()*100).toFixed(2),t.opts.imageRoundPercent&&(s=Math.round(s)),he.css("width",s+"%"),he.css("height","").removeAttr("height")}else s+r>=t.opts.imageMinWidth&&he.css("width",s+r),he.css("height",be.data("start-height")*he.width()/be.data("start-width"));f(),t.events.trigger("image.resize",[me()])}}function u(e){if(!t.core.sameInstance(ve))return!0;if(be&&he){if(e&&e.stopPropagation(),t.$el.find("img.fr-error").left)return!1;be=null,ye.hide(),f(),n(),t.undo.saveStep(),t.events.trigger("image.resizeEnd",[me()])}}function m(e,a){t.edit.on(),he&&he.addClass("fr-error"),y(t.language.translate("Something went wrong. Please try again.")),t.events.trigger("image.error",[{code:e,message:$e[e]},a])}function c(e){if(e)return t.$wp&&t.events.$on(t.$wp,"scroll",function(){he&&t.popups.isVisible("image.edit")&&n()}),!0;var a="";t.opts.imageEditButtons.length>0&&(a+='<div class="fr-buttons">',a+=t.button.buildList(t.opts.imageEditButtons),a+="</div>");var i={buttons:a},r=t.popups.create("image.edit",i);return r}function h(a){var i=t.popups.get("image.insert");if(i||(i=O()),i.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),i.find(".fr-image-progress-bar-layer").addClass("fr-active"),i.find(".fr-buttons").hide(),he){t.popups.setContainer("image.insert",e(t.opts.scrollableContainer));var n=he.offset().left+he.width()/2,r=he.offset().top+he.height();t.popups.show("image.insert",n,r,he.outerHeight())}"undefined"==typeof a&&b("Uploading",0)}function v(e){var a=t.popups.get("image.insert");a&&(a.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),a.find(".fr-image-progress-bar-layer").removeClass("fr-active"),a.find(".fr-buttons").show(),(e||t.$el.find("img.fr-error").length)&&(t.events.focus(),t.$el.find("img.fr-error").remove(),t.undo.saveStep(),t.undo.run(),t.undo.dropRedo()))}function b(e,a){var i=t.popups.get("image.insert");if(i){var n=i.find(".fr-image-progress-bar-layer");n.find("h3").text(e+(a?" "+a+"%":"")),n.removeClass("fr-error"),a?(n.find("div").removeClass("fr-indeterminate"),n.find("div > span").css("width",a+"%")):n.find("div").addClass("fr-indeterminate")}}function y(e){h();var a=t.popups.get("image.insert"),i=a.find(".fr-image-progress-bar-layer");i.addClass("fr-error"),i.find("h3").text(e)}function w(){var e=t.popups.get("image.insert"),a=e.find(".fr-image-by-url-layer input");a.val().length>0&&(h(),b("Loading image"),A(a.val(),!0,[],he),a.val(""),a.blur())}function E(e){te.call(e.get(0))}function C(){var a=e(this);t.popups.hide("image.insert"),a.removeClass("fr-uploading"),a.next().is("br")&&a.next().remove(),E(a),t.events.trigger("image.loaded",[a])}function A(e,a,i,n,r){t.edit.off(),b("Loading image"),a&&(e=t.helpers.sanitizeURL(e));var s=new Image;s.onload=function(){var a,s;if(n){var o=n.data("fr-old-src");t.$wp?(a=n.clone().removeData("fr-old-src").removeClass("fr-uploading"),a.off("load"),o&&n.attr("src",o),n.replaceWith(a)):a=n;for(var f=a.get(0).attributes,d=0;d<f.length;d++){var g=f[d];0===g.nodeName.indexOf("data-")&&a.removeAttr(g.nodeName)}if("undefined"!=typeof i)for(s in i)i.hasOwnProperty(s)&&"link"!=s&&a.attr("data-"+s,i[s]);a.on("load",C),a.attr("src",e),t.edit.on(),l(),t.undo.saveStep(),t.events.trigger(o?"image.replaced":"image.inserted",[a,r])}else a=k(e,i,C),l(),t.undo.saveStep(),t.events.trigger("image.inserted",[a,r])},s.onerror=function(){m(Ee)},s.src=e}function S(a){try{if(t.events.trigger("image.uploaded",[a],!0)===!1)return t.edit.on(),!1;var i=e.parseJSON(a);return i.link?i:(m(Ce,a),!1)}catch(e){return m(Se,a),!1}}function R(a){try{var i=e(a).find("Location").text(),n=e(a).find("Key").text();return t.events.trigger("image.uploadedToS3",[i,n,a],!0)===!1?(t.edit.on(),!1):i}catch(e){return m(Se,a),!1}}function D(e){b("Loading image");var a=this.status,i=this.response,n=this.responseXML,r=this.responseText;try{if(t.opts.imageUploadToS3)if(201==a){var s=R(n);s&&A(s,!1,[],e,i||n)}else m(Se,i||n);else if(a>=200&&300>a){var o=S(r);o&&A(o.link,!1,o,e,i||r)}else m(Ae,i||r)}catch(e){m(Se,i||r)}}function I(){m(Se,this.response||this.responseText||this.responseXML)}function $(e){if(e.lengthComputable){var t=e.loaded/e.total*100|0;b("Uploading",t)}}function k(a,i,n){var r,s="";if(i&&"undefined"!=typeof i)for(r in i)i.hasOwnProperty(r)&&"link"!=r&&(s+=" data-"+r+'="'+i[r]+'"');var o=t.opts.imageDefaultWidth;o&&"auto"!=o&&(o+=t.opts.imageResizeWithPercent?"%":"px");var l=e('<img class="'+(t.opts.imageDefaultDisplay?"fr-di"+t.opts.imageDefaultDisplay[0]:"")+(t.opts.imageDefaultAlign&&"center"!=t.opts.imageDefaultAlign?" fr-fi"+t.opts.imageDefaultAlign[0]:"")+'" src="'+a+'"'+s+(o?' style="width: '+o+';"':"")+">");l.on("load",n),t.edit.on(),t.events.focus(!0),t.selection.restore(),t.undo.saveStep(),t.opts.imageSplitHTML?t.markers.split():t.markers.insert();var f=t.$el.find(".fr-marker");return f.replaceWith(l),t.html.wrap(),t.selection.clear(),l}function x(){t.edit.on(),v(!0)}function U(a,i,n){function r(){var n=e(this);n.off("load"),n.addClass("fr-uploading"),n.next().is("br")&&n.next().remove(),t.placeholder.refresh(),n.is(he)||E(n),f(),h(),t.edit.off(),a.onload=function(){D.call(a,n)},a.onerror=I,a.upload.onprogress=$,a.onabort=x,n.off("abortUpload").on("abortUpload",function(){4!=a.readyState&&a.abort()}),a.send(i)}var s,o=new FileReader;o.addEventListener("load",function(){var e=o.result;if(o.result.indexOf("svg+xml")<0){for(var a=atob(o.result.split(",")[1]),i=[],n=0;n<a.length;n++)i.push(a.charCodeAt(n));e=window.URL.createObjectURL(new Blob([new Uint8Array(i)],{type:"image/jpeg"}))}he?(he.on("load",r),t.edit.on(),t.undo.saveStep(),he.data("fr-old-src",he.attr("src")),he.attr("src",e)):s=k(e,null,r)},!1),o.readAsDataURL(n)}function B(e){if(t.events.trigger("image.beforeUpload",[e])===!1)return!1;if("undefined"!=typeof e&&e.length>0){var a=e[0];if(a.size>t.opts.imageMaxSize)return m(Re),!1;if(t.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g,""))<0)return m(De),!1;var i;if(t.drag_support.formdata&&(i=t.drag_support.formdata?new FormData:null),i){var n;if(t.opts.imageUploadToS3!==!1){i.append("key",t.opts.imageUploadToS3.keyStart+(new Date).getTime()+"-"+(a.name||"untitled")),i.append("success_action_status","201"),i.append("X-Requested-With","xhr"),i.append("Content-Type",a.type);for(n in t.opts.imageUploadToS3.params)t.opts.imageUploadToS3.params.hasOwnProperty(n)&&i.append(n,t.opts.imageUploadToS3.params[n])}for(n in t.opts.imageUploadParams)t.opts.imageUploadParams.hasOwnProperty(n)&&i.append(n,t.opts.imageUploadParams[n]);i.append(t.opts.imageUploadParam,a);var r=t.opts.imageUploadURL;t.opts.imageUploadToS3&&(r="https://"+t.opts.imageUploadToS3.region+".amazonaws.com/"+t.opts.imageUploadToS3.bucket);var s=t.core.getXHR(r,t.opts.imageUploadMethod);U(s,i,a)}}}function P(a){t.events.$on(a,"dragover dragenter",".fr-image-upload-layer",function(){return e(this).addClass("fr-drop"),!1}),t.events.$on(a,"dragleave dragend",".fr-image-upload-layer",function(){return e(this).removeClass("fr-drop"),!1}),t.events.$on(a,"drop",".fr-image-upload-layer",function(i){i.preventDefault(),i.stopPropagation(),e(this).removeClass("fr-drop");var n=i.originalEvent.dataTransfer;if(n&&n.files){var r=a.data("instance")||t;r.events.disableBlur(),r.image.upload(n.files),r.events.enableBlur()}}),t.events.$on(a,"change",'.fr-image-upload-layer input[type="file"]',function(){if(this.files){var i=a.data("instance")||t;i.events.disableBlur(),a.find("input:focus").blur(),i.events.enableBlur(),i.image.upload(this.files)}e(this).val("")})}function F(a){var i=a.originalEvent.dataTransfer;if(i&&i.files&&i.files.length){var n=i.files[0];if(n&&n.type&&t.opts.imageAllowedTypes.indexOf(n.type.replace(/image\//g,""))>=0){t.markers.remove(),t.markers.insertAtPoint(a.originalEvent),t.$el.find(".fr-marker").replaceWith(e.FE.MARKERS),t.popups.hideAll();var r=t.popups.get("image.insert");return r||(r=O()),t.popups.setContainer("image.insert",e(t.opts.scrollableContainer)),t.popups.show("image.insert",a.originalEvent.pageX,a.originalEvent.pageY),h(),B(i.files),a.preventDefault(),a.stopPropagation(),!1}}}function T(){var a,i,n=t.selection.ranges(0);n.collapsed&&n.startContainer.nodeType==Node.ELEMENT_NODE&&(n.startContainer.childNodes.length==n.startOffset?(a=n.startContainer.childNodes[n.startOffset-1],a&&"IMG"==a.tagName&&"block"==e(a).css("display")&&(i=t.node.blockParent(a),i&&t.html.defaultTag()?i.nextSibling||(["TD","TH"].indexOf(i.tagName)<0?e(i).after("<"+t.html.defaultTag()+"><br>"+e.FE.MARKERS+"</"+t.html.defaultTag()+">"):e(img).after("<br>"+e.FE.MARKERS),t.selection.restore()):i||(e(a).after("<br>"+e.FE.MARKERS),t.selection.restore()))):0===n.startOffset&&n.startContainer.childNodes.length>n.startOffset&&(a=n.startContainer.childNodes[n.startOffset],a&&"IMG"==a.tagName&&"block"==e(a).css("display")&&(i=t.node.blockParent(a),i&&t.html.defaultTag()?i.previousSibling||(["TD","TH"].indexOf(i.tagName)<0?e(i).before("<"+t.html.defaultTag()+"><br>"+e.FE.MARKERS+"</"+t.html.defaultTag()+">"):e(img).before("<br>"+e.FE.MARKERS),t.selection.restore()):i||(e(a).before(e.FE.MARKERS+"<br>"),t.selection.restore()))))}function N(){t.events.$on(t.$el,t._mousedown,"IMG"==t.$el.get(0).tagName?null:'img:not([contenteditable="false"])',function(a){return!!e(this).parents('[contenteditable="false"]:not(.fr-element):not(body)').length||(t.selection.clear(),we=!0,t.browser.msie&&(t.events.disableBlur(),t.$el.attr("contenteditable",!1)),t.draggable||a.preventDefault(),void a.stopPropagation())}),t.events.$on(t.$el,t._mouseup,"IMG"==t.$el.get(0).tagName?null:'img:not([contenteditable="false"])',function(a){return!!e(this).parents('[contenteditable="false"]:not(.fr-element):not(body)').length||void(we&&(we=!1,a.stopPropagation(),t.browser.msie&&(t.$el.attr("contenteditable",!0),t.events.enableBlur())))}),t.events.on("keyup",function(a){if(a.shiftKey&&""===t.selection.text().replace(/\n/g,"")){var i=t.selection.element(),n=t.selection.endElement();i&&"IMG"==i.tagName?E(e(i)):n&&"IMG"==n.tagName&&E(e(n))}},!0),t.events.on("drop",F),t.events.on("mousedown window.mousedown",ie),t.events.on("window.touchmove",ne),t.events.on("mouseup window.mouseup",function(){return he?(ae(),!1):void 0}),t.events.on("commands.mousedown",function(e){e.parents(".fr-toolbar").length>0&&ae()}),t.events.on("mouseup",T),t.events.on("blur image.hideResizer commands.undo commands.redo element.dropped",function(){we=!1,ae(!0)})}function O(e){if(e)return t.popups.onRefresh("image.insert",a),t.popups.onHide("image.insert",r),!0;var i,n="";t.opts.imageInsertButtons.length>1&&(n='<div class="fr-buttons">'+t.button.buildList(t.opts.imageInsertButtons)+"</div>");var s=t.opts.imageInsertButtons.indexOf("imageUpload"),o=t.opts.imageInsertButtons.indexOf("imageByURL"),l="";s>=0&&(i=" fr-active",o>=0&&s>o&&(i=""),l='<div class="fr-image-upload-layer'+i+' fr-layer" id="fr-image-upload-layer-'+t.id+'"><strong>'+t.language.translate("Drop image")+"</strong><br>("+t.language.translate("or click")+')<div class="fr-form"><input type="file" accept="image/'+t.opts.imageAllowedTypes.join(", image/").toLowerCase()+'" tabIndex="-1"></div></div>');var f="";o>=0&&(i=" fr-active",s>=0&&o>s&&(i=""),f='<div class="fr-image-by-url-layer'+i+' fr-layer" id="fr-image-by-url-layer-'+t.id+'"><div class="fr-input-line"><input type="text" placeholder="http://" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2">'+t.language.translate("Insert")+"</button></div></div>");var d='<div class="fr-image-progress-bar-layer fr-layer"><h3 class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-back" data-cmd="imageDismissError" tabIndex="2">OK</button></div></div>',g={buttons:n,upload_layer:l,by_url_layer:f,progress_bar:d},p=t.popups.create("image.insert",g);return t.$wp&&t.events.$on(t.$wp,"scroll",function(){he&&t.popups.isVisible("image.insert")&&ge()}),P(p),p}function M(){if(he){var e=t.popups.get("image.alt");e.find("input").val(he.attr("alt")||"").trigger("change")}}function z(){var a=t.popups.get("image.alt");a||(a=_()),v(),t.popups.refresh("image.alt"),t.popups.setContainer("image.alt",e(t.opts.scrollableContainer));var i=he.offset().left+he.width()/2,n=he.offset().top+he.height();t.popups.show("image.alt",i,n,he.outerHeight())}function _(e){if(e)return t.popups.onRefresh("image.alt",M),!0;var a="";a='<div class="fr-buttons">'+t.button.buildList(t.opts.imageAltButtons)+"</div>";var i="";i='<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-'+t.id+'"><div class="fr-input-line"><input type="text" placeholder="'+t.language.translate("Alternate Text")+'" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2">'+t.language.translate("Update")+"</button></div></div>";var n={buttons:a,alt_layer:i},r=t.popups.create("image.alt",n);return t.$wp&&t.events.$on(t.$wp,"scroll.image-alt",function(){he&&t.popups.isVisible("image.alt")&&z()}),r}function L(e){if(he){var a=t.popups.get("image.alt");he.attr("alt",e||a.find("input").val()||""),a.find("input:focus").blur(),E(he)}}function W(){if(he){var e=t.popups.get("image.size");e.find('input[name="width"]').val(he.get(0).style.width).trigger("change"),e.find('input[name="height"]').val(he.get(0).style.height).trigger("change")}}function K(){var a=t.popups.get("image.size");a||(a=H()),v(),t.popups.refresh("image.size"),t.popups.setContainer("image.size",e(t.opts.scrollableContainer));var i=he.offset().left+he.width()/2,n=he.offset().top+he.height();t.popups.show("image.size",i,n,he.outerHeight())}function H(e){if(e)return t.popups.onRefresh("image.size",W),!0;var a="";a='<div class="fr-buttons">'+t.button.buildList(t.opts.imageSizeButtons)+"</div>";var i="";i='<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-'+t.id+'"><div class="fr-image-group"><div class="fr-input-line"><input type="text" name="width" placeholder="'+t.language.translate("Width")+'" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="height" placeholder="'+t.language.translate("Height")+'" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2">'+t.language.translate("Update")+"</button></div></div>";var n={buttons:a,size_layer:i},r=t.popups.create("image.size",n);return t.$wp&&t.events.$on(t.$wp,"scroll.image-size",function(){he&&t.popups.isVisible("image.size")&&K()}),r}function j(e,a){if(he){var i=t.popups.get("image.size");he.css("width",e||i.find('input[name="width"]').val()),he.css("height",a||i.find('input[name="height"]').val()),i.find("input:focus").blur(),E(he)}}function G(e){var a,i,n=t.popups.get("image.insert");if(he||t.opts.toolbarInline)he&&(i=he.offset().top+he.outerHeight());else{var r=t.$tb.find('.fr-command[data-cmd="insertImage"]');a=r.offset().left+r.outerWidth()/2,i=r.offset().top+(t.opts.toolbarBottom?10:r.outerHeight()-10)}!he&&t.opts.toolbarInline&&(i=n.offset().top-t.helpers.getPX(n.css("margin-top")),n.hasClass("fr-above")&&(i+=n.outerHeight())),n.find(".fr-layer").removeClass("fr-active"),n.find(".fr-"+e+"-layer").addClass("fr-active"),t.popups.show("image.insert",a,i,he?he.outerHeight():0)}function X(e){var a=t.popups.get("image.insert");a.find(".fr-image-upload-layer").hasClass("fr-active")&&e.addClass("fr-active")}function Y(e){var a=t.popups.get("image.insert");a.find(".fr-image-by-url-layer").hasClass("fr-active")&&e.addClass("fr-active")}function q(){var a;t.shared.$image_resizer?(ve=t.shared.$image_resizer,ye=t.shared.$img_overlay,t.events.on("destroy",function(){ve.removeClass("fr-active").appendTo(e("body"))},!0)):(t.shared.$image_resizer=e('<div class="fr-image-resizer"></div>'),ve=t.shared.$image_resizer,t.events.$on(ve,"mousedown",function(e){e.stopPropagation()},!0),t.opts.imageResize&&(ve.append(d("nw")+d("ne")+d("sw")+d("se")),t.shared.$img_overlay=e('<div class="fr-image-overlay"></div>'),ye=t.shared.$img_overlay,a=ve.get(0).ownerDocument,e(a).find("body").append(ye))),t.events.on("shared.destroy",function(){ve.html("").removeData().remove(),ve=null,t.opts.imageResize&&(ye.remove(),ye=null)},!0),t.helpers.isMobile()||t.events.$on(e(t.o_win),"resize",function(){he&&!he.hasClass("fr-uploading")?ae(!0):he&&(f(),ge(),h(!1))}),t.opts.imageResize&&(a=ve.get(0).ownerDocument,t.events.$on(ve,t._mousedown,".fr-handler",g),t.events.$on(e(a),t._mousemove,p),t.events.$on(e(a.defaultView||a.parentWindow),t._mouseup,u),t.events.$on(ye,"mouseleave",u))}function V(a){a=a||he,a&&t.events.trigger("image.beforeRemove",[a])!==!1&&(t.popups.hideAll(),ae(!0),a.get(0)==t.$el.get(0)?a.removeAttr("src"):("A"==a.get(0).parentNode.tagName?(t.selection.setBefore(a.get(0).parentNode)||t.selection.setAfter(a.get(0).parentNode)||a.parent().after(e.FE.MARKERS),e(a.get(0).parentNode).remove()):(t.selection.setBefore(a.get(0))||t.selection.setAfter(a.get(0))||a.after(e.FE.MARKERS),a.remove()),t.html.fillEmptyBlocks(),t.selection.restore()),t.undo.saveStep())}function Q(){if(N(),"IMG"==t.$el.get(0).tagName&&t.$el.addClass("fr-view"),t.events.$on(t.$el,t.helpers.isMobile()&&!t.helpers.isWindowsPhone()?"touchend":"click","IMG"==t.$el.get(0).tagName?null:'img:not([contenteditable="false"])',te),t.helpers.isMobile()&&(t.events.$on(t.$el,"touchstart","IMG"==t.$el.get(0).tagName?null:'img:not([contenteditable="false"])',function(){xe=!1}),t.events.$on(t.$el,"touchmove",function(){xe=!0})),t.events.on("window.keydown keydown",function(a){var i=a.which;if(he&&(i==e.FE.KEYCODE.BACKSPACE||i==e.FE.KEYCODE.DELETE))return a.preventDefault(),a.stopPropagation(),V(),!1;if(he&&i==e.FE.KEYCODE.ESC){var n=he;return ae(!0),t.selection.setAfter(n.get(0)),t.selection.restore(),a.preventDefault(),!1}return he&&!t.keys.ctrlKey(a)?(a.preventDefault(),!1):void 0},!0),t.events.on("window.cut window.copy",function(a){he&&(pe(),e.FE.copied_text="\n",e.FE.copied_html=he.get(0).outerHTML,"copy"==a.type?setTimeout(function(){E(he)}):(ae(!0),t.undo.saveStep(),setTimeout(function(){t.undo.saveStep()},0)))},!0),t.events.$on(e(t.o_win),"keydown",function(t){var a=t.which;return he&&a==e.FE.KEYCODE.BACKSPACE?(t.preventDefault(),!1):void 0}),t.events.$on(t.$win,"keydown",function(t){var a=t.which;he&&he.hasClass("fr-uploading")&&a==e.FE.KEYCODE.ESC&&he.trigger("abortUpload")}),t.events.on("destroy",function(){he&&he.hasClass("fr-uploading")&&he.trigger("abortUpload")}),t.events.on("paste.before",Z),t.events.on("paste.beforeCleanup",ee),t.events.on("paste.after",J),t.events.on("html.set",o),t.events.on("html.inserted",o),o(),t.events.on("destroy",function(){ke=[]}),t.events.on("html.get",function(e){return e=e.replace(/<(img)((?:[\w\W]*?))class="([\w\W]*?)(fr-uploading|fr-error)([\w\W]*?)"((?:[\w\W]*?))>/g,"")}),t.opts.imageOutputSize){var a;t.events.on("html.beforeGet",function(){a=t.$el.get(0).querySelectorAll("img");for(var i=0;i<a.length;i++)a[i].setAttribute("width",e(a[i]).width()),a[i].setAttribute("height",e(a[i]).height())}),t.events.on("html.afterGet",function(){for(var e=0;e<a.length;e++)a[e].removeAttribute("width"),a[e].removeAttribute("height")})}t.opts.iframe&&t.events.on("image.loaded",t.size.syncIframe),t.$wp&&(l(),t.events.on("contentChanged",l)),t.events.$on(e(t.o_win),"orientationchange.image",function(){setTimeout(function(){var e=me();e&&E(e)},0)}),c(!0),O(!0),H(!0),_(!0),t.events.on("node.remove",function(e){return"IMG"==e.get(0).tagName?(V(e),!1):void 0})}function J(){t.opts.imagePaste?t.$el.find("img[data-fr-image-pasted]").each(function(a,i){if(t.opts.imagePasteProcess){var r=t.opts.imageDefaultWidth;r&&"auto"!=r&&(r+=t.opts.imageResizeWithPercent?"%":"px"),e(i).css("width",r),e(i).removeClass("fr-dii fr-dib fr-fir fr-fil").addClass((t.opts.imageDefaultDisplay?"fr-di"+t.opts.imageDefaultDisplay[0]:"")+(t.opts.imageDefaultAlign&&"center"!=t.opts.imageDefaultAlign?" fr-fi"+t.opts.imageDefaultAlign[0]:""))}if(0===i.src.indexOf("data:")){if(t.events.trigger("image.beforePasteUpload",[i])===!1)return!1;he=e(i),f(),n(),ge(),h(),t.edit.off();for(var s=atob(e(i).attr("src").split(",")[1]),o=[],l=0;l<s.length;l++)o.push(s.charCodeAt(l));var d=new Blob([new Uint8Array(o)],{type:"image/jpeg"});B([d]),e(i).removeAttr("data-fr-image-pasted")}else 0!==i.src.indexOf("http")?(t.selection.save(),e(i).remove(),t.selection.restore()):e(i).removeAttr("data-fr-image-pasted")}):t.$el.find("img[data-fr-image-pasted]").remove()}function Z(e){if(e&&e.clipboardData&&e.clipboardData.items&&e.clipboardData.items[0]){var a=e.clipboardData.items[0].getAsFile();if(a){var i=new FileReader;return i.onload=function(e){var a=e.target.result,i=t.opts.imageDefaultWidth;i&&"auto"!=i&&(i+=t.opts.imageResizeWithPercent?"%":"px"),t.html.insert('<img data-fr-image-pasted="true" class="'+(t.opts.imageDefaultDisplay?"fr-di"+t.opts.imageDefaultDisplay[0]:"")+(t.opts.imageDefaultAlign&&"center"!=t.opts.imageDefaultAlign?" fr-fi"+t.opts.imageDefaultAlign[0]:"")+'" src="'+a+'"'+(i?' style="width: '+i+';"':"")+">"),t.events.trigger("paste.after")},i.readAsDataURL(a),!1}}}function ee(e){return e=e.replace(/<img /gi,'<img data-fr-image-pasted="true" ')}function te(a){if(e(this).parents('[contenteditable="false"]:not(.fr-element):not(body)').length)return!0;if(a&&"touchend"==a.type&&xe)return!0;if(a&&t.edit.isDisabled())return a.stopPropagation(),a.preventDefault(),!1;for(var i=0;i<e.FE.INSTANCES.length;i++)e.FE.INSTANCES[i]!=t&&e.FE.INSTANCES[i].events.trigger("image.hideResizer");t.toolbar.disable(),a&&(a.stopPropagation(),a.preventDefault()),t.helpers.isMobile()&&(t.events.disableBlur(),t.$el.blur(),t.events.enableBlur()),t.opts.iframe&&t.size.syncIframe(),he=e(this),pe(),f(),n(),t.selection.clear(),t.button.bulkRefresh(),t.events.trigger("video.hideResizer")}function ae(e){he&&(re()||e===!0)&&(t.toolbar.enable(),ve.removeClass("fr-active"),t.popups.hide("image.edit"),he=null,ne())}function ie(){Ue=!0}function ne(){Ue=!1}function re(){return Ue}function se(e){he.removeClass("fr-fir fr-fil"),"left"==e?he.addClass("fr-fil"):"right"==e&&he.addClass("fr-fir"),f(),n()}function oe(e){he&&(he.hasClass("fr-fil")?e.find("> *:first").replaceWith(t.icon.create("align-left")):he.hasClass("fr-fir")?e.find("> *:first").replaceWith(t.icon.create("align-right")):e.find("> *:first").replaceWith(t.icon.create("align-justify")))}function le(e,t){if(he){var a="justify";he.hasClass("fr-fil")?a="left":he.hasClass("fr-fir")&&(a="right"),t.find('.fr-command[data-param1="'+a+'"]').addClass("fr-active")}}function fe(e){he.removeClass("fr-dii fr-dib"),"inline"==e?he.addClass("fr-dii"):"block"==e&&he.addClass("fr-dib"),f(),n()}function de(e,t){var a="block";he.hasClass("fr-dii")&&(a="inline"),t.find('.fr-command[data-param1="'+a+'"]').addClass("fr-active")}function ge(){var a=t.popups.get("image.insert");a||(a=O()),t.popups.isVisible("image.insert")||(v(),t.popups.refresh("image.insert"),t.popups.setContainer("image.insert",e(t.opts.scrollableContainer)));var i=he.offset().left+he.width()/2,n=he.offset().top+he.height();t.popups.show("image.insert",i,n,he.outerHeight())}function pe(){if(he){t.selection.clear();var e=t.doc.createRange();e.selectNode(he.get(0));var a=t.selection.get();a.addRange(e)}}function ue(){he?(e(".fr-popup input:focus").blur(),E(he)):(t.events.disableBlur(),t.selection.restore(),t.events.enableBlur(),t.popups.hide("image.insert"),t.toolbar.showInline())}function me(){return he}function ce(e,a,i){if("undefined"==typeof a&&(a=t.opts.imageStyles),"undefined"==typeof i&&(i=t.opts.imageMultipleStyles),!he)return!1;if(!i){var n=Object.keys(a);n.splice(n.indexOf(e),1),he.removeClass(n.join(" "))}he.toggleClass(e),E(he)}var he,ve,be,ye,we=!1,Ee=1,Ce=2,Ae=3,Se=4,Re=5,De=6,Ie=7,$e={};$e[Ee]="Image cannot be loaded from the passed link.",$e[Ce]="No link in upload response.",$e[Ae]="Error during file upload.",$e[Se]="Parsing response failed.",$e[Re]="File is too large.",$e[De]="Image file type is invalid.",$e[Ie]="Files can be uploaded only to same domain in IE 8 and IE 9.";var ke,xe,Ue=!1;return{_init:Q,showInsertPopup:i,showLayer:G,refreshUploadButton:X,refreshByURLButton:Y,upload:B,insertByURL:w,align:se,refreshAlign:oe,refreshAlignOnShow:le,display:fe,refreshDisplayOnShow:de,replace:ge,back:ue,get:me,insert:A,showProgressBar:h,remove:V,hideProgressBar:v,applyStyle:ce,showAltPopup:z,showSizePopup:K,setAlt:L,setSize:j,exitEdit:ae,edit:E}},e.FE.DefineIcon("insertImage",{NAME:"image"}),e.FE.RegisterShortcut(e.FE.KEYCODE.P,"insertImage",null,"P"),e.FE.RegisterCommand("insertImage",{title:"Insert Image",undo:!1,focus:!0,refreshAfterCallback:!1,popup:!0,callback:function(){this.popups.isVisible("image.insert")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("image.insert")):this.image.showInsertPopup()},plugin:"image"}),e.FE.DefineIcon("imageUpload",{NAME:"upload"}),e.FE.RegisterCommand("imageUpload",{title:"Upload Image",undo:!1,focus:!1,callback:function(){this.image.showLayer("image-upload")},refresh:function(e){this.image.refreshUploadButton(e)}}),e.FE.DefineIcon("imageByURL",{NAME:"link"}),e.FE.RegisterCommand("imageByURL",{title:"By URL",undo:!1,focus:!1,callback:function(){this.image.showLayer("image-by-url")},refresh:function(e){this.image.refreshByURLButton(e)}}),e.FE.RegisterCommand("imageInsertByURL",{title:"Insert Image",undo:!0,refreshAfterCallback:!1,callback:function(){this.image.insertByURL()},refresh:function(e){var t=this.image.get();t?e.text(this.language.translate("Replace")):e.text(this.language.translate("Insert"))}}),e.FE.DefineIcon("imageDisplay",{NAME:"star"}),e.FE.RegisterCommand("imageDisplay",{title:"Display",type:"dropdown",options:{inline:"Inline",block:"Break Text"},callback:function(e,t){this.image.display(t)},refresh:function(e){this.opts.imageTextNear||e.addClass("fr-hidden")},refreshOnShow:function(e,t){this.image.refreshDisplayOnShow(e,t)}}),e.FE.ICONS.align||(e.FE.DefineIcon("align",{NAME:"align-left"}),e.FE.DefineIcon("align-left",{NAME:"align-left"}),e.FE.DefineIcon("align-right",{NAME:"align-right"}),e.FE.DefineIcon("align-center",{NAME:"align-center"}),e.FE.DefineIcon("align-justify",{NAME:"align-justify"})),e.FE.DefineIcon("imageAlign",{NAME:"align-center"}),e.FE.RegisterCommand("imageAlign",{type:"dropdown",title:"Align",options:{left:"Align Left",justify:"None",right:"Align Right"},html:function(){var t='<ul class="fr-dropdown-list">',a=e.FE.COMMANDS.imageAlign.options;for(var i in a)a.hasOwnProperty(i)&&(t+='<li><a class="fr-command fr-title" data-cmd="imageAlign" data-param1="'+i+'" title="'+this.language.translate(a[i])+'">'+this.icon.create("align-"+i)+"</a></li>");return t+="</ul>"},callback:function(e,t){this.image.align(t)},refresh:function(e){this.image.refreshAlign(e)},refreshOnShow:function(e,t){this.image.refreshAlignOnShow(e,t)}}),e.FE.DefineIcon("imageReplace",{NAME:"exchange"}),e.FE.RegisterCommand("imageReplace",{title:"Replace",undo:!1,focus:!1,refreshAfterCallback:!1,callback:function(){this.image.replace()}}),e.FE.DefineIcon("imageRemove",{
NAME:"trash"}),e.FE.RegisterCommand("imageRemove",{title:"Remove",callback:function(){this.image.remove()}}),e.FE.DefineIcon("imageBack",{NAME:"arrow-left"}),e.FE.RegisterCommand("imageBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.image.back()},refresh:function(e){var t=this.image.get();t||this.opts.toolbarInline?(e.removeClass("fr-hidden"),e.next(".fr-separator").removeClass("fr-hidden")):(e.addClass("fr-hidden"),e.next(".fr-separator").addClass("fr-hidden"))}}),e.FE.RegisterCommand("imageDismissError",{title:"OK",undo:!1,callback:function(){this.image.hideProgressBar(!0)}}),e.FE.DefineIcon("imageStyle",{NAME:"magic"}),e.FE.RegisterCommand("imageStyle",{title:"Style",type:"dropdown",html:function(){var e='<ul class="fr-dropdown-list">',t=this.opts.imageStyles;for(var a in t)t.hasOwnProperty(a)&&(e+='<li><a class="fr-command" data-cmd="imageStyle" data-param1="'+a+'">'+this.language.translate(t[a])+"</a></li>");return e+="</ul>"},callback:function(e,t){this.image.applyStyle(t)},refreshOnShow:function(t,a){var i=this.image.get();i&&a.find(".fr-command").each(function(){var t=e(this).data("param1");e(this).toggleClass("fr-active",i.hasClass(t))})}}),e.FE.DefineIcon("imageAlt",{NAME:"info"}),e.FE.RegisterCommand("imageAlt",{undo:!1,focus:!1,title:"Alternate Text",callback:function(){this.image.showAltPopup()}}),e.FE.RegisterCommand("imageSetAlt",{undo:!0,focus:!1,title:"Update",refreshAfterCallback:!1,callback:function(){this.image.setAlt()}}),e.FE.DefineIcon("imageSize",{NAME:"arrows-alt"}),e.FE.RegisterCommand("imageSize",{undo:!1,focus:!1,title:"Change Size",callback:function(){this.image.showSizePopup()}}),e.FE.RegisterCommand("imageSetSize",{undo:!0,focus:!1,title:"Update",refreshAfterCallback:!1,callback:function(){this.image.setSize()}})});