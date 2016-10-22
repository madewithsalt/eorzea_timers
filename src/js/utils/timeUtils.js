import moment from 'moment';

export const getEorzeaTime = () => {
  const eorzeaMultipler = (3600 / 175) * 1000;
  const universalTime = moment().unix();

  return universalTime * eorzeaMultipler;
}

export const setTime = () => {
  var eorzeaTime = getEorzeaTime(),
      result = moment.utc(eorzeaTime);

    return {
        'time': result.format('h:mm A'),
        'meridiem': result.format('A'),
        'hour': parseFloat(result.format('H')),
        'minute': parseFloat(result.format('m'))
    };
};
