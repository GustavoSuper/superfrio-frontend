import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function New_Tensao({ history }) {
  
    const [ordemitem, setOrdemitem] = useState("");
    const [nomeitem, setNomeitem] = useState("");
    const [loading, setLoading] = useState("");
      
    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          type:'compExit',
          ordemitem: ordemitem,
          nomeitem: nomeitem
        };
  
        await api.post('/checklistitemdefaultexit/', dataobj)
        history.push('/itenscompExit')
  
    };

    useEffect(() => {
      setTimeout(() => {
        if(document.getElementById('menu_itenschecklistcompExit')){
          document.getElementById('menu_itenschecklistcompExit').className = "active";
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
            Novo Item
            <small>
              &nbsp;( {nomeitem} )
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
                        Ordem*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="ordem"
                        placeholder="Ordem do Item"
                        className="form-control"
                        value={ordemitem}
                        required
                        maxLength={40}
                        onChange={event => setOrdemitem(event.target.value)}
                        />
                      </div>
                    </div>


                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="nome"
                      >
                        Item*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="nome"
                        placeholder="Nome do Item"
                        className="form-control"
                        value={nomeitem}
                        required
                        maxLength={40}
                        onChange={event => setNomeitem(event.target.value)}
                        />
                      </div>
                    </div>



                  
                                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      onClick={() => history.push("/itenscomp")}
                    >
                      Voltar
                    </button>
                    <button type="submit" className="btn btn-info pull-right">
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
