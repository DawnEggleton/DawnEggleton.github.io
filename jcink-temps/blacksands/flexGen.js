//general variables
let type, colors, image = [''], lHead = [''], sHead = [''], tempCode = '', idHead = [''];

//post variables
let temp_post, tag = [''], messages;

//timeline variables
let tevent = [0], years = [], months = [], events = [], timeline;

//tracker variables
let thread = [0], tYears = [], tMonths = [], threads = [], tracking;

//dev variables
let imageNum = [0], songNum = [0], quote, source, images, songs, columns;


//Show/Hide Basic Fields
showhide('lh', 'ifLH');
showhide('ih', 'ifIH');
showhide('idt', 'ifIDT');


$('input[name="tc"]').change(function () {
    if($(this).val() == 'y') {
        $('.ifCustomCol').show();
        $('.ifGroupCol').hide();
    } else if($(this).val() == 'n') {
        $('.ifCustomCol').hide();
        $('.ifGroupCol').show();
    } else {
        $('.ifGroupCol').hide();
        $('.ifCustomCol').hide();
    }
});

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
        case 'wanted': 
            $('.typeSwitch').hide();
            $('.ifWant').show();            
            var html = '';
            for (var i = 0; i < $('#charCount').val(); i++) {
                html += '<span class="twoCol altCol"><span><input id="charName' + i + '" placeholder="Section Title" /><input id="charImg' + i + '" placeholder="Section Image" style="margin-top: 20px;" /></span><textarea id="charText' + i + '"placeholder="Section Contents"></textarea></span>';
            }
            $('.wantContents').html(html);
            break;
        case 'phone': 
            $('.typeSwitch').hide();
            $('.ifPhone').show();         
            var html = '';
            for (var i = 0; i < $('#msgCount').val(); i++) {
                html += '<textarea class="message" id="msg' + i + '"></textarea>';
            }
            $('.msgContents').html(html);
            break;
        case 'tabbed': 
            $('.typeSwitch').hide();
            $('.ifTab').show();            
            var html = '';
            for (var i = 0; i < $('#tabCount').val(); i++) {
                html += '<span class="twoCol altCol"><input id="tabTitle' + i + '" placeholder="Tab Title" /><textarea id="tabText' + i + '"placeholder="Tab Contents"></textarea></span>';
            }
            $('.tabContents').html(html);
            break;
        default:
            console.log('template type: ' + $(this).val());
            break;
    }
});


$('input[name="tabCount"]').change(function() {
    var html = '';
    for (var i = 0; i < $(this).val(); i++) {
        html += '<span class="twoCol altCol"><input id="tabTitle' + i + '" placeholder="Tab Title" /><textarea id="tabText' + i + '"placeholder="Tab Contents"></textarea></span>';
    }
    $('.tabContents').html(html);
});
$('input[name="charCount"]').change(function() {
    var html = '';
    for (var i = 0; i < $(this).val(); i++) {
        html += '<span class="twoCol altCol"><span><input id="charName' + i + '" placeholder="Section Title" /><input id="charImg' + i + '" placeholder="Section Image" style="margin-top: 20px;" /></span><textarea id="charText' + i + '"placeholder="Section Contents"></textarea></span>';
    }
    $('.wantContents').html(html);
});
$('input[name="msgCount"]').change(function() {
    var html = '';
    for (var i = 0; i < $(this).val(); i++) {
        html += '<textarea class="message" id="msg' + i + '"></textarea>';
    }
    $('.msgContents').html(html);
});


//Set Variables
function setValues() {

    //set image
    fromRadio('lh', lHead, '', '');
    fromRadio('idt', idHead, '', '');
    type = $('input[name="type"]:checked').val();

    //timeline vs tracker
    if(type == 'timeline') {
        timeline = orderEvents(tevent[0], years, months, events, type, 'ev');
    } else if (type == 'tracker') {
        tracking = orderEvents(thread[0], tYears, tMonths, threads, type, 'post');
    } else if (type == 'imagedev') {

    }

    //set phone messages
    messages = '';
    $('.message').each(function() {
        messages += '<div class="bs-phoneMsg">' + $(this).val() + '</div>\n';
    });

    //set image dev
    columns = $('input[name="cols"]:checked').val();
    images = setImageDev('i');
    
    //set song dev
    songs = '';
    $('.songTitle').each(function() {
        songs += '<div class="bs-phoneSong"><i class="fas fa-play"></i>\n<b>' + $(this).val() + '</b><i>' + $(this).next().val() + '</i></div>\n';
    });

    //set up color styles
    var fadeAccentArr = hexToRgb($('input[name="brightAccent"]').val().split('#')[1]);
    var fadeAccent = 'rgba(' + fadeAccentArr.r + ', ' + fadeAccentArr.g + ', ' + fadeAccentArr.b + ', 0.3)';
    colors =        '<style>' +
                    '.' + $('input[name="char"]').val() + ' .bs-tempBox,' +
                    '.' + $('input[name="char"]').val() + ' .bs-phoneCase' +
                    ' {--darkAccent: ' +
                    $('input[name="darkAccent"]').val() +
                    '; --brightAccent: ' +
                    $('input[name="brightAccent"]').val() +
                    '; --brightTrans: ' +
                    fadeAccent +
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
        var tempYear = '<div class="bs-content">\n';
        for (var j = 0; j < monthArray[i].length; j++) {
            console.log(monthArray[i]);
            switch(monthArray[i][j].split('-')[2]) {
                case '1':
                    tempYear += '<b>January</b><p>\n';
                    break;
                case '2':
                    tempYear += '<b>February</b><p>\n';
                    break;
                case '3':
                    tempYear += '<b>March</b><p>\n';
                    break;
                case '4':
                    tempYear += '<b>April</b><p>\n';
                    break;
                case '5':
                    tempYear += '<b>May</b><p>\n';
                    break;
                case '6':
                    tempYear += '<b>June</b><p>\n';
                    break;
                case '7':
                    tempYear += '<b>July</b><p>\n';
                    break;
                case '8':
                    tempYear += '<b>August</b><p>\n';
                    break;
                case '9':
                    tempYear += '<b>September</b><p>\n';
                    break;
                case '10':
                    tempYear += '<b>October</b><p>\n';
                    break;
                case '11':
                    tempYear += '<b>November</b><p>\n';
                    break;
                case '12':
                    tempYear += '<b>December</b><p>\n';
                    break;
                default:
                    console.log('no month');
                    break;
            }
            $('.event').each(function () {
                var simpMonth;                
                if(monthArray[i][j].split('-')[2] != '10') {
                    simpMonth = $(this).prev().val().replace('0', '');
                } else {
                    simpMonth = $(this).prev().val();
                }
                if($(this).prev().prev().val() == yearArray[i] && simpMonth == monthArray[i][j].split('-')[2]) {
                    tempYear += $(this).val() + '<p>\n';
                }
            });
        }
        tempYear += '</div>';
        eventArray.push(tempYear);
    }
    var eventList = '';
    for (var i = 0; i < eventArray.length; i++) {
        eventList += eventArray[i];
    }
    return eventList;
}

function buildTracker (yearArray, monthArray, eventArray) {
    var tempThread = '';
    tempThread += '<div class="bs-tempBox"><div class="bs-titleCol"><b>active</b></div><div class="bs-contCol"><div class="bs-content">';
    
    for (var i = 0; i < yearArray.length; i++) {
        monthArray[i].sort();
        var currMonth = '';   
        for (var j = 0; j < monthArray[i].length; j++) {             
            $('.tracker .title').each(function() { 
                var simpMonth;                
                if(monthArray[i][j].split('-')[2] != '10') {
                    simpMonth = $(this).next().next().next().next().next().val().replace('0', '');
                } else {
                    simpMonth = $(this).next().next().next().next().next().val();
                }

                if(     $(this).next().next().next().next().val() == yearArray[i] &&
                        simpMonth == monthArray[i][j].split('-')[2] &&
                        $(this).next().next().children(':selected').val() == 'ip'
                ) {

                    switch(monthArray[i][j].split('-')[2]) {
                        case '01':
                        case '1':
                            currMonth = 'January';
                            break;
                        case '02':
                        case '2':
                            currMonth = 'February';
                            break;
                        case '03':
                        case '3':
                            currMonth = 'March';
                            break;
                        case '04':
                        case '4':
                            currMonth = 'April';
                            break;
                        case '05':
                        case '5':
                            currMonth = 'May';
                            break;
                        case '06':
                        case '6':
                            currMonth = 'June';
                            break;
                        case '07':
                        case '7':
                            currMonth = 'July';
                            break;
                        case '08':
                        case '8':
                            currMonth = 'August';
                            break;
                        case '09':
                        case '9':
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
                    
                    tempThread += '<a href="/index.php?showtopic=' + $(this).next().val() + '">' + $(this).val() + '</a>\n ft. ' + $(this).next().next().next().val() + '<br>\n<i>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</i><p>';
                }
            }); 
        }
    }
    tempThread += '</div></div></div>';
    tempThread += '<div class="bs-tempBox"><div class="bs-titleCol"><b>archived</b></div><div class="bs-contCol"><div class="bs-content">';
    for (var i = 0; i < yearArray.length; i++) {
        monthArray[i].sort();
        var currMonth = '';   
        for (var j = 0; j < monthArray[i].length; j++) {                      
            $('.tracker .title').each(function() {    
                var simpMonth;                
                if(monthArray[i][j].split('-')[2] != '10') {
                    simpMonth = $(this).next().next().next().next().next().val().replace('0', '');
                } else {
                    simpMonth = $(this).next().next().next().next().next().val();
                }
                if(     $(this).next().next().next().next().val() == yearArray[i] &&
                        simpMonth == monthArray[i][j].split('-')[2] &&
                        ($(this).next().next().children(':selected').val() == 'c' || $(this).next().next().children(':selected').val() == 'ic')
                ) {

                    switch(monthArray[i][j].split('-')[2]) {
                        case '01':
                        case '1':
                            currMonth = 'January';
                            break;
                        case '02':
                        case '2':
                            currMonth = 'February';
                            break;
                        case '03':
                        case '3':
                            currMonth = 'March';
                            break;
                        case '04':
                        case '4':
                            currMonth = 'April';
                            break;
                        case '05':
                        case '5':
                            currMonth = 'May';
                            break;
                        case '06':
                        case '6':
                            currMonth = 'June';
                            break;
                        case '07':
                        case '7':
                            currMonth = 'July';
                            break;
                        case '08':
                        case '8':
                            currMonth = 'August';
                            break;
                        case '09':
                        case '9':
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
                    
                    tempThread += '<a href="/index.php?showtopic=' + $(this).next().val() + '">' + $(this).val() + '</a>\n ft. ' + $(this).next().next().next().val() + '<br>\n<i>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</i><p>';
                }
            });  
        }
    }
    tempThread += '</div></div></div>';
    return tempThread;
}


//Build Final Content
function setPostCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="sc"]:checked').val() == 'y') {
        code += 'scroll ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '"><div class="bs-tempBox"><div class="bs-titleCol"><b>';
    code += $('#postTitle').val();
    code += '</b><i class="bs-tempIcon"></i></div><div class="bs-contCol"><div class="bs-content">';
    code += $('#postText').val();
    code += '</div></div></div></span>';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Share+Tech+Mono&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setTrackerCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="sc"]:checked').val() == 'y') {
        code += 'scroll ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '"><div class="bs-tracker">';

    code += tracking;
    
    code += '</div></span>';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Share+Tech+Mono&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setImageCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="sc"]:checked').val() == 'y') {
        code += 'scroll ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += $('input[name="cols"]:checked').val();
    code += '"><div class="bs-tempBox bs-imgDev"><div class="bs-titleCol"><b>';
    code += idHead;
    code += '</b><i class="bs-tempIcon"></i></div><div class="bs-contCol">';

    code += images;
    
    code += '</div></div></span>';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Share+Tech+Mono&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setPlaylistCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="sc"]:checked').val() == 'y') {
        code += 'scroll ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '"><div class="bs-phoneCase"><div class="bs-phoneContent"><div class="bs-phoneBar">';
    code += $('#musicTime').val();
    code += '<span style="float: right;"><i class="fad fa-signal"></i><i class="fad fa-wifi"></i><i class="far fa-battery-full"></i></span></div><div class="bs-phoneMsgs">';

    code += songs;
    
    code += '</div><div class="bs-phoneContact"><img src="';
    code += $('#musicImg').val();
    code += '"><i>currently streaming...</i><b><a href="';
    code += $('#musicLink').val();
    code += '" target="_blank">listen</a></b>';
    code += '</div></div><div class="bs-phoneCut bs-top"></div><div class="bs-phoneCut bs-bottom"></div></div></span>';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Share+Tech+Mono&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setTimelineCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="sc"]:checked').val() == 'y') {
        code += 'scroll ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark';
    }
    code += '"><div class="bs-tempBox bs-timeline"><div class="bs-titleCol"><span><i class="fal fa-angle-up upClass"></i></span><div><div class="bs-years">';

    //do tab labels
    for(var i = 0; i < $('.timeline .year').length; i++) {
        if(jQuery.inArray($('input[name="ev' + i + '"].year').val(), years) == -1) {
            years.push($('input[name="ev' + i + '"].year').val());
        }        
    }
    years.sort();
    
    for(var i = 0; i < years.length; i++) {
        code += '<b>' + years[i] + '</b>';
    }
    code += '</div></div><span><i class="fal fa-angle-down downClass"></i></span></div><div class="bs-contCol">';

    code += timeline;
    
    code += '</div></div></span>';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Share+Tech+Mono&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setTabbedCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="sc"]:checked').val() == 'y') {
        code += 'scroll ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '"><div class="bs-tempBox bs-tabbed';
    if ($('input[name="ih"]:checked').val() == 'y') {
        code += ' bs-ship'
    }
    code += '">';
    code += '<div class="bs-titleCol"><div><div class="bs-tabGrid"><b>';
    code += lHead;
    code += '</b><span class="bs-tabs">';

    //do tab labels
    for(var i = 0; i < $('#tabCount').val(); i++) {
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        if(i == 0) {
            code += '<a id="' + label + '" class="bs-actTab">' + $('#tabTitle' + i).val() + '</a>';
        } else {
            code += '<a id="' + label + '">' + $('#tabTitle' + i).val() + '</a>';
        }
    }

    if ($('input[name="ih"]:checked').val() == 'y') {
        code += '</span></div></div><i class="bs-tempIcon"></i></div><div class="bs-imgCol"><img src="';
        code += $('#ihURL').val();
        code += '"></div><div class="bs-contCol">'
    } else {
        code += '</span></div></div><i class="bs-tempIcon"></i></div><div class="bs-contCol">';
    }
    
    //code tabs
    for(var i = 0; i < $('#tabCount').val(); i++) {
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        if(i == 0) {
            code += '<div id="' + label + '-content" class="bs-content bs-actTab">' + $('#tabText' + i).val() + '</div>';
        } else {
            code += '<div id="' + label + '-content" class="bs-content">' + $('#tabText' + i).val() + '</div>';
        }
    }
    code += '</div></div></span>';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Share+Tech+Mono&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setPhoneCode () {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="sc"]:checked').val() == 'y') {
        code += 'scroll ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '"><div class="bs-phoneCase"><div class="bs-phoneContent"><div class="bs-phoneBar">';

    code += $('#phoneTime').val();
    code += '<span style="float: right;"><i class="fad fa-signal"></i><i class="fad fa-wifi"></i><i class="far fa-battery-full"></i></span></div><div class="bs-phoneMsgs">';
    code += messages;
    code += '</div><div class="bs-phoneContact"><img src="';
    code += $('#phoneImg').val();
    code += '"><i>';

    if($('input[name="phoneType"]:checked').val() == 'text') {
        code += 'message sending to';
    } else if ($('input[name="phoneType"]:checked').val() == 'call') {
        code += 'calling';
    }
    code += '...</i><b>';
    code += $('#phoneTag').val();
    code += '</b></div></div><div class="bs-phoneCut bs-top"></div><div class="bs-phoneCut bs-bottom">';
    
    code += '</div></div></span>';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Share+Tech+Mono&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setWantedCode () {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += 'scroll ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';


    if ($('input[name="wt"]:checked').val() == 'y') {
        //Simple
        code += '<div class="bs-wanted1">';
        for(var i = 0; i < $('#charCount').val(); i++) {
            code += '<div class="bs-tempBox"><div class="bs-titleCol">';
            code += '<b>' + $('#charName' + i).val() + '</b><img src="';
            code += $('#charImg' + i).val();
            code += '"></div><div class="bs-contCol"><div class="bs-content">';
            code += $('#charText' + i).val();
            code += '</div></div></div>';
        }
    } else {
        //Tabbed
        code += '<div class="bs-tempBox bs-wantTabbed"><div class="bs-titleCol"><span class="bs-tabs">';

        //do tab labels
        for(var i = 0; i < $('#charCount').val(); i++) {
            var labelArr = $('#charName' + i).val().split(' ');
            var label = '';
            for (var h = 0; h < labelArr.length; h++) {
                label += '' + labelArr[h];
            }
            if(i == 0) {
                code += '<a id="' + label + '" class="bs-actTab"><img src="' + $('#charImg' + i).val() + '"></a>';
            } else {
                code += '<a id="' + label + '"><img src="' + $('#charImg' + i).val() + '"></a>';
            }
        }

        code += '</span></div><div class="bs-contCol">';
    
        //code tabs
        for(var i = 0; i < $('#charCount').val(); i++) {
            var labelArr = $('#charName' + i).val().split(' ');
            var label = '';
            for (var h = 0; h < labelArr.length; h++) {
                label += '' + labelArr[h];
            }
            if(i == 0) {
                code += '<div id="' + label + '-content" class="bs-wantTab bs-actTab"><img src="';
                code += $('#charImg' + i).val() + '"><div class="bs-content">';
                code += $('#charText' + i).val() + '</div></div>';
            } else {
                code += '<div id="' + label + '-content" class="bs-wantTab"><img src="';
                code += $('#charImg' + i).val() + '"><div class="bs-content">';
                code += $('#charText' + i).val() + '</div></div>';
            }
        }

        code += '</div>';
    }

    
    code += '</div></span>';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Share+Tech+Mono&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}


$('#runScript').on('click', function() {
    //template icons
    $('group i.bs-tempIcon').addClass('th').addClass('th-stars-o');
    $('gryffindor i.bs-tempIcon').addClass('th').addClass('th-lion-o');
    $('ravenclaw i.bs-tempIcon').addClass('th').addClass('th-eagle-o');
    $('hufflepuff i.bs-tempIcon').addClass('th').addClass('th-badger-o');
    $('slytherin i.bs-tempIcon').addClass('sf').addClass('sf-snake-o');
    $('professor i.bs-tempIcon').addClass('th').addClass('th-apple-o');
    $('ministry i.bs-tempIcon').addClass('sf').addClass('sf-magic-wand-o');
    $('healer i.bs-tempIcon').addClass('th').addClass('th-holly-o');
    $('quidditch i.bs-tempIcon').addClass('fal').addClass('fa-quidditch');
    $('research i.bs-tempIcon').addClass('sf').addClass('sf-beaker-o');
    $('media i.bs-tempIcon').addClass('fal').addClass('fa-camcorder');
    $('adult i.bs-tempIcon').addClass('th').addClass('th-briefcase-o');
    $('student i.bs-tempIcon').addClass('sf').addClass('sf-book-o');


    //template scroll padding
    $('.scroll .bs-content').each(function() {
        if($(this).outerHeight() + "px" == $(this).css("max-height")) {
            $(this).css({'padding-right': '10px'});
        }
    });
    $('.bs-ship .bs-content').each(function() {
        if($(this).outerHeight() + "px" == $(this).css("max-height")) {
            $(this).css({'padding-right': '10px'});
        }
    });
    $('.bs-memDir .bs-content').each(function() {
        if($(this).outerHeight() + "px" == $(this).css("max-height")) {
            $(this).css({'padding-right': '10px'});
        }
    });


    //template tabs - general
    $('.bs-tabs a').on('click', function() {
        $(this).siblings('a').removeClass('bs-actTab');
        $(this).parent().parent().parent().parent().siblings('.bs-contCol').children('.bs-content').removeClass('bs-actTab');
        $(this).parent().parent().siblings('.bs-contCol').children('.bs-wantTab').removeClass('bs-actTab');
        $(this).addClass('bs-actTab');
        $(this).parent().parent().parent().parent().siblings('.bs-contCol').children('.bs-content#' + this.id + '-content').addClass('bs-actTab');
        $(this).parent().parent().siblings('.bs-contCol').children('.bs-wantTab#' + this.id + '-content').addClass('bs-actTab');
    });


    var bsyears = $('.bs-years b');
    var bsevents = $('.bs-timeline .bs-content');
    var actYear = 1;

    if(actYear == 1) {
            $('.upClass').hide();
    }
    if(actYear == bsevents.length) {
            $('.downClass').hide();	
    }

    $('.upClass').on('click', function(){	
        actYear--;
        if (actYear == 1) {
            $('.upClass').hide();
            $('.downClass').show();
        }
        else {
            $('.upClass').show();
            $('.downClass').show();
        }
        for(var i = 0; i < bsevents.length; i++) {
            $(bsyears[i]).css({'top': '+=200px'});
            $(bsevents[i]).css({'top': '+=300px'});
        }
    });

    $('.downClass').on('click', function(){	
        actYear++;
        if (actYear == bsevents.length) {
            $('.downClass').hide();
            $('.upClass').show();
        }
        else {
            $('.upClass').show();
            $('.downClass').show();
        }
        for(var i = 0; i < bsevents.length; i++) {
            $(bsyears[i]).css({'top': '-=200px'});
            $(bsevents[i]).css({'top': '-=300px'});
        }
    });


    //template - image height
    $('.bs-imgDev .bs-contCol img').each(function() {
        var width = $(this).outerWidth();
        $(this).css({'height': width + 'px'});
    });



    $('.bs-contCol').each(function() {
        if($(this).outerWidth() < 200) {
            $(this).parent().addClass('bs-gridChange');
        }
    });
});