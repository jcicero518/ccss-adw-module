# ccss-adw-module

Drupal 8 module built to hook into Views REST Exports / JSON. Pulls raw JSON data into React application that displays interactive user 
profile listings with filters and keyword search.

In lieu of a completely decoupled Drupal site, which is 100x more complex to implement and maintain, this goes the "progressively decoupled" route. The client side is simple, as they enter content like they do for anything else, except this data is isolated as a separate "content type". In this case, users login to the site and fill out a profile form. This information is presented to admin users as a separate dashboard for moderation.

An admin user is notified via email as soon as a new user completes their form, which puts it into a moderation queue. The admin goes to their dashboard and chooses whether to approve this user or make any edits to their profile before it is visible on the site.

The user experience is seamless because they do not need to maintain a separate Drupal account and with it another username and password. Instead, SSO is implemented with SimpleSAML. More specifically, SimpleSAML on the site integrates with the client's Shibboleth setup to obtain and authorize user data based on a "Net ID". When they login successfully, they are brought to their profile form to view / edit.

The end result: https://socialsciences.cornell.edu/affiliates

## Some code notes
* "Entry point" is the procedural hook-based _adw_user_profiles.module_ file, it preprocesses a "block" of content and modifies the HTML output to display a DIV element used to mount React.


* PHP source uses PSR-4 namespaces in _modules/custom/src_


* JS starts in _modules/custom/js/src_ directory. 


* JS is "transpiled" into ES5 by Webpack, most of which is abstracted away in this case with the **Laravel Mix** library. It looks at _webpack.mix.js_ for configuration.


* Filter dropdowns on the site are updated automatically based on what fields have been chosen by each user, making it simple to maintain.


* Uses React's built in data store. The "time machine" functionality that is possible with Redux is most likely overkill here unless it needs to scale beyond the one dedicated page.
