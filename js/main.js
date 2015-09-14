$(function() {

    moment().utc();

    var toEorzeaTime = function() {
        var eorzeaMultipler = (3600 / 175) * 1000;

        var universalTime = moment().unix(),
            eorzeaTime = universalTime * eorzeaMultipler;

        return eorzeaTime;
    }

    window.setInterval(function() {
        var eorzeaTime = toEorzeaTime();
        var result = moment.utc(eorzeaTime).format('hh:mm a');


        $('#timer').html(result);
    }, 1000);
});