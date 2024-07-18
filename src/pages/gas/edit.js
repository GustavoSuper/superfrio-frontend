import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Edit_Sistema({ history }) {
  
    const [gas, setGas] = useState("");
    const [loading, setLoading] = useState("");

    const url_string = window.location.href;
    const param = url_string.split("/");

    async function loadProd() {
  
        const response = await api.get('/gas/'+param[4]);
        const data = await response.data;
  
        setGas(data[0].nome);
        
      }
      
    async function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();
  
        const dataobj = { 
          nome: gas
        };
  
        await api.put('/gas/'+param[4], dataobj);
        setLoading(false);
        history.push('/gases')
  
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          if(document.getElementById('menu_gas')){
            document.getElementById('menu_gas').className = "active";
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
            {gas}
          </h1>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-info">

                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="box-body">
                  
                  <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="nome"
                      >
                        Gás*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="nome"
                        placeholder="Nome do Gás"
                        className="form-control"
                        value={gas}
                        required
                        maxLength={40}
                        onChange={event => setGas(event.target.value)}
                        />
                      </div>
                    </div>

                                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/gases")}
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