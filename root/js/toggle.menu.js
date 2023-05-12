var nav           = $('.nav');
var menu          = $('.menu');
var menuContainer = $('.menu-container');
var subMenu       = $('.submenu');
var toggle        = $('.toggle');
var subToggle     = $('.has-children span');//여기
var back          = '<div class="hide-submenu"></div>';//여기 주석되어 있었음, 오류 떠서 활성화 해봄 2018.12.26
var subHide       = $(back);

// Toggle menu
toggle.on("click", function() {
  nav.toggleClass('is-visible');
  if(menu.hasClass('visually-hidden')) {
    menu.toggleClass('visually-hidden is-visible')
  } else {
    menu.removeClass('is-visible');
    // Wait for CSS animation
    setTimeout(function() {
      nav.removeClass('view-submenu');
      menu.addClass('visually-hidden');
    }, 200);
  }
});
// Add submenu hide bar
subHide.prependTo(subMenu);
var subHideToggle = $('.hide-submenu');
// Show submenu
subToggle.on("click", function() {
  nav.addClass('view-submenu');
  // Hide all the submenus...
  subMenu.hide();
  // ...except for the one being called
  $(this).parents('li').find('.submenu').show();
});
// Hide submenu
subHideToggle.on("click", function() {
  nav.removeClass('view-submenu');
});
