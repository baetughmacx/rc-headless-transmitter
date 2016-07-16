(function () {
    'use strict';

    var routes = {
        // path: name
        '#/': function () { Utils.showPage('main'); },
        '#/about': function () { Utils.showPage('about'); },
        '#/model_details/m/:model(/t/:tx)': ModelDetails,
        '#/mixer/m/:model(/t/:tx)': Mixer,
        '#/mixer_unit/:index/m/:model(/t/:tx)': MixerUnit,
        '#/edit_curve/:offset/m/:model(/t/:tx)': EditCurve,
        '#/edit_switch/:offset/m/:model(/t/:tx)': EditSwitch,
        '#/limits/:channel/m/:model(/t/:tx)': Limits,
        '#/rf_protocol/m/:model(/t/:tx)': RFProtocol,
        '#/select_single/:devName/:item/:offset(/t/:tx)': SelectSingle,
        '#/select_single/:devName/:item/:offset/m/:model(/t/:tx)': SelectSingle,
    };

    function redirect(destination) {
        return function () {
            if (typeof destination === "function") {
                destination();
            }
            else {
                destination.init(this.params);
            }
        };
    }

    for (var path in routes) {
        if (routes.hasOwnProperty(path)) {
            Path.map(path).to(redirect(routes[path]));
        }
    }

    Path.root('#/');


    function databaseReady() {
        console.log('routes: Database ready, loading dev.TX and dev.MODEL');

        var count = 2;
        const topic = 'routes.entryRetrieved';

        Database.getEntry('c91cabaa-44c9-11e6-9bc2-03ac25e30b5b', function (data) {
            dev.MODEL = new DBObject(data);
            console.log('routes: dev.MODEL loaded');
            Utils.PubSub.publish(topic);
        });

        Database.getEntry('43538fe8-44c9-11e6-9f17-af7be9c4479e', function (data) {
            dev.TX = new DBObject(data);
            console.log('routes: dev.TX loaded');
            Utils.PubSub.publish(topic);
        });

        function entryRetrievedCallback() {
            count = count - 1;
            if (count) {
                return;
            }

            console.log('routes: Both getEntry() finished, launching page');
            Utils.PubSub.removeTopic(topic);

            // Initialization complete: Launch the page matching location.hash
            Path.listen();
        }

        Utils.PubSub.subscribe(topic, entryRetrievedCallback);
    }

    Utils.PubSub.subscribe('databaseReady', databaseReady);

})();
