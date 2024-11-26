//get all necessary elements from the DOM
// 选择天气应用的主要容器
const app = document.querySelector(".weather-app");
// 选择显示温度的元素
const temp = document.querySelector(".temp");
// 选择显示日期的元素
const dateOutput = document.querySelector(".date");
// 选择显示时间的元素
const timeOutput = document.querySelector(".time");
// 选择显示天气状况的元素
const conditionOutput = document.querySelector(".condition");
// 选择显示地点名称的元素
const nameOutput = document.querySelector(".name");
// 选择显示天气图标的元素
const icon = document.querySelector(".icon");
// 选择显示云量的元素
const cloudOutput = document.querySelector(".cloud");
// 选择显示湿度的元素
const humidityOutput = document.querySelector(".humidity");
// 选择显示风速的元素
const windOutput = document.querySelector(".wind");
// 选择地点输入表单
const form = document.getElementById("locationInput");
// 选择搜索框
const search = document.querySelector(".search");
// 选择提交按钮
const btn = document.querySelector(".submit");
// 选择所有城市元素
const cities = document.querySelectorAll(".city");

//Default city when the page loads

let cityInput = "London";

//Add click event to each city in the panel
// 为每个城市元素添加点击事件监听器
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        // 处理城市点击事件
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener("submit", (e) => {
    // 阻止表单的默认提交行为
    if (search.value.length == 0) {
        alert("Please type a city name");
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    // 阻止表单的默认提交行为
    e.preventDefault();
})

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    // 使用 YYYY-MM-DD 格式来创建 Date 对象
    const date = new Date(`${year}-${month}-${day}`);
    return weekday[date.getDay()];
}

    

// 定义获取天气数据的函数
// function fetchWeatherData() {
//     // 发送HTTP请求获取天气数据
//     fetch(`http://api.weatherapi.com/v1/current.json?key=2653b0c9c45b41629c1125048242611&q=${cityInput}`)
//         .then(response => response.json()) // 将响应转换为JSON格式
//         .then(data => {
//             // 输出原始数据到控制台
//             console.log(data);

//             // 更新页面上的温度显示
//             temp.innerHTML = data.current.temp_c + "&#176;";
//             // 更新天气状况描述
//             conditionOutput.innerHTML = data.current.condition.text;

//             // 解析日期和时间
//             const date = data.location.localtime;
//             const y = parseInt(date.substr(0, 4));
//             const m = parseInt(date.substr(5, 2));
//             const d = parseInt(date.substr(8, 2));
//             const time = date.substr(11);

//             // 更新日期和时间显示
//             dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
//             timeOutput.innerHTML = time;

//             // 更新城市名称显示
//             nameOutput.innerHTML = data.location.name;

//             // 获取天气图标ID并更新图标
//             const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);
//             icon.src = "./icons/" + iconId;

//             // 更新云量、湿度和风速显示
//             cloudOutput.innerHTML = data.current.cloud + "%";
//             humidityOutput.innerHTML = data.current.humidity + "%";
//             windOutput.innerHTML = data.current.wind_kph + "km/h";

//             // 判断白天或夜晚
//             let timeOfDay = "day";
//             if (!data.current.is_day) {
//                 timeOfDay = "night";
//             }

//             // 根据天气代码设置背景图片和按钮样式
//             const code = data.current.condition.code;
//             if (code == 1000) {
//                 app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
//                 btn.style.background = "#e5ba92";
//                 if (timeOfDay == "night") {
//                     btn.style.background = "#181e27";
//                 }
//             } else if (
//                 code == 1003 ||
//                 code == 1006 ||
//                 code == 1009 ||
//                 code == 1030 ||
//                 code == 1069 ||
//                 code == 1087 ||
//                 code == 1135 ||
//                 code == 1273 ||
//                 code == 1276 ||
//                 code == 1279 || code == 1282
//             ) {
//                 app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
//                 btn.style.background = "#fa6d1b";
//                 if (timeOfDay == "night") {
//                     btn.style.background = "#181e27";
//                 }
//             } else if (
//                 code == 1063 ||
//                 code == 1069 ||
//                 code == 1072 ||
//                 code == 1150 ||
//                 code == 1153 ||
//                 code == 1180 ||
//                 code == 1183 ||
//                 code == 1186 ||
//                 code == 1189 ||
//                 code == 1192 ||
//                 code == 1195 ||
//                 code == 1204 ||
//                 code == 1207 ||
//                 code == 1240 ||
//                 code == 1243 ||
//                 code == 1246 ||
//                 code == 1249 ||
//                 code == 1252
//             ) {
//                 app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
//                 btn.style.background = "#647d75";
//                 if (timeOfDay == "night") {
//                     btn.style.background = "#325c80";
//                 }
//             } else {
//                 app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
//                 btn.style.background = "#4d72aa";
//                 if (timeOfDay == "night") {
//                     btn.style.background = "#1b1b1b";
//                 }
//             }

//             // 设置应用的不透明度
//             app.style.opacity = "1";
//         })
//         .catch(() => {
//             // 如果城市未找到，显示提示信息
//             alert('City not found, please try again');
//             app.style.opacity = "1";
//         });
// }
function fetchWeatherData() {
    // 发送HTTP请求获取天气数据
    fetch(`http://api.weatherapi.com/v1/current.json?key=2653b0c9c45b41629c1125048242611&q=${cityInput}`)
        .then(response => response.json()) // 将响应转换为JSON格式
        .then(data => {
            // 输出原始数据到控制台
            console.log(data);

            // 更新页面上的温度显示
            temp.innerHTML = data.current.temp_c + "&#176;";
            // 更新天气状况描述
            conditionOutput.innerHTML = data.current.condition.text;

            // 解析日期和时间
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            // 更新日期和时间显示
            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
            timeOutput.innerHTML = time;

            // 更新城市名称显示
            nameOutput.innerHTML = data.location.name;

            // 获取天气图标URL并更新图标
            const iconUrl = data.current.condition.icon;
            icon.src = iconUrl;

            // 更新云量、湿度和风速显示
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            // 判断白天或夜晚
            let timeOfDay = "day";
            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            // 根据天气代码设置背景图片和按钮样式
            const code = data.current.condition.code;
            if (code == 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            } else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 || code == 1282
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                }
            } else {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            // 设置应用的不透明度
            app.style.opacity = "1";
        })
        .catch(() => {
            // 如果城市未找到，显示提示信息
            alert('City not found, please try again');
            app.style.opacity = "1";
        });
}

fetchWeatherData();
app.style.opacity = "1";