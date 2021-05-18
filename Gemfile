source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.2'

gem 'rails', '~> 6.0.3', '>= 6.0.3.4'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.3'
gem 'sass-rails', '>= 6'
gem 'webpacker'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.7'

gem 'carrierwave', '~> 2.1'
gem 'mini_magick'

gem 'omniauth-rails_csrf_protection', '~> 0.1'
gem 'omniauth-twitter'
gem 'omniauth-facebook'
gem 'omniauth-google-oauth2'

gem 'devise'
gem 'figaro'
gem 'font-awesome-rails'
gem 'font-awesome-sass'
gem 'kaminari', '~> 1.2.1'
gem 'friendly_id', '~> 5.1.0'
gem 'database_cleaner', '~> 1.6.0'
gem 'uglifier'

gem 'email_validator'
gem "acts_as_list", "~> 1.0"

gem 'pdfkit'
gem 'wkhtmltopdf'

# gem 'redis', '~> 4.0'
gem 'bcrypt', git: 'https://github.com/codahale/bcrypt-ruby.git', :require => 'bcrypt'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

gem 'bootsnap', '>= 1.4.2', require: false

gem 'mimemagic', github: 'mimemagicrb/mimemagic', ref: '01f92d86d15d85cfd0f20dabd025dcbd36a8a60f'

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'shoulda-matchers', '~> 3.1'
  gem 'byebug', platform: :mri
  gem 'pry'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'teaspoon-mocha'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'brakeman', require: false
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
