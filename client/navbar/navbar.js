Template.navbar.events({
  'keyup .search-input': function(e){
    Session.set('searchQuery', e.target.value);
  }
})