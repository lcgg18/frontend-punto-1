import { useEffect, useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import './App.css';
import { upload } from './api/api';


const base_url = process.env.REACT_APP_URL


function App() {
  const [data, setData] = useState('');
  const [file, setFile] = useState('');

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {

    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('nombre', file.name);
    await upload(formData);

  }

  useEffect(() => {

    const options = {
      method: "GET",
      url: `${base_url}/img/`,
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'application/json',
      }
    };

    axios
      .request(options)
      .then(function (resultado) {

        setData(resultado.data);
      })
      .catch(function (error) {
        console.error(error);
      });

  }, []);

  const deleteImg = () => {

    const options = {
      method: "DELETE",
      url: `${base_url}/delete/`,
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'application/json',
      }
    };
    axios
      .request(options)
      .then(function (resultado) {
        setData(resultado.data);
      })
      .catch(function (error) {
        console.error(error);
      })
  }



  return (
    <div className="App">
      <h1>Carga de imagenes</h1>
      <div className="Image">
        {
          data.status === 'error' ?
            <div className="file">
              <form  >
                <input
                  type="file"
                  accept='image/*'
                  onChange={(e) => {
                    handleChangeFile(e)
                  }}
                />
                <br />
                <span>se aceptan los formatos</span>
                <span>JPG,PNG,JPGE, GIF</span>
                <button
                  type='submit'
                  onClick={() => {
                    handleSubmit()

                  }}

                >
                  carga tu imagen
                </button>
              </form>
            </div>
            :
            <img src={base_url + '/img'} alt='foto' height={500} />
        }

      </div>
      {
        data.status === 'error' ?
          '' :
          <button
            className='Error'
            type='submit'
            onClick={() => {
              deleteImg()
              window.location.reload()
            }}
          >
            quitar la imagen
          </button>
      }

    </div>
  );
}

export default App;
