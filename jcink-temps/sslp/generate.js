//Show/Hide Fields
$('input[name="image"]').change(function () {
	if($(this).val() == 'imgY') {
		$('.ifImg').show();
	} else {
		$('.ifImg').hide();
	}
});
$('input[name="lh"]').change(function () {
	if($(this).val() == 'lhY') {
		$('.ifLH').show();
	} else {
		$('.ifLH').hide();
	}
});
$('input[name="sh"]').change(function () {
	if($(this).val() == 'shY') {
		$('.ifSH').show();
	} else {
		$('.ifSH').hide();
	}
});
$('input[name="nt"]').change(function () {
	if($(this).val() == 'ntY') {
		$('.ifNT').show();
	} else {
		$('.ifNT').hide();
	}
});
$('input[name="type"]').change(function () {
	switch($(this).val()) {
        case 'posting': 
            $('.typeSwitch').hide();
            $('.ifPost').show();
            break;
        case 'timeline': 
            $('.typeSwitch').hide();
            $('.ifTime').show();
            break;
        case 'tracker': 
            $('.typeSwitch').hide();
            $('.ifTrack').show();
            break;
        case 'playlist': 
            $('.typeSwitch').hide();
            $('.ifMusic').show();
            break;
        case 'imagedev': 
            $('.typeSwitch').hide();
            $('.ifImage').show();
            break;
        case 'quotedev': 
            $('.typeSwitch').hide();
            $('.ifQuote').show();
            break;
        default:
            console.log('template type: ' + $(this).val());
            break;
    }
});

//Timeline Events
var event = 0, years = [], months = [], events = [], thread = 0, tYears = [], tMonths = [], threads = [], imageNum = 0, songNum = 0;
function addEvent() {
    event++;
    $('.ifTime span.timeline').append('<input type="text" name="ev' + event + '" class="year" placeholder="YYYY" /><input type="text" name="ev' + event + '" class="month" placeholder="MM" /><input type="text" name="ev' + event + '" class="event" placeholder="Event" />');
}
function addEvents() {
    for(var i = 0; i < $('input[name="addEvents"]').val(); i++) {
        addEvent();
    }
}
function addThread() {
    thread++;
    $('.ifTrack span.tracker').append('<input type="text" name="post' + thread + '" class="title" placeholder="Thread Title" /><input type="text" name="post' + thread + '" class="tid" placeholder="Topic ID" /><select name="post' + thread + '" class="status"><option value="ip">in progress</option><option value="c">complete</option><option value="ic">incomplete</option></select><input type="text" name="post' + thread + '" class="feat" placeholder="Featuring" /><input type="text" name="post' + thread + '" class="year" placeholder="YYYY" /><input type="text" name="post' + thread + '" class="month" placeholder="Month" /><input type="text" name="post' + thread + '" class="location" placeholder="location" />');
}
function addThreads() {
    for(var i = 0; i < $('input[name="addThreads"]').val(); i++) {
        addThread();
    }
}
function addImage() {
    imageNum++;
    $('.ifImage span.urls').append('<input type="text" name="i' + imageNum + '" class="iLink" />');
}
function addImages() {
    for(var i = 0; i < $('input[name="addImages"]').val(); i++) {
        addImage();
    }
}
function addSong() {
    songNum++;
    $('.ifMusic span.songList').append('<input type="text" name="s' + imageNum + '" class="songTitle" placeholder="Song Name" /><input type="text" name="s' + imageNum + '" class="songArtist" placeholder="Song Artist" />');
}
function addSongs() {
    for(var i = 0; i < $('input[name="addSongs"]').val(); i++) {
        addSong();
    }
}


//Template Production

$('#updateTemp').on('click', function() {
    var type, temp_post, temp_track, temp_image, temp_music, temp_quote, temp_time, colors, image, lHead, sHead, tag = '', timeline, tracking, quote, source, images, songs, columns;

    //set image
    if($('input[name="image"]:checked').val() == 'imgY') {
        image = '<ib><img src="' + $('input[name="imgURL"]').val() + '" /></ib>';
    } else {
        image = '';
    }

    //set large header
    if($('input[name="lh"]:checked').val() == 'lhY') {
        lHead = '<h1>' + $('input[name="lhText"]').val() + '</h1>';
    } else {
        lHead = '';
    }

    //set small header
    if($('input[name="sh"]:checked').val() == 'shY') {
        sHead = '<h2>' + $('input[name="shText"]').val() + '</h2>';
    } else {
        sHead = '';
    }

    //set notes / tag
    if($('input[name="nt"]:checked').val() == 'ntY') {
        if($('input[name="ntText"]').val().trim() != '') {
            tag = '<tag>' + $('input[name="ntText"]').val() + '</tag>';
        } else {
            tag = '';
        }
    } else {
        tag = '';
    }
    type = $('input[name="type"]:checked').val();

    //timeline vs tracker
    if(type == 'timeline') {
        timeline = orderEvents(event, years, months, events, type);
    } else if (type == 'tracker') {
        tracking = orderEvents(thread, tYears, tMonths, threads, type);
    }

    //set image dev
    columns = $('input[name="cols"]:checked').val();
    images = '';
    for (var i = 0; i <= imageNum; i++) {
        var tempImage = '<img src="' + $('input[name="i' + i + '"]').val() + '">\n';
        images += tempImage;
    }
    
    //set song dev
    songs = '';
    $('.songTitle').each(function() {
        songs += '<song><i class="fas fa-play"></i>\n<b>' + $(this).val() + '</b><span>' + $(this).next().val() + '</span></song>\n';
    });

    //set quote details
    quote = $('#quoteBody').val();
    source = '<tag>— ' + $('input[name="quoteSource"]').val() + '</tag>';

    //set up color styles
    colors =        '<style>.' +
                    $('input[name="char"]').val() +
                    ' {--accent: ' +
                    $('input[name="accent"]').val() +
                    '; --dkAccent: ' +
                    $('input[name="dkAccent"]').val() +
                    ';}</style>';
    
    //set post code setup
    temp_post =     '<span class="' +
                    $('input[name="char"]').val() +
                    '"><div class="sslp-wrap">' + '\n\n' +
                    image + '\n\n' +
                    lHead + '\n\n' +
                    sHead + '\n\n' +
                    '<div class="sslp-scroll">' + '\n\n' + 
                    $('#postText').val() + '\n\n' +
                    '</div>' + '\n\n' +
                    tag + '\n\n' +
                    '</div></span>' + '\n\n' +
                    colors;

    //set tracker code setup
    temp_track =    '<span class="scroll ' +
                    $('input[name="char"]').val() +
                    '"><div class="sslp-wrap tracker">' + '\n\n' +
                    image + '\n\n' +
                    lHead + '\n\n' +
                    sHead + '\n\n' +
                    '<div class="sslp-scroll">' + '\n\n' + 
                    tracking + '\n\n' +
                    '</div>' + '\n\n' +
                    '</div></span>' + '\n\n' +
                    colors;

    //set image code setup
    temp_image =    '<span class="' +
                    $('input[name="char"]').val() +
                    '"><div class="sslp-wrap">' + '\n\n' + 
                    image + '\n\n' +
                    lHead + '\n\n' +
                    sHead + '\n\n' +
                    '<span class="imgdev col' + columns + '">' + '\n\n' +
                    images + '\n\n' + 
                    '</span>' + '\n\n' +
                    '</div></span>' + '\n\n' +
                    colors;

    //set playlist code setup
    temp_music =    '<span class="scroll ' +
                    $('input[name="char"]').val() +
                    '"><div class="sslp-wrap playlist">' + '\n\n' +
                    image + '\n\n' +
                    lHead + '\n\n' +
                    sHead + '\n\n' +
                    '<div class="sslp-scroll">' + '\n\n' + 
                    songs + '\n\n' + 
                    '</div>' + '\n\n' +
                    '</div></span>' + '\n\n' +
                    colors;

    //set quote code setup
    temp_quote =    '<span class="' +
                    $('input[name="char"]').val() +
                    '"><div class="sslp-wrap quote">' + '\n\n' +
                    image + '\n\n' +
                    lHead + '\n\n' +
                    sHead + '\n\n' +
                    quote + '\n\n' +
                    source + '\n\n' +
                    '</div></span>' + '\n\n' +
                    colors;

    //set timeline code setup
    temp_time =     '<span class="' +
                    $('input[name="char"]').val() +
                    '"><div class="sslp-wrap timeline">' + '\n\n' +
                    image + '\n\n' +
                    lHead + '\n\n' +
                    sHead + '\n\n' +
                    timeline + '\n\n' +
                    '</div></span>' + '\n\n' +
                    colors;

    switch(type) {
        case 'posting': 
            $('#display').html(temp_post);
            var copyCode = temp_post.replace(/>/ig, '&gt;').replace(/</ig, '&lt;');
            $('#code').html('[dohtml]' + copyCode + '[/dohtml]');
            break;
        case 'timeline': 
            $('#display').html(temp_time);
            var copyCode = temp_time.replace(/>/ig, '&gt;').replace(/</ig, '&lt;');
            $('#code').html('[dohtml]' + copyCode + '[/dohtml]');
            break;
        case 'tracker': 
            $('#display').html(temp_track);
            var copyCode = temp_track.replace(/>/ig, '&gt;').replace(/</ig, '&lt;');
            $('#code').html('[dohtml]' + copyCode + '[/dohtml]');
            break;
        case 'playlist': 
            $('#display').html(temp_music);
            var copyCode = temp_music.replace(/>/ig, '&gt;').replace(/</ig, '&lt;');
            $('#code').html('[dohtml]' + copyCode + '[/dohtml]');
            break;
        case 'imagedev': 
            $('#display').html(temp_image);
            var copyCode = temp_image.replace(/>/ig, '&gt;').replace(/</ig, '&lt;');
            $('#code').html('[dohtml]' + copyCode + '[/dohtml]');
            break;
        case 'quotedev': 
            $('#display').html(temp_quote);
            var copyCode = temp_quote.replace(/>/ig, '&gt;').replace(/</ig, '&lt;');
            $('#code').html('[dohtml]' + copyCode + '[/dohtml]');
            break;
        default:
            $('#display').html('Please select a template.');
            break;
    }
});


//selection code
$('selectCode').on('click', function() {
	var selected = $('pre').children('code');
	selected.selectText();
});

jQuery.fn.selectText = function(){
    var doc = document, element = this[0], range, selection;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

//order by month and year
function orderEvents(num, yearArray, monthArray, eventArray, type) {
    yearArray = [];
    monthArray = [];
    eventArray = [];
    if (type == 'timeline') {
        for (var i = 0; i <= num; i++) {
            var year = $('input[name="ev' + i + '"]').val();
            if(jQuery.inArray(year, yearArray) == -1) {
                yearArray.push(year);
            }
        }
    } else {
        for (var i = 0; i <= num; i++) {
            var year = $('input[name="post' + i + '"].year').val();
            if(jQuery.inArray(year, yearArray) == -1) {
                yearArray.push(year);
            }
        }
    }
    yearArray.sort();

    //set up months per year
    for (var i = 0; i < yearArray.length; i++) {
        var monthGroups = [];
        
        $('.' + type + ' .month').each(function () {
            if ($(this).prev().val() == yearArray[i]) {
                switch($(this).val()) {
                    case '01' || '1':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '02' || '2':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '03' || '3':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '04' || '4':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '05' || '5':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '06' || '6':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '07' || '7':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '08' || '8':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '09' || '9':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '10':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '11':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    case '12':
                        var month = 'ym-' + yearArray[i] + '-' + $(this).val();
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                    default:
                        var month = 'ym-' + yearArray[i];
                        if(jQuery.inArray(month, monthGroups) == -1) {
                            monthGroups.push(month);
                        }
                        break;
                }
            }
        });
        monthArray.push(monthGroups);
    }
    
    //set up timeline
    if(type == 'timeline') {
        for (var i = 0; i < yearArray.length; i++) {
            monthArray[i].sort();
            var tempYear = '<section><year>' + yearArray[i] + '</year><events>\n';
            for (var j = 0; j < monthArray[i].length; j++) {
                switch(monthArray[i][j].split('-')[2]) {
                    case '01' || '1':
                        tempYear += '<b>January</b>\n';
                        break;
                    case '02' || '2':
                        tempYear += '<b>February</b>\n';
                        break;
                    case '03' || '3':
                        tempYear += '<b>March</b>\n';
                        break;
                    case '04' || '4':
                        tempYear += '<b>April</b>\n';
                        break;
                    case '05' || '5':
                        tempYear += '<b>May</b>\n';
                        break;
                    case '06' || '6':
                        tempYear += '<b>June</b>\n';
                        break;
                    case '07' || '7':
                        tempYear += '<b>July</b>\n';
                        break;
                    case '08' || '8':
                        tempYear += '<b>August</b>\n';
                        break;
                    case '09' || '9':
                        tempYear += '<b>September</b>\n';
                        break;
                    case '10':
                        tempYear += '<b>October</b>\n';
                        break;
                    case '11':
                        tempYear += '<b>November</b>\n';
                        break;
                    case '12':
                        tempYear += '<b>December</b>\n';
                        break;
                    default:
                        console.log('no month');
                        break;
                }
                $('.event').each(function () {
                    if($(this).prev().prev().val() == yearArray[i] && $(this).prev().val() == monthArray[i][j].split('-')[2]) {
                        tempYear += '<event>' + $(this).val() + '</event>\n';
                    }
                });
            }
            tempYear += '</events></section>';
            eventArray.push(tempYear);
        }
        var eventList = '';
        for (var i = 0; i < eventArray.length; i++) {
            eventList += eventArray[i];
        }
        return eventList;
    } else {
        //set up tracker threads
        for (var i = 0; i < yearArray.length; i++) {
            monthArray[i].sort();
            var tempThread = '';
            for (var j = 0; j < monthArray[i].length; j++) {                
                $('.tracker .title').each(function() {
                    if(     $(this).next().next().next().next().val() == yearArray[i] &&
                            $(this).next().next().next().next().next().val() == monthArray[i][j].split('-')[2]
                        ) {

                            switch(monthArray[i][j].split('-')[2]) {
                                case '01' || '1':
                                    currMonth = 'January';
                                    break;
                                case '02' || '2':
                                    currMonth = 'February';
                                    break;
                                case '03' || '3':
                                    currMonth = 'March';
                                    break;
                                case '04' || '4':
                                    currMonth = 'April';
                                    break;
                                case '05' || '5':
                                    currMonth = 'May';
                                    break;
                                case '06' || '6':
                                    currMonth = 'June';
                                    break;
                                case '07' || '7':
                                    currMonth = 'July';
                                    break;
                                case '08' || '8':
                                    currMonth = 'August';
                                    break;
                                case '09' || '9':
                                    currMonth = 'September';
                                    break;
                                case '10':
                                    currMonth = 'October';
                                    break;
                                case '11':
                                    currMonth = 'November';
                                    break;
                                case '12':
                                    currMonth = 'December';
                                    break;
                                default:
                                    console.log('no month');
                                    break;
                            }
                        
                        if($(this).next().next().children(':selected').val() == 'ip') {
                            //in progress
                            tempThread += '<thread><i class="far fa-square"></i><div>\n<a href="?showtopic=' + $(this).next().val() + '"><b>' + $(this).val() + '</b></a> ft. ' + $(this).next().next().next().val() + '</div>\n<span>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</span></thread>';
                        } else if ($(this).next().next().children(':selected').val() == 'c') {
                            //complete
                            tempThread += '<thread><i class="far fa-check-square"></i><div>\n<a href="?showtopic=' + $(this).next().val() + '"><b>' + $(this).val() + '</b></a> ft. ' + $(this).next().next().next().val() + '</div>\n<span>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</span></thread>';
                        } else if ($(this).next().next().children(':selected').val() == 'ic') {
                            //incomplete
                            tempThread += '<thread><i class="far fa-times-square"></i><div>\n<a href="?showtopic=' + $(this).next().val() + '"><b>' + $(this).val() + '</b></a> ft. ' + $(this).next().next().next().val() + '</div>\n<span>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</span></thread>';
                        }
                    }
                });
            }
            eventArray.push(tempThread);
        }
        var threadList = '';
        for (var i = 0; i < eventArray.length; i++) {
            threadList += eventArray[i];
        }
        return threadList;
    }
}