var assert = require('assert'),
    fs = require('fs');

function Check(config) {
    this._config = config;
    this._errors = [];
}

/*
 * Internal helper functions
 */
Check.prototype._getKey = function (keyname, testObj) {
    if (typeof keyname === 'string') {
        keyname = keyname.split(".");
    }

    // An non-existing key doesn't exist!
    if (keyname.length === 0) {
        return {error: 'Not found'};
    }

    var key = keyname.shift();

    // Is it an object -- and does it have the key
    if (testObj !== new Object(testObj) || !(key in testObj)) {
        return {error: 'Not found'};
    }

    // Try more!
    if (keyname.length >= 1) {
        return this._getKey(keyname, testObj[key]);
    }

    // We're at the end.
    return {value: testObj[key]};
};

/*
 * Basic commands
 */
Check.prototype.has = function (keyname) {
    var res = this._getKey(keyname, this._config);

    if (res.error) {
        this._errors.push("Missing key '" + keyname + "'.");
    }

    return this;
};

/*
 * Test a given `key` using the `function(keyname, key value)`. If the function
 * returns a string or throws/returns an error, it will be considered a failed
 * test.
 *
 * If `key` doesn't exist, the test function won't be run at all.
 */
Check.prototype.testFunction = function (key, testfunc) {
    var res = this._getKey(key, this._config);

    if (res.error) {
        this._errors.push("Missing key '" + key + "'.");
        return this;
    }

    try {
        var result = testfunc(key, res.value),
            resultType = Object.prototype.toString.call(result);
        if (resultType === '[object Error]' || resultType === '[object String]') {
            this._errors.push(result.message || result);
        }
    } catch (e) {
        this._errors.push(e.message);
    }

    return this;
};

Check.prototype.optionalTestFunction = function (key, testfunc) {
    var res = this._getKey(key, this._config);

    if (res.error) {
        //this._errors.push("Missing key '" + key + "'.");
        return this;
    }

    try {
        var result = testfunc(key, res.value),
            resultType = Object.prototype.toString.call(result);
        if (resultType === '[object Error]' || resultType === '[object String]') {
            this._errors.push(result.message || result);
        }
    } catch (e) {
        this._errors.push(e.message);
    }

    return this;
};


/*
 * Type checks
 */
['Array', 'Boolean', 'Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'].forEach(function (name) {
    Check.prototype['has' + name] = function (keyname) {
        return this.testFunction(keyname, function (keyname, value) {
            if (Object.prototype.toString.call(value) !== '[object ' + name + ']') {
                return "Key '" + keyname + "' should be an " + name.toLowerCase() + ".";
            }
            return;
        });
    };

    Check.prototype['optional' + name] = function (keyname) {
        return this.optionalTestFunction(keyname, function (keyname, value) {
            if (Object.prototype.toString.call(value) !== '[object ' + name + ']') {
                return "Key '" + keyname + "' should be an " + name.toLowerCase() + ".";
            }
            return;
        });
    };
});

Check.prototype.hasObject = function (keyname) {
    return this.testFunction(keyname, function (key, value) {
        return value !== new Object(value) ? "Key '" + key + "' should be an object." : undefined;
    });
};

Check.prototype.optionalObject = function (keyname) {
    return this.optionalTestFunction(keyname, function (key, value) {
        return value !== new Object(value) ? "Key '" + key + "' should be an object." : undefined;
    });
};

/*
 * Finalizers
 */
Check.prototype.errors = function () {
    return this._errors;
};

Check.prototype.ok = function () {
    return this._errors.length === 0;
};

Check.prototype.assert = function () {
    if (this._errors.length !== 0) {
        throw new assert.AssertionError({
            message: "Incorrect configuration:\n\t" + this._errors.join("\n\t"),
            stackStartFunction: arguments.callee
        });
    }
};

/*
 * Export as a non-function.
 */
module.exports = function (config) {
    return new Check(config);
};
