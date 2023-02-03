# Baskin-Market

# postman Url

http-Method=Post
endpoint=photo/upload

POST(/photo/upload)

# postman body/form-data

<--------to upload image------------->
image: yourimage.jpg/png
text: yourTextAbout image

# if want to check file is uploaded on bucket or not un-comment these

// const getDataFromBucket = require("../controller/awsbucket/getdata");
// router.get("/photoAll", upload.single("image"), getDataFromBucket.getAllData);

from route

You will see on console

# if want to check file is single file uploaded on bucket or not un-comment these

// const getDataFromBucket = require("../controller/awsbucket/getdata");
// router.get("/photo", upload.single("image"), getDataFromBucket.getData);
from route
