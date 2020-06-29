//general variables
let type, colors, image = [''], lHead = [''], sHead = [''], tempCode = '', idHead = [''];

//post variables
let temp_post, tag = [''];

//dev variables
let imageNum = [0], songNum = [0], quote, source, images, songs, columns, wanteds = '', wantTabs = '';


//Show/Hide Basic Fields
showhide('sc', 'ifScroll');


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
        case 'general': 
            $('.typeSwitch').hide();
            $('.ifGen').show();
            break;
        case 'posting': 
            $('.typeSwitch').hide();
            $('.ifPost').show();
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
                html += '<span class="twoCol altCol"><span><input id="charName' + i + '" placeholder="Section Title" /><input id="charImg' + i + '" placeholder="Section Image" style="margin-top: 20px;" /><input id="charDeets' + i + '" placeholder="Section Details" style="margin-top: 20px;" /></span><textarea id="charText' + i + '"placeholder="Section Contents"></textarea></span>';
            }
            $('.wantContents').html(html);
            break;
        case 'quotedev': 
            $('.typeSwitch').hide();
            $('.ifQuote').show();
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
        html += '<span class="twoCol altCol"><span><input id="charName' + i + '" placeholder="Section Title" /><input id="charImg' + i + '" placeholder="Section Image" style="margin-top: 20px;" /><input id="charDeets' + i + '" placeholder="Section Details" style="margin-top: 20px;" /></span><textarea id="charText' + i + '"placeholder="Section Contents"></textarea></span>';
    }
    $('.wantContents').html(html);
});


//Set Variables
function setValues() {

    //set image
    //fromRadio('lh', lHead, '', '');
    type = $('input[name="type"]:checked').val();

    //set wanted
    wanteds = '';
    if($('input[name="wt"]:checked').val() == 'y') {
        for(var i = 0; i < $('#charCount').val(); i++) {
            if(i != 0) {
                wanteds += '<divider></divider>';
            }
            wanteds +=    '<div class="sl-tempChar"><img src="' +
                        $('#charImg' + i).val() +
                        '"><b class="tag">' +
                        $('#charName' + i).val() +
                        '</b><span>' +
                        $('#charDeets' + i).val() +
                        '</span></div><div class="sl-tempScroll">' +
                        $('#charText' + i).val() +
                        '</div>';
        }        
    } else if ($('input[name="wt"]:checked').val() == 'n') {
        for(var i = 0; i < $('#charCount').val(); i++) {
            if (i == 0) {
                wantTabs += '<span id="tab' + 
                            i +
                            '" class="sl-activeTab"><img src="' + 
                            $('#charImg' + i).val() + 
                            '" title="' + 
                            $('#charName' + i).val() + 
                            '"></span>';
                wanteds +=  '<div id="tab' + 
                            i +
                            '-content" class="sl-tempScroll sl-tempTabCont sl-activeTab">' +
                            '<h1>' +
                            $('#charName' + i).val() +
                            '</h1><h2>' +
                            $('#charDeets' + i).val() +
                            '</h2>' +
                            $('#charText' + i).val() +
                            '</div>';
            } else {
                wantTabs += '<span id="tab' + 
                            i +
                            '"><img src="' + 
                            $('#charImg' + i).val() + 
                            '" title="' + 
                            $('#charName' + i).val() + 
                            '"></span>';
                wanteds +=  '<div id="tab' + 
                            i +
                            '-content" class="sl-tempScroll sl-tempTabCont">' +
                            '<h1>' +
                            $('#charName' + i).val() +
                            '</h1><h2>' +
                            $('#charDeets' + i).val() +
                            '</h2>' +
                            $('#charText' + i).val() +
                            '</div>';
            }
        }      
    }

    //set image dev
    columns = $('input[name="cols"]:checked').val();
    images = setImageDev('i');
    
    //set song dev
    songs = '';
    $('.songTitle').each(function() {
        songs += '<div class="sl-tempSong"><i class="fas fa-play"></i>\n<b>' + $(this).val() + '</b><span>' + $(this).next().val() + '</span></div>\n';
    });

    //set quote dev
    quote = '<quote>' + $('#quoteBody').val() + '</quote><qSource>' + $('#quoteSource').val() + '</qSource>';

    //set up color styles
    var accentArr = hexToRgb($('input[name="dullAccent"]').val().split('#')[1]);
    var accent70 = 'rgba(' + accentArr.r + ', ' + accentArr.g + ', ' + accentArr.b + ', 0.7)';
    var accent35 = 'rgba(' + accentArr.r + ', ' + accentArr.g + ', ' + accentArr.b + ', 0.35)';
    colors =        '<style>' +
                    '.' + $('input[name="char"]').val() + ' .sl-tempWrap' +
                    ' {--dullAccent-70: ' +
                    accent70 +
                    '; --dullAccent-35: ' +
                    accent35 +
                    '; --brightAccent: ' +
                    $('input[name="brightAccent"]').val() +
                    ';}.' + $('input[name="char"]').val() +
                    ' .sl-tempBox {border-color: var(--brightAccent);}</style>';
}

//Create Flexible Fields
function addFieldSet(fieldVar, fieldType) {
    switch(fieldType) {
        case 'imageNum':
            $('.ifImage span.urls').append('<input type="text" name="i' + imageNum + '" class="iLink" />');
            break;
        case 'songNum':
            $('.ifMusic span.songList').append('<input type="text" name="s' + imageNum + '" class="songTitle" placeholder="Song Name" /><input type="text" name="s' + imageNum + '" class="songArtist" placeholder="Song Artist" />');
            break;
    }  
}


//Build Final Content
function setGeneralCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent"><div class="sl-tempScroll">';
    code += $('#genText').val();
    code += '</div></div></div></div>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setPostCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent"><div class="sl-tempChar"><img src="';
    code += $('#postImage').val();
    code += '"><b class="tag">';
    code += $('#postTag').val();
    code += '</b><span>';
    code += $('#postLyrics').val();
    code += '</span></div><divider></divider><div class="sl-tempScroll">';
    code += $('#postText').val();
    code += '</div></div></div></div>';

    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setTabbedCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent sl-tempTab"><div class="sl-tempTabs"><div class="sl-sticky">';
    for(var i = 0; i < $('#tabCount').val(); i++) {
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        if(i == 0) {
            code += '<span id="' + label + '" class="sl-activeTab">' + $('#tabTitle' + i).val() + '</span>';
        } else {
            code += '<span id="' + label + '">' + $('#tabTitle' + i).val() + '</span>';
        }
    }
    code += '<div style="clear:both;"></div></div></div>';
    for(var i = 0; i < $('#tabCount').val(); i++) {
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        if(i == 0) {
            code += '<div id="' + label + '-content" class="sl-tempScroll sl-tempTabCont sl-activeTab">' + $('#tabText' + i).val() + '</div>';
        } else {
            code += '<div id="' + label + '-content" class="sl-tempScroll sl-tempTabCont">' + $('#tabText' + i).val() + '</div>';
        }
    }
    code += '</div></div></div></span>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setWantedCode () {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent sl-tempWant">';
        code += wanteds;
        code += '</div></div></div></span>';
    } else {
        code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent sl-tempTab sl-tempWantTab"><div class="sl-tempTabs"><div class="sl-sticky">';
        code += wantTabs;
        code += '<div style="clear:both;"></div></div></div>';
        code += wanteds;
        code += '</div></div></div>';
    }
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setPlaylistCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap sl-tempPlay"><div class="sl-tempBox"><div class="sl-tempContent"><div class="sl-tempScroll">';
    code += songs;
    code += '</div></div></div></div>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setImageCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += $('input[name="cols"]:checked').val();
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent"><div class="sl-tempScroll">';
    code += images;
    code += '</div></div></div></div>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setQuoteCode () {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent sl-tempQuote"><div class="sl-tempScroll">';
    code += quote;
    code += '</div></div></div></div>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}


$('#runScript').on('click', function() {
    $('.sl-tempTabs span').on('click', function() {
        $('.sl-tempTabs span').removeClass('sl-activeTab');
        $('.sl-tempTabCont').removeClass('sl-activeTab');
        $(this).addClass('sl-activeTab');
        $(this).parent().parent().siblings('#' + this.id + '-content').addClass('sl-activeTab');
    });
});