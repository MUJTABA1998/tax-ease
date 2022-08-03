import React from 'react'
import { BsCloudUploadFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { FcEditImage } from 'react-icons/fc'
import '../css/Uploader.css'


const Uploader = ({ files, setFiles}) => {

    

    const handleChange = e => {
        e.preventDefault();
        
        const file = e.target.files[0]
        setFiles([
            ...files, file
        ])
    }

    const handleRemove = e => {
        setFiles(files.filter(file => file.name !== e.name)) 
    }

  return (
    <section className='uploader'>  
        <label>
            <input type="file" onChange={handleChange} />
            <div className='upload-section'><BsCloudUploadFill/></div>
        </label>
        <div className='files-display'>
            {
                files.map((file, index) => (
                    <div className='file' key={index}>
                        <IoClose className="del-icon" onClick={() => handleRemove(file)}/>
                        <FcEditImage className="file-icon"/>
                        <p>{file.name}</p>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Uploader