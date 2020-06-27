//Template Production
$('#updateTemp').on('click', function() {
    setValues();
    switch(type) {
        case 'posting':
            tempCode = setPostCode();
            break;
        case 'timeline': 
            tempCode = setTimelineCode();
            break;
        case 'tracker': 
            tempCode = setTrackerCode();
            break;
        case 'playlist': 
            tempCode = setPlaylistCode();
            break;
        case 'imagedev': 
            tempCode = setImageCode();
            break;
        case 'quotedev': 
            tempCode = setQuoteCode();
            break;
        default:
            $('#display').html('Please select a template.');
            break;
    }

    $('#display').html(tempCode);
    var copyCode = tempCode.replace(/>/ig, '&gt;').replace(/</ig, '&lt;');
    $('#code').html('[dohtml]' + copyCode + '[/dohtml]');
});

//order by month and year
function orderEvents(num, yearArray, monthArray, eventArray, type, prefix) {
    yearArray = [];
    monthArray = [];
    eventArray = [];
    for (var i = 0; i <= num; i++) {
        var year = $('input[name="' + prefix + i + '"].year').val();
        if(jQuery.inArray(year, yearArray) == -1) {
            yearArray.push(year);
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
    
    //set up timeline / tracker (optimize - separate into functions)
    if(type == 'timeline') {
        return buildTimeline(yearArray, monthArray, eventArray);
    } else if (type == 'tracker') {
        return buildTracker(yearArray, monthArray, eventArray);
    }
}

//get value from yes/no fields
function fromRadio(radioName, varName, prefix, suffix) {
    if($('input[name="' + radioName + '"]:checked').val() == 'y') {
        varName[0] = prefix + $('input[name="' + radioName + '"]:checked').parent().parent().next().val() + suffix;
    }
}

//set up images for image dev
function setImageDev(imgNamePrefix) {
    var tempImages = '';
    for (var i = 0; i <= imageNum; i++) {
        var tempImage = '<img src="' + $('input[name="' + imgNamePrefix + i + '"]').val() + '">\n';
        tempImages += tempImage;
    }
    return tempImages;
}

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

//Add Flexible Fields
function addFields (fieldVar, fieldType) {
    for(var i = 0; i < $('input[name=add' + fieldType + ']').val(); i++) {
        fieldVar[0]++;
        addFieldSet(fieldVar, fieldType);
    }
}

//Show/Hide Fields
function showhide (inputName, shClass) {
    $('input[name="' + inputName + '"]').change(function () {
        if($(this).val() == 'y') {
            $('.' + shClass).show();
        } else {
            $('.' + shClass).hide();
        }
    })
}

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