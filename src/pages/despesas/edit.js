import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";
import DatePicker from "react-datepicker";
import br from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

export default function Edit_ChecklistComp({ history }) {
  const [numero, setNumero] = useState("");
  const [dataentrada, setDataentrada] = useState("");
  const [status, setStatus] = useState("");
  const [nomerequester, setNomerequester] = useState("");
  const [pdf, setPDF] = useState("");
  const [loading, setLoading] = useState("");
  const [nomeaprovador, setNomeaprovador] = useState([]);
  const [editable, setEditable] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [obsgeral, setObsgeral] = useState("");
  const [itens, setItens] = useState([]);
  const [valor, setValor] = useState(0);

  const url_string = window.location.href;
  const param = url_string.split("/");

  async function loadCompItens() {
    const query = "/despesaItem/despesa/" + param[4];
    const response = await api.get(query);
    const data = await response.data;
    setItens(data);
    let valor = 0;
    data.map((item) => {
      valor = valor + item.valor;
    })
    setValor(valor);
  }

  async function generatePDF() {
    setLoading(true);

    await api
      .post("/generatePDFDespesa/" + param[4], {})
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

  async function loadProd() {
    const response = await api.get("/despesa/" + param[4]);
    const data = await response.data;
    console.log(JSON.stringify(data));
    setNumero(data[0].numero);
    const dateCheck = new Date(data[0].dataentrada);
    const dateCheck2 = new Date(
      dateCheck.getUTCFullYear(),
      dateCheck.getUTCMonth(),
      dateCheck.getUTCDate()
    );
    setDataentrada(dateCheck2);
    setNomerequester(data[0].nomerequester);
    setNomeaprovador(data[0].nomeaprovador);
    setStatus(data[0].status);
    setPDF(data[0].pdflink);
    setObsgeral(data[0].comentarios);
  }

  useEffect(() => {
    setLoading(true);
    loadCompItens();
    loadProd();
    setTimeout(() => {
      if (document.getElementById("menu_desp_consulta")) {
        document.getElementById("menu_desp_consulta").className = "active";
      }
    }, 50);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {"Relatório de Despesas"}
            <small>&nbsp;( {"Consulta"} )</small>
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

                {parseInt(status) > 1 && (
                  <button
                    className="btn btn-info"
                    onClick={() => generatePDF()}
                    style={{ marginRight: 8 }}
                  >
                    Gerar PDF
                  </button>
                )}
                {parseInt(status) > 1 && pdf && (
                  <button
                    className="btn btn-info"
                    onClick={() => downloadPDF()}
                    style={{ marginRight: 8 }}
                  >
                    Baixar PDF
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
                >
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
                          disabled={true}
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
                        Número*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="nome"
                          placeholder="Número da Ordem de Serviço"
                          className="form-control"
                          value={numero}
                          required
                          disabled={true}
                          maxLength={40}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="nome">
                        Data Entrada*
                      </label>

                      <div className="col-sm-4">
                        <div className="input-group">
                          <div className="input-group-addon">
                            <i className="fa fa-calendar"></i>
                          </div>
                          <DatePicker
                            selected={dataentrada}
                            className="form-control"
                            locale={br}
                            disabled={true}
                            dateFormat="P"
                          />
                        </div>
                      </div>
                      <label className="col-sm-2 control-label" htmlFor="preco">
                        Aprovador*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="preco"
                          className="form-control"
                          required
                          disabled={true}
                          maxLength={200}
                          value={nomeaprovador}
                        />
                      </div>
                     
                    </div>

                   

                    <div className="form-group">
                      <label className="col-sm-2" htmlFor="preco">
                        Requisitante*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="preco"                         
                          className="form-control"
                          required
                          disabled={true}
                          maxLength={200}
                          value={nomerequester}
                        />
                      </div>
                      <label className="col-sm-2 control-label" htmlFor="preco">
                        Valor*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="preco"
                          className="form-control"
                          required
                          disabled={true}
                          maxLength={200}
                          value={new Intl.NumberFormat('pt-br',{style: 'currency', currency:'BRL'}).format(valor)}
                        />
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
                            NF's / Recibos
                          </a>
                        </li>
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
                                        <th>Tipo Despesa</th>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                        <th>Link Imagem</th>
                                      </tr>

                                      {itens &&
                                        itens.map((item) => (
                                          <tr>
                                            <td>{item.categoriaText}</td>
                                            <td>{item.descr}</td>
                                            <td>{new Intl.NumberFormat('pt-br',{style: 'currency', currency:'BRL'}).format(item.valor)}</td>
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
                                </div>
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
