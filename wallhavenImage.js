// Show console logs
let DEBUG = false

// Your wallhaven API key (needed only for NSFW). 
// Get it on https://wallhaven.cc/settings/account 
let api_key = 'YOUR_API_KEY'

// What we search.
let query = 'nature'

// Purity. 0 = Off, 1 = On. Values are: SWF, Sketchy, NSFW.
// So 100 = Only SWF, 110 only Sketchy etc.
let purity = '100'

// Image resolutions to search.
let resolutions = '1920x1080'


function generateApiUrl() {    
    let api_url = 'https://wallhaven.cc/api/v1/search?q=' + query 
        + '&sorting=random&'
        + '&resolutions=' + resolutions + '&per_page=1'
        + '&type=jpg'    

    if (api_key !== 'YOUR_API_KEY') {
        api_url = api_url + '&apikey=' + api_key
    }

    api_url = api_url + '&purity=' + purity;    
    return api_url;
}


document.addEventListener('DOMContentLoaded', function() {
    api_url = generateApiUrl()
    var bg = document.getElementById('background')
    fetch (api_url)
    .then(res => res.json())
    .then((out) => {
        if(DEBUG) {
            console.log("Got data ", out)
        }

        image_url = out.data[0].path
        image_short_url = out.data[0].short_url
        bg.style.backgroundImage = "url('" + image_url + "')"
    })
    .catch(err => {
        if(DEBUG) {
            console.log("Error!")
        }        
        throw err
    });
})
