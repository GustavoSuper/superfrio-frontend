import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function New_Compressor({ history }) {
  
    const [modelo, setModelo] = useState("");
    const [loading, setLoading] = useState("");
      
    async function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();
  
        const dataobj = { 
          modelo: modelo
        };
  
        await api.post('/compressor/', dataobj)
        history.push('/compressores')
  
    };

    useEffect(() => {
      setTimeout(() => {
        if(document.getElementById('menu_compressor')){
          document.getElementById('menu_compressor').className = "active";
        }      
      }, 50);
    }, []);


  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {modelo}
          </h1>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-info">
                {loading && (
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <img src={carregando} width="80"></img>
                  </div>
                )}

                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="box-body">
                 
                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="descr"
                      >
                        Modelo*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="descr"
                        placeholder="Localidade"
                        className="form-control"
                        value={modelo}
                        required
                        maxLength={100}
                        onChange={event => setModelo(event.target.value)}
                        />
                      </div>
                    </div>

                                                       
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/compressores")}
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
