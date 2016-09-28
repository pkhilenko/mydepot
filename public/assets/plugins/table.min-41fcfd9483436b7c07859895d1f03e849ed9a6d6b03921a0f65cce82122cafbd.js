!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,a){return void 0===a&&(a="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(a),a}:e(jQuery)}(function(e){"use strict";e.extend(e.FE.POPUP_TEMPLATES,{"table.insert":"[_BUTTONS_][_ROWS_COLUMNS_]","table.edit":"[_BUTTONS_]","table.colors":"[_BUTTONS_][_COLORS_]"}),e.extend(e.FE.DEFAULTS,{tableInsertMaxSize:10,tableEditButtons:["tableHeader","tableRemove","|","tableRows","tableColumns","tableStyle","-","tableCells","tableCellBackground","tableCellVerticalAlign","tableCellHorizontalAlign","tableCellStyle"],tableInsertButtons:["tableBack","|"],tableResizer:!0,tableResizerOffset:5,tableResizingLimit:30,tableColorsButtons:["tableBack","|"],tableColors:["#61BD6D","#1ABC9C","#54ACD2","#2C82C9","#9365B8","#475577","#CCCCCC","#41A85F","#00A885","#3D8EB9","#2969B0","#553982","#28324E","#000000","#F7DA64","#FBA026","#EB6B56","#E25041","#A38F84","#EFEFEF","#FFFFFF","#FAC51C","#F37934","#D14841","#B8312F","#7C706B","#D1D5D8","REMOVE"],tableColorsStep:7,tableCellStyles:{"fr-highlighted":"Highlighted","fr-thick":"Thick"},tableStyles:{"fr-dashed-borders":"Dashed Borders","fr-alternate-rows":"Alternate Rows"},tableCellMultipleStyles:!0,tableMultipleStyles:!0,tableInsertHelper:!0,tableInsertHelperOffset:15}),e.FE.PLUGINS.table=function(t){function a(){var e=t.$tb.find('.fr-command[data-cmd="insertTable"]'),a=t.popups.get("table.insert");if(a||(a=o()),!a.hasClass("fr-active")){t.popups.refresh("table.insert"),t.popups.setContainer("table.insert",t.$tb);var l=e.offset().left+e.outerWidth()/2,s=e.offset().top+(t.opts.toolbarBottom?10:e.outerHeight()-10);t.popups.show("table.insert",l,s,e.outerHeight())}}function l(){var a=O();if(a){var l=t.popups.get("table.edit");l||(l=i()),t.popups.setContainer("table.edit",e(t.opts.scrollableContainer));var s=B(a),n=(s.left+s.right)/2,o=s.bottom;t.popups.show("table.edit",n,o,s.bottom-s.top),t.edit.isDisabled()&&(t.toolbar.disable(),t.$el.removeClass("fr-no-selection"),t.edit.on(),t.selection.setAtEnd(t.$el.find(".fr-selected-cell:last").get(0)),t.selection.restore(),t.button.bulkRefresh())}}function s(){var a=O();if(a){var l=t.popups.get("table.colors");l||(l=f()),t.popups.setContainer("table.colors",e(t.opts.scrollableContainer));var s=B(a),n=(s.left+s.right)/2,o=s.bottom;d(),t.popups.show("table.colors",n,o,s.bottom-s.top)}}function n(){0===ce().length&&t.toolbar.enable()}function o(a){if(a)return t.popups.onHide("table.insert",function(){t.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter")}),!0;var l="";t.opts.tableInsertButtons.length>0&&(l='<div class="fr-buttons">'+t.button.buildList(t.opts.tableInsertButtons)+"</div>");var s={buttons:l,rows_columns:r()},n=t.popups.create("table.insert",s);return t.events.$on(n,"mouseenter",".fr-table-size .fr-select-table-size .fr-table-cell",function(a){var l=e(a.currentTarget),s=l.data("row"),n=l.data("col"),o=l.parent();o.siblings(".fr-table-size-info").html(s+" &times; "+n),o.find("> span").removeClass("hover");for(var r=1;r<=t.opts.tableInsertMaxSize;r++)for(var i=0;i<=t.opts.tableInsertMaxSize;i++){var f=o.find('> span[data-row="'+r+'"][data-col="'+i+'"]');s>=r&&n>=i?f.addClass("hover"):s+1>=r||2>=r&&!t.helpers.isMobile()?f.css("display","inline-block"):r>2&&!t.helpers.isMobile()&&f.css("display","none")}},!0),n}function r(){for(var e='<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">',a=1;a<=t.opts.tableInsertMaxSize;a++){for(var l=1;l<=t.opts.tableInsertMaxSize;l++){var s="inline-block";a>2&&!t.helpers.isMobile()&&(s="none");var n="fr-table-cell ";1==a&&1==l&&(n+=" hover"),e+='<span class="fr-command '+n+'" data-cmd="tableInsert" data-row="'+a+'" data-col="'+l+'" data-param1="'+a+'" data-param2="'+l+'" style="display: '+s+';"><span></span></span>'}e+='<div class="new-line"></div>'}return e+="</div></div>"}function i(e){if(e)return t.popups.onHide("table.edit",n),!0;var a="";t.opts.tableEditButtons.length>0&&(a='<div class="fr-buttons">'+t.button.buildList(t.opts.tableEditButtons)+"</div>");var s={buttons:a},o=t.popups.create("table.edit",s);return t.events.$on(t.$wp,"scroll.table-edit",function(){t.popups.isVisible("table.edit")&&l()}),o}function f(){var e="";t.opts.tableColorsButtons.length>0&&(e='<div class="fr-buttons fr-table-colors-buttons">'+t.button.buildList(t.opts.tableColorsButtons)+"</div>");var a={buttons:e,colors:c()},l=t.popups.create("table.colors",a);return t.events.$on(t.$wp,"scroll.table-colors",function(){t.popups.isVisible("table.colors")&&s()}),l}function c(){for(var e='<div class="fr-table-colors">',a=0;a<t.opts.tableColors.length;a++)0!==a&&a%t.opts.tableColorsStep===0&&(e+="<br>"),e+="REMOVE"!=t.opts.tableColors[a]?'<span class="fr-command" style="background: '+t.opts.tableColors[a]+';" data-cmd="tableCellBackgroundColor" data-param1="'+t.opts.tableColors[a]+'"></span>':'<span class="fr-command" data-cmd="tableCellBackgroundColor" data-param1="REMOVE" title="'+t.language.translate("Clear Formatting")+'"><i class="fa fa-eraser"></i></span>';return e+="</div>"}function d(){var e=t.popups.get("table.colors"),a=t.$el.find(".fr-selected-cell:first");e.find(".fr-selected-color").removeClass("fr-selected-color"),e.find('span[data-param1="'+t.helpers.RGBToHex(a.css("background-color"))+'"]').addClass("fr-selected-color")}function p(a,l){var s,n,o='<table style="width: 100%;"><tbody>',r=100/l;for(s=0;a>s;s++){for(o+="<tr>",n=0;l>n;n++)o+='<td style="width: '+r.toFixed(4)+'%;">',0===s&&0===n&&(o+=e.FE.MARKERS),o+="<br></td>";o+="</tr>"}o+="</tbody></table>",t.html.insert(o),t.selection.restore()}function h(){if(ce().length>0){var e=de();t.selection.setBefore(e.get(0))||t.selection.setAfter(e.get(0)),t.selection.restore(),t.popups.hide("table.edit"),e.remove(),t.toolbar.enable()}}function u(){var t=de();if(t.length>0&&0===t.find("th").length){var a,s="<thead><tr>",n=0;for(t.find("tr:first > td").each(function(){var t=e(this);n+=parseInt(t.attr("colspan"),10)||1}),a=0;n>a;a++)s+="<th><br></th>";s+="</tr></thead>",t.prepend(s),l()}}function b(){var e=de(),a=e.find("thead");if(a.length>0)if(0===e.find("tbody tr").length)h();else if(a.remove(),ce().length>0)l();else{t.popups.hide("table.edit");var s=e.find("tbody tr:first td:first").get(0);s&&(t.selection.setAtEnd(s),t.selection.restore())}}function g(a){var s=de();if(s.length>0){if(t.$el.find("th.fr-selected-cell").length>0&&"above"==a)return;var n,o,r=O(),i=T(r);o="above"==a?i.min_i:i.max_i;var f="<tr>";for(n=0;n<r[o].length;n++)if("below"==a&&o<r.length-1&&r[o][n]==r[o+1][n]||"above"==a&&o>0&&r[o][n]==r[o-1][n]){if(0===n||n>0&&r[o][n]!=r[o][n-1]){var c=e(r[o][n]);c.attr("rowspan",parseInt(c.attr("rowspan"),10)+1)}}else f+="<td><br></td>";f+="</tr>";var d=e(s.find("tr").not(s.find("table tr")).get(o));"below"==a?d.after(f):"above"==a&&(d.before(f),t.popups.isVisible("table.edit")&&l())}}function m(){var a=de();if(a.length>0){var l,s,n,o=O(),r=T(o);if(0===r.min_i&&r.max_i==o.length-1)h();else{for(l=r.max_i;l>=r.min_i;l--){for(n=e(a.find("tr").not(a.find("table tr")).get(l)),s=0;s<o[l].length;s++)if(0===s||o[l][s]!=o[l][s-1]){var i=e(o[l][s]);if(parseInt(i.attr("rowspan"),10)>1){var f=parseInt(i.attr("rowspan"),10)-1;1==f?i.removeAttr("rowspan"):i.attr("rowspan",f)}if(l<o.length-1&&o[l][s]==o[l+1][s]&&(0===l||o[l][s]!=o[l-1][s])){for(var c=o[l][s],d=s;d>0&&o[l][d]==o[l][d-1];)d--;0===d?e(a.find("tr").not(a.find("table tr")).get(l+1)).prepend(c):e(o[l+1][d-1]).after(c)}}var p=n.parent();n.remove(),0===p.find("tr").length&&p.remove(),o=O(a)}y(0,o.length-1,0,o[0].length-1,a),r.min_i>0?t.selection.setAtEnd(o[r.min_i-1][0]):t.selection.setAtEnd(o[0][0]),t.selection.restore(),t.popups.hide("table.edit")}}}function v(a){var s=de();if(s.length>0){var n,o=O(),r=T(o);n="before"==a?r.min_j:r.max_j;var i,f=100/o[0].length,c=100/(o[0].length+1);s.find("th, td").each(function(){i=e(this),i.data("old-width",i.outerWidth()/s.outerWidth()*100)}),s.find("tr").not(s.find("table tr")).each(function(t){for(var l,s=e(this),r=0,i=0;n>r-1;){if(l=s.find("> th, > td").get(i),!l){l=null;break}l==o[t][r]?(r+=parseInt(e(l).attr("colspan"),10)||1,i++):(r+=parseInt(e(o[t][r]).attr("colspan"),10)||1,"after"==a&&(l=0===i?-1:s.find("> th, > td").get(i-1)))}var d=e(l);if("after"==a&&r-1>n||"before"==a&&n>0&&o[t][n]==o[t][n-1]){if(0===t||t>0&&o[t][n]!=o[t-1][n]){var p=parseInt(d.attr("colspan"),10)+1;d.attr("colspan",p),d.css("width",(d.data("old-width")*c/f+c).toFixed(4)+"%"),d.removeData("old-width")}}else{var h;h=s.find("th").length>0?'<th style="width: '+c.toFixed(4)+'%;"><br></th>':'<td style="width: '+c.toFixed(4)+'%;"><br></td>',-1==l?s.prepend(h):null==l?s.append(h):"before"==a?d.before(h):"after"==a&&d.after(h)}}),s.find("th, td").each(function(){i=e(this),i.data("old-width")&&(i.css("width",(i.data("old-width")*c/f).toFixed(4)+"%"),i.removeData("old-width"))}),t.popups.isVisible("table.edit")&&l()}}function w(){var a=de();if(a.length>0){var l,s,n,o=O(),r=T(o);if(0===r.min_j&&r.max_j==o[0].length-1)h();else{var i=100/o[0].length,f=100/(o[0].length-r.max_j+r.min_j-1);for(a.find("th, td").each(function(){n=e(this),n.hasClass("fr-selected-cell")||n.data("old-width",n.outerWidth()/a.outerWidth()*100)}),s=r.max_j;s>=r.min_j;s--)for(l=0;l<o.length;l++)if(0===l||o[l][s]!=o[l-1][s])if(n=e(o[l][s]),(parseInt(n.attr("colspan"),10)||1)>1){var c=parseInt(n.attr("colspan"),10)-1;1==c?n.removeAttr("colspan"):n.attr("colspan",c),n.css("width",((n.data("old-width")-ae(s,o))*f/i).toFixed(4)+"%"),n.removeData("old-width")}else{var d=e(n.parent().get(0));n.remove(),0===d.find("> th, > td").length&&(0===d.prev().length||0===d.next().length||d.prev().find("> th[rowspan], > td[rowspan]").length<d.prev().find("> th, > td").length)&&d.remove()}y(0,o.length-1,0,o[0].length-1,a),r.min_j>0?t.selection.setAtEnd(o[r.min_i][r.min_j-1]):t.selection.setAtEnd(o[r.min_i][0]),t.selection.restore(),t.popups.hide("table.edit"),a.find("th, td").each(function(){n=e(this),n.data("old-width")&&(n.css("width",(n.data("old-width")*f/i).toFixed(4)+"%"),n.removeData("old-width"))})}}}function C(e,t,a){var l,s,n,o,r,i=0,f=O(a);for(t=Math.min(t,f[0].length-1),s=e;t>=s;s++)if(!(s>e&&f[0][s]==f[0][s-1])&&(o=parseInt(f[0][s].getAttribute("colspan"),10)||1,o>1&&f[0][s]==f[0][s+1]))for(i=o-1,l=1;l<f.length;l++)if(f[l][s]!=f[l-1][s]){for(n=s;s+o>n;n++)if(r=parseInt(f[l][n].getAttribute("colspan"),10)||1,r>1&&f[l][n]==f[l][n+1])i=Math.min(i,r-1),n+=i;else if(i=Math.max(0,i-1),!i)break;if(!i)break}i&&$(f,i,"colspan",0,f.length-1,e,t)}function E(e,t,a){var l,s,n,o,r,i=0,f=O(a);for(t=Math.min(t,f.length-1),l=e;t>=l;l++)if(!(l>e&&f[l][0]==f[l-1][0])&&(o=parseInt(f[l][0].getAttribute("rowspan"),10)||1,o>1&&f[l][0]==f[l+1][0]))for(i=o-1,s=1;s<f[0].length;s++)if(f[l][s]!=f[l][s-1]){for(n=l;l+o>n;n++)if(r=parseInt(f[n][s].getAttribute("rowspan"),10)||1,r>1&&f[n][s]==f[n+1][s])i=Math.min(i,r-1),n+=i;else if(i=Math.max(0,i-1),!i)break;if(!i)break}i&&$(f,i,"rowspan",e,t,0,f[0].length-1)}function $(e,t,a,l,s,n,o){var r,i,f;for(r=l;s>=r;r++)for(i=n;o>=i;i++)r>l&&e[r][i]==e[r-1][i]||i>n&&e[r][i]==e[r][i-1]||(f=parseInt(e[r][i].getAttribute(a),10)||1,f>1&&(f-t>1?e[r][i].setAttribute(a,f-t):e[r][i].removeAttribute(a)))}function y(e,t,a,l,s){E(e,t,s),C(a,l,s)}function M(){if(ce().length>1&&(0===t.$el.find("th.fr-selected-cell").length||0===t.$el.find("td.fr-selected-cell").length)){var a,s,n=O(),o=T(n),r=t.$el.find(".fr-selected-cell"),i=e(r[0]),f=i.parent(),c=f.find(".fr-selected-cell"),d=i.closest("table"),p=i.html(),h=0;for(a=0;a<c.length;a++)h+=e(c[a]).outerWidth();for(i.css("width",(h/d.outerWidth()*100).toFixed(4)+"%"),o.min_j<o.max_j&&i.attr("colspan",o.max_j-o.min_j+1),o.min_i<o.max_i&&i.attr("rowspan",o.max_i-o.min_i+1),a=1;a<r.length;a++)s=e(r[a]),"<br>"!=s.html()&&""!==s.html()&&(p+="<br>"+s.html()),s.remove();i.html(p),t.selection.setAtEnd(i.get(0)),t.selection.restore(),t.toolbar.enable(),E(o.min_i,o.max_i,d);var u=d.find("tr:empty");for(a=u.length-1;a>=0;a--)e(u[a]).remove();C(o.min_j,o.max_j,d),l()}}function A(){if(1==ce().length){var a=t.$el.find(".fr-selected-cell"),l=a.parent(),s=a.closest("table"),n=parseInt(a.attr("rowspan"),10),o=O(),r=D(a.get(0),o),i=a.clone().html("<br>");if(n>1){var f=Math.ceil(n/2);f>1?a.attr("rowspan",f):a.removeAttr("rowspan"),n-f>1?i.attr("rowspan",n-f):i.removeAttr("rowspan");for(var c=r.row+f,d=0===r.col?r.col:r.col-1;d>=0&&(o[c][d]==o[c][d-1]||c>0&&o[c][d]==o[c-1][d]);)d--;-1==d?e(s.find("tr").not(s.find("table tr")).get(c)).prepend(i):e(o[c][d]).after(i)}else{var p,h=e("<tr>").append(i);for(p=0;p<o[0].length;p++)if(0===p||o[r.row][p]!=o[r.row][p-1]){var u=e(o[r.row][p]);u.is(a)||u.attr("rowspan",(parseInt(u.attr("rowspan"),10)||1)+1)}l.after(h)}S(),t.popups.hide("table.edit")}}function F(){if(1==ce().length){var a=t.$el.find(".fr-selected-cell"),l=parseInt(a.attr("colspan"),10)||1,s=a.parent().outerWidth(),n=a.outerWidth(),o=a.clone().html("<br>"),r=O(),i=D(a.get(0),r);if(l>1){var f=Math.ceil(l/2);n=le(i.col,i.col+f-1,r)/s*100;var c=le(i.col+f,i.col+l-1,r)/s*100;f>1?a.attr("colspan",f):a.removeAttr("colspan"),l-f>1?o.attr("colspan",l-f):o.removeAttr("colspan"),a.css("width",n.toFixed(4)+"%"),o.css("width",c.toFixed(4)+"%")}else{var d;for(d=0;d<r.length;d++)if(0===d||r[d][i.col]!=r[d-1][i.col]){var p=e(r[d][i.col]);if(!p.is(a)){var h=(parseInt(p.attr("colspan"),10)||1)+1;p.attr("colspan",h)}}n=n/s*100/2,a.css("width",n.toFixed(4)+"%"),o.css("width",n.toFixed(4)+"%")}a.after(o),S(),t.popups.hide("table.edit")}}function _(e){"REMOVE"!=e?t.$el.find(".fr-selected-cell").css("background-color",t.helpers.HEXtoRGB(e)):t.$el.find(".fr-selected-cell").css("background-color","")}function x(e){t.$el.find(".fr-selected-cell").css("vertical-align",e)}function R(e){t.$el.find(".fr-selected-cell").css("text-align",e)}function I(e,t,a,l){if(t.length>0){if(!a){var s=Object.keys(l);s.splice(s.indexOf(e),1),t.removeClass(s.join(" "))}t.toggleClass(e)}}function O(t){t=t||null;var a=[];return null==t&&ce().length>0&&(t=de()),t?(t.find("tr").not(t.find("table tr")).each(function(t,l){var s=e(l),n=0;s.find("> th, > td").each(function(l,s){for(var o=e(s),r=parseInt(o.attr("colspan"),10)||1,i=parseInt(o.attr("rowspan"),10)||1,f=t;t+i>f;f++)for(var c=n;n+r>c;c++)a[f]||(a[f]=[]),a[f][c]?n++:a[f][c]=s;n+=r})}),a):void 0}function D(e,t){for(var a=0;a<t.length;a++)for(var l=0;l<t[a].length;l++)if(t[a][l]==e)return{row:a,col:l}}function z(e,t,a){for(var l=e+1,s=t+1;l<a.length;){if(a[l][t]!=a[e][t]){l--;break}l++}for(l==a.length&&l--;s<a[e].length;){if(a[e][s]!=a[e][t]){s--;break}s++}return s==a[e].length&&s--,{row:l,col:s}}function S(){var a=t.$el.find(".fr-selected-cell");a.length>0&&a.each(function(){var t=e(this);t.removeClass("fr-selected-cell"),""===t.attr("class")&&t.removeAttr("class")})}function k(){setTimeout(function(){t.selection.clear(),t.$el.addClass("fr-no-selection"),t.$el.blur()},0)}function T(e){var a,l=e.length,s=0,n=e[0].length,o=0,r=t.$el.find(".fr-selected-cell");for(a=0;a<r.length;a++){var i=D(r[a],e),f=z(i.row,i.col,e);l=Math.min(i.row,l),s=Math.max(f.row,s),n=Math.min(i.col,n),o=Math.max(f.col,o)}return{min_i:l,max_i:s,min_j:n,max_j:o}}function N(t,a,l,s,n){var o,r,i,f,c=t,d=a,p=l,h=s;for(o=c;d>=o;o++)((parseInt(e(n[o][p]).attr("rowspan"),10)||1)>1||(parseInt(e(n[o][p]).attr("colspan"),10)||1)>1)&&(i=D(n[o][p],n),f=z(i.row,i.col,n),c=Math.min(i.row,c),d=Math.max(f.row,d),p=Math.min(i.col,p),h=Math.max(f.col,h)),((parseInt(e(n[o][h]).attr("rowspan"),10)||1)>1||(parseInt(e(n[o][h]).attr("colspan"),10)||1)>1)&&(i=D(n[o][h],n),f=z(i.row,i.col,n),c=Math.min(i.row,c),d=Math.max(f.row,d),p=Math.min(i.col,p),h=Math.max(f.col,h));for(r=p;h>=r;r++)((parseInt(e(n[c][r]).attr("rowspan"),10)||1)>1||(parseInt(e(n[c][r]).attr("colspan"),10)||1)>1)&&(i=D(n[c][r],n),f=z(i.row,i.col,n),c=Math.min(i.row,c),d=Math.max(f.row,d),p=Math.min(i.col,p),h=Math.max(f.col,h)),((parseInt(e(n[d][r]).attr("rowspan"),10)||1)>1||(parseInt(e(n[d][r]).attr("colspan"),10)||1)>1)&&(i=D(n[d][r],n),f=z(i.row,i.col,n),c=Math.min(i.row,c),d=Math.max(f.row,d),p=Math.min(i.col,p),h=Math.max(f.col,h));return c==t&&d==a&&p==l&&h==s?{min_i:t,max_i:a,min_j:l,max_j:s}:N(c,d,p,h,n)}function B(t){var a=T(t),l=e(t[a.min_i][a.min_j]),s=e(t[a.min_i][a.max_j]),n=e(t[a.max_i][a.min_j]),o=l.offset().left,r=s.offset().left+s.outerWidth(),i=l.offset().top,f=n.offset().top+n.outerHeight();return{left:o,right:r,top:i,bottom:f}}function H(a,l){if(e(a).is(l))S(),t.edit.on(),e(a).addClass("fr-selected-cell");else{k(),t.edit.off();var s=O(),n=D(a,s),o=D(l,s),r=N(Math.min(n.row,o.row),Math.max(n.row,o.row),Math.min(n.col,o.col),Math.max(n.col,o.col),s);S();for(var i=r.min_i;i<=r.max_i;i++)for(var f=r.min_j;f<=r.max_j;f++)e(s[i][f]).addClass("fr-selected-cell")}}function L(a){var l=null,s=e(a.target);return"TD"==a.target.tagName||"TH"==a.target.tagName?l=a.target:s.closest("td").length>0?l=s.closest("td").get(0):s.closest("th").length>0&&(l=s.closest("th").get(0)),0===t.$el.find(l).length?null:l}function j(){S(),t.popups.hide("table.edit")}function P(a){var l=L(a);if(ce().length>0&&!l&&j(),!t.edit.isDisabled()||t.popups.isVisible("table.edit"))if(1!=a.which||1==a.which&&t.helpers.isMac()&&a.ctrlKey)(3==a.which||1==a.which&&t.helpers.isMac()&&a.ctrlKey)&&l&&j();else if(ge=!0,l){ce().length>0&&!a.shiftKey&&j(),a.stopPropagation(),t.events.trigger("image.hideResizer"),t.events.trigger("video.hideResizer"),be=!0;var s=l.tagName.toLowerCase();a.shiftKey&&t.$el.find(s+".fr-selected-cell").length>0?e(t.$el.find(s+".fr-selected-cell").closest("table")).is(e(l).closest("table"))?H(me,l):k():((t.keys.ctrlKey(a)||a.shiftKey)&&(ce().length>1||0===e(l).find(t.selection.element()).length&&!e(l).is(t.selection.element()))&&k(),me=l,H(me,me))}}function V(a){if(be||t.$tb.is(a.target)||t.$tb.is(e(a.target).closest(t.$tb.get(0)))||(ce().length>0&&t.toolbar.enable(),S()),!(1!=a.which||1==a.which&&t.helpers.isMac()&&a.ctrlKey)){if(ge=!1,be){be=!1;var s=L(a);s||1!=ce().length?ce().length>0&&(t.selection.isCollapsed()?l():S()):S()}if(we){we=!1,he.removeClass("fr-moving"),t.$el.removeClass("fr-no-selection"),t.edit.on();var n=parseFloat(he.css("left"))+t.opts.tableResizerOffset;t.opts.iframe&&(n-=t.$iframe.offset().left),he.data("release-position",n),he.removeData("max-left"),he.removeData("max-right"),te(a),Y()}}}function W(a){if(be===!0){var l=e(a.currentTarget);if(l.closest("table").is(de())){if("TD"==a.currentTarget.tagName&&0===t.$el.find("th.fr-selected-cell").length)return void H(me,a.currentTarget);if("TH"==a.currentTarget.tagName&&0===t.$el.find("td.fr-selected-cell").length)return void H(me,a.currentTarget)}k()}}function X(e){(37==e.which||38==e.which||39==e.which||40==e.which)&&ce().length>0&&j()}function K(){t.shared.$table_resizer||(t.shared.$table_resizer=e('<div class="fr-table-resizer"><div></div></div>')),he=t.shared.$table_resizer,t.events.$on(he,"mousedown",function(e){return!t.core.sameInstance(he)||(ce().length>0&&j(),1==e.which?(we=!0,he.addClass("fr-moving"),k(),t.edit.off(),he.find("div").css("opacity",1),!1):void 0)}),t.events.$on(he,"mousemove",function(e){return!t.core.sameInstance(he)||void(we&&(t.opts.iframe&&(e.pageX-=t.$iframe.offset().left),se(e)))}),t.events.on("shared.destroy",function(){he.html("").removeData().remove(),he=null},!0),t.events.on("destroy",function(){t.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"),he.hide().appendTo(e("body"))},!0)}function Y(){he&&(he.find("div").css("opacity",0),he.css("top",0),he.css("left",0),he.css("height",0),he.find("div").css("height",0),he.hide())}function q(){ue&&ue.removeClass("fr-visible").css("left","-9999px")}function U(a,l){var s=e(l),n=s.closest("table"),o=n.parent();if(l&&"TD"!=l.tagName&&"TH"!=l.tagName&&(s.closest("td").length>0?l=s.closest("td"):s.closest("th").length>0&&(l=s.closest("th"))),!l||"TD"!=l.tagName&&"TH"!=l.tagName)he&&s.get(0)!=he.get(0)&&s.parent().get(0)!=he.get(0)&&t.core.sameInstance(he)&&Y();else{if(s=e(l),0===t.$el.find(s).length)return!1;var r=s.offset().left-1,i=r+s.outerWidth();if(Math.abs(a.pageX-r)<=t.opts.tableResizerOffset||Math.abs(i-a.pageX)<=t.opts.tableResizerOffset){var f,c,d,p,h,u=O(n),b=D(l,u),g=z(b.row,b.col,u),m=n.offset().top,v=n.outerHeight()-1;"rtl"!=t.opts.direction?b.col>0&&a.pageX-r<=t.opts.tableResizerOffset?(d=r,p=r-ae(b.col-1,u)+t.opts.tableResizingLimit,h=r+ae(b.col,u)-t.opts.tableResizingLimit,f=b.col-1,c=b.col):i-a.pageX<=t.opts.tableResizerOffset&&(d=i,g.col<u[g.row].length&&u[g.row][g.col+1]?(p=i-ae(g.col,u)+t.opts.tableResizingLimit,h=i+ae(g.col+1,u)-t.opts.tableResizingLimit,f=g.col,c=g.col+1):(f=g.col,c=null,p=n.offset().left-1+u[0].length*t.opts.tableResizingLimit,h=o.offset().left-1+o.width()+parseFloat(o.css("padding-left")))):b.col>0&&i-a.pageX<=t.opts.tableResizerOffset?(d=i,p=i-ae(b.col,u)+t.opts.tableResizingLimit,h=i+ae(b.col-1,u)-t.opts.tableResizingLimit,f=b.col,c=b.col-1):a.pageX-r<=t.opts.tableResizerOffset&&(d=r,g.col<u[g.row].length&&u[g.row][g.col+1]?(p=r-ae(g.col+1,u)+t.opts.tableResizingLimit,h=r+ae(g.col,u)-t.opts.tableResizingLimit,f=g.col+1,c=g.col):(f=null,c=g.col,p=o.offset().left+parseFloat(o.css("padding-left")),h=o.offset().left-1+o.width()+parseFloat(o.css("padding-left"))-u[0].length*t.opts.tableResizingLimit)),he||K(),he.data("table",n),he.data("first",f),he.data("second",c),he.data("instance",t),t.$wp.append(he);var w=d-t.win.pageXOffset-t.opts.tableResizerOffset,C=m-t.win.pageYOffset;t.opts.iframe&&(w+=t.$iframe.offset().left-e(t.o_win).scrollLeft(),C+=t.$iframe.offset().top-e(t.o_win).scrollTop(),p+=t.$iframe.offset().left,h+=t.$iframe.offset().left),he.data("max-left",p),he.data("max-right",h),he.data("origin",d-t.win.pageXOffset),he.css("top",C),he.css("left",w),he.css("height",v),he.find("div").css("height",v),he.css("padding-left",t.opts.tableResizerOffset),he.css("padding-right",t.opts.tableResizerOffset),he.show()}else t.core.sameInstance(he)&&Y()}}function G(a,l){if(t.$box.find(".fr-line-breaker").is(":visible"))return!1;ue||re(),t.$box.append(ue),ue.data("instance",t);var s=e(l),n=s.find("tr:first"),o=a.pageX,r=0,i=0;t.opts.iframe&&(r+=t.$iframe.offset().left-e(t.o_win).scrollLeft(),i+=t.$iframe.offset().top-e(t.o_win).scrollTop());var f;n.find("th, td").each(function(){var a=e(this);return a.offset().left<=o&&o<a.offset().left+a.outerWidth()/2?(f=parseInt(ue.find("a").css("width"),10),ue.css("top",i+a.offset().top-t.win.pageYOffset-f-5),ue.css("left",r+a.offset().left-t.win.pageXOffset-f/2),ue.data("selected-cell",a),ue.data("position","before"),ue.addClass("fr-visible"),!1):a.offset().left+a.outerWidth()/2<=o&&o<a.offset().left+a.outerWidth()?(f=parseInt(ue.find("a").css("width"),10),ue.css("top",i+a.offset().top-t.win.pageYOffset-f-5),ue.css("left",r+a.offset().left+a.outerWidth()-t.win.pageXOffset-f/2),ue.data("selected-cell",a),ue.data("position","after"),ue.addClass("fr-visible"),!1):void 0})}function J(a,l){if(t.$box.find(".fr-line-breaker").is(":visible"))return!1;ue||re(),t.$box.append(ue),ue.data("instance",t);var s=e(l),n=a.pageY,o=0,r=0;t.opts.iframe&&(o+=t.$iframe.offset().left-e(t.o_win).scrollLeft(),r+=t.$iframe.offset().top-e(t.o_win).scrollTop());var i;s.find("tr").each(function(){var a=e(this);return a.offset().top<=n&&n<a.offset().top+a.outerHeight()/2?(i=parseInt(ue.find("a").css("width"),10),ue.css("top",r+a.offset().top-t.win.pageYOffset-i/2),ue.css("left",o+a.offset().left-t.win.pageXOffset-i-5),ue.data("selected-cell",a.find("td:first")),ue.data("position","above"),ue.addClass("fr-visible"),!1):a.offset().top+a.outerHeight()/2<=n&&n<a.offset().top+a.outerHeight()?(i=parseInt(ue.find("a").css("width"),10),ue.css("top",r+a.offset().top+a.outerHeight()-t.win.pageYOffset-i/2),ue.css("left",o+a.offset().left-t.win.pageXOffset-i-5),ue.data("selected-cell",a.find("td:first")),ue.data("position","below"),ue.addClass("fr-visible"),!1):void 0})}function Q(a,l){if(0===ce().length){var s,n,o;if(l&&("HTML"==l.tagName||"BODY"==l.tagName||t.node.isElement(l)))for(s=1;s<=t.opts.tableInsertHelperOffset;s++){if(n=t.doc.elementFromPoint(a.pageX-t.win.pageXOffset,a.pageY-t.win.pageYOffset+s),e(n).hasClass("fr-tooltip"))return!0;if(n&&("TH"==n.tagName||"TD"==n.tagName||"TABLE"==n.tagName)&&(e(n).parents(".fr-wrapper").length||t.opts.iframe))return G(a,n.closest("table")),!0;if(o=t.doc.elementFromPoint(a.pageX-t.win.pageXOffset+s,a.pageY-t.win.pageYOffset),e(o).hasClass("fr-tooltip"))return!0;if(o&&("TH"==o.tagName||"TD"==o.tagName||"TABLE"==o.tagName)&&(e(o).parents(".fr-wrapper").length||t.opts.iframe))return J(a,o.closest("table")),!0}t.core.sameInstance(ue)&&q()}}function Z(e){ve=null;var a=t.doc.elementFromPoint(e.pageX-t.win.pageXOffset,e.pageY-t.win.pageYOffset);t.opts.tableResizer&&(!t.popups.areVisible()||t.popups.areVisible()&&t.popups.isVisible("table.edit"))&&U(e,a),!t.opts.tableInsertHelper||t.popups.areVisible()||t.$tb.hasClass("fr-inline")&&t.$tb.is(":visible")||Q(e,a)}function ee(){if(we){var a=he.data("table"),l=a.offset().top-t.win.pageYOffset;t.opts.iframe&&(l+=t.$iframe.offset().top-e(t.o_win).scrollTop()),he.css("top",l)}}function te(){var a=he.data("origin"),l=he.data("release-position");if(a!==l){var s=he.data("first"),n=he.data("second"),o=he.data("table"),r=o.outerWidth();if(null!==s&&null!==n){var i,f,c,d=O(o),p=[],h=[],u=[],b=[];for(i=0;i<d.length;i++)f=e(d[i][s]),c=e(d[i][n]),p[i]=f.outerWidth(),u[i]=c.outerWidth(),h[i]=p[i]/r*100,b[i]=u[i]/r*100;for(i=0;i<d.length;i++){f=e(d[i][s]),c=e(d[i][n]);var g=(h[i]*(p[i]+l-a)/p[i]).toFixed(4);f.css("width",g+"%"),c.css("width",(h[i]+b[i]-g).toFixed(4)+"%")}}else{var m,v=o.parent(),w=r/v.width()*100;m=null==s?(r-l+a)/r*w:(r+l-a)/r*w,o.css("width",Math.round(m).toFixed(4)+"%")}}he.removeData("origin"),he.removeData("release-position"),he.removeData("first"),he.removeData("second"),he.removeData("table"),t.undo.saveStep()}function ae(t,a){var l,s=e(a[0][t]).outerWidth();for(l=1;l<a.length;l++)s=Math.min(s,e(a[l][t]).outerWidth());return s}function le(e,t,a){var l,s=0;for(l=e;t>=l;l++)s+=ae(l,a);return s}function se(e){if(ce().length>1&&ge&&k(),ge===!1&&be===!1&&we===!1)ve&&clearTimeout(ve),(!t.edit.isDisabled()||t.popups.isVisible("table.edit"))&&(ve=setTimeout(Z,30,e));else if(we){var a=e.pageX-t.win.pageXOffset;t.opts.iframe&&(a+=t.$iframe.offset().left);var l=he.data("max-left"),s=he.data("max-right");a>=l&&s>=a?he.css("left",a-t.opts.tableResizerOffset):l>a&&parseFloat(he.css("left"),10)>l-t.opts.tableResizerOffset?he.css("left",l-t.opts.tableResizerOffset):a>s&&parseFloat(he.css("left"),10)<s-t.opts.tableResizerOffset&&he.css("left",s-t.opts.tableResizerOffset)}else ge&&q()}function ne(a){t.node.isEmpty(a.get(0))?a.prepend(e.FE.MARKERS):a.prepend(e.FE.START_MARKER).append(e.FE.END_MARKER)}function oe(a){var l=a.which;if(l==e.FE.KEYCODE.TAB&&0===t.opts.tabSpaces){var s;if(ce().length>0)s=t.$el.find(".fr-selected-cell:last");else{var n=t.selection.element();"TD"==n.tagName||"TH"==n.tagName?s=e(n):e(n).closest("td").length>0?s=e(n).closest("td"):e(n).closest("th").length>0&&(s=e(n).closest("th"))}s&&(a.preventDefault(),j(),a.shiftKey?s.prev().length>0?ne(s.prev()):s.closest("tr").length>0&&s.closest("tr").prev().length>0?ne(s.closest("tr").prev().find("td:last")):s.closest("tbody").length>0&&s.closest("table").find("thead tr").length>0&&ne(s.closest("table").find("thead tr th:last")):s.next().length>0?ne(s.next()):s.closest("tr").length>0&&s.closest("tr").next().length>0?ne(s.closest("tr").next().find("td:first")):s.closest("thead").length>0&&s.closest("table").find("tbody tr").length>0?ne(s.closest("table").find("tbody tr td:first")):(s.addClass("fr-selected-cell"),g("below"),S(),ne(s.closest("tr").next().find("td:first"))),t.selection.restore())}}function re(){t.shared.$ti_helper||(t.shared.$ti_helper=e('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabindex="-1" title="'+t.language.translate("Insert")+'"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'),t.events.bindClick(t.shared.$ti_helper,"a",function(){var e=ue.data("selected-cell"),a=ue.data("position"),l=ue.data("instance")||t;"before"==a?(e.addClass("fr-selected-cell"),l.table.insertColumn(a),e.removeClass("fr-selected-cell")):"after"==a?(e.addClass("fr-selected-cell"),l.table.insertColumn(a),e.removeClass("fr-selected-cell")):"above"==a?(e.addClass("fr-selected-cell"),l.table.insertRow(a),e.removeClass("fr-selected-cell")):"below"==a&&(e.addClass("fr-selected-cell"),l.table.insertRow(a),e.removeClass("fr-selected-cell")),q()}),t.events.on("shared.destroy",function(){t.shared.$ti_helper.html("").removeData().remove(),t.shared.$ti_helper=null},!0),t.events.$on(t.shared.$ti_helper,"mousemove",function(e){e.stopPropagation()},!0),t.events.$on(e(t.o_win),"scroll",function(){q()},!0),t.events.$on(t.$wp,"scroll",function(){q()},!0)),ue=t.shared.$ti_helper,t.events.on("destroy",function(){ue=null}),t.tooltip.bind(t.$box,".fr-insert-helper > a.fr-floating-btn")}function ie(){me=null,clearTimeout(ve)}function fe(){ce().length>0?l():(t.popups.hide("table.insert"),t.toolbar.showInline())}function ce(){return t.$el.get(0).querySelectorAll(".fr-selected-cell")}function de(){var a=ce();if(a.length){for(var l=a[0];l&&"TABLE"!=l.tagName&&l.parentNode!=t.$el.get(0);)l=l.parentNode;return e(l&&"TABLE"==l.tagName?l:[])}return e([])}function pe(){if(!t.$wp)return!1;if(!t.helpers.isMobile()){ge=!1,be=!1,we=!1,t.events.$on(t.$el,"mousedown",P),t.popups.onShow("image.edit",function(){S(),ge=!1,be=!1}),t.popups.onShow("link.edit",function(){S(),ge=!1,be=!1}),t.events.on("commands.mousedown",function(e){e.parents(".fr-toolbar").length>0&&S()}),t.events.$on(t.$el,"mouseenter","th, td",W),t.events.$on(t.$win,"mouseup",V),t.opts.iframe&&t.events.$on(e(t.o_win),"mouseup",V),t.events.$on(t.$el,"keydown",X),t.events.$on(t.$win,"mousemove",se),t.events.$on(e(t.o_win),"scroll",ee),t.events.on("contentChanged",function(){ce().length>0&&(l(),t.$el.find("img").on("load.selected-cells",function(){e(this).off("load.selected-cells"),ce().length>0&&l()}))}),t.events.$on(e(t.o_win),"resize",function(){S()}),t.events.on("keydown",function(a){var l=ce();if(l.length>0){if(a.which==e.FE.KEYCODE.ESC&&t.popups.isVisible("table.edit"))return S(),t.popups.hide("table.edit"),a.preventDefault(),a.stopPropagation(),a.stopImmediatePropagation(),l=[],!1;if(l.length>1&&a.which==e.FE.KEYCODE.BACKSPACE){t.undo.saveStep();for(var s=0;s<l.length;s++)e(l[s]).html("<br>"),s==l.length-1&&e(l[s]).prepend(e.FE.MARKERS);return t.selection.restore(),t.undo.saveStep(),l=[],!1}if(l.length>1&&!t.keys.ctrlKey(a))return a.preventDefault(),l=[],!1}l=[]},!0);var a=[];t.events.on("html.beforeGet",function(){a=ce();for(var e=0;e<a.length;e++)a[e].className=(a[e].className||"").replace(/fr-selected-cell/g,"")}),t.events.on("html.get",function(e){return e=e.replace(/<(td|th)((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/(td|th)>/g,"<$1$2$3>$4</$5>")}),t.events.on("html.afterGet",function(){for(var e=0;e<a.length;e++)a[e].className=(a[e].className?a[e].className+" ":"")+"fr-selected-cell";a=[]}),o(!0),i(!0)}t.events.on("keydown",oe,!0),t.events.on("destroy",ie)}var he,ue,be,ge,me,ve,we;return{_init:pe,insert:p,remove:h,insertRow:g,deleteRow:m,insertColumn:v,deleteColumn:w,mergeCells:M,splitCellVertically:F,splitCellHorizontally:A,addHeader:u,removeHeader:b,setBackground:_,showInsertPopup:a,showEditPopup:l,showColorsPopup:s,back:fe,verticalAlign:x,horizontalAlign:R,applyStyle:I,selectedTable:de,selectedCells:ce}},e.FE.DefineIcon("insertTable",{NAME:"table"}),e.FE.RegisterCommand("insertTable",{title:"Insert Table",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("table.insert")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("table.insert")):this.table.showInsertPopup()},plugin:"table"}),e.FE.RegisterCommand("tableInsert",{callback:function(e,t,a){this.table.insert(t,a),this.popups.hide("table.insert")}}),e.FE.DefineIcon("tableHeader",{NAME:"header"}),e.FE.RegisterCommand("tableHeader",{title:"Table Header",focus:!1,callback:function(){var e=this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]');e.hasClass("fr-active")?this.table.removeHeader():this.table.addHeader()},refresh:function(e){var t=this.table.selectedTable();t.length>0&&(0===t.find("th").length?e.removeClass("fr-active"):e.addClass("fr-active"))}}),e.FE.DefineIcon("tableRows",{NAME:"bars"}),e.FE.RegisterCommand("tableRows",{type:"dropdown",
focus:!1,title:"Row",options:{above:"Insert row above",below:"Insert row below","delete":"Delete row"},html:function(){var t='<ul class="fr-dropdown-list">',a=e.FE.COMMANDS.tableRows.options;for(var l in a)a.hasOwnProperty(l)&&(t+='<li><a class="fr-command" data-cmd="tableRows" data-param1="'+l+'" title="'+this.language.translate(a[l])+'">'+this.language.translate(a[l])+"</a></li>");return t+="</ul>"},callback:function(e,t){"above"==t||"below"==t?this.table.insertRow(t):this.table.deleteRow()}}),e.FE.DefineIcon("tableColumns",{NAME:"bars fa-rotate-90"}),e.FE.RegisterCommand("tableColumns",{type:"dropdown",focus:!1,title:"Column",options:{before:"Insert column before",after:"Insert column after","delete":"Delete column"},html:function(){var t='<ul class="fr-dropdown-list">',a=e.FE.COMMANDS.tableColumns.options;for(var l in a)a.hasOwnProperty(l)&&(t+='<li><a class="fr-command" data-cmd="tableColumns" data-param1="'+l+'" title="'+this.language.translate(a[l])+'">'+this.language.translate(a[l])+"</a></li>");return t+="</ul>"},callback:function(e,t){"before"==t||"after"==t?this.table.insertColumn(t):this.table.deleteColumn()}}),e.FE.DefineIcon("tableCells",{NAME:"square-o"}),e.FE.RegisterCommand("tableCells",{type:"dropdown",focus:!1,title:"Cell",options:{merge:"Merge cells","vertical-split":"Vertical split","horizontal-split":"Horizontal split"},html:function(){var t='<ul class="fr-dropdown-list">',a=e.FE.COMMANDS.tableCells.options;for(var l in a)a.hasOwnProperty(l)&&(t+='<li><a class="fr-command" data-cmd="tableCells" data-param1="'+l+'" title="'+this.language.translate(a[l])+'">'+this.language.translate(a[l])+"</a></li>");return t+="</ul>"},callback:function(e,t){"merge"==t?this.table.mergeCells():"vertical-split"==t?this.table.splitCellVertically():this.table.splitCellHorizontally()},refreshOnShow:function(e,t){this.$el.find(".fr-selected-cell").length>1?(t.find('a[data-param1="vertical-split"]').addClass("fr-disabled"),t.find('a[data-param1="horizontal-split"]').addClass("fr-disabled"),t.find('a[data-param1="merge"]').removeClass("fr-disabled")):(t.find('a[data-param1="merge"]').addClass("fr-disabled"),t.find('a[data-param1="vertical-split"]').removeClass("fr-disabled"),t.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled"))}}),e.FE.DefineIcon("tableRemove",{NAME:"trash"}),e.FE.RegisterCommand("tableRemove",{title:"Remove Table",focus:!1,callback:function(){this.table.remove()}}),e.FE.DefineIcon("tableStyle",{NAME:"paint-brush"}),e.FE.RegisterCommand("tableStyle",{title:"Table Style",type:"dropdown",focus:!1,html:function(){var e='<ul class="fr-dropdown-list">',t=this.opts.tableStyles;for(var a in t)t.hasOwnProperty(a)&&(e+='<li><a class="fr-command" data-cmd="tableStyle" data-param1="'+a+'" title="'+this.language.translate(t[a])+'">'+this.language.translate(t[a])+"</a></li>");return e+="</ul>"},callback:function(e,t){this.table.applyStyle(t,this.$el.find(".fr-selected-cell").closest("table"),this.opts.tableMultipleStyles,this.opts.tableStyles)},refreshOnShow:function(t,a){var l=this.$el.find(".fr-selected-cell").closest("table");l&&a.find(".fr-command").each(function(){var t=e(this).data("param1");e(this).toggleClass("fr-active",l.hasClass(t))})}}),e.FE.DefineIcon("tableCellBackground",{NAME:"tint"}),e.FE.RegisterCommand("tableCellBackground",{title:"Cell Background",focus:!1,callback:function(){this.table.showColorsPopup()}}),e.FE.RegisterCommand("tableCellBackgroundColor",{undo:!0,focus:!1,callback:function(e,t){this.table.setBackground(t)}}),e.FE.DefineIcon("tableBack",{NAME:"arrow-left"}),e.FE.RegisterCommand("tableBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.table.back()},refresh:function(e){0!==this.table.selectedCells().length||this.opts.toolbarInline?(e.removeClass("fr-hidden"),e.next(".fr-separator").removeClass("fr-hidden")):(e.addClass("fr-hidden"),e.next(".fr-separator").addClass("fr-hidden"))}}),e.FE.DefineIcon("tableCellVerticalAlign",{NAME:"arrows-v"}),e.FE.RegisterCommand("tableCellVerticalAlign",{type:"dropdown",focus:!1,title:"Vertical Align",options:{Top:"Align Top",Middle:"Align Middle",Bottom:"Align Bottom"},html:function(){var t='<ul class="fr-dropdown-list">',a=e.FE.COMMANDS.tableCellVerticalAlign.options;for(var l in a)a.hasOwnProperty(l)&&(t+='<li><a class="fr-command" data-cmd="tableCellVerticalAlign" data-param1="'+l.toLowerCase()+'" title="'+this.language.translate(a[l])+'">'+this.language.translate(l)+"</a></li>");return t+="</ul>"},callback:function(e,t){this.table.verticalAlign(t)},refreshOnShow:function(e,t){t.find('.fr-command[data-param1="'+this.$el.find(".fr-selected-cell").css("vertical-align")+'"]').addClass("fr-active")}}),e.FE.DefineIcon("tableCellHorizontalAlign",{NAME:"align-left"}),e.FE.DefineIcon("align-left",{NAME:"align-left"}),e.FE.DefineIcon("align-right",{NAME:"align-right"}),e.FE.DefineIcon("align-center",{NAME:"align-center"}),e.FE.DefineIcon("align-justify",{NAME:"align-justify"}),e.FE.RegisterCommand("tableCellHorizontalAlign",{type:"dropdown",focus:!1,title:"Horizontal Align",options:{left:"Align Left",center:"Align Center",right:"Align Right",justify:"Align Justify"},html:function(){var t='<ul class="fr-dropdown-list">',a=e.FE.COMMANDS.tableCellHorizontalAlign.options;for(var l in a)a.hasOwnProperty(l)&&(t+='<li><a class="fr-command fr-title" data-cmd="tableCellHorizontalAlign" data-param1="'+l+'" title="'+this.language.translate(a[l])+'">'+this.icon.create("align-"+l)+"</a></li>");return t+="</ul>"},callback:function(e,t){this.table.horizontalAlign(t)},refresh:function(t){var a=this.table.selectedCells();a.length&&t.find("> *:first").replaceWith(this.icon.create("align-"+this.helpers.getAlignment(e(a[0]))))},refreshOnShow:function(e,t){t.find('.fr-command[data-param1="'+this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first"))+'"]').addClass("fr-active")}}),e.FE.DefineIcon("tableCellStyle",{NAME:"magic"}),e.FE.RegisterCommand("tableCellStyle",{title:"Cell Style",type:"dropdown",focus:!1,html:function(){var e='<ul class="fr-dropdown-list">',t=this.opts.tableCellStyles;for(var a in t)t.hasOwnProperty(a)&&(e+='<li><a class="fr-command" data-cmd="tableCellStyle" data-param1="'+a+'" title="'+this.language.translate(t[a])+'">'+this.language.translate(t[a])+"</a></li>");return e+="</ul>"},callback:function(e,t){this.table.applyStyle(t,this.$el.find(".fr-selected-cell"),this.opts.tableCellMultipleStyles,this.opts.tableCellStyles)},refreshOnShow:function(t,a){var l=this.$el.find(".fr-selected-cell:first");l&&a.find(".fr-command").each(function(){var t=e(this).data("param1");e(this).toggleClass("fr-active",l.hasClass(t))})}})});