$(document).ready(function() {
    /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        // check if scroll position is 0
        if (prevScrollpos > currentScrollPos || currentScrollPos === 0) {
            document.getElementById("siteNav").style.top = "0";
        } else {
            document.getElementById("siteNav").style.top = "-66px";
        }
        prevScrollpos = currentScrollPos;
    }

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay, #altSearch').on('click', function() {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse, #altSearch').on('click', function() {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});