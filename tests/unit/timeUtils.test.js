import * as helpers from '../../app/js/utils/timeUtils';

describe('Time Helpers Spec', function() {
    describe('getTimeDifference', function () {
        test('should return 13 hour 5 minute difference', function () {
            var result = helpers.getTimeDifference('6:55 PM', '8:00 AM');
            expect(result.hours).toBe(13);
            expect(result.minutes).toBe(5);
        });

        test('should return 23 hour difference', function () {
            var result = helpers.getTimeDifference('12:00 AM', '11:00 PM');

            expect(result.hours).toBe(23);
        });

        test('should return 1 hour difference', function () {
            var result = helpers.getTimeDifference('11:00 AM', '12:00 PM');

            expect(result.hours).toBe(1);
        });

        test('should return 3 hour difference', function () {
            var result = helpers.getTimeDifference('9:00 PM', '12:00 AM');

            expect(result.hours).toBe(3);
        });

        test('should return 15 hour difference', function () {
            var result = helpers.getTimeDifference('9:00 PM', '12:00 PM');

            expect(result.hours).toBe(15);
        });


        test('should return 1 hour 30 minute difference', function () {
            var result = helpers.getTimeDifference('11:00 AM', '12:30 PM');

            expect(result.hours).toBe(1);
            expect(result.minutes).toBe(30);
        });


        test('should return 0 hour 10 minute difference', function () {
            var result = helpers.getTimeDifference('11:50 AM', '12:00 PM');

            expect(result.hours).toBe(0);
            expect(result.minutes).toBe(10);
        });

        test('should return 0 hour 10 minute difference', function () {
            var result = helpers.getTimeDifference('9:50 AM', '10:00 AM');

            expect(result.hours).toBe(0);
            expect(result.minutes).toBe(10);
        });

        test('should return 23 hour 10 minute difference', function () {
            var result = helpers.getTimeDifference('11:50 AM', '11:00 AM');

            expect(result.hours).toBe(23);
            expect(result.minutes).toBe(10);
        });
    });

    describe('getTimeStringFromDuration', function () {

        test('should return the string "3:00 PM"', function () {
            var result = helpers.getTimeStringFromDuration('12:00 PM', '3:00');

            expect(result).toBe('3:00 PM');
        });

    });

    describe('getEarthTimeUntil', function() {
      test('should return 5 minutes, 50 seconds', function() {
          var result = helpers.getEarthTimeUntil('2:00 PM', '12:00 PM');

          expect(result.hours).toBe(0);
          expect(result.minutes).toBe(5);
          expect(result.seconds).toBe(50);
      });
    });

    describe('getEarthTimeUntil', function() {
      test('should return 2 minutes, 55 seconds', function() {
          var result = helpers.getEarthTimeUntil('12:00 AM', '11:00 PM');

          expect(result.hours).toBe(0);
          expect(result.minutes).toBe(2);
          expect(result.seconds).toBe(55);
      });
    });

    describe('getEarthDurationfromEorzean', function() {
        test('should return 2 minutes 55 seconds', function () {
            var result = helpers.getEarthDurationfromEorzean('1:00');

            expect(result.hours).toBe(0);
            expect(result.minutes).toBe(2);
            expect(result.seconds).toBe(55);
        });

        test('should return 1 hour 10 minutes', function () {
            var result = helpers.getEarthDurationfromEorzean('24:00');

            expect(result.hours).toBe(1);
            expect(result.minutes).toBe(10);
            expect(result.seconds).toBe(0);
        });

    });

    describe('getTimeStringFromDuration', function() {
        test('should return 3:00 PM', function() {
            var result = helpers.getTimeStringFromDuration('12:00 PM', '3:00');

            expect(result).toBe('3:00 PM');
        });

    });

    describe('getTimeObjFromString', function() {
        test('should return 13 hour 0 minutes', function() {
            var result = helpers.getTimeObjFromString('1:00 PM');

            expect(result.hour).toBe(13);
            expect(result.minute).toBe(0);

        });
    });

    describe('isActive', function () {
        test('1:00 AM > 2:00 AM: should return false', function() {
            var result = helpers.isActive('1:00 AM', '2:00 AM', '0:55');

            expect(result).toBe(false);
        });

        test('1:10 AM > 1:00 AM: should return true', function() {
            var result = helpers.isActive('1:10 AM', '1:00 AM', '0:55');

            expect(result).toBe(true);
        });


        test('1:10 AM > 11:00 PM: should return true', function() {
            var result = helpers.isActive('1:10 AM', '11:00 PM', '3:00');

            expect(result).toBe(true);
        });

        test('1:34 PM > 9:00 AM: should return false', function() {
            var result = helpers.isActive('1:34 PM', '9:00 AM', '0:55');

            expect(result).toBe(false);
        });

        test('12:10 AM > 12:00 PM: should return false', function() {
            var result = helpers.isActive('12:10 AM', '12:00 PM', '0:55');

            expect(result).toBe(false);
        });

    });


});
