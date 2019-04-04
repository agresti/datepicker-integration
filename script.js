
$(function() {

    $('#datepicker').datepicker({
        showOtherMonths: true,

        onSelect: function () {
            
            // to clear previous result:           
            $('ul li').hide();

            var date = $(this).datepicker('getDate');

            // date on select
            var dateValOnSelect = $.datepicker.formatDate("D, MM dd, yy", $(this).datepicker("getDate"));
            //$('.dateValOnSelect').text(dateValOnSelect);

            //timeStamp on select
            var timeStampOnSelect = $.datepicker.formatDate("@", $(this).datepicker("getDate"));
            //$('.timeStampOnSelect').text(timeStampOnSelect);

            //to display Event's Date Header on the page:
            $('#sub-header').empty().append(dateValOnSelect);

            //loop through events to sort by date 
            $('ul li').each(function () {
                var eventDate = $(this).find('.eventDate').text();

                if (dateValOnSelect == eventDate) {
                    $(".dateValOnSelect").empty();
                    $(this).show();
                    $("#result").empty().append($('.eventDate:visible').length);
                    $("#date").empty().append(dateValOnSelect);
                    $("#mode").empty().append("day");
                } else {
                    $(".dateValOnSelect").empty();
                    $(this).hide();
                }
            }); // END $('ul li').each(function()

                // to display 'No events' message & events summary 
                if ($('ul').children(':visible').length == 0) {
                    $(".dateValOnSelect").empty().append("No events today!");
                    $("#result").empty().append($('.eventDate:visible').length);
                    $("#date").empty().append(dateValOnSelect);
                    $("#mode").empty().append("day");
                };

// #by-day Button STARTS ******************************************

            $('#by-day').off().click(function () {
            
            // to clear previous result:           
            $('ul li').hide();

            var dateByDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var dateByDateFormatted = $.datepicker.formatDate("D, MM dd, yy", dateByDate);

            //to display Event's Date Header on the page:
            $('#sub-header').empty().append(dateByDateFormatted);

            //loop through events to sort by date 
            $('ul li').each(function () {
                var eventDate = $(this).find('.eventDate').text();

                if (dateByDateFormatted == eventDate) {
                    $(".dateValOnSelect").empty();
                    $(this).show();
                    $("#result").empty().append($('.eventDate:visible').length);
                    $("#date").empty().append(dateByDateFormatted);
                    $("#mode").empty().append("day");
                } else {
                    $(".dateValOnSelect").empty();
                    $(this).hide();
                }
            }); // END $('ul li').each(function()

                // to display 'No events' message & events summary 
                if ($('ul').children(':visible').length == 0) {
                    $(".dateValOnSelect").empty().append("No events today!");
                    $("#result").empty().append($('.eventDate:visible').length);
                    $("#date").empty().append(dateByDateFormatted);
                    $("#mode").empty().append("day");
                };

            }); // END $('#by-day').click(function() {
// #by-day Button ENDS ******************************************

// #by-week Button STARTS ***************************************
            $('#by-week').off().click(function () {

                // switch between monthly and weekly events
                $('ul li').hide();

                var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
                var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
                var startDateFormatted = $.datepicker.formatDate("D, MM dd, yy", startDate);
                var endDateFormatted = $.datepicker.formatDate("D, MM dd, yy", endDate);

                $('#sub-header').empty().append("Week of " + startDateFormatted );

                var daysOfWeek = [];
                for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                    daysOfWeek.push(new Date(d));
                };

                for (let i = 0; i <= daysOfWeek.length; i++) {

                    var daysOfWeekFormatted = $.datepicker.formatDate("D, MM dd, yy", daysOfWeek[i]);

                    startDate.setDate(startDate.getDate() + 1);

                    //loop through events to sort by date 
                    $('ul li').each(function () {
                        var eventDate = $(this).find('.eventDate').text();

                        if (eventDate == daysOfWeekFormatted) {
                            $(".dateValOnSelect").empty();                           
                            $(this).show();

                            $("#result").empty().append($('.eventDate:visible').length);
                            $("#date").empty().append(dateValOnSelect);
                            $("#mode").empty().append("week");

                        } // END if ( eventDate == daysOfWeekFormatted ) {   

                    }); // END $('ul li').each(function()
                }; // END for (let i = 0; i <= daysOfWeek.length; i++) {

                // to display 'No events' message & events summary ge 
                if ($('ul').children(':visible').length == 0) {
                    $(".dateValOnSelect").empty().append("No events this week!");
                    $("#result").empty().append($('.eventDate:visible').length);
                    $("#date").empty().append(dateValOnSelect);
                    $("#mode").empty().append("week");
                };

            }); // END $('#by-week').click(function() {

// #by-week Button ENDS ***************************************

// #by-month Button STARTS ************************************
            $('#by-month').off().click(function () {

                var startDate = new Date(date.getFullYear(), date.getMonth());
                var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                var startDateFormatted = $.datepicker.formatDate("D, MM dd, yy", startDate);
                var endDateFormatted = $.datepicker.formatDate("D, MM dd, yy", endDate);

                $('#sub-header').empty().append("Month of " + startDateFormatted );

                var daysOfMonth = [];
                for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                    daysOfMonth.push(new Date(d));
                };

                for (let i = 0; i <= daysOfMonth.length; i++) {
                    var daysOfMonthFormatted = $.datepicker.formatDate("D, MM dd, yy", daysOfMonth[i]);

                    startDate.setDate(startDate.getDate() + 1);

                    //loop through events to sort by date 
                    $('ul li').each(function () {

                        var eventDate = $(this).find('.eventDate').text();

                        if (eventDate == daysOfMonthFormatted) {
                            $(".dateValOnSelect").empty();
                            $(this).show();

                            $("#result").empty().append($('.eventDate:visible').length);
                            $("#date").empty().append(dateValOnSelect);
                            $("#mode").empty().append("month");
                        }

                    }); // END $('ul li').each(function()
                }; // END for (let i = 0; i <= daysOfMonth.length; i++) {

                // to display 'No events' message & events summary 
                if ($('ul').children(':visible').length == 0) {
                    $(".dateValOnSelect").empty().append("No events this month!");
                    $("#result").empty().append($('.eventDate:visible').length);
                    $("#date").empty().append(dateValOnSelect);
                    $("#mode").empty().append("month");                    
                };
            }); // END $('#by-month').click(function() {
// #by-month Button ENDS ************************************

        }, // END onSelect: function(dateText, inst) { 
    }); // END $('#datepicker').datepicker( {

    //make the current date being onSelect on page load
    $('.ui-datepicker-current-day').click();

}); //END $(function() {
