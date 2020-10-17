module ApplicationHelper

  # I added the follwing three methods to enable
  # the Devise partial on the home#index page
  def devise_mapping
    Devise.mappings[:user]
  end

  def resource_name
    devise_mapping.name
  end

  def resource_class
    devise_mapping.to
  end

end
