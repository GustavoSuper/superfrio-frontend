import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function New_AprovadorArea({ history }) {
  
    const [nome, setNome] = useState("");
    const [aprovador, setAprovador] = useState("");
    const [idaprovador, setIdaprovador] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState("");

    async function loadUsuarios() {
      const query = '/usuarios';
      const response = await api.get(query);
      const data = await response.data;
      setUsuarios(data);
      setLoading(false);
    };
      
    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          nome: nome, 
          aprovador: aprovador, 
          idaprovador: idaprovador, 
        };
  
        await api.post('/despesaareaappr/', dataobj)
        history.push('/aprovadoresarea')
  
    };

    useEffect(() => {
      loadUsuarios();
      setTimeout(() => {
        if(document.getElementById('menu_aprovadorarea')){
          document.getElementById('menu_aprovadorarea').className = "active";
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
                        Área*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="nome"
                        placeholder="Nome da Área"
                        className="form-control"
                        value={nome}
                        required
                        maxLength={200}
                        onChange={event => setNome(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="descr"
                      >
                        Aprovador*
                      </label>
                      <div className="col-sm-4">
                      <select
                          id="aprovador"
                          value={idaprovador}
                          className="form-control select2"
                          required
                          onChange={event => {
                            setAprovador(event.target.options[event.target.selectedIndex].text);
                            setIdaprovador(event.target.value);
                          }
                          }
                        >
                            <option
                              key=''
                              value=''
                              disabled
                            >
                              -- Selecione --
                            </option>
                          {usuarios.map(usuario => (
                            <option
                              key={usuario._id}
                              value={usuario._id}
                            >
                              {usuario.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/aprovadoresarea")}
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
