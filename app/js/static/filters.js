export default {
  type: {
    name: 'By Class',
    values: [
        'all',
        'botany',
        'mining',
        'fishing',
        'custom'
    ]
  },
  level: {
    name: 'By Level',
    values: [
      { value: 50, name: '50' },
      { value: [51, 59], name: '51-59'},
      { value: 60, name: '60'},
      { value: [61,69], name: '61-69'},
      { value: 70, name: '70'},
      { value: [71, 79], name: '71-79'},
      { value: 80, name: '80'}
    ]
  },
  feature: {
    name: 'By Type',
    values: [
      {value: 'is_collectable', name: 'Collectable'},
      {value: 'is_ephemeral', name: 'Ephemeral'},
      // {value: 'red_scrip', name: 'Red Scrip'},
      // {value: 'blue_scrip', name: 'Blue Scrip'},
      {value: 'yellow_scrip', name: 'Yellow Scrip'},
      {value: 'white_scrip', name: 'White Scrip'}
    ]
  }
};
