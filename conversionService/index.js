// Unit Conversion Microservice
// CS 361: Software Engineering
// Lidia Alexia Banos
const express = require('express');
const app = express();

// Routes
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.status(200).send("Welcome to Team Racoon's Unit Conversion Service")
});
// Listener
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

const measurementsTable = {

    // Tablespoon (tbsp) Conversions
    "tablespoons": {
        "to_tablespoons": function(val) {
            return val * 1
        },
        "to_teaspoons": function(val) {
            return val * 3
        },
        "to_cups": function(val) {
            return val * 0.0625
        },
        "to_pints": function(val) {
            return val * 0.03125
        },
        "to_quarts": function(val) {
            return val * 0.015625
        },
        "to_ounces": function(val) {
            return val * 0.5
        },
        "to_milliliters": function(val) {
            return val * 14.7868
        },
        "to_liters": function(val) {
            return val * 0.0147868
        },
        "to_Celsius": function(val) {
            return 'Cannot convert tablespoons to Celsius.'
        },
        "to_Fahrenheit": function(val) {
            return 'Cannot convert tablespoons to Farenheit.'
        }
    },

    // Teaspoon (tsp) Conversions
    "teaspoons": {
        "to_tablespoons": function(val) {
            return val * 0.333333
        },
        "to_teaspoons": function(val) {
            return val * 1
        },
        "to_cups": function(val) {
            return val * 0.0208333
        },
        "to_pints": function(val) {
            return val * 0.0104167
        },
        "to_quarts": function(val) {
            return val * 0.00520833
        },
        "to_ounces": function(val) {
            return val * 0.16667
        },
        "to_milliliters": function(val) {
            return val * 4.92892
        },
        "to_liters": function(val) {
            return val * 0.00492892
        },
        "to_Celsius": function(val) {
            return 'Cannot convert teaspoons to Celicius.'
        },
        "to_Fahrenheit": function(val) {
            return 'Cannot convert teaspoons to Farenheit.'
        }
    },

    // US Cups (c) Conversions
    "cups": {
        "to_tablespoons": function(val) {
            return val * 16
        },
        "to_teaspoons": function(val) {
            return val * 48
        },
        "to_cups": function(val) {
            return val * 1
        },
        "to_pints": function(val) {
            return val * 0.5
        },
        "to_quarts": function(val) {
            return val * 0.25
        },
        "to_ounces": function(val) {
            return val * 8.11537
        },
        "to_milliliters": function(val) {
            return val * 236.588
        },
        "to_liters": function(val) {
            return val * 0.236588
        },
        "to_Celsius": function(val) {
            return 'Cannot convert cups to Celsius.'
        },
        "to_Fahrenheit": function(val) {
            return 'Cannot convert cups to Farenheit.'
        }
    },
    "pints": {
        "to_tablespoons": function(val) {
            return val * 32
        },
        "to_teaspoons": function(val) {
            return val * 96
        },
        "to_cups": function(val) {
            return val * 2
        },
        "to_pints": function(val) {
            return val * 1
        },
        "to_quarts": function(val) {
            return val * 0.5
        },
        "to_ounces": function(val) {
            return val * 16
        },
        "to_milliliters": function(val) {
            return val * 473.176
        },
        "to_liters": function(val) {
            return val * 0.473176
        },
        "to_Celsius": function(val) {
            return 'Cannot convert pints to Celsius.'
        },
        "to_Fahrenheit": function(val) {
            return 'Cannot convert pints to Farenheit.'
        }
    },

    // Quarts (qt) Conversions
    "quarts": {
        "to_tablespoons": function(val) {
            return val * 64
        },
        "to_teaspoons": function(val) {
            return val * 192
        },
        "to_cups": function(val) {
            return val * 4
        },
        "to_pints": function(val) {
            return val * 2
        },
        "to_quarts": function(val) {
            return val * 1
        },
        "to_ounces": function(val) {
            return val * 0.32
        },
        "to_milliliters": function(val) {
            return val * 946.353
        },
        "to_liters": function(val) {
            return val * 0.946353
        },
        "to_Celsius": function(val) {
            return 'Cannot convert quarts to Celsius.'
        },
        "to_Fahrenheit": function(val) {
            return 'Cannot convert quarts to Farenheit.'
        }
    },

    // Ounces (oz) Conversions
    "ounces": {
        "to_tablespoons": function(val) {
            return val * 2
        },
        "to_teaspoons": function(val) {
            return val * 6
        },
        "to_cups": function(val) {
            return val * 0.125
        },
        "to_pints": function(val) {
            return val * 0.0625
        },
        "to_quarts": function(val) {
            return val * 0.03125
        },
        "to_ounces": function(val) {
            return val * 1
        },
        "to_milliliters": function(val) {
            return val * 29.5735
        },
        "to_liters": function(val) {
            return val * 0.0295735
        },
        "to_Celsius": function(val) {
            return 'Cannot convert ounces to Celsius.'
        },
        "to_Fahrenheit": function(val) {
            return 'Cannot convert ounces to Farenheit.'
        }
    },

    // Milliliters (mL) Conversions
    "milliliters": {
        "to_tablespoons": function(val) {
            return val * 0.067628
        },
        "to_teaspoons": function(val) {
            return val * 0.202884
        },
        "to_cups": function(val) {
            return val * 0.00422675
        },
        "to_pints": function(val) {
            return val * 0.00211338
        },
        "to_quarts": function(val) {
            return val * 0.00105669
        },
        "to_ounces": function(val) {
            return val * 0.033814
        },
        "to_milliliters": function(val) {
            return val * 1
        },
        "to_liters": function(val) {
            return val * 0.001
        },
        "to_Celsius": function(val) {
            return 'Cannot convert milliliters to Celsius.'
        },
        "to_Fahrenheit": function(val) {
            return 'Cannot convert milliliters to Fahrenhei)t.'
        }
    },

    // Liters (L) Conversions
    "liters": {
        "to_tablespoons": function(val) {
            return val * 67.628
        },
        "to_teaspoons": function(val) {
            return val * 202.884
        },
        "to_cups": function(val) {
            return val * 4.22675
        },
        "to_pints": function(val) {
            return val * 2.11338
        },
        "to_quarts": function(val) {
            return val * 1.05669
        },
        "to_ounces": function(val) {
            return val * 33.814
        },
        "to_milliliters": function(val) {
            return val * 1000
        },
        "to_liters": function(val) {
            return val * 1
        },
        "to_Celsius": function(val) {
            return 'Cannot convert liters to Celsius.'
        },
        "to_Fahrenheit": function(val) {
            return 'Cannot convert liters to Fahrenheit.'
        }
    },
    // Celsius (C) Conversions
    "Celsius": {
        "to_tablespoons": function(val) {
            return 'Cannot convert this unit to Celsius.'
        },
        "to_teaspoons": function(val) {
            return 'Cannot convert this unit to Celsius.'
        },
        "to_cups": function(val) {
            return 'Cannot convert this unit to Celsius.'
        },
        "to_pints": function(val) {
            return 'Cannot convert this unit to Celsius.'
        },
        "to_quarts": function(val) {
            return 'Cannot convert this unit to Celsius.'
        },
        "to_ounces": function(val) {
            return 'Cannot convert this unit to Celsius.'
        },
        "to_milliliters": function(val) {
            return 'Cannot convert this unit to Celsius.'
        },
        "to_liters": function(val) {
            return 'Cannot convert this unit to Celsius.'
        },
        "to_Celsius": function(val) {
            return val * 1
        },
        "to_Fahrenheit": function(val) {
            return ((val * 9 / 5) + 32)
        }
    },

    // Fahernheit (F) Conversions
    "Fahrenheit": {
        "to_tablespoons": function(val) {
            return 'Cannot convert this unit to Celsius.'
        },
        "to_teaspoons": function(val) {
            return 'Cannot convert this unit to Fahrenheit.'
        },
        "to_cups": function(val) {
            return 'Cannot convert this unit to Fahrenheit.'
        },
        "to_pints": function(val) {
            return 'Cannot convert this unit to Fahrenheit.'
        },
        "to_quarts": function(val) {
            return 'Cannot convert this unit to Fahrenheit.'
        },
        "to_ounces": function(val) {
            return 'Cannot convert this unit to Fahrenheit.'
        },
        "to_milliliters": function(val) {
            return 'Cannot convert this unit to Fahrenheit.'
        },
        "to_liters": function(val) {
            return 'Cannot convert this unit to Fahrenheit.'
        },
        "to_Celsius": function(val) {
            return ((val - 32) * 5 / 9)
        },
        "to_Fahrenheit": function(val) {
            return val * 1
        }
    }
};

const availableUnits = ["tablespoons", "teaspoons", "cups", "pints",
    "quarts", "ounces", "milliliters", "liters", "Celsius", "Fahrenheit"
];

// Converts Units
app.get('/convertUnits/:val/:fromUnit/:toUnit', (req, res) => {
    let val = req.params.val;
    let fromUnit = req.params.fromUnit;
    let toUnit = req.params.toUnit;
    let answer = measurementsTable[fromUnit]["to_" + toUnit](val);
    res.status(200).json(answer);
});
