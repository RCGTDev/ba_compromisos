"use strict";angular.module("compromisosSiteApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","gridshore.c3js.chart"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl",controllerAs:"home"}).when("/c01",{templateUrl:"views/c01.html",controller:"Compromiso01Ctrl",controllerAs:"c01"}).otherwise({redirectTo:"/"})}]).service("UrlService",function(){this.urls={home:"http://palamago.com.ar/api/?source_format=csv&source=https://goo.gl/Cid4QS"},this.getUrl=function(a){return this.urls[a]}}),angular.module("compromisosSiteApp").controller("MainCtrl",function(){}),angular.module("compromisosSiteApp").controller("HomeCtrl",["$scope","$timeout","$http","UrlService",function(a,b,c,d){function e(a){for(var b=0,c=0;c<m.length;c++){var d=m[c],e=parseInt(a.porcentaje_completado);if(e>=d.from&&e<d.to){b=c;break}}return a.percentageGroup=b,b}function f(a){var b={"Protección e integración social":"social",Convivencia:"convivencia",Movilidad:"movilidad","Ciudad inteligente y sustentable":"smart"};return b[a]}function g(){a.charts.date_chart=c3.generate({bindto:"#date_chart",data:{columns:[["data1",-30,200,200,400,-150,250],["data2",130,100,-100,200,-150,50],["data3",-230,200,200,-300,250,250]],type:"bar",groups:[["data1","data2"]]},axis:{x:{show:!1},y:{show:!1}},grid:{y:{lines:[{value:0}]}}})}function h(){a.charts.state_chart=c3.generate({bindto:"#state_chart",data:{columns:[["data1",-30,200,200,400,-150,250],["data2",130,100,-100,200,-150,50],["data3",-230,200,200,-300,250,250]],type:"bar",groups:[["data1","data2"]]},axis:{x:{show:!1},y:{show:!1}},grid:{y:{lines:[{value:0}]}}})}function i(){var b=$("#category_chart").parent().width(),c=d3.scale.category20b(),d=d3.layout.pack().sort(null).size([b,b]).padding(1.5),e=[{Fruit:"Banana",Amount:15},{Fruit:"Apple",Amount:30},{Fruit:"Pear",Amount:5}];e=e.map(function(a){return a.value=+a.Amount,a});var f=d.nodes({children:e}).filter(function(a){return!a.children});a.charts.category_chart||(a.charts.category_chart={},a.charts.category_chart.svg=d3.select("#category_chart").append("svg").attr("class","bubble-container")),a.charts.category_chart.bubbles=a.charts.category_chart.svg.selectAll("circle.bubble").data(f),a.charts.category_chart.texts=a.charts.category_chart.svg.selectAll("text.bubble-text").data(f),a.charts.category_chart.bubbles.enter().append("circle").attr("class","bubble").style("fill",function(a){return c(a.value)}),a.charts.category_chart.texts.enter().append("text").attr("text-anchor","middle").attr("class","bubble-text").text(function(a){return a.Fruit}).style({fill:"white","font-family":"Helvetica Neue, Helvetica, Arial, san-serif","font-size":"12px"}),a.charts.category_chart.svg.attr("width",b).attr("height",b),a.charts.category_chart.bubbles.attr("r",function(a){return a.r}).attr("cx",function(a){return a.x}).attr("cy",function(a){return a.y}),a.charts.category_chart.texts.attr("x",function(a){return a.x}).attr("y",function(a){return a.y+5})}function j(){function b(){a.charts.menu_chart.svg.transition().duration(t).attr("width",r).attr("height",s),k.sendHeight()}function c(){r=$(window).width();Math.floor(r/p);u=0;var c=d(a.charts.menu_chart.items_group.selectAll("g.compromiso-item"),0);s=c*p,b(),j([])}function d(a,b){var c=Math.floor((r-u)/p),d=0,e=0,f=(r-u-c*p)/2;return a.transition().duration(t).attr("transform",function(g,h){var i=d*p+f+u,j=e*p+b;return c-1>d?d++:a[0].length!=h+1&&(d=0,e++),"translate("+i+","+j+")"}),e+1}function g(){r=$(window).width();var c=0;u=r/3;var e=[];angular.forEach(a.finishedPercentageGroup,function(b){e.push({title:m[b.key].from+"% - "+m[b.key].to+"%",rows:c}),c+=d(a.charts.menu_chart.items_group.selectAll("g.avance-"+b.key),c*p)}),s=c*p,b(),j(e)}function h(){r=$(window).width();var c=0;u=r/3;var e=[];angular.forEach(a.categoriesGroup,function(b){e.push({title:b.key,rows:c}),c+=d(a.charts.menu_chart.items_group.selectAll("g.categoria-"+f(b.key)),c*p)}),s=c*p,b(),j(e)}function i(){r=$(window).width();var c=0;u=r/3;var e=[];angular.forEach(a.finishedYearsGroup,function(b){e.push({title:b.key,rows:c}),c+=d(a.charts.menu_chart.items_group.selectAll("g.cumplimiento-"+b.key),c*p)}),s=c*p,b(),j(e)}function j(b){var c=a.charts.menu_chart.labels_group.selectAll(".label-group").data(b);c.enter().append("text").classed("label-group",!0).attr("text-anchor","end").attr("opacity",0),c.classed("label-group",!0).text(function(a){return a.title}).transition().delay(t).attr("opacity",1).attr("x",u).attr("y",function(a){return a.rows*p+p/2}),c.exit().attr("opacity",0).remove()}function l(){var b={width:p,height:p/3};d3plus.textwrap().config(b),a.charts.menu_chart.items_group.selectAll("g.compromiso-item").data(v).enter().append("g").attr("class",function(a){var b=[];return b.push("cumplimiento-"+a.cumplimiento1),b.push("categoria-"+f(a.categoria)),b.push("avance-"+e(a)),b.join(" ")}).classed("compromiso-item",!0).each(function(a){var b=d3.select(this);b.append("rect").classed("compromiso-frame",!0).attr("x",0).attr("y",0).attr("height",p).attr("width",p).attr("fill","white"),b.append("rect").classed("compromiso-label-shape",!0).classed("shape",!0).attr("x",q).attr("y",p/2).attr("height",p/2-q).attr("width",p-2*q).attr("fill","none"),b.append("text").classed("compromiso-label",!0).classed("wrap",!0).attr("id","c"+a.numero).attr("opacity",0).text(function(){return a.titulo}),b.append("svg:image").attr("x",p/2-25).attr("y",p/3-25).attr("width",50).attr("height",50).attr("xlink:href","images/building.813f237f.svg"),b.append("rect").classed("compromiso-action",!0).attr("x",q).attr("y",q).attr("height",p-2*q).attr("width",p-2*q).attr("fill","transparent").on("click",function(b){n(a)})}).transition().duration(0).attr("transform",function(a,b){var c=r/2-p/2,d=s/2-p/2;return"translate("+c+","+d+")"}).each("end",function(a){var b=d3.select("text#c"+a.numero);d3plus.textwrap().container(b).shape("square").align("center").valign("top").padding(3).draw(),b.transition().attr("opacity",1)})}function o(){l(),a.charts.menu_chart.api={group:function(a){switch(a){case"home":c();break;case"date":i();break;case"category":h();break;case"state":g()}}},setTimeout(function(){a.charts.menu_chart.api.group(a.selectedGroup)},1e3)}var p=150,q=5,r=$(window).width(),s=500,t=500,u=r/3,v=angular.copy(a.data);a.charts.menu_chart||(a.charts.menu_chart={},a.charts.menu_chart.svg=d3.select("#menu_chart").append("svg").attr("width",r).attr("height",s).attr("class","menu_chart"),a.charts.menu_chart.items_group=a.charts.menu_chart.svg.append("g").classed("items-container",!0),a.charts.menu_chart.labels_group=a.charts.menu_chart.svg.append("g").classed("labels-container",!0)),o()}var k=new pym.Child;a.data=[],a.loading=!0,a.charts={},a.selectedGroup="home";var l=d.getUrl("home")+"&callback=JSON_CALLBACK";c.jsonp(l).success(function(b){a.data=b,a.loading=!1,a.groupData(),a.renderCharts()}),a.groupData=function(){a.categoriesGroup=d3.nest().key(function(a){return a.categoria}).entries(a.data),a.finishedYearsGroup=d3.nest().key(function(a){return a.cumplimiento1}).entries(a.data),a.finishedPercentageGroup=d3.nest().key(function(a){return e(a)}).entries(a.data),console.log(a.categoriesGroup),console.log(a.finishedYearsGroup),console.log(a.finishedPercentageGroup)};var m=[];m.push({from:0,to:25}),m.push({from:25,to:50}),m.push({from:50,to:75}),m.push({from:75,to:100}),a.renderCharts=function(){g(),h(),i(),j()};var n=function(b){b.porcentaje=Math.round(Math.floor(99*Math.random())+2),a.$apply(function(){a.currentCompromise=b})};a.groupMenu=function(b){a.selectedGroup=b,a.charts.menu_chart.api.group(a.selectedGroup)};var o;$(window).resize(function(){clearTimeout(o),o=setTimeout(function(){a.charts.menu_chart&&a.charts.menu_chart.api.group(a.selectedGroup),i()},500)})}]),angular.module("compromisosSiteApp").controller("Compromiso01Ctrl",function(){}),angular.module("compromisosSiteApp").run(["$templateCache",function(a){a.put("views/c01.html",'<div class="row"> <div class="col-md-12"> <h1>Compromiso 01</h1> </div> </div> <div class="row"> <div class="col-md-6"> <p> <c3chart bindto-id="gauge-plot1-chart"> <chart-column column-id="Data 1" column-values="70" column-type="gauge"> <chart-gauge min="50" max="75" units=" hours" width="39"> </c3chart> </p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> <div class="col-md-6"> <c3chart bindto-id="chart6"> <chart-legend show-legend="true" legend-position="right"> <chart-colors color-pattern="#1f77b4,#ffbb78,#2ca02c,#ff7f0e"> <chart-tooltip show-tooltip="true" group-tooltip="false"> <chart-column column-id="data 1" column-name="Data 1" column-color="red" column-values="30,200,100,400,150,250" column-type="spline"> <chart-column column-id="data 2" column-name="Data 2" column-color="green" column-values="50,20,10,40,15,25" column-type="line"> </c3chart> </div> </div>'),a.put("views/home.html",'<div class="row"> <div class="col-md-12"> <h1>Home</h1> </div> </div> <hr> <div class="row"> <div class="col-sm-3"> <h3 class="text-center">Ciudad inteligente y sustentable</h3> </div> <div class="col-sm-3"> <h3 class="text-center">Convivencia</h3> </div> <div class="col-sm-3"> <h3 class="text-center">Movilidad</h3> </div> <div class="col-sm-3"> <h3 class="text-center">Protección e integración social</h3> </div> </div> <hr> <div class="row"> <div class="col-sm-4"> <div id="date_chart"> <p class="text-center" ng-cloak ng-show="loading">Cargando...</p> </div> <p class="text-center">Ordenar por fecha de finalización</p> </div> <div class="col-sm-4"> <div id="state_chart"> <p class="text-center" ng-cloak ng-show="loading">Cargando...</p> </div> <p class="text-center">Ordenar por estado del compromiso</p> </div> <div class="col-sm-4"> <div id="category_chart"> <p class="text-center" ng-cloak ng-show="loading">Cargando...</p> </div> <p class="text-center">Ordenar por estado del compromiso</p> </div> </div> <hr> <p class="text-center" ng-show="loading">Cargando...</p> <div ng-cloak ng-hide="loading"> <a href="javascript:;" ng-click="groupMenu(\'home\')">Home</a> <a href="javascript:;" ng-click="groupMenu(\'date\')">Fecha</a> <a href="javascript:;" ng-click="groupMenu(\'state\')">Estado</a> <a href="javascript:;" ng-click="groupMenu(\'category\')">Categoría</a> <div class="row"> <div id="menu_chart"></div> </div> <hr> <!-- <div class="row" ng-cloak ng-show="currentCompromise"> --> <div class="row compromiso-detail"> <div class="col-sm-3"> <img src="http://wizardofodds.com/blog/images/buenos-aires/IMG_0471-med.jpg"> </div> <div class="col-sm-6"> <h2><small>{{currentCompromise.categoria}}</small></h2> <h2>{{currentCompromise.numero}}.{{currentCompromise.titulo}}</h2> <h5>{{currentCompromise.cumplimiento}}</h5> <p> {{currentCompromise.desc}}</p> <button type="button" class="btn btn-xs btn-violet upper">Ver mas sobre el compromiso </button> </div> <div class="col-sm-3"> <p class="upper"><strong> Estado del Compromiso</strong></p> <p> Como lo medimos:<strong>Cantidad de plazas</strong> </p> <p> Tiempo Faltante:<strong>18 meses y 12 dias </strong> </p> <div class=""> <div class="progress"> <div class="progress-bar progress-bar-violet" role="progressbar" ng-style="{ \'width\': currentCompromise.porcentaje + \'%\' }"> <span>{{currentCompromise.porcentaje}}% </span> </div> </div> </div> <p>Finalizacion:<strong> {{currentCompromise.FechaFinalizacion}} </strong> </p> </div> </div> </div>  <hr>'),a.put("views/main.html",'<div class="row"> <div class="col-md-12"> <h1>¡Hola, Buenos Aires!</h1> <p>Esta es la página de prueba para visualizar los compromisos de GCBA</p> <ul> <li><a class="btn btn-primary" href="#home" target="_blank">Home</a></li> <li><a class="btn btn-primary" href="#c01" target="_blank">Compromiso 01</a></li> <li>...</li> </ul> <p></p> </div> </div>')}]);