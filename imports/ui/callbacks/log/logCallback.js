export function AfterCallLog(msg) {
    return (err) => {
        if (!process.env.TESTING) {
            if (err) {
                if (msg.error) {
                    console.error(msg.error);
                } else {
                    console.error(err.reason);
                }
            } else {
                if (msg.done) {
                    console.log(msg.done);
                } else {
                    console.log("Done!");
                }
            }
        }
    };
}
