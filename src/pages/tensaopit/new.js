import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function New_Tensao({ history }) {
  
    const [tensao, setTensao] = useState("");
    const [loading, setLoading] = useState("");
      
    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          tensao: tensao
        };
  
        await api.post('/tensaopit/', dataobj)
        history.push('/tensoespit')
  
    };

    useEffect(() => {
      setTimeout(() => {
        if(document.getElementById('menu_tensaopit')){
          document.getElementById('menu_tensaopit').className = "active";
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
            Nova Tensão
            <small>
              &nbsp;( {tensao} )
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
                        Tensão*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="nome"
                        placeholder="Tensão"
                        className="form-control"
                        value={tensao}
                        required
                        maxLength={40}
                        onChange={event => setTensao(event.target.value)}
                        />
                      </div>
                    </div>



                  
                                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/tensoespit")}
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
