## ideation/solution proposal

A huge amount -- around 70% -- of the web is inaccessible to users that are
blind or visually impaired.

<!-- show some articles -->

Thus, I had been wondering if I could create a browser extension that
mitigates accessibility issues in websites.

While looking into other people's work, I found there are already plenty of ways
for people to inject scripts into websites to customize them, like the Custom
JavaScript for websites Chrome Extension and Greasemonkey.

<!-- show CJS and Greasemonkey -->

I also found that people are writing customization scripts for accessibility,
too.

<!-- show wikipedia scripts and nvda scripts -->

However, it took me a lot of searching to find all of that information.

<!-- show a bunch of my searches -->

Thus, I decided my project would be to collect all that information in one
place.

## development

I developed a website that collects links to customization scripts that people
with disabilities may find useful.

<!-- show screenshot of site -->

I started by using `create-react-app` to create a React starter project.

<!-- show me running create-react-app -->

Then, I started building out much of the basic user interface.

<!-- show pre-Grommet UI code -->

Eventually, I started using Grommet to spruce up the UI a bit.

<!--  show current UI code -->

I also started working on a user-submission feature, where people would be able
to submit links to scripts themselves.

<!-- form screenshot -->

The form sends information about a script to a Firebase Realtime Database.

<!-- show database -->
