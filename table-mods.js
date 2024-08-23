/* URL pattern: https://www.dndbeyond.com/characters/*abovevtt=true */
setTimeout(() => {
    const mt = Mousetrap;
    //cycle between modes of showing combat&log
    cyclelog = function () {
        setTimeout(() => $('#combat_button').click(), 20);
        if ($('#combat_tracker_inside').is(':visible')) {
            //make sure gamelog selected
            change_sidbar_tab($('#switch_gamelog'), true);
            $('#hide_rightpanel').click();
        }
    };
    mt.bind('g', cyclelog); //for debug on non-Enter kbd
    mt.bind('Enter', cyclelog);
    mt.bind('.', () => { //hightight and center current combat token
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
    //Use number keys to collect some dice to roll in a short time
    collectSome = function (d, n) {
        if (mt.collectdice) {
            clearTimeout(mt.collectTimeout);
            mt.collectdice[d] = (mt.collectdice[d] || 0) + n;
        } else {
            mt.collectdice = { [d]: n };
        }
        mt.collectTimeout = setTimeout(() => {
            e = Object.keys(mt.collectdice)
                .map((k) => '' + (mt.collectdice[k] || '2') + k + ' ')
                .join('+');
            delete mt.collectdice;
            window.diceRoller.roll(new DiceRoll(e, 'Table Roll', 'roll'));
        }, 1500);
    };
    mt.bind('3', function () {
        collectSome('d20kh1', 0);
    });
    mt.bind('1', function () {
        collectSome('d20kl1', 0);
    });
    mt.bind('2', function () {
        collectSome('d20', 1);
    });
    mt.bind('9', function () {
        collectSome('d10', 1);
    });
    mt.bind('4', function () {
        collectSome('d4', 1);
    });
    mt.bind('6', function () {
        collectSome('d6', 1);
    });
    mt.bind('8', function () {
        collectSome('d8', 1);
    });
    mt.bind('5', function () {
        collectSome('d12', 1);
    });
    mt.bind('7', function () {
        collectSome('d100', 1);
    });
    // make sure controls are hidden at startup
    if (!$('#hide_interface_button').hasClass('unhidden')) {
        if ($('#hide_rightpanel').hasClass('point-right')) {
            $('#hide_rightpanel').click();
        }
        if (is_characters_page()) {
            hide_player_sheet();
        }
        $('.dice-toolbar').hide();
        $('#hide_interface_button').show().addClass('unhidden');
        $('.hideable').hide();
    }
    // wait long enough to make sure everything is settled
    // (15s is by experiment with medium complex situ)
}, 15000);
