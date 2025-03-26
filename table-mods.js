/* URL pattern: https://www.dndbeyond.com/characters/*abovevtt=true */
setTimeout(() => {
    const mt = Mousetrap;
    $("#splash").remove(); //remove splash on new version
    myHidePanel = () => setTimeout(() => $('#hide_rightpanel').click(), 20);
    myHideSheetButton = () => setTimeout(() => $('#sheet_button').hide(), 2000);
    myHideCombatFooter = () => setTimeout(() => {
        document.querySelector('#combat_tracker_inside').style.height="850px";
        $('#combat_footer').hide()}, 2000);    
    //cycle between modes of showing combat&log
    cyclelog = function () {
        setTimeout(() => $('#combat_button').click(), 20);
        myHideCombatFooter();
        if ($('#combat_tracker_inside').is(':visible')) {
            //make sure gamelog selected
            change_sidbar_tab($('#switch_gamelog'), true);
            myHidePanel();
        }
        myHideSheetButton();
    };
    mt.bind('g', cyclelog); //for debug on non-Enter kbd
    mt.bind('/', cyclelog);
    mt.bind('*', () => { //hightight and center current combat token
        current = $('#combat_area tr[data-current=1]');
        if (current) {
            target = current.attr('data-target');
            if (target in window.TOKEN_OBJECTS) {
                window.TOKEN_OBJECTS[target].highlight();
            } else {
                place_token_in_center_of_view(window.all_token_objects[target].options);
            }
        }
    });
    // make sure controls are hidden at startup
    if (!$('#hide_interface_button').hasClass('unhidden')) {
        if ($('#hide_rightpanel').hasClass('point-right')) {
            myHidePanel();
        }
        if (is_characters_page()) {
            hide_player_sheet();
        }
        //$('.dice-toolbar').hide();
        $('#hide_interface_button').show().addClass('unhidden');
        $('.hideable').hide();
    }
    myHideCombatFooter();
    myHideSheetButton();
    // wait long enough to make sure everything is settled
    // (15s is by experiment with medium complex situ)
}, 15000);
