import {uploadFiles} from '../api/firebase-api';
import {useDropzone} from 'react-dropzone';

const Admin = (props) => {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
  } = useDropzone({accept: 'image/*', onDrop: files => uploadFiles(files)});

  const style = () => !isDragAccept 
  ? "border-dashed border-2 h-32 rounded flex justify-center items-center bg-gray-100"
  : "border-solid border-2 border-green-200 h-32 rounded flex justify-center items-center bg-white"

  return (
      <div className="container mt-8">
        <div {...getRootProps({className: style()})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
    );
}


export default Admin;


