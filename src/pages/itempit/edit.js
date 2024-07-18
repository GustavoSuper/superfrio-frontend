import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Edit_Tensao({ history }) {
  
  const [ordemitem, setOrdemitem] = useState("");
  const [nomeitem, setNomeitem] = useState("");
  const [loading, setLoading] = useState("");
   
    const url_string = window.location.href;
    const param = url_string.split("/");
  
    useEffect(() => {
      async function loadProd() {
  
        const response = await api.get('/checklistitemdefault/'+param[4]);
        const data = await response.data;
  
        setOrdemitem(data[0].ordemitem);
        setNomeitem(data[0].nomeitem)
      }
      
      loadProd();
      setTimeout(() => {
        if(document.getElementById('menu_itenschecklistpit')){
          document.getElementById('menu_itenschecklistpit').className = "active";
        }      
      }, 50);
    },[]);
  
  
    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          ordemitem: ordemitem,
          nomeitem: nomeitem
        };
  
        await api.put('/checklistitemdefault/'+param[4], dataobj)
        history.push('/itenspit')
  
    }


  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Item Pit Stop
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
                      onClick={() => history.push("/itenspit")}
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
