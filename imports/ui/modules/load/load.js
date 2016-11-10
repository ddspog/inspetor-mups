const RETURN_CONTROLLER = Symbol();
const RETURN_CALLER = Symbol();

function LoadSomething(component, deliver, done, controllerScope, type = RETURN_CONTROLLER) {
    if (type === RETURN_CONTROLLER) {
        inject(function($rootScope, $componentController) {
            deliver($componentController(component, {
                $scope: $rootScope.$new(true)
            }, controllerScope));
        });
    } else {
        inject(function($rootScope, $componentController) {
            deliver(function(bindings) {
                return $componentController(component, {
                    $scope: $rootScope.$new(true)
                }, bindings);
            });
        });
    }
    done();
}

export function LoadController(component, deliver, done, controllerScope = {}) {
    LoadSomething(component, deliver, done, controllerScope, RETURN_CONTROLLER);
}

export function LoadCaller(component, deliver, done, controllerScope = {}) {
    LoadSomething(component, deliver, done, controllerScope, RETURN_CALLER);
}
