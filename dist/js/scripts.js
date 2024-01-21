if(document.querySelector('#submit')) {
    document.querySelector('#submit').addEventListener('submit', e => {
        e.preventDefault();
    
        let form = e.currentTarget;
    
        let category = form.querySelector('#category').options[form.querySelector('#category').selectedIndex].value;
        let file = form.querySelector('#filename').value.trim();
        let year = form.querySelector('#year').value.trim();
        let month = form.querySelector('#month').options[form.querySelector('#month').selectedIndex].value;
        let password = form.querySelector('#filename').value.toLowerCase().trim();
    
        let data = {
            "SubmissionType": "submit",
            Category: category,
            Filename: file,
            Year: year,
            Month: month,
        }

        form.querySelector('button[type="submit"]').innerText = 'Submitting...';
    
        if(password = `justincase`) {
            sendAjax(form, data);
        }
    });
}