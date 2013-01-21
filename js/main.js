// Configure RequireJS

// Inmate URL configuration variable
var INMATE_URL = 'http://cookcountyjail.recoveredfactory.net/api/1.0/countyinmate/'; 

// RequireJS aliases
require.config({
    paths: {
        'jquery': '../lib/jquery-1.8.3.min',
        'underscore': '../lib/underscore-1.4.2.min',
        'backbone': '../lib/backbone-0.9.2.min',
        'text': '../lib/text',
        'moment': '../lib/moment',
        'templates': '../templates',
        'slickgrid.core': '../lib/slickgrid/slick.core',
        'slickgrid.grid': '../lib/slickgrid/slick.grid',
        'slickgrid.dataview': '../lib/slickgrid/slick.dataview',
        'slickgrid.plugins.cellcopymanager': '../lib/slickgrid/plugins/slick.cellcopymanager',
        'slickgrid.plugins.cellrangeselector': '../lib/slickgrid/plugins/slick.cellrangeselector',
        'slickgrid.plugins.cellrangedecorator': '../lib/slickgrid/plugins/slick.cellrangedecorator',
        'slickgrid.plugins.cellselectionmodel': '../lib/slickgrid/plugins/slick.cellselectionmodel',
        'jquery.event.drag': '../lib/slickgrid/lib/jquery.event.drag-2.0.min',
        'jquery.ui': '../lib/slickgrid/lib/jquery-ui-1.8.16.custom.min',
    },
    shim: {
      'slickgrid.grid': {
        deps: ['jquery.ui', 'jquery.event.drag', 'slickgrid.core', 'slickgrid.plugins.cellcopymanager', 'slickgrid.plugins.cellrangedecorator', 'slickgrid.plugins.cellrangeselector', 'slickgrid.plugins.cellselectionmodel'],
        exports: 'Slick',
      }
    }
});

// Load our application by requiring it, then calling it's
// initialize method.
require([
    'app',
], function(App){
    App.initialize();
});
