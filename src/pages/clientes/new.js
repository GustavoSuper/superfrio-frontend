import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function New_Cliente({ history }) {
  
    const [nome, setNome] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [loading, setLoading] = useState("");
      
    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          nome: nome, 
          cidade: cidade,
          uf: uf
        };
  
        await api.post('/cliente/', dataobj)
        history.push('/clientes')
  
    };

    useEffect(() => {
      setTimeout(() => {
        if(document.getElementById('menu_cliente')){
          document.getElementById('menu_cliente').className = "active";
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
            {nome}
            <small>
              &nbsp;( {nome} )
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
                        Nome*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="nome"
                        placeholder="Nome do Cliente"
                        className="form-control"
                        value={nome}
                        required
                        maxLength={40}
                        onChange={event => setNome(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="descr"
                      >
                        Cidade*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="descr"
                        placeholder="Localidade"
                        className="form-control"
                        value={cidade}
                        required
                        maxLength={100}
                        onChange={event => setCidade(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="preco"
                      >
                        UF*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="preco"
                        placeholder="SP"
                        className="form-control"
                        required
                        maxLength={10}
                        value={uf}
                        onChange={event => setUf(event.target.value)}
                        />
                      </div>
                    </div>

                                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/clientes")}
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
