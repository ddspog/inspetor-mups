import angular from 'angular';

const name = 'sanityProblemTypeFilter';

function SanityProblemTypeFilter(type) {

}

// create a module
export default angular.module(name, [])
    .filter(name, () => {
        return SanityProblemTypeFilter;
    });
