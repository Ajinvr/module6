
const FileModel = require('../db/models/filemodel');
const path = require('path');

const addFile = async (req,res)=>{

  if (false) {
     return res.json({message: 'Provide a valid file', toaststatus: "error" });
  }else{
      try {
          const savedFile = await FileModel.create({
                originalName: req.file.originalname,
                 mimeType: req.file.mimetype,
                  size: req.file.size,
                   path: req.file.path
       });
  
         let fileid = savedFile._id
             res.json({ message: 'File uploaded successfully!',toaststatus: "success" ,fileid});
  
       } catch (error) {
           console.log('Error uploading file:', error);
                res.json({message: 'Error uploading file', toaststatus: "error" });
       }

  }

}

const getFile = async (req, res) => {
     if (req.body._id == undefined || req.body._id == null || req.body._id == "" || req.body._id == '' ) {

        return res.status(400).send("bad request")

    }else{

     try {
         let _id = req.body._id;
            let file;
              if (typeof _id === 'string' && _id.length === 24 && /^[0-9a-fA-F]+$/.test(_id)) {
               file = await FileModel.findOne({ _id })
              }else{
                    return res.send("Enter a valid File Id");
              }

                 if (!file) {
                    return res.json({ message: 'File not found', toaststatus: "error" });
                  }
     
      const filePath = file.path
         const fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
  
       res.setHeader('content-type',file.mimeType)

         const relativePath = path.join('..', 'uploads', fileName);
            const absolutePath = path.resolve(__dirname, relativePath);
      
               let sendfile =  res.sendFile(absolutePath)
           
      } catch (error) {
         console.error('Error retrieving file:', error);
            res.status(500).json({ message: 'Error retrieving file', toaststatus: "error" });
      }
            
  }
  
};




module.exports={addFile,getFile}