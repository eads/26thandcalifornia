define([
    // Libraries
    'jquery',
    'underscore',
    'backbone',
    'slickgrid.grid',

    // Our apps
    'collections/InmateCollection',

    // Templates
    'text!templates/inmate_table.html'
], function($, _, Backbone, Slick, InmateCollection, inmate_table) {
    function NumericSorter(a, b) {
      var x = a[sortcol], y = b[sortcol];
      return sortdir * (x == y ? 0 : (x > y ? 1 : -1));
    }

    var InmateTableView = Backbone.View.extend({
        collection: InmateCollection,
        el: '#content',
        initialize: function(options) {
            this.container = $('<div id="inmate-table">').appendTo(this.$el);
            var columns = [
                {'id': 'jail_id', 'name': 'Jail ID', 'field': 'jail_id'},
                {'id': 'booking_date', 'name': 'Booking date', 'field': 'booking_date'},
                {'id': 'age_at_booking', 'name': 'Age at booking', 'field': 'age_at_booking', 'sortable': true, 'width': 60},
                {'id': 'bail_amount', 'name': 'Bail amount', 'field': 'bail_amount', 'sortable': true, 'width': 60},
                {'id': 'charges_citation', 'name': 'Citation', 'field': 'charges_citation'},
                {'id': 'gender', 'name': 'Gender', 'field': 'gender', 'width': 40},
                {'id': 'race', 'name': 'Race', 'field': 'race', 'width': 40},
                {'id': 'housing_location', 'name': 'Housing location', 'field': 'housing_location'},
                {'id': 'stay_length', 'name': 'Stay length', 'field': 'stay_length', 'width': 40},
                {'id': 'discharge_date_earliest', 'name': 'Discharge date', 'field': 'discharge_date_earliest'},
            ];
            this.grid = new Slick.Grid('#inmate-table', [], columns, {
                enableCellNavigation: true,
                forceFitColumns: true,
                enableColumnReorder: false,
            });
            this.grid.setSelectionModel(new Slick.CellSelectionModel());
            var copyManager = new Slick.CellCopyManager();
            this.grid.registerPlugin(copyManager);

            // Call 'spin' when collection AJAX request starts.
            this.collection.bind('fetch', this.spin, this);

            // Call 'render' when collection AJAX request is done.
            this.collection.bind('reset', this.render, this);
        },
        spin: function() {
            // Clear element and start spinner on collection start
            this.spinner = new Spinner().spin(this.el);
            return this;
        },
        render: function(options) {
            // Render template and stop spinner.
            this.spinner.stop();
            this.grid.setData(this.collection.toJSON());
            this.grid.updateRowCount();
            this.grid.render();
            return this;
        }
    });

    return InmateTableView;

});
