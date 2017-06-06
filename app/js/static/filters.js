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
      50,
      60,
      70
    ]
  },
  feature: {
    name: 'By Type',
    values: [
      {value: 'is_collectable', name: 'Collectable'},
      {value: 'is_ephemeral', name: 'Ephemeral'},
      {value: 'red_scrip', name: 'Red Scrip'},
      {value: 'blue_scrip', name: 'Blue Scrip'},
      {value: 'yellow_scrip', name: 'Yellow Scrip'}
    ]
  }
};
