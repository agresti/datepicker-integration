$(function () {

    // Utility function to filter events by dates
    function filterEventsByDates(datesArray, headerText, modeLabel, fallbackMessage) {
        $('ul li').hide();
        $(".dateValOnSelect").empty();
        $('#sub-header').empty().append(headerText);

        let matches = 0;

        $('ul li').each(function () {
            const eventDate = $(this).find('.eventDate').text();
            if (datesArray.includes(eventDate)) {
                $(this).show();
                matches++;
            }
        });

        if (matches === 0) {
            $(".dateValOnSelect").append(fallbackMessage);
        }

        $("#result").empty().append(matches);
        $("#date").empty().append(headerText);
        $("#mode").empty().append(modeLabel);
    }

    // Initialize the datepicker
    $('#datepicker').datepicker({
        showOtherMonths: true,

        onSelect: function () {
            const date = $(this).datepicker('getDate');
            const dateValOnSelect = $.datepicker.formatDate("D, MM dd, yy", date);

            // Filter events for the selected day
            filterEventsByDates([dateValOnSelect], dateValOnSelect, "day", "No events today!");

            // #by-day Button
            $('#by-day').off().click(function () {
                const formattedDate = $.datepicker.formatDate("D, MM dd, yy", date);
                filterEventsByDates([formattedDate], formattedDate, "day", "No events today!");
            });

            // #by-week Button
            $('#by-week').off().click(function () {
                const start = new Date(date);
                start.setDate(date.getDate() - date.getDay());

                const end = new Date(start);
                end.setDate(start.getDate() + 6);

                const daysOfWeek = [];
                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    daysOfWeek.push($.datepicker.formatDate("D, MM dd, yy", new Date(d)));
                }

                const weekHeader = "Week of " + daysOfWeek[0];
                filterEventsByDates(daysOfWeek, weekHeader, "week", "No events this week!");
            });

            // #by-month Button
            $('#by-month').off().click(function () {
                const start = new Date(date.getFullYear(), date.getMonth(), 1);
                const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                const daysOfMonth = [];
                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    daysOfMonth.push($.datepicker.formatDate("D, MM dd, yy", new Date(d)));
                }

                const monthHeader = "Month of " + daysOfMonth[0];
                filterEventsByDates(daysOfMonth, monthHeader, "month", "No events this month!");
            });

        } // end onSelect
    }); // end datepicker

    // Select current day on load
    $('#datepicker').datepicker("setDate", new Date());

});
