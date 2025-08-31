#/bin/bash
#
# Starts the web site
bundle install
bundle exec jekyll clean
bundle exec jekyll serve --livereload --force_polling
