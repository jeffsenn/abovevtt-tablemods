fetch('https://raw.githubusercontent.com/jeffsenn/abovevtt-tablemods/main/table-mods.js')
    .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(scriptContent => {
            eval(scriptContent);
            console.log('Script loaded and executed successfully.');
        })
        .catch(error => {
            console.error('Error loading the script:', error);
        });
