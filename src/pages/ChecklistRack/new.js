import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";
import DatePicker from "react-datepicker";
import br from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import "../ChecklistComp/style.css";
import Select from 'react-select';

export default function New_ChecklistRack({ history }) {
  const [nos, setNos] = useState("");
  const [dataentrada, setDataentrada] = useState(new Date());
  const [tensao, setTensao] = useState("");
  const [gas, setGas] = useState("");
  const [gases, setGases] = useState([]);
  const [status, setStatus] = useState(0);
  const [idcliente, setIdcliente] = useState("");
  const [idusuario, setIdusuario] = useState("");
  const [loading, setLoading] = useState("");
  const [clientes, setClientes] = useState([]);
  const [tensoes, setTensoes] = useState([]);
  const [sistemas, setSistemas] = useState([]);
  const [sistema, setSistema] = useState("");
  const [obsgeral, setObsgeral] = useState("");
  const [newitem, setNewItem] = useState("");
  const [compressores, setCompressores] = useState([]);
  const [idcompressor, setIdcompressor] = useState("");
  const [storecompressor, setStorecompressor] = useState([]);
  const [selected, setSelected] = useState([]);

  async function loadTensoes() {
    const query = "/tensao";
    const response = await api.get(query);
    const data = await response.data;
    setTensoes(data);
    setLoading(false);
  };

  async function loadSistemas() {
    const query = "/sistema";
    const response = await api.get(query);
    const data = await response.data;
    setSistemas(data);
    setLoading(false);
  };

  async function loadGas() {
    const query = "/gas";
    const response = await api.get(query);
    const data = await response.data;

    const options = data.map(item => ({value: item.nome, label: item.nome}))

    setGases(options);
    setLoading(false);
  };

  async function loadClientes() {
    const query = "/cliente";
    const response = await api.get(query);
    const data = await response.data;
    setClientes(data);
    setLoading(false);
  }

  async function loadCompressores() {
    const query = "/compressor";
    const response = await api.get(query);
    const data = await response.data;
    setCompressores(data);
    setLoading(false);
  }

  async function addNewItem() {
    setLoading(true);

    const dataobj = {
      modelo: idcompressor,
      nserie: newitem
    };

    setStorecompressor([dataobj,...storecompressor]);
    setIdcompressor("");
    setNewItem("");
    setLoading(false);
    
  }

  async function removeItem(modelo) {
    setLoading(true);
    
    setStorecompressor(
      storecompressor.filter(a =>
        a.modelo !== modelo
      )
    );
  
    setLoading(false);
    
  }

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

    const userid = localStorage.getItem("sfuserid");
    const nomeuser = localStorage.getItem("sfusernome");
    
    if(gas.length == 0){
      alert("Por favor selecionar o campo Gás antes de enviar o checklist.");
      setLoading(false);
      return;
    };

    if(storecompressor.length == 0){
      alert("Por favor selecionar os compressores antes de enviar o checklist.");
      setLoading(false);
      return;
    };

    const newGas = gas.map(item => (item.value))
    console.log(newGas.toString());
    
    const dataobj = {
      nos: nos,
      dataentrada: dataentrada,
      tensao: tensao,
      gas: newGas.toString(),
      sistema: sistema,
      status: "0",
      idcliente: idcliente,
      idrequester: userid,
      compressores: storecompressor,
      nomerequester: nomeuser,
      obsgeral: obsgeral,
    };
    
    await api.post("/checklistrack/", dataobj);
    setLoading(false);
    history.push("/checklistracks");
  }

  useEffect(() => {
    setLoading(true);
    loadTensoes();
    loadClientes();
    loadCompressores();
    loadSistemas();
    loadGas();
    setTimeout(() => {
      if (document.getElementById("menu_osrack_novo")) {
        document.getElementById("menu_osrack_novo").className = "active";
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
            <small>&nbsp;( {"Rack Frio"} )</small>
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
                      <label className="col-sm-2" htmlFor="status">
                        Status*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="status"
                          value={status}
                          className="form-control select2"
                          required
                          disabled
                          onChange={(event) => setStatus(event.target.value)}
                        >
                          <option key="0" value="0">
                            Pendente
                          </option>
                          <option key="1" value="1">
                            Em Avaliação
                          </option>
                          <option key="2" value="2">
                            Finalizado
                          </option>
                        </select>
                      </div>

                      <label className="col-sm-2 control-label" htmlFor="nome">
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
                          onChange={(event) => setNos(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="nome">
                        Data Entrada*
                      </label>

                      <div className="col-sm-4">
                        <div class="input-group">
                          <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                          </div>
                          <DatePicker
                            selected={dataentrada}
                            className="form-control"
                            locale={br}
                            dateFormat="P"
                            onChange={(date) => setDataentrada(date)}
                          />
                        </div>
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
                          onChange={(event) => setIdcliente(event.target.value)}
                        >
                          <option key="" value="" disabled>
                            -- Selecione --
                          </option>
                          {clientes.map((clientes) => (
                            <option key={clientes._id} value={clientes._id}>
                              {clientes.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="descr">
                        Tensão*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="tensao"
                          value={tensao}
                          className="form-control select2"
                          required
                          onChange={(event) => setTensao(event.target.value)}
                        >
                          <option key="" value="" disabled>
                            -- Selecione --
                          </option>
                          {tensoes.map((tensoes) => (
                            <option key={tensoes._id} value={tensoes.tensao}>
                              {tensoes.tensao}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label className="col-sm-2 control-label" htmlFor="preco">
                        Gás*
                      </label>
                      <div className="col-sm-4">
                      <Select 
                        options={gases} 
                        isMulti
                        onChange={(event) => setGas(event)}
                        placeholder="-- Selecione --"
                      />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="descr">
                        Sistema*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="tensao"
                          value={sistema}
                          className="form-control select2"
                          required
                          onChange={(event) => setSistema(event.target.value)}
                        >
                         <option key="" value="" disabled>
                            -- Selecione --
                          </option>
                          {sistemas.map((sistema) => (
                            <option key={sistema._id} value={sistema.nome}>
                              {sistema.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="descr"
                        style={{ paddingTop: 7 }}
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
                          onChange={(event) => setObsgeral(event.target.value)}
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

                    <div className="row">
                      <div className="col-xs-12">
                        <label>Compressores &nbsp;</label>
                        <button
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#modal-newitem"
                          type="button"
                          style={{ marginLeft: 5, marginBottom: 5 }}
                        >
                          +
                        </button>
                        <div className="box">
                          {/* /.box-header */}
                          <div className="box-body table-responsive no-padding">
                            <table className="table table-hover">
                              <tbody>
                                <tr>
                                  <th>Modelo</th>
                                  <th>N° Serie</th>
                                  <th>Ação</th>
                                </tr>
                                {storecompressor.map(compAdd => (
                                  <tr>
                                    <td>{compAdd.modelo}</td>
                                    <td>{compAdd.nserie}</td>
                                    <td><a onClick={() => removeItem(compAdd.modelo)}>remover</a></td>
                                  </tr>  
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {/* /.box-body */}
                        </div>
                        {/* /.box */}
                      </div>
                    </div>
                  </div>

                  <div className="box-footer">
                    <button
                      className="btn btn-default"
                      style={{ marginRight: 8 }}
                      onClick={() => history.push("/checklistracks")}
                    >
                      Voltar
                    </button>
                    <button type="submit" className="btn btn-primary">
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

      <div
        className="modal fade"
        id="modal-newitem"
        style={{ display: "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title">Adicionar Novo Compressor</h4>
            </div>
            <div className="modal-body">
              <label className="col-sm-2" htmlFor="idcompressor">
                Modelo*
              </label>
              <div className="col-sm-6">
                <select
                  id="idcompressor"
                  value={idcompressor}
                  placeholder="Modelo do Compressor"
                  className="form-control select2"
                  required
                  onChange={(event) => setIdcompressor(event.target.options[event.target.selectedIndex].text)}
                >
                  <option key="" value="" disabled>
                    -- Selecione --
                  </option>
                  {compressores.map((compressores) => (
                    <option key={compressores._id} value={compressores.modelo}>
                      {compressores.modelo}
                    </option>
                  ))}
                </select>
              </div>
              
              <br></br><br></br>
              <label className="col-sm-2" htmlFor="nserie">
                N Serie*
              </label>
              <div className="col-sm-6">
                <input
                id="itemdesc"
                placeholder="Número de Serie"
                className="form-control"
                required
                maxLength={200}
                value={newitem}
                onChange={(event) => setNewItem(event.target.value)}
              />
              </div>
            </div>
            <br></br>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default pull-left"
                data-dismiss="modal"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => addNewItem()}
                data-dismiss="modal"
                className="btn btn-primary"
              >
                Adicionar
              </button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>

      <Footer />
    </>
  );
}
