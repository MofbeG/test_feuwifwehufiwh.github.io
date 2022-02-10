let health = document.getElementById('health');
let arm = document.getElementById('arm');
let cash = document.getElementById('cash');
let data = document.getElementById('data');
let time = document.getElementById('time');

cef.emit("game:hud:setComponentVisible", "interface", false);
cef.emit("game:hud:setComponentVisible", "radar", true);

cef.emit("game:data:pollPlayerStats", true, 50);

cef.on("game:data:playerStats", (hp, max_hp, arm, breath, wanted, weapon, ammo, max_ammo, money, speed) => {
    health.value = hp;
    arm.value = arm;
    cash.innerHTML = divideNumberByPieces(money, ".");

    function divideNumberByPieces(x, delimiter) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
    }
});

function zero_first_format(value)
{
    if (value < 10)
    {
        value='0'+value;
    }
    return value;
}

//data
function dates()
{
    var current_datetime = new Date();
    var day = zero_first_format(current_datetime.getDate());
    var month = zero_first_format(current_datetime.getMonth()+1);
    var year = current_datetime.getFullYear();

    data.innerHTML = day+"."+month+"."+year;
}

//time
function times()
{
    var current_datetime = new Date();
    var hours = zero_first_format(current_datetime.getHours());
    var minutes = zero_first_format(current_datetime.getMinutes());
    var seconds = zero_first_format(current_datetime.getSeconds());

    time.innerHTML = hours+":"+minutes;
}

setInterval(function () {
    dates();
    times();
}, 1000);
