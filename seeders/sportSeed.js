const mongoose = require('mongoose');
const db = require('../models/sport');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const sportSeed = [
  {
    "sportTitle": "Baseball",
    "leagues": {
      "MLB": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      }
    },
    "active": false,
    "prevStatus": false,
    "statusChange": false,
    "dateStatusChange": null,
    "dateReset": null,
    "date": Date.now()
  },
  {
    "sportTitle": "Basketball",
    "leagues": {
      "NBA": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
      "NCAA": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      }
    },
    "active": false,
    "prevStatus": false,
    "statusChange": false,
    "dateStatusChange": null,
    "dateReset": null,
    "date": Date.now()
  },
  {
    "sportTitle": "Football",
    "leagues": {
      "NFL": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
      "NCAA": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      }
    },
    "active": false,
    "prevStatus": false,
    "statusChange": false,
    "dateStatusChange": null,
    "dateReset": null,
    "date": Date.now()
  },
  {
    "sportTitle": "Tennis",
    "leagues": {
      "ATP": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
      "WTA": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      }
    },
    "active": false,
    "prevStatus": false,
    "statusChange": false,
    "dateStatusChange": null,
    "dateReset": null,
    "date": Date.now()
  },
  {
    "sportTitle": "Hockey",
    "leagues": {
      "NHL": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      }
    },
    "active": false,
    "prevStatus": false,
    "statusChange": false,
    "dateStatusChange": null,
    "dateReset": null,
    "date": Date.now()
  },
  {
    "sportTitle": "Martial Arts",
    "leagues": {
      "UFC": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      }
    },
    "active": false,
    "prevStatus": false,
    "statusChange": false,
    "dateStatusChange": null,
    "dateReset": null,
    "date": Date.now()
  },
  {
    "sportTitle": "Soccer",
    "leagues": {
      "England - Premier League": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
      "France": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
      "Germany - Bundesliga": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
      "La Liga": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
    },
    "active": false,
    "prevStatus": false,
    "statusChange": false,
    "dateStatusChange": null,
    "dateReset": null,
    "date": Date.now()
  },
  {
    "sportTitle": "Golf",
    "leagues": {
      "PGA": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
      "LPGA": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
      "Fed-Ex 500 Events": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
      "Champions Tour": {
        "games": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        },
        "props": {
          "active": false,
          "statusChange": false,
          "dateStatusChange": null,
          "dateReset": null,
          "dateUpdated": Date.now()
        }
      },
    },
    "active": false,
    "prevStatus": false,
    "statusChange": false,
    "dateStatusChange": null,
    "dateReset": null,
    "date": Date.now()
  },
]

  db.insertMany(sportSeed)
  .then(data => {
    // console.log(data);
    // console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  // db.create(sportSeed)
  // .then(data => {
  //   console.log(data);
  //   // console.log(data.result.n + " records inserted!");
  //   process.exit(0);
  // })
  // .catch(err => {
  //   console.error(err);
  //   process.exit(1);
  // });

