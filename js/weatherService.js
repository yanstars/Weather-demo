// 天气预报的业务类
let weather = {
  version: 'v1.0.0',
  functioninfo: '天气预报的核心类，用于提供天气预报的地理位置和天气数据',
  methods: {
    getLBSInfo: function () {
      // 获得当前客户端城市
      var geo = new BMap.Geolocation();
      geo.getCurrentPosition(function getinfo(position) {
        console.log(position);
        lbsModel.city = position.address.city.slice(0, -1);
        lbsModel.province = position.address.province;
        mui.toast("定位成功，当前：" + lbsModel.province + lbsModel.city);

        // 调用天气方法
        weather.methods.getWeaher(lbsModel.city);
      }, function () {
        // 定位失败
        mui.toast("定位失败，请重试!")
      }, {

      }); // 获得当前地理数据包
    },
    getWeaher: function (city) {
      console.log(city);
      $.ajax({
        url: 'http://zb.zhiliaotang.net/wapi.php?city=' + city,
        dataType: 'json',
        success: function (d) {
          if (d.retCode == 200) {
            var wd = d.result[0];
            weatherModel.airCondition = wd.airCondition;
            weatherModel.humidity = wd.humidity;
            weatherModel.temperature = wd.temperature;
            weatherModel.time = wd.time;
            weatherModel.weather = wd.weather;
            weatherModel.week = wd.week;
            weatherModel.wind = wd.wind;
            weatherModel.no2 = wd.airQuality.no2;
            weatherModel.pm10 = wd.airQuality.pm10;
            weatherModel.pm25 = wd.airQuality.pm25;
            weatherModel.so2 = wd.airQuality.so2;

            let icon = weatherIconModel[weatherModel.weather] ? weatherIconModel[weatherModel.weather] : "icon-taiyang";
            console.log(icon);
            $(".tempicon").addClass(icon);
            $(".temptext").html(weatherModel.temperature);
            $(".tempair").html(weatherModel.weather + "&nbsp;&nbsp空气" + weatherModel.airCondition);
            $(".cityname").html(city);
            $(".cityupdata").html("上一次更新时间" + weatherModel.time);

            // 根据天气状态改变背景

          } else {
            mui.toast("获取天气数据异常，请稍后再试。");
          }
        },
        error: function (d) {
          mui.toast("获取天气数据失败，请稍后再试。");
        }
      });
    }
  },
  init: function () {
    weather.methods.getLBSInfo();
  }
}

// 启动服务
weather.init();