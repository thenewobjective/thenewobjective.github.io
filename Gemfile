source "https://rubygems.org"

group :jekyll_plugins do
  gem 'github-pages'
  gem "jekyll-feed"
  # <https://github.com/jekyll/jekyll-redirect-from>
  gem 'jekyll-redirect-from'
  # <https://keith-mifsud.me/projects/jekyll-target-blank>
  gem 'jekyll-target-blank'
  # <https://mycyberuniverse.com/syntax-highlighting-jekyll.html>
  gem 'rouge'
  # Sitemap Generator Plugin <https://github.com/jekyll/jekyll-sitemap>
  gem 'jekyll-sitemap'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0", :install_if => Gem.win_platform?