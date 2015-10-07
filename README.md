# Eorzea Timers
### http://www.eorzea-timers.com/
Using the Eorzean time formula to create handy timers for gathering nuts.

# Development Setup

**System Requirements**
This was developed on a Mac, I am not sure how to configure on a PC. Sorry!

- Node: `brew install node`
- SASS: `brew install sass`
- Grunt CLI: `npm install -g grunt-cli`
- Bower: `npm install -g bower`

## Installation

One line to awesome!:  
```
    git clone git@github.com:tnbKristi/eorzea_timers.git && cd eorzea_timers && npm install && bower install
```

### Development

I typically keep 2 console tabs open, one for watching changes to the code, and the other to run the local server:

1. Tab 1: `grunt`
2. Tab 2: `grunt connect`

## Testing

There is a jasmine specrunner set up at `/test/specRunner.html`. Be sure to write any tests for data logic where needed.
Views should always be simple enough to need minimal testing, and instead rely on data changes to render.


## Contributing

1. Write any passing tests as needed!
2. Submit a pull request, detailing at length the changes you have made. Screenshots are also very helpful when I am testing your PR code.

## Issues & Feature Requests

Please submit them to the issues section of this repo, and thank you for contributing!

