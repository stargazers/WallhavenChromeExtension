// Show console logs
const DEBUG = true

// Your wallhaven API key (needed only for NSFW). 
// Get it on https://wallhaven.cc/settings/account 
const api_key = 'YOUR_API_KEY'

// What we search. See https://wallhaven.cc/help/api for possible types.
const query = 'id:37'

// Purity. 0 = Off, 1 = On. Values are: SWF, Sketchy, NSFW.
// So 100 = Only SWF, 110 only Sketchy etc.
const purity = '100'

// Image resolutions to search.
const resolutions = '1920x1080'

// Delay for slideshow (in milliseconds)
const delay = 30000

// API URL
const api_base = 'https://wallhaven.cc/api/v1/search'
const api_tags_base = 'https://wallhaven.cc/api/v1/w/'

addApiKeyToURL = () => {
    if (api_key !== 'YOUR_API_KEY') {
        return 'apikey=' + api_key
    }
}

generateApiUrl = () => {    
    let api_url = api_base + '?q=' + query 
        + '&sorting=random'
        + '&resolutions=' + resolutions + '&per_page=1'
        + '&type=jpg'    

    api_url = api_url + '&' + addApiKeyToURL()    
    api_url = api_url + '&purity=' + purity 
    return api_url
}

getTags = (id) => {
    let api_tags_url = api_tags_base + id
    api_tags_url = api_tags_url + '?' + addApiKeyToURL()    
    fetch(api_tags_url)
    .then(res => res.json())
    .then((out) => {
        console.log("Got these tags: ", out.data.tags)        
    })    
}

showImage = () => {
    let api_url = generateApiUrl()        
    let bg = document.getElementById('background')
    let original_image = document.getElementById('original_image')    
    fetch (api_url)
    .then(res => res.json())
    .then((out) => {
        if(DEBUG) {
            console.log("Got data ", out)         
        }
        
        tags = getTags(out.data[0].id)

        image_url = out.data[0].path
        image_short_url = out.data[0].short_url
        original_image.href = image_short_url;
        original_image.innerHTML = image_short_url;        
        bg.style.backgroundImage = "url('" + image_url + "')"        
    })
    .catch(err => {
        if(DEBUG) {
            console.log("Error!")
        }        
        throw err
    })
}

document.addEventListener('DOMContentLoaded', function() {
    showImage()
    console.log("Interval for image change is " + delay/1000 + " seconds")
    setInterval(function() {
        console.log("Calling showImage")
        showImage()
    }, delay)  
})
