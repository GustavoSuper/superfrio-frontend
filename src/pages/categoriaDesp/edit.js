import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Edit_Cliente({ history }) {
  
    const [categoria, setCategoria] = useState("");
    const [loading, setLoading] = useState("");
   
    const url_string = window.location.href;
    const param = url_string.split("/");
  
    useEffect(() => {
      async function loadProd() {
  
        const response = await api.get('/categoriadespesa/'+param[4]);
        const data = await response.data;
  
        setCategoria(data[0].categoria);
      }
      
      loadProd();
      setTimeout(() => {
        if(document.getElementById('menu_categoriadesp')){
          document.getElementById('menu_categoriadesp').className = "active";
        }      
      }, 50);
    },[]);
  
  
    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          categoria: categoria
        };
  
        await api.put('/categoriadespesa/'+param[4], dataobj)
        history.push('/categoriasdesp')
  
    }


  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {categoria}
            <small>
              &nbsp;( {categoria} )
            </small>
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
                        htmlFor="nome"
                      >
                        Categoria*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="nome"
                        placeholder="Nome da Categoria"
                        className="form-control"
                        value={categoria}
                        required
                        maxLength={40}
                        onChange={event => setCategoria(event.target.value)}
                        />
                      </div>
                    </div>
                                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/categoriasdesp")}
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
