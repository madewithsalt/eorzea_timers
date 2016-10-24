import { expect } from 'chai';
import * as helpers from '../../src/js/utils/timeUtils';

describe('Time Helpers Spec', function() {
    describe('getTimeDifference', function () {
        it('should return 13 hour 5 minute difference', function () {
            var result = helpers.getTimeDifference('6:55 PM', '8:00 AM');
            expect(result.hours).to.equal(13);
            expect(result.minutes).to.equal(5);
        });

        it('should return 23 hour difference', function () {
            var result = helpers.getTimeDifference('12:00 AM', '11:00 PM');

            expect(result.hours).to.equal(23);
        });

        it('should return 1 hour difference', function () {
            var result = helpers.getTimeDifference('11:00 AM', '12:00 PM');

            expect(result.hours).to.equal(1);
        });

        it('should return 3 hour difference', function () {
            var result = helpers.getTimeDifference('9:00 PM', '12:00 AM');

            expect(result.hours).to.equal(3);
        });

        it('should return 15 hour difference', function () {
            var result = helpers.getTimeDifference('9:00 PM', '12:00 PM');

            expect(result.hours).to.equal(15);
        });


        it('should return 1 hour 30 minute difference', function () {
            var result = helpers.getTimeDifference('11:00 AM', '12:30 PM');

            expect(result.hours).to.equal(1);
            expect(result.minutes).to.equal(30);
        });


        it('should return 0 hour 10 minute difference', function () {
            var result = helpers.getTimeDifference('11:50 AM', '12:00 PM');

            expect(result.hours).to.equal(0);
            expect(result.minutes).to.equal(10);
        });

        it('should return 0 hour 10 minute difference', function () {
            var result = helpers.getTimeDifference('9:50 AM', '10:00 AM');

            expect(result.hours).to.equal(0);
            expect(result.minutes).to.equal(10);
        });

        it('should return 23 hour 10 minute difference', function () {
            var result = helpers.getTimeDifference('11:50 AM', '11:00 AM');

            expect(result.hours).to.equal(23);
            expect(result.minutes).to.equal(10);
        });
    });

    describe('getTimeStringFromDuration', function () {

        it('should return the string "3:00 PM"', function () {
            var result = helpers.getTimeStringFromDuration('12:00 PM', '3:00');

            expect(result).to.equal('3:00 PM');
        });

    });

    describe('getEarthDurationfromEorzean', function() {
        it('should return 2 minutes 55 seconds', function () {
            var result = helpers.getEarthDurationfromEorzean('1:00');

            expect(result.hours).to.equal(0);
            expect(result.minutes).to.equal(2);
            expect(result.seconds).to.equal(55);
        });

        it('should return 1 hour 10 minutes', function () {
            var result = helpers.getEarthDurationfromEorzean('24:00');

            expect(result.hours).to.equal(1);
            expect(result.minutes).to.equal(10);
            expect(result.seconds).to.equal(0);
        });

    });

    describe('getTimeStringFromDuration', function() {
        it('should return 3:00 PM', function() {
            var result = helpers.getTimeStringFromDuration('12:00 PM', '3:00');

            expect(result).to.equal('3:00 PM');
        });

    });

    describe('getTimeObjFromString', function() {
        it('should return 13 hour 0 minutes', function() {
            var result = helpers.getTimeObjFromString('1:00 PM');

            expect(result.hour).to.equal(13);
            expect(result.minute).to.equal(0);

        });
    });

    describe('isActive', function () {
        it('1:00 AM > 2:00 AM: should return false', function() {
            var result = helpers.isActive('1:00 AM', '2:00 AM', '0:55');

            expect(result).to.equal(false);
        });

        it('1:10 AM > 1:00 AM: should return true', function() {
            var result = helpers.isActive('1:10 AM', '1:00 AM', '0:55');

            expect(result).to.equal(true);
        });


        it('1:10 AM > 11:00 PM: should return true', function() {
            var result = helpers.isActive('1:10 AM', '11:00 PM', '3:00');

            expect(result).to.equal(true);
        });

        it('1:34 PM > 9:00 AM: should return false', function() {
            var result = helpers.isActive('1:34 PM', '9:00 AM', '0:55');

            expect(result).to.equal(false);
        });

        it('12:10 AM > 12:00 PM: should return false', function() {
            var result = helpers.isActive('12:10 AM', '12:00 PM', '0:55');

            expect(result).to.equal(false);
        });

    });


});
