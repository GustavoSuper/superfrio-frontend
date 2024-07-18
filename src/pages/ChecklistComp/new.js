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

export default function New_ChecklistComp({ history }) {
  
    const [nos, setNos] = useState("");
    const [dataentrada, setDataentrada] = useState(new Date());
    const [nserie, setNserie] = useState("");
    const [tensao, setTensao] = useState("");
    const [gas, setGas] = useState("");
    const [nativo, setNativo] = useState("");
    const [garantia, setGarantia] = useState(false);
    const [osgarantia, setOsgarantia] = useState("");
    const [status, setStatus] = useState(0);
    const [idcliente, setIdcliente] = useState("");
    const [idcompressor, setIdcompressor] = useState("");
    const [idfabricante, setIdfabricante] = useState("");
    const [idusuario, setIdusuario] = useState("");
    const [loading, setLoading] = useState("");
    const [clientes, setClientes] = useState([]);
    const [tensoes, setTensoes] = useState([]);
    const [compressores, setCompressores] = useState([]);
    const [fabricantes, setFabricantes] = useState([]);
    const [obsgeral, setObsgeral] = useState('');
      
    async function loadTensoes() {
      const query = '/tensao';
      const response = await api.get(query);
      const data = await response.data;
      setTensoes(data);
      setLoading(false);
    };

    async function loadClientes() {
      const query = '/cliente';
      const response = await api.get(query);
      const data = await response.data;
      setClientes(data);
      setLoading(false);
    };

    async function loadCompressores() {
      const query = '/compressor';
      const response = await api.get(query);
      const data = await response.data;
      setCompressores(data);
      setLoading(false);
    };

    async function loadFabricantes() {
      const query = '/fabricante';
      const response = await api.get(query);
      const data = await response.data;
      setFabricantes(data);
      setLoading(false);
    }

    async function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();
        
        const userid = localStorage.getItem('sfuserid');
        const nomeuser = localStorage.getItem('sfusernome');
  
        const dataobj = {
          nos: nos, 
          dataentrada: dataentrada,
          nserie: nserie,
          tensao: tensao,
          gas: gas,
          nativo: nativo,
          garantia: garantia,
          osgarantia: osgarantia,
          status: '0',
          idcliente: idcliente,
          idcompressor: idcompressor,
          idfabricante: idfabricante,
          idrequester: userid,
          nomerequester: nomeuser,
          obsgeral: obsgeral
        };
        
        await api.post('/checklistcomp/', dataobj)
        setLoading(false);
        history.push('/checklistcomps')
  
    };

    useEffect(() => {
        setLoading(true);
        loadTensoes();
        loadClientes();
        loadCompressores();
        loadFabricantes();
        setTimeout(() => {
          if(document.getElementById('menu_oscomp_novo')){
            document.getElementById('menu_oscomp_novo').className = "active";
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
              &nbsp;( {"Compressor"} )
            </small>
          </h1>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                {loading && (
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <img src={carregando} width="80"></img>
                  </div>
                )}

                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="box-body">

                  <div className="form-group">
                      <label className="col-sm-2" htmlFor="status">Status*</label>
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
                        Número da OS*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="nome"
                        placeholder="Número da Ordem de Serviço"
                        className="form-control"
                        value={nos}
                        required
                        maxLength={40}
                        onChange={event => setNos(event.target.value)}
                        />
                      </div>

                      
                      </div>


                     
                

                    <div className="form-group">
                      <label
                        className="col-sm-2"
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

                      <label
                        className="col-sm-2 control-label"
                        htmlFor="nome"
                      >
                        Número de Série*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="nome"
                        placeholder="Número de Série do Compressor"
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
                        htmlFor="preco"
                      >
                        Gás*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="preco"
                        placeholder="Gás utilizado no Compressor"
                        className="form-control"
                        required
                        maxLength={10}
                        value={gas}
                        onChange={event => setGas(event.target.value)}
                        />
                      </div>
                    </div>

                

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="preco"
                      >
                        Número de Ativo*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="preco"
                        placeholder="Número de Ativo do Compressor"
                        className="form-control"
                        required
                        maxLength={20}
                        value={nativo}
                        onChange={event => setNativo(event.target.value)}
                        />
                      </div>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Cliente*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="clientes"
                          value={idcliente}
                          required
                          className="form-control select2"
                          onChange={event =>
                            setIdcliente(event.target.value)
                          }
                        >
                            <option
                              key=''
                              value=''
                              disabled
                            >
                              -- Selecione --
                            </option>
                          {clientes.map(clientes => (
                            <option
                              key={clientes._id}
                              value={clientes._id}
                            >
                              {clientes.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                        
                    </div>
                    
                  
                   

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="idfabricante"
                      >
                        Fabricante*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="idfabricante"
                          value={idfabricante}
                          placeholder="Fabricante do Compressor"
                          className="form-control select2"
                          required
                          onChange={event =>
                            setIdfabricante(event.target.value)
                          }
                        >
                         <option
                              key=''
                              value=''
                              disabled
                            >
                              -- Selecione --
                            </option>
                          {fabricantes.map(fabricante => (
                            <option
                              key={fabricante._id}
                              value={fabricante._id}
                            >
                              {fabricante.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="preco"
                      >
                        Em Garantia ?*
                      </label>
                      <div className="col-sm-4">
                        <div className="checkbox">
                            <label style={{paddingLeft:35}}>
                              <input
                                id='garantia'
                                type="checkbox"
                                checked={garantia === true ? "checked" : ""}
                                onChange={event => {setGarantia(!garantia)}}
                              />
                              Sim
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="idcompressor"
                      >
                        Modelo*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="idcompressor"
                          value={idcompressor}
                          placeholder="Modelo do Compressor"
                          className="form-control select2"
                          required
                          onChange={event =>
                            setIdcompressor(event.target.value)
                          }
                        >
                          <option
                              key=''
                              value=''
                              disabled
                            >
                              -- Selecione --
                            </option>
                          {compressores.map(compressores => (
                            <option
                              key={compressores._id}
                              value={compressores._id}
                            >
                              {compressores.modelo}
                            </option>
                          ))}
                        </select>
                      </div>
                      {garantia == 1 && 
                    <>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="preco"
                      >
                        OS da Garantia*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="preco"
                        placeholder="Número da OS referente a Garantia"
                        className="form-control"
                        maxLength={40}
                        value={osgarantia}
                        onChange={event => setOsgarantia(event.target.value)}
                        />
                      </div>
                    </>
                    }
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
                      {/* {pdf && 
                        <div className="form-group">
                        <label
                          className="col-sm-2"
                          htmlFor="idcategoria"
                        >
                          Relatorio PDF
                        </label>
                        <div className="col-sm-10">
                      
                          <a href={pdf}>LINK PARA VISUALIZAR PDF</a>
                      
                        </div>
                        </div>
                      } */}


                    

                  

                     
                                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/checklistcomps")}
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
