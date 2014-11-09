
Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home'
    //controller: NewPostsListController
  });
  this.route('about', {
    path: '/about',
    template: 'about'
  });
  this.route('register', {
    path: '/register',
    template: 'register'
  });

});

Router.onBeforeAction(function(pause) {
  Flash.clear();
  this.next();
});