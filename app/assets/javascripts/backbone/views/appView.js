var app = app || {};

//renders the main app view. This will run the main app view, which in turn will deploy all our other views/logic, as well as the app variable on site-load
app.AppView = Backbone.View.extend({
  // in #mainApp div render the #home script
  el: '#mainApp',
  events: {
    'click .authenticateLink': 'authPage',
    'click #login_form': 'loginForm',
    'click #register_form': 'registerForm',
    'click .back_btn': 'backBtn',
    'click #register_button': 'users#create'
  },

  initialize: function () {
  },

  render: function () {
    var appHTML = $('#home').html();
    this.$el.html(appHTML);

    // List out all the contacts the user has
    app.currentUserContact = [];
    this.collection.each( function (contact) {
      if (contact.get('user_id') === app.user_id) {
        app.currentUserContact.push(contact);
        app.contactListView = new app.ContactListView({ model: contact });
        app.contactListView.render();
      }
    });
    $("#modal_trigger").leanModal({
      top : 200, 
      overlay : 0.6, 
      closeButton: ".modal_close" 
    });
  },

  authPage: function () {
    app.router.navigate('auth',true);
  },

  loginForm: function () {
    $(".social_login").hide();
    $(".user_login").show();
    return false;
  },

  registerForm: function () {
    $(".social_login").hide();
    $(".user_register").show();
    $(".header_title").text('Register');
    return false;
  }, 

  backBtn: function () {
    $(".user_login").hide();
    $(".user_register").hide();
    $(".social_login").show();
    $(".header_title").text('Login');
    return false;
  }


});