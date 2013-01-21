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

    var InmateTableView = Backbone.View.extend({
        collection: InmateCollection,
        el: '#content',
        initialize: function(options) {
            this.container = $('<div id="inmate-table">').appendTo(this.$el);
            var columns = [
                {'id': 'jail_id', 'name': 'jail_id', 'field': 'jail_id'},
                {'id': 'booking_date', 'name': 'booking_date', 'field': 'booking_date'},
                {'id': 'age_at_booking', 'name': 'age_at_booking', 'field': 'age_at_booking', 'sortable': true},
                {'id': 'bail_amount', 'name': 'bail_amount', 'field': 'bail_amount', 'sortable': true},
                {'id': 'charges', 'name': 'charges', 'field': 'charges'},
                {'id': 'charges_citation', 'name': 'charges_citation', 'field': 'charges_citation'},
                {'id': 'gender', 'name': 'gender', 'field': 'gender'},
                {'id': 'race', 'name': 'race', 'field': 'race'},
                {'id': 'housing_location', 'name': 'housing_location', 'field': 'housing_location'},
                {'id': 'stay_length', 'name': 'stay_length', 'field': 'stay_length'},
                {'id': 'discharge_date_earliest', 'name': 'discharge_date_earliest', 'field': 'discharge_date_earliest'},
            ];
            this.grid = new Slick.Grid('#inmate-table', [], columns, {
                enableCellNavigation: true,
                forceFitColumns: true,
                enableColumnReorder: false,
            });
            this.grid.setSelectionModel(new Slick.CellSelectionModel());

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
