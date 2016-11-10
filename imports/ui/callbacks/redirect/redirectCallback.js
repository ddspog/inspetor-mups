export function AfterLogInout(self, destination, callback) {
    return (err) => {
        if (!process.env.TESTING) {
            if (err) {
                self.error = err.reason;
            } else {
                self.$state.go(destination);
            }
        } else if (callback) {
            callback(err);
        }
    };
}
