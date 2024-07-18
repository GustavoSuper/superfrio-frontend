import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";
import S3FileUpload from 'react-s3';

export default function Edit_Usuario({ history }) {
  
  const [nome, setNome] = useState("");
  const [link, setLink] = useState("");
  const [tipo, setTipo] = useState("");
  const [admin, setAdmin] = useState(false);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState("");

    const url_string = window.location.href;
    const param = url_string.split("/");

    async function loadProd() {
  
        const admin = await localStorage.getItem('sfadmin');     

        if(admin === 'true')
        setAdmin(true);

        const response = await api.get('/catalogo/'+param[4]);
        const data = await response.data;
  
        setNome(data[0].nome);
        setLink(data[0].link);
        setTipo(data[0].tipo);
      }
    
    async function handleSubmit(event) {
      setLoading(true);
      event.preventDefault();
      let dataobj = {};

      if(file != ""){
        let location = '';
        const config = {
          bucketName: process.env.REACT_APP_BUCKET,
          dirName: 'catalogos', /* optional */
          region: process.env.REACT_APP_AWS_REGION,
          accessKeyId: process.env.REACT_APP_ACCESS_KEY,
          secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
        }
        await S3FileUpload
        .uploadFile(file, config)
        .then(data => location = data.location)
        .catch(err => alert(err))

        dataobj = {
          nome: nome, 
          link: location,
          tipo: tipo
        };

      } else {

        dataobj = {
          nome: nome, 
          tipo: tipo
        };

      }
        
        await api.put('/catalogo/'+param[4], dataobj);
        history.push('/catalogos');
  
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          if(document.getElementById('menu_catalogo')){
            document.getElementById('menu_catalogo').className = "active";
          }      
        }, 50);
        loadProd();
        setLoading(false);
    }, []);


  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {"Editar Catalogo"}
            {/* <small>
              &nbsp;( {"Compressor"} )
            </small> */}
          </h1>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">

                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="box-body">

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="nome"
                      >
                        Nome*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="nome"
                        placeholder="Nome Completo do Usuário"
                        className="form-control"
                        required
                        maxLength={60}
                        value={nome}
                        onChange={event => setNome(event.target.value)}
                        />
                      </div>
                      </div>

                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="status">Tipo*</label>
                      <div className="col-sm-4">
                        <select
                          id="status"
                          value={tipo}
                          className="form-control select2"
                          required
                          disabled={!admin}
                          onChange={event =>
                            setTipo(event.target.value)
                          }
                        >
                          <option key='0' value='0'>
                            Compressor
                          </option>
                          <option key='1' value='1'>
                            Pit-Stop
                          </option>
                        </select>
                      </div>

                      

                      
                      </div>

                      <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="preco"
                      >
                        Link*
                      </label>
                      <div className="col-sm-4">
                      <a href={link} target="_blank">Visualizar Arquivo</a>
                        </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="nome"
                      >
                        Alterar Arquivo*
                      </label>
                      <div className="col-sm-2">
                      <input
                          id="file"
                          type="file"
                          onChange={event => setFile(event.target.files[0])}
                          />
                      </div>
                
                      </div>
                                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/catalogos")}
                    >
                      Voltar
                    </button>
                    <button type="submit" className="btn btn-info">
                      Salvar
                    </button>
                  
                  </div>

                  {loading && (
                    <div style={{ alignItems: "center", textAlign: "center" }}>
                      <img src={carregando} width="80"></img>
                    </div>
                  )}
                </form>
               
              </div>
             
            </div>
         
          </div>

        

        </section>
      
      </div>

      <Footer />
    </>

   
  );
}
