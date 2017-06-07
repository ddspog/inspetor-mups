App.info({
    name: 'tsu',
    description: 'Tool for recording sanitation problems',
    author: 'Dênnis Dantas de Sousa',
    email: 'ddspog@gmail.com'
});

App.accessRule('*://tsu.herokuapp.com/*');
App.accessRule('*://ajax.googleapis.com/*');
App.accessRule('*://fonts.googleapis.com/*');

App.accessRule('data:*', { type: 'navigation' });