#!/usr/bin/casperjs --engine=slimerjs

//#!/usr/bin/env casperjs

var casper = require('casper').create({
  //waitTimeout: 1000 * 3,
  //stepTimeout: 10000,
  pageSettings: {
    "loadImages": false,
  },

  /*
  onWaitTimeout: function(){
    this.echo("test");
  }

  onTimeout: function(){
    this.echo("test");
  }
  */
});
var system = require('system');

var url = casper.cli.args[0] || 'http://hotel.qunar.com/city/miaoli_xian/dt-68/?tag=miaoli_xian#fromDate=2015-08-30&toDate=2015-08-31&from=globalhotelsearch&showMap=0';
var context = casper.cli.args[1] || '自在客';

//casper.userAgent(system.env['dayu_ua'] || "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36");
//console.log(system.env['dayu_ua'] || "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36");

casper.on('remote.message', function(msg) {
//    this.echo('remote message caught: ' + msg);
})

casper.on('resource.requested', function(requestData, request){
  //this.echo(requestData.url);

  if (requestData.url.match(/google|gstatic|doubleclick/)){
    request.abort();
    return;
  }

  /*
  if (requestData.url.match(/detailV2\.jsp/)){
    this.wait(1000 * 5, function(){
      parse();
    });
  }
  */

  if (requestData.url.match(/webApi\/getLoginState\.jsp/)){
    setTimeout(expand, 1000 * 3);
    setTimeout(parse, 1000 * 5);
  }
});

function expand(){
  casper.evaluate(function(){
    $(".more-agentinfo a").click();

    $(".btn_openPrc").each(function(){
      if ($(this).text() == '展开报价'){
        $(this).click();
      }
    });

    $(".js-room-more").click();
  });
}

function parse(){


  var data = casper.evaluate(function(){
  var result = [];
  $("img[alt=自在客]").each(function(){
	var agent_name = $(this).attr("alt");
	
	console.log("代理商   :"+agent_name);
	var qunar_name = $(this).parents("li").find(".type-name").text();
//	console.log("去哪儿   :"+qunar_name);
	//console.log($(this).find(".type-name.js-p-name").text());	
	var order_name=$(this).parents("tr").find(".js-order-detail").text();
//	console.log("供应商  :" + order_name);
	//var final_price = $(this).parents("tr").find(".final-price ").text(); //¥1284含税费
	var final_price = $(this).parents("tr").find(".final-price  b.pr").text();
	console.log("最终价格   :" + final_price);
	result.push({

		"agent" : agent_name,
		"qunar_name" : qunar_name,
		"oder_name" : order_name,
		"final_price" : final_price,
	});
    });
    return result;
  });



 var out ={};
 out['status'] = 200;
 out['result'] = data
 if (out['result'].length == 0){
	casper.exit();
	return;
 }
//console.log(require('utils').dump(out));

console.log(JSON.stringify({"status": 200, "result": data}));
casper.exit();

}

casper.start(url, function() {
//casper.start(url).waitUntilVisible(".calculatedpricetype", function(){
//casper.start(url).waitForSelector(".calculatedpricetype", function(){
//casper.start(url).waitForResource(/detailV2\.jsp/, function(){

  /*
  this.echo(this.getTitle());

  var result = this.evaluate(function(){
      console.log("test");
      return window.location.href;
  });

  this.echo(result);

  this.capture('page.png');
  */
});

casper.run();
