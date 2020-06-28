//general variables
let type, colors, image = [''], lHead = [''], sHead = [''], tempCode = '';

//post variables
let temp_post, tag = [''];

//timeline variables
let tevent = [0], years = [], months = [], events = [], timeline;

//tracker variables
let thread = [0], tYears = [], tMonths = [], threads = [], tracking;

//dev variables
let imageNum = [0], songNum = [0], quote, source, images, songs, columns;


//Show/Hide Basic Fields
showhide('image', 'ifImg');
showhide('lh', 'ifLH');
showhide('sh', 'ifSH');
showhide('nt', 'ifNT');

//Show/Hide Complex Fields
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


//Set Variables
function setValues() {

    //set image
    fromRadio('image', image, '<ib><img src="', '"></ib>');
    fromRadio('lh', lHead, '<h1>', '</h1>');
    fromRadio('sh', sHead, '<h2>', '</h2>');
    fromRadio('nt', tag, '<tag>', '</tag>');
    type = $('input[name="type"]:checked').val();

    //timeline vs tracker
    if(type == 'timeline') {
        timeline = orderEvents(tevent[0], years, months, events, type, 'ev');
    } else if (type == 'tracker') {
        tracking = orderEvents(thread[0], tYears, tMonths, threads, type, 'post');
    } else if (type == 'imagedev') {

    }

    //set image dev
    columns = $('input[name="cols"]:checked').val();
    images = setImageDev('i');
    
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
}


//Create Flexible Fields
function addFieldSet(fieldVar, fieldType) {
    switch(fieldType) {
        case 'event':
            $('.ifTime span.timeline').append('<input type="text" name="ev' + fieldVar + '" class="year" placeholder="YYYY" /><input type="text" name="ev' + fieldVar + '" class="month" placeholder="MM" /><input type="text" name="ev' + fieldVar + '" class="event" placeholder="Event" />');
            break;    
        case 'thread':
            $('.ifTrack span.tracker').append('<input type="text" name="post' + fieldVar + '" class="title" placeholder="Thread Title" /><input type="text" name="post' + fieldVar + '" class="tid" placeholder="Topic ID" /><select name="post' + fieldVar + '" class="status"><option value="ip">in progress</option><option value="c">complete</option><option value="ic">incomplete</option></select><input type="text" name="post' + fieldVar + '" class="feat" placeholder="Featuring" /><input type="text" name="post' + fieldVar + '" class="year" placeholder="YYYY" /><input type="text" name="post' + fieldVar + '" class="month" placeholder="Month" /><input type="text" name="post' + fieldVar + '" class="location" placeholder="location" />');
            break;
        case 'imageNum':
            $('.ifImage span.urls').append('<input type="text" name="i' + imageNum + '" class="iLink" />');
            break;
        case 'songNum':
            $('.ifMusic span.songList').append('<input type="text" name="s' + imageNum + '" class="songTitle" placeholder="Song Name" /><input type="text" name="s' + imageNum + '" class="songArtist" placeholder="Song Artist" />');
            break;
    }  
}


//Build Complex Content
function buildTimeline (yearArray, monthArray, eventArray) {    
    for (var i = 0; i < yearArray.length; i++) {
        monthArray.sort();
        var tempYear = '<section><year>' + yearArray[i] + '</year><events>\n';
        for (var j = 0; j < monthArray[i].length; j++) {
            console.log(monthArray[i]);
            switch(monthArray[i][j].split('-')[2]) {
                case '1':
                    tempYear += '<b>January</b>\n';
                    break;
                case '2':
                    tempYear += '<b>February</b>\n';
                    break;
                case '3':
                    tempYear += '<b>March</b>\n';
                    break;
                case '4':
                    tempYear += '<b>April</b>\n';
                    break;
                case '5':
                    tempYear += '<b>May</b>\n';
                    break;
                case '6':
                    tempYear += '<b>June</b>\n';
                    break;
                case '7':
                    tempYear += '<b>July</b>\n';
                    break;
                case '8':
                    tempYear += '<b>August</b>\n';
                    break;
                case '9':
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
}

function buildTracker (yearArray, monthArray, eventArray) {
    for (var i = 0; i < yearArray.length; i++) {
        monthArray[i].sort();
        var tempThread = '', currMonth = '';   
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


//Build Final Content
function setPostCode() {
    var code =     '<span class="' +
                    $('input[name="char"]').val() +
                    '"><div class="sslp-wrap">' + '\n\n' +
                    image + '\n\n' +
                    lHead + '\n\n' +
                    sHead + '\n\n' +
                    '<div class="sslp-scroll">' + '\n\n' + 
                    $('#postText').val() + '\n\n' +
                    '</div>' + '\n\n' +
                    tag + '\n\n' +
                    '</div></span><link href="//dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                    colors;
    return code;
}

function setTrackerCode() {
    var code =  '<span class="scroll ' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap tracker">' + '\n\n' +
                image + '\n\n' +
                lHead + '\n\n' +
                sHead + '\n\n' +
                '<div class="sslp-scroll">' + '\n\n' + 
                tracking + '\n\n' +
                '</div>' + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}

function setImageCode() {
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap">' + '\n\n' + 
                image + '\n\n' +
                lHead + '\n\n' +
                sHead + '\n\n' +
                '<span class="imgdev col' + columns + '">' + '\n\n' +
                images + '\n\n' + 
                '</span>' + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}

function setPlaylistCode() {
    var code =  '<span class="scroll ' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap playlist">' + '\n\n' +
                image + '\n\n' +
                lHead + '\n\n' +
                sHead + '\n\n' +
                '<div class="sslp-scroll">' + '\n\n' + 
                songs + '\n\n' + 
                '</div>' + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}

function setQuoteCode() {
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap quote">' + '\n\n' +
                image + '\n\n' +
                lHead + '\n\n' +
                sHead + '\n\n' +
                quote + '\n\n' +
                source + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}

function setTimelineCode() {
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap timeline">' + '\n\n' +
                image + '\n\n' +
                lHead + '\n\n' +
                sHead + '\n\n' +
                timeline + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}