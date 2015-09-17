describe('Time Helpers Spec', function() {
    var helper = TIME_HELPERS;

    describe('getTimeDifference', function () {
        it('should return 11 hour difference', function () {
            var result = helper.getTimeDifference('12:00 AM', '11:00 PM');

            expect(result.hours).toBe(11);
        });

        it('should return 1 hour difference', function () {
            var result = helper.getTimeDifference('11:00 AM', '12:00 PM');

            expect(result.hours).toBe(1);
        });

        it('should return 3 hour difference', function () {
            var result = helper.getTimeDifference('9:00 PM', '12:00 PM');

            expect(result.hours).toBe(3);
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

            expect(result.hours).toBe(0);
            expect(result.minutes).toBe(10);
        });
    });


    describe('getTimeRemaining', function () {
        it('should return 3 hour difference', function () {
            var result = helper.getTimeRemaining('11:00 AM', '3:00');

            expect(result.hours).toBe(3);
            expect(result.minutes).toBe(0);
        });

        it('should return 0 hour 20 minute difference', function () {
            var result = helper.getTimeRemaining('11:00 AM', '0:20');

            expect(result.hours).toBe(0);
            expect(result.minutes).toBe(20);
        });

    });

});