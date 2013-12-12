var app = angular.module("app", []);

app.controller("AppCtrl", function ($http) {
    var app = this;

    $http.get("/api/pin").success(function (data) {
        app.pins = data.objects;
    })

    app.addPin = function () {
        $http.post("/api/pin",
            {"title": "new", "image": "http://placekitten.com/200/200?image=" + app.pins.length})
            .success(function (data) {
                app.pins.push(data);
            })
    }

    app.updatePin = function (pin) {
        $http.put("/api/pin/" + pin.id, pin);
    }

    app.deletePin = function (pin) {
        $http.delete("/api/pin/" + pin.id).success(function () {
            app.pins.splice(app.pins.indexOf(pin), 1);
        })
    }
})