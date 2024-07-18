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

export default function Edit_ChecklistComp({ history }) {
  const [nos, setNos] = useState("");
  const [dataentrada, setDataentrada] = useState("");
  const [nserie, setNserie] = useState("");
  const [tensao, setTensao] = useState("");
  const [gas, setGas] = useState("");
  const [nativo, setNativo] = useState("");
  const [garantia, setGarantia] = useState(false);
  const [osgarantia, setOsgarantia] = useState("");
  const [idcliente, setIdcliente] = useState("");
  const [idcompressor, setIdcompressor] = useState("");
  const [idfabricante, setIdfabricante] = useState("");
  const [status, setStatus] = useState("");
  const [status_comm, setStatus_comm] = useState("");
  const [pdf, setPDF] = useState("");
  const [loading, setLoading] = useState("");
  const [clientes, setClientes] = useState([]);
  const [compressores, setCompressores] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  const [tensoes, setTensoes] = useState([]);
  const [itens, setItens] = useState([]);
  const [itensExit, setItensExit] = useState([]);
  const [editable, setEditable] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [newitem, setNewItem] = useState("");
  const [obsgeral, setObsgeral] = useState("");
  const [hasExitChecklist, setHasExitChecklist] = useState("");
  const [statusExit, setStatusExit] = useState("");
  const [editedItem, setEditedItem] = useState("");
  const [currentItem, setCurrentItem] = useState("");

  const url_string = window.location.href;
  const param = url_string.split("/");

  async function loadTensoes() {
    const query = "/tensao";
    const response = await api.get(query);
    const data = await response.data;
    setTensoes(data);
    setLoading(false);
  }

  async function loadClientes() {
    const query = "/cliente";
    const response = await api.get(query);
    const data = await response.data;
    setClientes(data);
    //setLoading(false);
  }

  async function loadCompressores() {
    const query = "/compressor";
    const response = await api.get(query);
    const data = await response.data;
    setCompressores(data);
    //setLoading(false);
  }

  async function loadFabricantes() {
    const query = "/fabricante";
    const response = await api.get(query);
    const data = await response.data;
    setFabricantes(data);
  }

  async function loadCompItens() {
    const query = "/checklistcompitem/checklist/" + param[4];
    const response = await api.get(query);
    const data = await response.data;
    setItens(data);
  }

  async function loadCompExitItens() {
    const query = "/checklistcompitemexit/checklist/" + param[4];
    const response = await api.get(query);
    const data = await response.data;
    setItensExit(data);
  }

  async function checkApprOrAdmin() {
    const userid = localStorage.getItem("sfuserid");
    const query = "/usuarios/" + userid;
    const response = await api.get(query);
    const data = await response.data;
    if (data[0].admin || data[0].web_appr) {
      setEditable(true);
    }
    if (data[0].admin) {
      setAdmin(true);
    }
  }

  async function generatePDF() {
    setLoading(true);

    await api
      .post("/generatePDF/" + param[4], {})
      .then((res) => {
        if (res.data.error != undefined) {
          alert(res.data.error);
          setLoading(false);
          return;
        } else {
          alert("PDF Gerado com sucesso. Clique no Botão Baixar PDF");
          //history.push('/checklistcomps');
          history.go(0);

          setLoading(false);
        }
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        return;
      });
  }

  async function downloadPDF() {
    setLoading(true);
    window.open(pdf);
    setLoading(false);
  }

  async function createCompExit(){
    if (window.confirm('Confirma a criação do Checklist de Saída ?')){
      setLoading(true);
      await api.post("/checklistcompitemexit/" + param[4]);      
      setLoading(false);
      history.go(0);
    };
  }

  async function approve() {
    setLoading(true);
    let dataobj = {};

    if(hasExitChecklist){
      dataobj = {
        statusExit: 2,
        status_comm: "",
      };
    } else {
      dataobj = {
        status: 2,
        status_comm: "",
      };
    }

    await api.put("/checklistcomp/" + param[4], dataobj);
    setLoading(false);
    history.push("/checklistcomps");
  }

  async function reject() {
    setLoading(true);
    let dataobj = {};
    
    if(hasExitChecklist){
      dataobj = {
        statusExit: 0,
        status_comm: status_comm,
      };
    } else {
      dataobj = {
        status: 0,
      status_comm: status_comm,
      };
    }

    await api.put("/checklistcomp/" + param[4], dataobj);
    setLoading(false);
    history.push("/checklistcomps");
  }

  async function addNewItem() {
    setLoading(true);

    const dataobj = {
      nomeitem: newitem,
      idchecklistcomp: param[4],
    };

    await api.post("/checklistcompitemManual", dataobj);
    setLoading(false);
    history.go(0);
  }

  async function addNewItemExit() {
    setLoading(true);

    const dataobj = {
      nomeitem: newitem,
      idchecklistcomp: param[4],
    };

    await api.post("/checklistcompitemexitManual", dataobj);
    setLoading(false);
    history.go(0);
  }

  async function prepareModal(id, comentario) {
    const response = prompt("Altere o comentário abaixo:", comentario);
    if (response !== null) {
      setLoading(true);
      const dataobj = {
        comentario: response,
      };

      await api.put("/checklistcompitem/" + id, dataobj);
      setLoading(false);
      history.go(0);
    }
  }

  async function prepareModalExit(id, comentario) {
    const response = prompt("Altere o comentário abaixo:", comentario);
    if (response !== null) {
      setLoading(true);
      const dataobj = {
        comentario: response,
      };

      await api.put("/checklistcompitemexit/" + id, dataobj);
      setLoading(false);
      history.go(0);
    }
  }

  async function loadProd() {
    const response = await api.get("/checklistcomp/" + param[4]);
    const data = await response.data;

    setNos(data[0].nos);
    const dateCheck = new Date(data[0].dataentrada);
    const dateCheck2 = new Date(
      dateCheck.getUTCFullYear(),
      dateCheck.getUTCMonth(),
      dateCheck.getUTCDate()
    );
    setDataentrada(dateCheck2);
    setNserie(data[0].nserie);
    setTensao(data[0].tensao);
    setGas(data[0].gas);
    setNativo(data[0].nativo);
    setGarantia(data[0].garantia);
    setOsgarantia(data[0].osgarantia);
    setStatus(data[0].status);
    setPDF(data[0].pdflink);
    setIdcliente(data[0].idcliente._id);
    setIdcompressor(data[0].idcompressor._id);
    setIdfabricante(data[0].idfabricante._id);
    setObsgeral(data[0].comentarios);
    setHasExitChecklist(data[0].hasExitChecklist);
    setStatusExit(data[0].statusExit);
  }

  useEffect(() => {
    setLoading(true);
    checkApprOrAdmin();
    loadTensoes();
    loadClientes();
    loadCompressores();
    loadFabricantes();
    loadCompItens();
    loadCompExitItens();
    loadProd();
    setTimeout(() => {
      if (document.getElementById("menu_oscomp_consulta")) {
        document.getElementById("menu_oscomp_consulta").className = "active";
      }
    }, 50);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const dataobj = {
      status: status,
      nos: nos,
      dataentrada: dataentrada,
      nserie: nserie,
      tensao: tensao,
      gas: gas,
      nativo: nativo,
      garantia: garantia,
      osgarantia: osgarantia,
      idcliente: idcliente,
      idcompressor: idcompressor,
      idfabricante: idfabricante,
      comentarios: obsgeral,
    };

    await api.put("/checklistcomp/" + param[4], dataobj);
    history.push("/checklistcomps");
  }

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {"Ordem Serviço"}
            <small>&nbsp;( {"Compressor"} )</small>
          </h1>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box-footer">
                <button
                  className="btn btn-default"
                  style={{ marginRight: 8 }}
                  onClick={() => history.goBack()}
                >
                  Voltar
                </button>
                {status != "2" && editable && (
                  <button
                    type="submit"
                    form="formCheck"
                    className="btn btn-success"
                    style={{ marginRight: 8 }}
                  >
                    Salvar
                  </button>
                )}
                {(status == "1" || statusExit == "1") && editable && (
                  <button
                    className="btn btn-success"
                    onClick={() => approve()}
                    style={{ marginRight: 8 }}
                  >
                    Aprovar
                  </button>
                )}
                {(status == "1" || statusExit == "1") && editable && (
                  <button
                    className="btn btn-danger"
                    data-toggle="modal"
                    data-target="#modal-default"
                    style={{ marginRight: 8 }}
                  >
                    Rejeitar
                  </button>
                )}

                {parseInt(status) > 0 && (
                  <button
                    className="btn btn-info"
                    onClick={() => generatePDF()}
                    style={{ marginRight: 8 }}
                  >
                    Re-gerar PDF
                  </button>
                )}
                {parseInt(status) > 0 && pdf && (
                  <button
                    className="btn btn-info"
                    onClick={() => downloadPDF()}
                    style={{ marginRight: 8 }}
                  >
                    Baixar PDF
                  </button>
                )}
                {parseInt(status) > 1 && hasExitChecklist == false && (
                  <button
                    className="btn btn-info"
                    onClick={() => createCompExit()}
                    style={{ marginRight: 8 }}
                  >
                    Iniciar Checklist de Saída
                  </button>
                )}
              </div>
              <div className="box box-primary">
                {loading && (
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <img src={carregando} width="80"></img>
                  </div>
                )}

                <form
                  id="formCheck"
                  className="form-horizontal"
                  onSubmit={handleSubmit}
                >
                  <div className="box-body">
                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="status">
                        Status Entrada*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="status"
                          value={status}
                          className="form-control select2"
                          required
                          disabled={!editable}
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
                          disabled={!editable}
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
                            disabled={!admin}
                            dateFormat="P"
                            onChange={(date) => setDataentrada(date)}
                          />
                        </div>
                      </div>
                      <label className="col-sm-2 control-label" htmlFor="status">
                        Status Saída*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="statusExit"
                          value={statusExit}
                          className="form-control select2"
                          required
                          disabled
                          onChange={(event) => setStatusExit(event.target.value)}
                        >
                          <option key="" value="">
                            Não Iniciado
                          </option>
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
                          disabled={!editable}
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
                      <label className="col-sm-2 control-label" htmlFor="nome">
                        Número de Série*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="nome"
                          placeholder="Número de Série do Compressor"
                          className="form-control"
                          value={nserie}
                          disabled={!editable}
                          required
                          maxLength={40}
                          onChange={(event) => setNserie(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="preco">
                        Número de Ativo*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="preco"
                          placeholder="Número de Ativo do Compressor"
                          className="form-control"
                          required
                          disabled={!editable}
                          maxLength={20}
                          value={nativo}
                          onChange={(event) => setNativo(event.target.value)}
                        />
                      </div>
                      <label className="col-sm-2 control-label" htmlFor="preco">
                        Gás*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="preco"
                          placeholder="Gás utilizado no Compressor"
                          className="form-control"
                          required
                          disabled={!editable}
                          maxLength={10}
                          value={gas}
                          onChange={(event) => setGas(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="idfabricante">
                        Fabricante*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="idfabricante"
                          value={idfabricante}
                          placeholder="Fabricante do Compressor"
                          className="form-control select2"
                          required
                          disabled={!editable}
                          onChange={(event) =>
                            setIdfabricante(event.target.value)
                          }
                        >
                          <option key="" value="" disabled>
                            -- Selecione --
                          </option>
                          {fabricantes.map((fabricante) => (
                            <option key={fabricante._id} value={fabricante._id}>
                              {fabricante.nome}
                            </option>
                          ))}
                        </select>
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
                          disabled={!editable}
                          className="form-control select2"
                          onChange={(event) => setIdcliente(event.target.value)}
                        >
                          <option key="" value=""></option>
                          {clientes.map((clientes) => (
                            <option key={clientes._id} value={clientes._id}>
                              {clientes.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="idcompressor">
                        Modelo*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="idcompressor"
                          value={idcompressor}
                          placeholder="Modelo do Compressor"
                          className="form-control select2"
                          required
                          disabled={!editable}
                          onChange={(event) =>
                            setIdcompressor(event.target.value)
                          }
                        >
                          <option key="" value="" disabled>
                            -- Selecione --
                          </option>
                          {compressores.map((compressores) => (
                            <option
                              key={compressores._id}
                              value={compressores._id}
                            >
                              {compressores.modelo}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label className="col-sm-2 control-label" htmlFor="preco">
                        Em Garantia ?*
                      </label>
                      <div className="col-sm-4">
                        <div className="checkbox">
                          <label style={{ paddingLeft: 35 }}>
                            <input
                              id="garantia"
                              type="checkbox"
                              disabled={!editable}
                              checked={garantia === true ? "checked" : ""}
                              onChange={(event) => {
                                setGarantia(!garantia);
                              }}
                            />
                            Sim
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="descr"
                        style={{ paddingTop: 7 }}
                      >
                        Observação Geral*
                      </label>
                      <div className="col-sm-4">
                        <textarea
                          id="obsgeral"
                          className="form-control"
                          rows={3}
                          value={obsgeral}
                          disabled={!editable}
                          onChange={(event) => setObsgeral(event.target.value)}
                        />
                      </div>
                      {garantia == 1 && (
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
                              disabled={!editable}
                              value={osgarantia}
                              onChange={(event) =>
                                setOsgarantia(event.target.value)
                              }
                            />
                          </div>
                        </>
                      )}
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

                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active">
                          <a
                            href="#tab_1"
                            data-toggle="tab"
                            aria-expanded="false"
                          >
                            Check-list de Entrada
                          </a>
                        </li>
                        
                          {hasExitChecklist &&
                            <li>
                              <a
                                href="#tab_2"
                                data-toggle="tab"
                                aria-expanded="false"
                              >
                                Check-list de Saída
                              </a>
                            </li>
                          }
                          {!hasExitChecklist &&
                          <li className="disabled">
                            <a>
                              Check-list de Saída
                            </a>
                          </li>
                          }
                      </ul>

                      <div className="tab-content">
                        <div className="tab-pane active" id="tab_1">
                          <div className="row">
                            <div className="col-xs-12">
                              <div className="box">
                                {/* /.box-header */}
                                <div className="box-body table-responsive no-padding">
                                  <table className="table table-hover">
                                    <tbody>
                                      <tr>
                                        <th>Ordem</th>
                                        <th>Item</th>
                                        <th>Avaliação</th>
                                        <th>Comentário</th>
                                        {status == "1" && editable && <th></th>}
                                        <th>Última Atualização</th>
                                        <th>Link Foto</th>
                                      </tr>

                                      {itens &&
                                        itens.map((item) => (
                                          <tr>
                                            <td>{item.ordemitem}</td>
                                            <td>{item.nomeitem}</td>
                                            <td>
                                              {item.avaliacao == 0 && (
                                                <span className="label label-success">
                                                  Bom
                                                </span>
                                              )}
                                              {item.avaliacao == 1 && (
                                                <span className="label label-danger">
                                                  Ruim
                                                </span>
                                              )}
                                              {item.avaliacao == 2 && (
                                                <span className="label label-warning">
                                                  Faltando
                                                </span>
                                              )}
                                            </td>
                                            <td>
                                              {item.comentario
                                                ? item.comentario
                                                : "-"}
                                            </td>
                                            {status == "1" && editable && (
                                              <td>
                                                <a
                                                  onClick={() =>
                                                    prepareModal(
                                                      item._id,
                                                      item.comentario
                                                    )
                                                  }
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <i
                                                    class="fa fa-edit"
                                                    style={{ color: "blue" }}
                                                  ></i>
                                                </a>
                                              </td>
                                            )}
                                            <td>
                                              {item.avaliacao != null
                                                ? item.updatedAt.substring(
                                                    8,
                                                    10
                                                  ) +
                                                  "/" +
                                                  item.updatedAt.substring(
                                                    5,
                                                    7
                                                  ) +
                                                  "/" +
                                                  item.updatedAt.substring(0, 4)
                                                : "-"}
                                            </td>
                                            <td>
                                              {item.foto ? (
                                                <a
                                                  href={item.foto}
                                                  target="_blank"
                                                >
                                                  <i className="fa fa-image" />
                                                </a>
                                              ) : (
                                                "-"
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                  <br></br>
                                </div>
                                {editable && status < 1 && (
                                  <button
                                    className="btn btn-success"
                                    data-toggle="modal"
                                    data-target="#modal-newitem"
                                    type="button"
                                    style={{ marginRight: 8 }}
                                  >
                                    + Adicionar Novo Item
                                  </button>
                                )}
                                <p>&nbsp;</p>
                                {/* /.box-body */}
                              </div>
                              {/* /.box */}
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="tab_2">
                          <div className="row">
                            <div className="col-xs-12">
                              <div className="box">
                                {/* /.box-header */}
                                <div className="box-body table-responsive no-padding">
                                  <table className="table table-hover">
                                    <tbody>
                                      <tr>
                                        <th>Ordem</th>
                                        <th>Item</th>
                                        <th>Avaliação</th>
                                        <th>Comentário</th>
                                        {status == "1" && editable && <th></th>}
                                        <th>Última Atualização</th>
                                        <th>Link Foto</th>
                                      </tr>

                                      {itensExit &&
                                        itensExit.map((item) => (
                                          <tr>
                                            <td>{item.ordemitem}</td>
                                            <td>{item.nomeitem}</td>
                                            <td>
                                              {item.avaliacao == 0 && (
                                                <span className="label label-success">
                                                  Bom
                                                </span>
                                              )}
                                              {item.avaliacao == 1 && (
                                                <span className="label label-danger">
                                                  Ruim
                                                </span>
                                              )}
                                              {item.avaliacao == 2 && (
                                                <span className="label label-warning">
                                                  Faltando
                                                </span>
                                              )}
                                            </td>
                                            <td>
                                              {item.comentario
                                                ? item.comentario
                                                : "-"}
                                            </td>
                                            {status == "1" && editable && (
                                              <td>
                                                <a
                                                  onClick={() =>
                                                    prepareModalExit(
                                                      item._id,
                                                      item.comentario
                                                    )
                                                  }
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <i
                                                    class="fa fa-edit"
                                                    style={{ color: "blue" }}
                                                  ></i>
                                                </a>
                                              </td>
                                            )}
                                            <td>
                                              {item.avaliacao != null
                                                ? item.updatedAt.substring(
                                                    8,
                                                    10
                                                  ) +
                                                  "/" +
                                                  item.updatedAt.substring(
                                                    5,
                                                    7
                                                  ) +
                                                  "/" +
                                                  item.updatedAt.substring(0, 4)
                                                : "-"}
                                            </td>
                                            <td>
                                              {item.foto ? (
                                                <a
                                                  href={item.foto}
                                                  target="_blank"
                                                >
                                                  <i className="fa fa-image" />
                                                </a>
                                              ) : (
                                                "-"
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                  <br></br>
                                </div>
                                {editable && status < 1 && (
                                  <button
                                    className="btn btn-success"
                                    data-toggle="modal"
                                    data-target="#modal-newitemExit"
                                    type="button"
                                    style={{ marginRight: 8 }}
                                  >
                                    + Adicionar Novo Item
                                  </button>
                                )}
                                <p>&nbsp;</p>
                                {/* /.box-body */}
                              </div>
                              {/* /.box */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="box-footer">
                    <button
                      className="btn btn-default"
                      style={{ marginRight: 8 }}
                      // onClick={() => history.push("/checklistcomps")}
                      onClick={() => history.goBack()}
                    >
                      Voltar
                    </button>
                    {status == "1" && editable && (
                      <button type="submit" className="btn btn-info">
                        Salvar
                      </button>
                    )}
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
        id="modal-default"
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
              <h4 className="modal-title">Rejeitar Checklist</h4>
            </div>
            <div className="modal-body">
              <input
                id="status_comm"
                placeholder="Motivo rejeição"
                className="form-control"
                required
                maxLength={200}
                value={status_comm}
                onChange={(event) => setStatus_comm(event.target.value)}
              />
            </div>
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
                onClick={() => reject()}
                data-dismiss="modal"
                className="btn btn-primary"
              >
                Rejeitar
              </button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
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
              <h4 className="modal-title">
                Adicionar Novo Item no Checklist Entrada
              </h4>
            </div>
            <div className="modal-body">
              <input
                id="itemdesc"
                placeholder="Nome do Item"
                className="form-control"
                required
                maxLength={200}
                value={newitem}
                onChange={(event) => setNewItem(event.target.value)}
              />
            </div>
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

      <div
        className="modal fade"
        id="modal-newitemExit"
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
              <h4 className="modal-title">
                Adicionar Novo Item no Checklist Saída
              </h4>
            </div>
            <div className="modal-body">
              <input
                id="itemdesc"
                placeholder="Nome do Item"
                className="form-control"
                required
                maxLength={200}
                value={newitem}
                onChange={(event) => setNewItem(event.target.value)}
              />
            </div>
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
                onClick={() => addNewItemExit()}
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

      <div
        className="modal fade"
        id="modal-edititem"
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
              <h4 className="modal-title">Editar comentário</h4>
            </div>
            <div className="modal-body">
              <input
                id="itemdesc"
                placeholder="Comentário"
                className="form-control"
                required
                maxLength={200}
                value={newitem}
                onChange={(event) => setNewItem(event.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default pull-left"
                data-dismiss="modal"
              >
                Voltar
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
