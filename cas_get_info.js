#!/usr/bin/env nodejs
//#!/usr/bin/casperjs --engine=slimerjs

// (人数说明)  带括号内容为最终输出结果项
// 


var $ = require('cheerio');
var request = require('request');
var fs = require('fs');
//var url= process.argv[0] | 'http://hotel.travel.rakuten.co.jp/hotelinfo/plan/10888?f_tscm_flg=&f_tel=&f_teikei=quick&f_heya_su=1&f_otona_su=1&f_s1=0&f_s2=0&f_y1=0&f_y2=0&f_y3=0&f_y4=0&f_kin=&f_kin2=&f_squeezes=&f_static=1';
//var url=  process.argv[0] | 'http://hotel.travel.rakuten.co.jp/hotelinfo/plan/10828?f_tscm_flg=&f_tel=&f_teikei=quick&f_heya_su=1&f_otona_su=1&f_s1=0&f_s2=0&f_y1=0&f_y2=0&f_y3=0&f_y4=0&f_kin=&f_kin2=&f_squeezes=&f_static=1';

//var url = process.argv[1] || 'http://hotel.travel.rakuten.co.jp/hotelinfo/plan/20212?f_tscm_flg=&f_tel=&f_teikei=quick&f_heya_su=1&f_otona_su=1&f_s1=0&f_s2=0&f_y1=0&f_y2=0&f_y3=0&f_y4=0&f_kin=&f_kin2=&f_squeezes=&f_static=1';
var url = 'http://hotel.travel.rakuten.co.jp/hotelinfo/plan/20212?f_tscm_flg=&f_tel=&f_teikei=quick&f_heya_su=1&f_otona_su=1&f_s1=0&f_s2=0&f_y1=0&f_y2=0&f_y3=0&f_y4=0&f_kin=&f_kin2=&f_squeezes=&f_static=1';


function changeTimeFormat(time) {
  var date = new Date(time);
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return date.getFullYear() + String(month) + String(currentDate);
  //返回格式：yyyyMMdd   时间戳转换日期
};


request(url, function(error, response, body) {

  //   var resutl = {"planCunt": count, "house_id":house_id};

  if(!error && response.statusCode == 200) { 

    $ = $.load(body); var a = 0;

    var re_out =[];

    //console.log("count >>>> "+$('p.itmNum strong').text().match(/[0-9]+/));//count
    var house_name = $('a.rtconds.fn').text();
    var count = ($('p.itmNum strong').text().match(/[0-9]+/).pop());//count
    var house_id = url.match(/[0-9]+/);
    var base_info= {"name":house_name,"plan_count":count, "house_id":house_id[0]};


    //var result = {"name":house_name,"plan_count":count, "house_id":house_id[0],"planTxt" : [], "planExp" : [] };
    var result = {"name":house_name,"plan_count":count, "hotelid":house_id[0],"planTxt" : [] };

    var task = []; //创建价格日历任务url



    $(".planThumb").each(function(){  
      //console.log("title"+$(this).find('h4').text().trim()); 

      var planId = $(this).attr('id'); //planID
      var planTitle = $(this).find('h4').text().trim(); //plantime title 
      var planTime = $(this).find('.htlPlnPrd').text().trim(); //plantime time
      console.log(String(planTime));
      var planInfo = $(this).find('.planThumb div.htlPlnInfo p.htlPlnDtlPrv').text().trim();


      //console.log($(".htlPlnCstRvw").text());
      result['planTxt'].push({

        "planId"   : planId,
        "planTitle": planTitle,
        "planTime" : planTime,
        "planInfo" : planInfo,

      });

      //循环房型列表
      //
      //
      $(this).find('.htlPlnRmTypLst').each(function(params) {


          //var room_code = $(this).find('li').attr('id');
        $(this).find('.htlPlnRmTypInfo').each(function(ps) {

          //每个房型名称
          //console.log($(this).find('h6').text().trim()); //roomType name
          var room_name = $(this).find('h6').text().trim(); //roomType name

          //房型详情描述
          var room_type_info = $(this).find('span[data-locate=roomType-Info] strong').text().trim(); //房型 roomType info 单间/或双人间
          //房型(单间/双人间/多人间)/房型面积
          var strong = $(this).find('span[data-locate=roomType-Info] strong').text().trim(); //房型 roomType info 单间/或双人间
          var span = $(this).find('span[data-locate=roomType-Info]').text().trim(); //房型详情 roomType-info 单间/或双人间
          var area = span.split(strong)[1].trim(); //房型面积 -->26平米/バス・トイレ付

          var room_remark = $(this).find('p[data-locate=roomType-Remark]').text(); //房型 roomType-Remark  描述


          //食事描述 / 有无食事
          //console.log($(this).find('span[data-locate=roomType-option-meal] strong').text().trim()); // 食事 roomType-option-meal  朝食なし 夕食なし
          var strong_meal = $(this).find('span[data-locate=roomType-option-meal] strong').text().trim(); //食事 roomType-option-meal  朝食なし 夕食なし
          var span_meal = $(this).find('span[data-locate=roomType-option-meal]').text().trim(); //食事 roomType-option-meal  朝食なし 夕食なし
          var meal = span_meal.split(strong_meal)[1].trim(); // 食事 ---> 朝食なし 夕食なし 

          //人数 
          //console.log($(this).find('span[data-locate=roomType-option-people] strong').text().trim()); //人数 roomType-option-people (人数)
          var strong_people = $(this).find('span[data-locate=roomType-option-people] strong').text().trim(); // 人数
          var span_people= $(this).find('span[data-locate=roomType-option-people]').text().trim(); //人数 roomType-option-people
          var people = span_people.split(strong_people)[1].trim();  
          var peo_rep = people.replace(/\s/g,''); //人数说明  (人数说明)   -->1人〜2人  子供料金設定有り

          //決済            クレジットカード／現金
          //console.log($(this).find('span[data-locate=roomType-option-payment] strong').text().trim()); //決済 payment
          var strong_payment = $(this).find('span[data-locate=roomType-option-payment] strong').text().trim(); //決済 payment 
          var span_payment = $(this).find('span[data-locate=roomType-option-payment]').text().trim(); //決済 roomType-option-payment
          var payment = span_payment.split(strong_payment)[1].trim(); //クレジットカード／現金 

          //2名利用時 ... 3名利用時
          var expend ={"room_price":[]};//创建结构

          $(this).next().find('li').each(function(){

            var roomcode = $(this).attr('id');
            var num = $(this).find('dt').text();  //2名利用時
            var price =  $(this).find('strong').text().trim();  //42,856~44,856円/人 
            var price_tax = $(this).find('.incldTax').text().trim(); //(消費税込46,284~48,444円/人) 
            //创建价格日历任务 拼出 url 
            //console.log( $(this).find('dt').text());  //2名利用時
            //console.log($(this).find('.thickbox').attr("href"));
            var box_url = $(this).find('.thickbox').attr("href"); //获取价格日历href
            //var f_on = box_url.match(/f_no=[0-9]+/)[0];
            var f_on = box_url.match(/f_no=(.*?)&/)[0]; 
            var f_syu = box_url.match(/f_syu=(.*?)&/)[0];

            var f_camp_id = box_url.match(/f_camp_id=(.*?)&/)[0];
            var f_hizuke  = box_url.match(/f_hizuke=(.*?)&/)[0];//当前
            var otona_su = box_url.match(/f_otona_su=(.*?)&/)[0];
            var send_url = 'f_s1=0&f_s2=0&f_y1=0&f_y2=0&f_y3=0&f_y4=0&f_heya_su=1&f_teikei=quick&';
            var random1 = Math.floor(Math.random()*1000000);
            var random2 = Math.floor(Math.random()*1000000);


            //获取当前时间
            var today_unix = Date.parse(Date()); 
            for (var i =0 ; i < 6 ; i++){

              var checktime_unix = today_unix +Number(30*24*60*60*1000*i) ;
              var checkday = changeTimeFormat(checktime_unix); 

              var f_calendar_url =  'http://hotel.travel.rakuten.co.jp/hplan/calendar/?' + f_on +f_syu + f_camp_id+'f_flg=PLAN&' + f_hizuke + send_url + "f_calendar="+ checkday + "&f_thick=1&callback=jQuery" + random1 +"&render=jsonp&_=" + random2;
              //  console.log(f_calendar_url);

              task.push({

                "url" : f_calendar_url,
                "project" : 'normal',
                "script_name" : 'xxxx/xxxx.js',
                "context" : ""

              });
            }

            expend["room_price"].push({ 
              "num_price" : num+price+price_tax,
              "roomCode" : roomcode
            });

          });

          result['planTxt'].push({
            "roomName" : room_name,
//            "roomCode" : room_code, 
            "roomTypeInfo" : room_type_info,
            "roomAera"    : area,
            "roomRemark" :  room_remark,
            "meal"      : meal,
            "people"    : peo_rep,
            "payment"   : payment,
            "price"     : expend

          });

        });

      });

    });

    //console.log(JSON.stringify({'status': 200, 'result': base_info}));
    console.log(JSON.stringify({'status': 200, 'task':task,'result': result},undefined,3));
    //    console.log(JSON.stringify(result,undefined,2));
    // console.log(JSON.stringify(result,undefined,2));
    //console.log(JSON.stringify(task,undefined,2));
  }//--->if !error

});



