import sha1 from 'sha1'
 
export const deleteImgs = async ( imageUrl )=> {

        const segments = imageUrl.split('/');
        const imagenId = segments[segments.length -1];
        const segId = imagenId.split('.');
        
        const idImages = segId[segId.length -2];
        
        const idImage = 'journal/'+idImages 
        console.log(idImage)
    
         const cloud_name = 'dhuctrgb6'
         const cloudURL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`;
         
         const timestamp = `${ new Date().getTime() }`
         const signature = `public_id=${ idImage }&timestamp=${ timestamp }TQ-u-nrQo6DciBOWtaNYdePpTU8`
         const shaCode = sha1(signature)
         
         const formData = new FormData();
         formData.append("public_id", idImage);
         formData.append("api_key", '365713328536257');
         formData.append("signature", shaCode);
         formData.append("timestamp", timestamp);
         
         try {
             const resp = await fetch(cloudURL, {
                 method: "POST",
                 body: formData,
                });
                
                if (!resp.ok) throw new Error(" No se pudo eliminar la imagen");
                
            const cloudResp = await resp.json();
            
            console.log(cloudResp)
            return cloudResp;
            
        } catch (error) {
            
            console.log(error);
            throw new Error(error.message);
        }
};