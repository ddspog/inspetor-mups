[//]: # ( QUICK NOTE: 72 characters on each line, is love s2.         )

# Contributing to Inspetor Mups

:+1::tada: First off, thanks for taking the time to contribute!
:tada::+1:

The following is a set of guidelines for contributing to Inspetor Mups (application for tracking sanitation problems at UFCG) and its packages, which are hosted in the [Inspetor Mups](https://github.com/ddspog/inspetor-mups) on GitHub. These are just guidelines, not rules, use your best judgment and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [Code of Conduct](#code-of-conduct)
  * [Inspetor Mups](#Inspetor Mups)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [Tests Styleguide](#tests-styleguide)

[Additional Notes](#additional-notes)
  * [Issue and Pull Request Labels](#issue-and-pull-request-labels)

## What should I know before I get started?

### Code of Conduct

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.
Please report unacceptable behavior to [ddspog@gmail.com](mailto:ddspog@gmail.com).

### Inspetor Mups

Inspetor Mups it's a open source project, made to track some sanitation problems at UFCG by its students. These app will be used on Android, for use of GPS, to mark locations.

The main purpose of these project it's to collect data for UFCG, helping locating causes of sanitation problems on the university, and also to value some experiments or changes for university structure.

This seed application were made on a [tutorial](http://www.angular-meteor.com/tutorials/socially/angular1/bootstrapping), and improved for better visual and bug fixing.

The project already implements many features, here's a list of them:

 * [**Meteor Framework**](https://www.meteor.com/) - After installing
 Meteor on the Computer, all you need it's to run `meteor`, and the application start to run on localhost:3000. It also minimize all the
 CSS and HTML used on the web application.
 * [**HTML5**](http://www.w3schools.com/html/html5_intro.asp) - The
 updated interface for all browsers.
 * [**AngularJS**](https://angularjs.org/) - The Javascript
 open-source UI Framework that you need. Modularization for your
 front-end software, and masking of HTML. This project makes uses of
 Component-based structure on Angular 1.
 * [**angular-babel**](https://github.com/pbastowski/angular-meteor-babel/) -
 ECMAScript2015 + AngularJS DI annotations for better interaction
 between the JS files, Angular Modules, imports with `ngInject`,
 using string templates, etc.
 * [**MongoDB**](https://www.mongodb.com/) - Javascript ideal database,
 with easy configuration, insertion, updating, removing elements.
 * [**Static Templates**](https://atmospherejs.com/urigo/static-templates) -
 Import all html templates with string, for really easy assignment of
 templates in AngularJS.
 * [**Jasmine**](https://github.com/Sanjo/meteor-jasmine) - Great test
 mechanism to make unit tests with Angular-Mocks.
 * [**ui-router**](https://github.com/angular-ui/ui-router) - Router
 for loading views on Demand, all with Javascript.
 * [**accounts-password**](https://atmospherejs.com/meteor/accounts-password) -
 The powerful accounts package for Meteor. With social packages, it
 makes managing users, very simple!
 * [**Android Support**](http://guide.meteor.com/mobile.html#installing-prerequisites-android) -
 Make the web application run as a installed app on a Android
 cellphone.
 * [**angular-utils-pagination**](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination) -
Make pagination a very simple task!
 * [**Underscore**](http://underscorejs.org/) - Package for functional
 programming improve on Javascript.
 * [**Check**](http://docs.meteor.com/api/check.html) - Make fast
 verification of server methods arguments.
 * [**Email**](http://docs.meteor.com/api/email.html) - Send emails
 from the app to anyone!
 * [**less**](http://lesscss.org/) - Top CSS pre-processor, to reduce
 your CSS files size.
 * [**Angular Material**](https://material.angularjs.org/latest) - Nice
 UI following the Material Design from Google, with intuitive
 directives.
 * [**Material Design Icons**](https://github.com/dapearce/meteor-material-icons) -
 Icons from Google and from the Community to decorate your site,
 maintaining Material Design.
 * [**ng-file-upload**](https://github.com/danialfarid/ng-file-upload) -
 Easy directive to upload files, even with Drag and Drop operations.
 * [**ng-img-crop**](https://github.com/alexk111/ngImgCrop/) - Enable
 users to crop the images they have and update it on your site.

Further details on how to use this seed are available on the
[Wiki](https://github.com/ddspog/inspetor-mups/wiki).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Inspetor Mups. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Please use the issues templates, for better reading and understanding of the rest of team.

#### Before Submitting A Bug Report

* **Check it carefully.** You might be able to find the cause of the
problem and fix things yourself. Most importantly, check if you can
reproduce the problem
[in the latest version of Inspetor Mups](https://github.com/ddspog/inspetor-mups).
* **Check the FAQs on the forum** for a list of common questions and
problems.
* **Perform a [cursory search](https://github.com/ddspog/inspetor-mups/issues?utf8=%E2%9C%93&q=is%3Aissue+user%3Addspog+)**
 to see if the problem has already been reported. If it has, add a
 comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as
[GitHub issues](https://guides.github.com/features/issues/). Create an
 issue on [Inspetor Mups](https://github.com/ddspog/inspetor-mups/issues/new) and
  provide the following information.

Explain the problem and include additional details to help maintainers
reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the
problem.
* **Describe the exact steps which reproduce the problem** in as many
details as possible. For example, start by explaining how you started
this seed, e.g. which command exactly you used in the terminal, or
how you compiled this seed otherwise. When listing steps, **don't just
say what you did, but explain how you did it**. For example, if you
moved the cursor to the end of a line, explain if you used the mouse,
or a keyboard shortcut or an command, and if so which one?
* **Provide specific examples to demonstrate the steps**. Include
links to files or GitHub projects, or copy/pasteable snippets, which
you use in those examples. If you're providing snippets in the issue,
use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and
 point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following
the described steps and clearly demonstrate the problem. You can use
[this tool](https://getsharex.com/) to record GIFs on OSX and Windows,
 and [this tool](http://www.cockos.com/licecap/) on OSX or
 [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If you're reporting that the seed crashed**, include a crash
report with a stack trace from Browser used, or other tool. Include
the crash report in the issue in a
[code block](https://help.github.com/articles/markdown-basics/#multiple-lines),
 a [file attachment](https://help.github.com/articles/file-attachments-on-issues-and-pull-requests/),
  or put it in a [gist](https://gist.github.com/) and provide link to
  that gist.
* **If the problem is related to performance**, include a
[CPU profile capture and a screenshot](http://flight-manual.atom.io/hacking-atom/sections/debugging/#diagnose-performance-problems-with-the-dev-tools-cpu-profiler)
 with your report.
* **If the problem wasn't triggered by a specific action**, describe
what you were doing before the problem happened and share more
information using the guidelines below.

Provide more context by answering these questions:

* **Did the problem start happening recently** (e.g. after updating
  to a new version of Inspetor Mups) or was this always a problem?
* If the problem started happening recently, **can you reproduce the
problem in an older version of Inspetor Mups?** What's the most recent
version in which the problem doesn't happen?
* **Can you reliably reproduce the issue?** If not, provide details
about how often the problem happens and under which conditions it
normally happens.

Include details about your configuration and environment:

* **Which version of Inspetor Mups are you using**?
* **What's the name and version of the OS you're using**?
* **Are you running Inspetor Mups in a virtual machine?** If so, which VM
software are you using and which operating systems and versions are
used for the host and the guest?
* **Which keyboard layout are you using?** Are you using a US layout
or some other layout?

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion
for Inspetor Mups, including completely new features and minor improvements
 to existing functionality. Following these guidelines helps
 maintainers and the community understand your suggestion :pencil: and
 find related suggestions :mag_right:.

Before creating enhancement suggestions, please check
[this list](#before-submitting-an-enhancement-suggestion) as you might
 find out that you don't need to create one. When you are creating an
 enhancement suggestion, please
 [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion).
 If you'd like, you can use
 [this template](#template-for-submitting-enhancement-suggestions) to
 structure the information.

#### Before Submitting An Enhancement Suggestion

* **Check if this enhancement it's already available**. Most importantly,
 check if you can get the desired behavior by changing configuration.
* **Perform a
[cursory search](https://github.com/ddspog/inspetor-mups/issues?utf8=%E2%9C%93&q=is%3Aissue+user%3Addspog+)**
 to see if the enhancement has already been suggested. If it has, add
 a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as
[GitHub issues](https://guides.github.com/features/issues/). Create an issue
 and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the
 suggestion.
* **Provide a step-by-step description of the suggested enhancement**
in as many details as possible.
* **Describe the current behavior** and **explain which behavior you
expected to see instead** and why.
* **Explain why this enhancement would be useful**.
* **Specify the name and version of the OS you're using.**

##### Template For Submitting Bug Reports or Enhancements

You can find the issues templates [here](ISSUE_TEMPLATE.md). But
they're already will be loaded on any new issue you open. The template
also has some tips to write the issue as enhancement suggestion.

### Your First Code Contribution

Unsure where to begin contributing to Atom? You can start by looking through these `beginner` and `help-wanted` issues:

* [Beginner issues](https://github.com/ddspog/inspetor-mups/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Abeginner+label%3Ahelp-wanted+user%3Aatom+sort%3Acomments-desc+) -
issues which should only require a few lines of code, and a test or two.
* [Help wanted issues](https://github.com/ddspog/inspetor-mups/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Ahelp-wanted+sort%3Acomments-desc+) -
 issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

### Pull Requests

* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the  [JavaScript](https://github.com/styleguide/javascript),
  and [CSS](https://github.com/styleguide/css) styleguides.
* Include thoughtfully-worded, well-structured
  [Jasmine](http://jasmine.github.io/) tests for components on
  `./client` folder at each component. Run them using
  `meteor npm test`. Create new tests based on
  [Tests Styleguide](#tests-styleguide)
* End files with a newline.
* Place imports in the following order:
    * Core Packages (such as `angular`)
    * Utility Objects (such as `publish-counts`)
    * Templates (using relative paths)
    * Collections and Components (using relative paths)
    * Serices, Filters and Modules (using relative paths)
* Avoid platform-dependent code.
* Using a plain `return` when returning explicitly at the end of a function.
    * Not `return null`, `return undefined`, `null`, or `undefined`

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 50 characters or less
    * And the rest with 72 characters or less
* End all commits summaries Referencing issues or pull requests.
    * eg: Ref #12
* Considering starting with abbreviations as:
    * Add: for new functionality
    * Mod: algorithm or location
    * Ref: new stuff for class
    * Fix: #42 issue
    * Rem: class deprecated
    * Rea: removing comments on local
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when fixing DB
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on Mac OS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :green_heart: `:green_heart:` when fixing CI
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing warnings
    * :lipstick: `:lipstick:` when improving UI
    * :construction: `:construction:` for WIP (work-in-progress)
    * :speaker: `:speaker:` when adding logging
    * :mute: `:mute:` when reducing logging
    * :bulb: `:bulb:` for new idea
    * :snowflake: `:snowflake:` when changing configuration
    * :rocket: `:rocket:` deployment related

### Git commit template

Use this wherever you can put commit templates.
```
################################################T#####################M
# Capitalized, short (50 chars or less) summary                       #
#                                                                     #
# Details.  Wrap it to about 72 characters or so. Write your commit   #
# message in the imperative: "Fix bug" and not "Fixed bug"            #
#                                                                     #
# Ref #45                  always end with this                       #
#######################################################################
Title :construction:

Summary

Ref
#######################################################################
# Considering starting with abbreviations as:                         #
# Add: new functionality   | Mod: algorithm or location               #
# Ref: new stuff for class | Fix: #42 issue                           #
# Rem: class deprecated    | Rea: removing comments on local          #
#######################################################################
# Consider ending the commit message with an applicable emoji:        #
# :art: improving code format | :racehorse: improving performance     #
# :memo: when writing docs    | :non-potable_water: DB related        #
# :penguin: fixing on Linux   | :apple: fixing on Mac OS              #
# :checkered_flag: on Windows | :bug: when fixing a bug               #
# :fire: removing code        | :white_check_mark: when adding tests  #
# :lock: security             | :arrow_up: upgrading dependencies     #
# :shirt: removing warnings   | :arrow_down: downgrading dependencies #
# :green_heart: fixing CI     | :lipstick: improving UI               #
# :bulb: new idea             | :construction: work in progress       #
# :mute: reducing logging     | :speaker: adding loggin               #
# :rocket: deployment related | :snowflake: changing configuration    #
#######################################################################
```
### Tests Styleguide

- Include thoughtfully-worded, well-structured
  [Mocha](https://mochajs.org/) tests in the `./client` folder
  of each component, or other code.
- If you're making behavior-tests:
  - treat `describe` as a noun or situation.
  - treat `it` as a statement about state or how an operation changes state.
- If you're making unit-tests:
  - nest `describe` as classes and methods.
  - treat `it` as a situation when executing method.
- Include `done` as arg for `it`, `beforeEach` or `afterEach` blocks,
to makes sure the block run isolated, without any code running aside.

#### Example

```javascript
describe('a dog', function() => {
    it('barks', function(done) => {
      // test here
      done();
    }
    describe('when the dog is happy', function() {
      it('wags its tail', function(done) {
        // test here
        done();
      });
    });
  });
});
```

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage
issues and pull requests.

[GitHub search](https://help.github.com/articles/searching-issues/)
makes it easy to use labels for finding groups of issues or pull
requests you're interested in. We  encourage you to read about [other search filters](https://help.github.com/articles/searching-issues/)
which will help you write more focused queries.

The labels are loosely grouped by their purpose, but it's not required
 that every issue have a label from every group or that an issue can't
  have more than one label from the same group.

Please open an issue on if you have suggestions for new labels, and
if you notice some labels are missing on some repositories, then
please open an issue on that repository.

#### State of work

We use Zenhub pipelines to show current state of work on issues,
enhancements, user stories or epics.
