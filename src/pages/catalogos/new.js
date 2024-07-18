import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";
import S3FileUpload from 'react-s3';

export default function New_Usuario({ history }) {
  
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState(0);
    const [admin, setAdmin] = useState(false);
    const [file, setFile] = useState(false);
    const [loading, setLoading] = useState("");
    
    async function handleSubmit(event) {
      setLoading(true);
      let location = '';
      event.preventDefault();

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

      console.log(location);

      const dataobj = {
        nome: nome, 
        link: location,
        tipo: tipo
      };

      await api.post('/catalogo/', dataobj).then((res) => {
        if(res.data.error != undefined){
          alert(res.data.error);
          setLoading(false);
          return;              
        }else{
          setLoading(false);
          history.push('/catalogos')
        }
        }).catch((error) => {
          alert(error);
          setLoading(false);
          return;
        });

    };

    

    async function checkaccess(){
      const comp = localStorage.getItem('sfcomp');
      const pit = localStorage.getItem('sfpit');
      const admin = localStorage.getItem('sfadmin');  

      if(comp === 'true')
      setTipo(0);

      if(pit === 'true')
      setTipo(1);

      if(admin === 'true'){
        setAdmin(true);
        setTipo(0);
      }
    }

    useEffect(() => {
        setLoading(true);
        checkaccess();
        
        setTimeout(() => {
          if(document.getElementById('menu_catalogo')){
            document.getElementById('menu_catalogo').className = "active";
          }      
        }, 50);
        setLoading(false);
    }, []);

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {"Novo Catalogo"}
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
                        placeholder="Nome Arquivo"
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
                        htmlFor="nome"
                      >
                        Arquivo*
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
