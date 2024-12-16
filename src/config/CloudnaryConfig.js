const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'de25rv4dl', 
    api_key: '783637428915646', 
    api_secret: 'MxEDscnIMcwph-wi2sZSKvRAfWw' // Replace with your actual API secret
});

module.exports = cloudinary;
