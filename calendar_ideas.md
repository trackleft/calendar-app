#Calendar Ideas

* Initial calendar loads next thirty days from now
* You can scroll up to the past **Endless Scroll**
* you can scroll down to the future **Endless Scroll**
* events in the past are greyed out but still clickable **updates every 15min with js**
* ongoing events would be at the bottom of each day that they run.  ** .ongoing class **
* 12 months on top of page using inline list *Example: Oct Nov **Dec** Jan Feb Mar June July*
* calendar navigator on top right changes day based on scroll


## Structure needed

Days should be a seperate entity so we can reference a date when creating an event time. *epic epiphany*

## Custom Requirements
* probably a custom sql query and view unless I can create a new kind of view handler or  view type.
* I need to add a list of dates into views and then control what the dates are using endless scroll
Or page by date with endless scroll starting from today.

## Goals

* Enable quick event viewing for the next 10 days
* Enable easy interface for past and future events
* Allow unlimited navigation of all events, past present and future
* Customization of filters by person?
* Easy to add events
* Promote ongoing events
* Make ongoing events easy to understand.
* Make repeating events easy to understand.