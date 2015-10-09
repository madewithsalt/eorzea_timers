describe('Time Helpers Spec', function() {
    var helper = TIME_HELPERS;

    describe('getTimeDifference', function () {
        it('should return 13 hour 5 minute difference', function () {
            var result = helper.getTimeDifference('6:55 PM', '8:00 AM');

            expect(result.hours).toBe(13);
            expect(result.minutes).toBe(5);
        });

        it('should return 23 hour difference', function () {
            var result = helper.getTimeDifference('12:00 AM', '11:00 PM');

            expect(result.hours).toBe(23);
        });

        it('should return 1 hour difference', function () {
            var result = helper.getTimeDifference('11:00 AM', '12:00 PM');

            expect(result.hours).toBe(1);
        });

        it('should return 3 hour difference', function () {
            var result = helper.getTimeDifference('9:00 PM', '12:00 AM');

            expect(result.hours).toBe(3);
        });

        it('should return 15 hour difference', function () {
            var result = helper.getTimeDifference('9:00 PM', '12:00 PM');

            expect(result.hours).toBe(15);
        });


        it('should return 1 hour 30 minute difference', function () {
            var result = helper.getTimeDifference('11:00 AM', '12:30 PM');

            expect(result.hours).toBe(1);
            expect(result.minutes).toBe(30);
        });


        it('should return 0 hour 10 minute difference', function () {
            var result = helper.getTimeDifference('11:50 AM', '12:00 PM');

            expect(result.hours).toBe(0);
            expect(result.minutes).toBe(10);
        });

        it('should return 0 hour 10 minute difference', function () {
            var result = helper.getTimeDifference('9:50 AM', '10:00 AM');

            expect(result.hours).toBe(0);
            expect(result.minutes).toBe(10);
        });

        it('should return 23 hour 10 minute difference', function () {
            var result = helper.getTimeDifference('11:50 AM', '11:00 AM');

            expect(result.hours).toBe(23);
            expect(result.minutes).toBe(10);
        });
    });

    describe('getTimeStringFromDuration', function () {

        it('should return the string "3:00 PM"', function () {
            var result = helper.getTimeStringFromDuration('12:00 PM', '3:00');

            expect(result).toBe('3:00 PM');
        });

    });

    describe('getEarthDurationfromEorzean', function() {
        it('should return 2 minutes 55 seconds', function () {
            var result = helper.getEarthDurationfromEorzean('1:00');
            
            expect(result.hours).toBe(0);
            expect(result.minutes).toBe(2);
            expect(result.seconds).toBe(55);
        });

        it('should return 1 hour 10 minutes', function () {
            var result = helper.getEarthDurationfromEorzean('24:00');
            
            expect(result.hours).toBe(1);
            expect(result.minutes).toBe(10);
            expect(result.seconds).toBe(0);
        });

    });

    describe('getTimeStringFromDuration', function() {
        it('should return 3:00 PM', function() {
            var result = helper.getTimeStringFromDuration('12:00 PM', '3:00');

            expect(result).toBe('3:00 PM');
        });

    });

    describe('getTimeObjFromString', function() {
        it('should return 13 hour 0 minutes', function() {
            var result = helper.getTimeObjFromString('1:00 PM');

            expect(result.hour).toBe(13);
            expect(result.minute).toBe(0);

        });
    });

    describe('isActive', function () {
        it('1:00 AM > 2:00 AM: should return false', function() {
            var result = helper.isActive('1:00 AM', '2:00 AM', '0:55');

            expect(result).toBe(false);
        });

        it('1:10 AM > 1:00 AM: should return true', function() {
            var result = helper.isActive('1:10 AM', '1:00 AM', '0:55');

            expect(result).toBe(true);
        });


        it('1:10 AM > 11:00 PM: should return true', function() {
            var result = helper.isActive('1:10 AM', '11:00 PM', '3:00');

            expect(result).toBe(true);
        });

        it('1:34 PM > 9:00 AM: should return false', function() {
            var result = helper.isActive('1:34 PM', '9:00 AM', '0:55');

            expect(result).toBe(false);
        });

    });


});