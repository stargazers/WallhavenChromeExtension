// Show console logs
const DEBUG = false

// Your wallhaven API key (needed only for NSFW). 
// Get it on https://wallhaven.cc/settings/account 
const api_key = 'YOUR_API_KEY'

// What we search.
const query = 'nature'

// Purity. 0 = Off, 1 = On. Values are: SWF, Sketchy, NSFW.
// So 100 = Only SWF, 110 only Sketchy etc.
const purity = '100'

// Image resolutions to search.
const resolutions = '1920x1080'

// API URL
const api_base = 'https://wallhaven.cc/api/v1/search'


function generateApiUrl() {    
    let api_url = api_base + '?q=' + query 
        + '&sorting=random&'
        + '&resolutions=' + resolutions + '&per_page=1'
        + '&type=jpg'    

    if (api_key !== 'YOUR_API_KEY') {
        api_url = api_url + '&apikey=' + api_key
    }

    api_url = api_url + '&purity=' + purity 
    return api_url
}


document.addEventListener('DOMContentLoaded', function() {
    let api_url = generateApiUrl()
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
    })
})
