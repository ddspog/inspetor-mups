import angular from 'angular';

/**
  *   Private functions
  */
function getBrowser() {
    return navigator.userAgent.toLowerCase();
}

class MonitorProvider {
/**
  *   Public functions
  */
    constructor($interval) {
        this._$interval = $interval;

        this.options = {
            browser: 'chrome',
            limitOfTries: 10,
            periodTries: 25
        };
    }

    // When met options, and query found element, do something with it
    whenFound(query, doThis, options) {
        // Initialize options
        if (options) {
            if (!options.browser) options.browser = this.options.browser;
            if (!options.limitOfTries) options.limitOfTries = this.options.limitOfTries;
            if (!options.periodTries) options.periodTries = this.options.periodTries;
        } else {
            options = this.options;
        }
        // If obrigatory parameters aren't available, do nothing
        if (!query || !doThis)
            return;

        // Verify Browser
        if (this.isOnBrowser(options.browser)) {
            let count = 0;

            const interval = this._$interval(() => {
                // Stop after some tries
                if (count > options.limitOfTries) {
                    this._$interval.cancel(interval);
                }

                var elementFound = query();

                // When query found something, do something to element
                if (elementFound.length) {
                    doThis(elementFound);
                    this._$interval.cancel(interval);
                }

                count++;
            }, options.periodTries);
        }
    }

    // When local has been autofilled and options apply, do something with element
    whenAutofill(local, doThis, options) {
        this.whenFound(() => {
            return angular.element(local + ':-webkit-autofill');
        }, doThis, options);
    }

    isOnBrowser(browser) {
        return getBrowser().indexOf(browser) > -1;
    }
}

// bind service
MonitorProvider.$inject = ['$interval'];

export default MonitorProvider;
