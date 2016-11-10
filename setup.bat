CMD /C meteor remove blaze-html-templates
CMD /C meteor remove ecmascript

CMD /C meteor npm install --save angular angular-meteor

REM meteor add angular-templates pbastowski:angular-babel
REM meteor remove angular-templates

CMD /C meteor add urigo:static-templates

CMD /C meteor add practicalmeteor:mocha

CMD /C meteor add sanjo:jasmine
CMD /C meteor add velocity:html-reporter
CMD /C meteor add velocity:console-reporter

CMD /C meteor npm install --save-dev angular-mocks

CMD /C meteor npm install --save angular-ui-router

CMD /C meteor remove insecure
CMD /C meteor add accounts-password

CMD /C meteor add dotansimha:accounts-ui-angular

CMD /C meteor add accounts-facebook accounts-google

CMD /C meteor remove autopublish

CMD /C meteor add-platform android
CMD /C meteor add-platform ios

CMD /C meteor npm install --save angular-utils-pagination
CMD /C meteor add tmeasday:publish-counts

CMD /C meteor npm install --save underscore

CMD /C meteor add check
CMD /C meteor add email

REM meteor npm install --save angular-google-maps
REM meteor npm uninstall angular-google-maps --save

CMD /C meteor add wormy:angularjs-google-maps
CMD /C meteor npm install --save angular-simple-logger

REM meteor npm install bootstrap@4.0.0-alpha.2 --save
REM meteor npm uninstall bootstrap --save

CMD /C meteor add less

CMD /C meteor npm install angular-material --save
CMD /C meteor npm install angular-aria --save

CMD /C meteor add jalik:ufs
CMD /C meteor add jalik:ufs-gridfs
CMD /C meteor npm install gm --save

CMD /C meteor npm install ng-file-upload --save
CMD /C meteor npm install ng-img-crop --save

CMD /C meteor npm install angular-sortable-view --save

CMD /C meteor npm install --save bcrypt

CMD /C meteor update
CMD /C meteor update --all-packages