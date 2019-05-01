Package.describe({
    name: 'miesystem2',
  });
  
  Package.onUse(function (api) {

    api.versionsFrom('METEOR@1.5.2');

    api.use([
  
      'promise',
  
      // vulcan core
      'vulcan:core@1.12.16',
  
      // vulcan packages
      'vulcan:forms@1.12.16',
      'vulcan:accounts@1.12.16',
      'vulcan:ui-bootstrap@1.12.16',
      //'vulcan:admin@1.12.16',
      
    ]);
  
    api.addFiles('lib/stylesheets/bootstrap.min.css');
    api.addFiles([
        'lib/stylesheets/styles.css'
      ], ['client']);
    
    api.addAssets(['lib/stylesheets/main.scss'],['client']);
    
  
    api.mainModule('lib/server/main.js', 'server');
    api.mainModule('lib/client/main.js', 'client');
  
  });