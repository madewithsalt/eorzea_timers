window.TIME_HELPERS = (function() {
    var api = {
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

            var timeA = times['0'],
                timeB = times['1'],
                diff = timeB.hour - timeA.hour;

            hours = diff > 12 ? diff - 12 : diff;
            hours > 24 ? hours - 24 : hours;

            minutes = timeB.minute - timeA.minute;

            if(hours <= 1 && minutes < 0) {
                hours = 0;
                minutes = minutes + 60;
            }

            return {
                hours: hours,
                minutes: minutes
            };
        },

        /**
        * Expects two strings. 
        * The first should be the hour:minute meridian format.
        * The second should be the hours:minutes duration.
        * examples:
        *   startTime: 11:00 AM,
        *   duration: 0:55
        */
        getTimeRemaining: function(startTime, duration) {
            var hours,
                minutes,
                isAM = startTime.indexOf('AM') > -1,
                endTimeHour = parseFloat(duration.split(':')[0]),
                endTimeMinute = parseFloat(duration.split(':')[1])
                times = {};

            times.start = this.getTimeObjFromString(startTime);

            times.end = {
                hour: times.start.hour + endTimeHour,
                minute: times.start.minute + endTimeMinute
            };

            if(times.end.minute > 60) {
                times.end.hour++;
                times.end.minute -= 60;
            }

            return this.getTimeDifference(startTime, this.getTimeStringFromObject(times.end));
        },

        // Expects format: 12:00 AM
        getTimeObjFromString: function(stringTime) {
            var time = stringTime,
                isAM = time.indexOf('AM') > -1,
                hour = parseFloat(time.split(' ')[0].split(':')[0]); 

            return {
                hour: isAM ? hour : hour + 12,
                minute: parseFloat(time.split(' ')[0].split(':')[1])
            };
        },

        // Expect object formatted from getTimeObjFromString
        getTimeStringFromObject: function(timeObj) {
            var hour = timeObj.hour,
                minute = timeObj.minute,
                meridien = 'AM';

            if(hour > 12) {
                meridien = 'PM';
                hour = hour - 12;
            }

            return hour + ':' + minute + ' ' + meridien;
        }
    };

    return api;
})();