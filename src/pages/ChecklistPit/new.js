import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";
import DatePicker from "react-datepicker";
import br from 'date-fns/locale/pt-BR'

import "react-datepicker/dist/react-datepicker.css";
import "../ChecklistComp/style.css"

export default function New_ChecklistPit({ history }) {
  
    const [dataentrada, setDataentrada] = useState(new Date());
    const [nserie, setNserie] = useState("");
    const [controlid, setControlid] = useState("");
    const [CNPJ, setCNPJ] = useState("");
    const [rsocial, setRsocial] = useState("");
    const [loading, setLoading] = useState("");
    const [status, setStatus] = useState(0);
    const [tipo, setTipo] = useState("");
    const [obsgeral, setObsgeral] = useState('');
    const [tensao, setTensao] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [chave, setChave] = useState("");
    const [marca, setMarca] = useState("");
    const [tensoes, setTensoes] = useState([]);
    const [marcas, setMarcas] = useState([]);

    //registerLocale("pt-BR", br); // register it with the name you want

    async function loadTensoes() {
      const query = '/tensaopit';
      const response = await api.get(query);
      const data = await response.data;
      setTensoes(data);
      setLoading(false);
    };

    async function loadMarcas() {
      const query = '/marca';
      const response = await api.get(query);
      const data = await response.data;
      setMarcas(data);
      setLoading(false);
    };

    async function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();
        
        const userid = localStorage.getItem('sfuserid');
        const nomeuser = localStorage.getItem('sfusernome');
  
        const dataobj = {
          dataentrada: dataentrada,
          nserie: nserie,
          controlid: controlid,
          CNPJ: CNPJ,
          rsocial: rsocial,
          status: '0',
          tipo: tipo,
          idrequester: userid,
          nomerequester: nomeuser,
          obsgeral: obsgeral,
          marca: marca,
          tensao: tensao,
          cidade: cidade,
          uf: uf,
          chave: chave
        };
        
        await api.post('/checklistpit/', dataobj)
        setLoading(false);
        history.push('/checklistpits')
  
    };

    useEffect(() => {
        setLoading(true);  
        loadTensoes();
        loadMarcas();
        setTimeout(() => {
          if(document.getElementById('menu_ospit_novo')){
            document.getElementById('menu_ospit_novo').className = "active";
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
            {"Nova Ordem Serviço"}
            <small>
              &nbsp;( {"Pit Stop"} )
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
                      <label className="col-sm-2" htmlFor="status" style={{paddingTop:7}}>Status*</label>
                      <div className="col-sm-4">
                        <select
                          id="status"
                          value={status}
                          className="form-control select2"
                          required
                          disabled
                          onChange={event =>
                            setStatus(event.target.value)
                          }
                        >
                          <option key='0' value='0'>
                            Pendente
                          </option>
                          <option key='1' value='1'>
                            Em Avaliação
                          </option>
                          <option key='2' value='2'>
                            Finalizado
                          </option>
                        </select>
                      </div>

                      <label
                        className="col-sm-2 control-label"
                        htmlFor="nome"
                      >
                        Data Entrada*
                      </label>
                      
                      <div className="col-sm-4">
                      <div class="input-group">
                        <div class="input-group-addon">
                          <i class="fa fa-calendar"></i>
                        </div>
                        <DatePicker 
                          selected={dataentrada} 
                          className='form-control' 
                          locale={br}
                          dateFormat="P"
                          onChange={date => setDataentrada(date)} 
                        />
                      </div>
                        
                        
                      </div>

                      
                      </div>

                      <div className="form-group">
                      <label className="col-sm-2" htmlFor="status" style={{paddingTop:7}}>Tipo*</label>
                      <div className="col-sm-4">
                        <select
                          id="status"
                          value={tipo}
                          className="form-control select2"
                          required
                          onChange={event =>
                            setTipo(event.target.value)
                          }
                        >
                           <option
                              key=''
                              value=''
                              disabled
                            >
                              -- Selecione --
                            </option>
                          <option key='0' value='0'>
                            Liberação
                          </option>
                          <option key='1' value='1'>
                            Instalação
                          </option>
                        </select>
                      </div>

                      <label
                        className="col-sm-2 control-label"
                        htmlFor="nome"
                      >
                        Número de Série CF*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="nome"
                        placeholder="Número de Série do Pit Stop"
                        className="form-control"
                        value={nserie}
                        required
                        maxLength={40}
                        onChange={event => setNserie(event.target.value)}
                        />
                      </div>
                      
                      </div>
               

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="nome"
                        style={{paddingTop:7}}
                      >
                        Número Controle ID*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="controleid"
                        placeholder="ID de controle interno"
                        className="form-control"
                        value={controlid}
                        required
                        maxLength={40}
                        onChange={event => setControlid(event.target.value)}
                        />
                      </div>

                      <label
                        className="col-sm-2 control-label"
                        htmlFor="preco"
                      >
                        Razão Social*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="preco"
                        placeholder="Razão Social do Cliente"
                        className="form-control"
                        required
                        maxLength={60}
                        value={rsocial}
                        onChange={event => setRsocial(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="descr"
                        style={{paddingTop:7}}
                      >
                        Número da Chave*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="chave"
                        placeholder="Numero da Chave"
                        className="form-control"
                        value={chave}
                        required
                        maxLength={40}
                        onChange={event => setChave(event.target.value)}
                        />
                      </div>

                      <label
                        className="col-sm-2 control-label"
                        htmlFor="preco"
                      >
                        CNPJ*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="descr"
                        placeholder="CNPJ do Cliente"
                        className="form-control"
                        value={CNPJ}
                        required
                        maxLength={100}
                        onChange={event => setCNPJ(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="nome"
                        style={{paddingTop:7}}
                      >
                        Cidade*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="cidade"
                        placeholder="Cidade"
                        className="form-control"
                        value={cidade}
                        required
                        maxLength={40}
                        onChange={event => setCidade(event.target.value)}
                        />
                      </div>

                      <label
                        className="col-sm-2 control-label"
                        htmlFor="preco"
                      >
                        UF*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="uf"
                        placeholder="Estado"
                        className="form-control"
                        required
                        maxLength={2}
                        value={uf}
                        onChange={event => setUf(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="descr"
                      >
                        Tensão*
                      </label>
                      <div className="col-sm-4">
                      <select
                          id="tensao"
                          value={tensao}
                          className="form-control select2"
                          required
                          onChange={event =>
                            setTensao(event.target.value)
                          }
                        >
                            <option
                              key=''
                              value=''
                              disabled
                            >
                              -- Selecione --
                            </option>
                          {tensoes.map(tensoes => (
                            <option
                              key={tensoes._id}
                              value={tensoes.tensao}
                            >
                              {tensoes.tensao}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label
                        className="col-sm-2 control-label"
                        htmlFor="descr"
                      >
                        Marca*
                      </label>
                      <div className="col-sm-4">
                      <select
                          id="marcas"
                          value={marca}
                          className="form-control select2"
                          required
                          onChange={event =>
                            setMarca(event.target.value)
                          }
                        >
                            <option
                              key=''
                              value=''
                              disabled
                            >
                              -- Selecione --
                            </option>
                          {marcas.map(marcas => (
                            <option
                              key={marcas._id}
                              value={marcas.titulo}
                            >
                              {marcas.titulo}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                   

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="descr"
                        style={{paddingTop:7}}
                      >
                        Observação Geral*
                      </label>
                      <div className="col-sm-4">
                      <textarea
                        id="obsgeral"
                        placeholder="Comentários Gerais"
                        className="form-control"
                        rows={3}
                        value={obsgeral}
                        onChange={event => setObsgeral(event.target.value)}
                        />
                      </div>

                    
                    </div>

                   
                    

                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/checklistpits")}
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
