module ApplicationHelper

  def funkynav
    nav = ''
    if @current_user.present?
      nav += '<li class="nav">' + link_to("Edit profile", edit_user_path(@current_user)) + '</li>'
      nav += '<li class="nav" id="usersname">' + link_to("Log out #{ @current_user.name }", login_path, :method => :delete) + '</li>'
    else
      nav += '<a id="modal_trigger" href="#modal" class="nav">Log In <span id="small-or">OR</span> Sign Up</a>'
    end

    nav += '<a href="/"><div id="logobg"><h3>LOGO</h3><i class="icon-chat"></i></div></a> <span id="headerName"><a href="/">!(SheLovesMe)</a></span>'

    nav
  end

end
