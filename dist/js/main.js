window.TIME_HELPERS = (function() {
    var api = {
        getEorzeaTime: function() {
            var eorzeaMultipler = (3600 / 175) * 1000;

            var universalTime = moment().unix(),
                eorzeaTime = universalTime * eorzeaMultipler;

            return eorzeaTime;
        },

        getEarthDurationfromEorzean: function(stringDuration) {
            // 175 earth seconds = 3600 eorzean seconds (1 hour)
            var time = {
                    hours: parseFloat(stringDuration.split(':')[0]),
                    minutes: parseFloat(stringDuration.split(':')[1])
                },
                totalMins = (time.hours * 60) + time.minutes,
                totalSeconds = totalMins * 60;

            // how many multiples of 175 (eorz hours) we have.
            var earthUnits = totalSeconds / 3600;

            var totalEarthSeconds = earthUnits * 175,
                minutes = Math.floor(totalEarthSeconds / 60),
                hours = Math.floor(minutes / 60),
                seconds = Math.ceil(((totalEarthSeconds / 60) - minutes) * 60);

            if (minutes > 60) {
                var diff = Math.floor(minutes / 60);
                minutes = minutes - (diff * 60);
            }

            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        },

        /**
         *   Expects two string times with meridien,
         *   IE: 8:00 AM, 7:00 PM
         *   B will be compared against A, like in subtraction.
         *   ex1: A: 12:00 AM B: 11:00 PM = 23 hour difference.
         *   ex2: A: 11:00 PM B: 12:00 AM = 1 hour difference.
         */
        getTimeDifference: function(a, b) {
            var self = this,
                hours = 0,
                minutes = 0,
                times = {};

            _.each([a, b], function(time, idx) {
                times[idx] = self.getTimeObjFromString(time);
            });

            var timeA, timeB, diff;

            timeA = (times[0].hour * 60) + times[0].minute;
            timeB = (times[1].hour * 60) + times[1].minute;

            diff = timeB - timeA;

            hours = Math.floor(diff / 60);
            minutes = diff - (hours * 60);

            if(hours < 0) {
                hours = hours + 24;
            }

            return {
                hours: hours,
                minutes: minutes
            };
        },

        // Expects format: 12:00 AM
        getTimeObjFromString: function(stringTime) {
            var time = stringTime,
                isAM = time.indexOf('AM') > -1,
                hour = parseFloat(time.split(' ')[0].split(':')[0]);

            if (isAM && hour === 12) {
                hour = 0;
            } else if (!isAM && hour !== 12) {
                hour += 12;
            }

            return {
                hour: hour,
                minute: parseFloat(time.split(' ')[0].split(':')[1])
            };
        },

        // Expect object formatted from getTimeObjFromString
        getTimeStringFromObject: function(timeObj) {
            var hour = timeObj.hour,
                minute = timeObj.minute,
                meridien = 'AM';

            if (hour > 12) {
                meridien = 'PM';
                hour = hour - 12;
            } else if(hour === 12) {
                meridien = 'PM';
            }

            minute = minute < 10 ? '0' + minute : minute;

            return hour + ':' + minute + ' ' + meridien;
        },

        getTimeStringFromDuration: function(stringStartTime, stringDuration) {
            var startTime = this.getTimeObjFromString(stringStartTime),
                duration = {
                    hour: parseFloat(stringDuration.split(':')[0]),
                    minute: parseFloat(stringDuration.split(':')[1])
                },
                end = {};

            var hour = startTime.hour + duration.hour,
                minute = startTime.minute + duration.minute;

            if (minute > 60) {
                hour++;
                minute -= 60;
            }

            if (hour > 24) {
                hour -= 24;
            }

            if (hour > 12) {
                hour -= 12;
                end.meridien = 'PM';
            } else {
                end.meridien = 'AM';
            }

            end.hour = hour;
            end.minute = minute < 10 ? '0' + minute : minute;

            return end.hour + ':' + end.minute + ' ' + end.meridien;
        },

        getDurationObjFromString: function(duration) {
            var hours = parseFloat(duration.split(':')[0]),
                mins = parseFloat(duration.split(':')[1]);

            return {
                hours: hours,
                minutes: mins
            };
        },

        getDurationStringFromObject: function(durationObj) {
            var hours = durationObj.hours,
                mins = durationObj.minutes;

            if(mins < 10) {
                mins = '0' + mins.toString()
            }

            return hours + ':' + mins;
        },

        getEndTimeFromDuration: function(startTime, duration) {
            var startObj = this.getTimeObjFromString(startTime),
                durationObj = this.getDurationObjFromString(duration),
                endObj = {
                    hour: startObj.hour + durationObj.hours,
                    minute: startObj.minute + durationObj.minutes
                };

            if(endObj.minute >= 60) {
                endObj.hour += 1;
                endObj.minute -= 60;
            }

            if(endObj.hour >= 24) {
                endObj.hour -= 24;
            }

            return this.getTimeStringFromObject(endObj);
        },

        isActive: function(currentTime, startTime, duration) {
            var endTime = this.getEndTimeFromDuration(startTime, duration),
                startTimeDiff = this.getTimeDifference(currentTime, startTime),
                endTimeDiff = this.getTimeDifference(currentTime, endTime),
                durationObj = this.getDurationObjFromString(duration),
                result = false;

            var startTimeDiffMins = (startTimeDiff.hours * 60) + startTimeDiff.minutes,
                endTimeDiffMins = (endTimeDiff.hours * 60) + endTimeDiff.minutes,
                durationMins = (durationObj.hours * 60) + durationObj.minutes;

            if(endTimeDiffMins < durationMins) {
                result = true;
            }

            return result;
        }
    };

    return api;
})();
$(function() {

    if(typeof App !== 'undefined') {
        App.start({ version: '1.6' });
    }

});