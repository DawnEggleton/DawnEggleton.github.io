//Preview Tabs
$('.result h3').on('click', function () {
    $('.result h3').removeClass('active');
    $('.result .scroll').removeClass('active');
    $(this).addClass('active');
    $('#' + this.id + '-content').addClass('active');
});

//Template Production
$('#updateTemp').on('click', function() {
    setValues();
    switch(type) {
        case 'general':
            tempCode = setGeneralCode();
            break;
        case 'posting':
            tempCode = setPostCode();
            break;
        case 'large':
            tempCode = setLargeCode();
            break;
        case 'small':
            tempCode = setSmallCode();
            break;
        case 'tabbed':
            tempCode = setTabbedCode();
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
        case 'wanted': 
            tempCode = setWantedCode();
            break;
        case 'phone': 
            tempCode = setPhoneCode();
            break;
        case 'instagram':
            tempCode = setInstaCode();
            break;
        case 'tindr':
            tempCode = setTindrCode();
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
                var month;
                if($(this).val() != '10') {
                    month = 'ym-' + yearArray[i] + '-' + $(this).val().replace('0', '');
                } else {
                    month = 'ym-' + yearArray[i] + '-' + $(this).val();
                }
                if(jQuery.inArray(month, monthGroups) == -1) {
                    monthGroups.push(month);
                }
            }
        });
        monthGroups.sort();
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
    } else {
        varName[0] = '';
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

//hex to rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }