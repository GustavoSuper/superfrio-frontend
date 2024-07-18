import React, { useEffect, useState } from "react";
import carregando from "../../assets/loading.gif";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";
import api from "../../services/api";

export default function Painel({ history }) {
  const [usernome, setUsernome] = useState("");
  //const [estab, setEstab] = useState("");
  const [visitors, setVisitors] = useState("");
  //const [delivery, setDelivery] = useState("");
  const [docs, setDocs] = useState([]);
  const [docsPit, setDocsPit] = useState([]);
  const [count, setCount] = useState("");
  const [countExit, setCountExit] = useState("");
  const [countPit, setCountPit] = useState("");
  const [msgvazio, setMsgvazio] = useState("carregando...");
  const [showcomp, setShowcomp] = useState(false);
  const [showpit, setShowpit] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkValidUser = async () => {
    const userId = localStorage.getItem("sfuserid");
    const response = await api.get("/usuarios/" + userId);
    const data = await response.data;
    if (typeof data[0] !== "object") {
      localStorage.clear();
      history.push("/login");
    }
  };

  async function checkcount() {
    const response = await api.get("/checklistcomp/countDocs");
    const data = await response.data;
    setCount(data);
  }

  async function checkcountExit() {
    const response = await api.get("/checklistcomp/count/docs/exit");
    const data = await response.data;
    setCountExit(data);
  }

  async function checkcountPit() {
    const response = await api.get("/checklistpit/countDocs");
    const data = await response.data;
    setCountPit(data);
  }

  async function ultimosDocs() {
    const response = await api.get("/checklistcomp/limit/4");
    const data = await response.data;
    setDocs(data);
  }

  async function ultimosDocsPit() {
    const response = await api.get("/checklistpit/limit/4");
    const data = await response.data;
    setDocsPit(data);
  }

  useEffect(() => {
    setLoading(true);
    checkValidUser();
    document.body.className = "hold-transition skin-blue sidebar-mini";
    setTimeout(() => {
      if (document.getElementById("menu_painel")) {
        document.getElementById("menu_painel").className = "active";
      }
    }, 50);
    setUsernome(localStorage.getItem("sfusernome"));
    checkcount();
    checkcountExit();
    checkcountPit();
    ultimosDocs();
    ultimosDocsPit();

    if (
      localStorage.getItem("sfcomp") === "true" ||
      localStorage.getItem("sfadmin") === "true"
    ) {
      setShowcomp(true);
    }

    if (
      localStorage.getItem("sfpit") === "true" ||
      localStorage.getItem("sfadmin") === "true"
    ) {
      setShowpit(true);
    }
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        {/* Main content */}
        <section className="content">
          
          {showcomp && (
            <>
          <div className="row">
              <div className="col-md-6">
                
                  {/* <h2 className="page-header">Seus resultados de Janeiro / 2020</h2> */}

                  <div className="box box-primary">
                    <div className="box-header with-border">
                      <i className="fa fa-bar-chart" />
                      <h3 className="box-title">
                        Estatística Compressores (Entrada)
                      </h3>
                    </div>
                    <div className="box-body">
                      <div className="col-lg-4 col-xs-6">
                        {/* small box */}
                        <div className="small-box bg-green">
                          <div className="inner">
                            <h3>{count.totalRecords2}</h3>
                            <p>Checklists Finalizados</p>
                          </div>
                          <div className="icon">
                            <i className="ion ion-checkmark" />
                          </div>
                          <a
                            href="/checklistcomps?status=Concluido"
                            className="small-box-footer"
                          >
                            Consultar Checklists{" "}
                            <i className="fa fa-arrow-circle-right" />
                          </a>
                        </div>
                      </div>

                      {/* { delivery && 
                    <div className="col-lg-3 col-xs-6">
                      <div className="small-box bg-aqua">
                        <div className="inner">
                          <h3>150</h3>s
                          <p>Pedidos pelo Delivery</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-bag" />
                        </div>
                        <a href="/pedidos" className="small-box-footer">
                          Ir para Pedidos{" "}
                          <i className="fa fa-arrow-circle-right" />
                        </a>
                      </div>
                    </div>
                  } */}

                      <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-yellow">
                          <div className="inner">
                            <h3>{count.totalRecords1}</h3>
                            <p>Checklists em Validação</p>
                          </div>
                          <div className="icon">
                            <i className="ion ion-chatboxes" />
                          </div>
                          <a
                            href="/checklistcomps?status=Processando"
                            className="small-box-footer"
                          >
                            Consultar Checklists{" "}
                            <i className="fa fa-arrow-circle-right" />
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-red">
                          <div className="inner">
                            <h3>{count.totalRecords0}</h3>
                            <p>Checklists Pendentes &nbsp;&nbsp;&nbsp;</p>
                          </div>
                          <div className="icon">
                            <i className="fa fa-mobile" />
                          </div>
                          <a
                            href="/checklistcomps?status=Pendente"
                            className="small-box-footer"
                          >
                            Consultar Checklists{" "}
                            <i className="fa fa-arrow-circle-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                


              </div>

              <div className="col-md-6">
                
                  {/* <h2 className="page-header">Seus resultados de Janeiro / 2020</h2> */}

                  <div className="box box-primary">
                    <div className="box-header with-border">
                      <i className="fa fa-bar-chart" />
                      <h3 className="box-title">
                        Estatística Compressores (Saída)
                      </h3>
                    </div>
                    <div className="box-body">
                      <div className="col-lg-4 col-xs-6">
                        {/* small box */}
                        <div className="small-box bg-green">
                          <div className="inner">
                            <h3>{countExit.totalRecords2}</h3>
                            <p>Checklists Finalizados</p>
                          </div>
                          <div className="icon">
                            <i className="ion ion-checkmark" />
                          </div>
                          <a
                            href="/checklistcomps?statusExit=2"
                            className="small-box-footer"
                          >
                            Consultar Checklists{" "}
                            <i className="fa fa-arrow-circle-right" />
                          </a>
                        </div>
                      </div>

                      {/* { delivery && 
                    <div className="col-lg-3 col-xs-6">
                      <div className="small-box bg-aqua">
                        <div className="inner">
                          <h3>150</h3>s
                          <p>Pedidos pelo Delivery</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-bag" />
                        </div>
                        <a href="/pedidos" className="small-box-footer">
                          Ir para Pedidos{" "}
                          <i className="fa fa-arrow-circle-right" />
                        </a>
                      </div>
                    </div>
                  } */}

                      <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-yellow">
                          <div className="inner">
                            <h3>{countExit.totalRecords1}</h3>
                            <p>Checklists em Validação</p>
                          </div>
                          <div className="icon">
                            <i className="ion ion-chatboxes" />
                          </div>
                          <a
                            href="/checklistcomps?statusExit=1"
                            className="small-box-footer"
                          >
                            Consultar Checklists{" "}
                            <i className="fa fa-arrow-circle-right" />
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-red">
                          <div className="inner">
                            <h3>{countExit.totalRecords0}</h3>
                            <p>Checklists Pendentes &nbsp;&nbsp;&nbsp;</p>
                          </div>
                          <div className="icon">
                            <i className="fa fa-mobile" />
                          </div>
                          <a
                            href="/checklistcomps?statusExit=0"
                            className="small-box-footer"
                          >
                            Consultar Checklists{" "}
                            <i className="fa fa-arrow-circle-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                
              </div>

              <div className="col-md-12">
              
                  <div className="box box-primary">
                    <div className="box-header with-border">
                      <h3 className="box-title">
                        Últimos Checklists Compressor
                      </h3>
                    </div>
                    {/* /.box-header */}
                    <div className="box-body">
                      <div className="table-responsive">
                        <table className="table no-margin">
                          <thead>
                            <tr>
                              <th>Ordem Serviço</th>
                              <th>Cliente</th>
                              <th>Status Entrada</th>
                              <th>Status Saída</th>
                            </tr>
                          </thead>
                          <tbody>
                            {docs.length
                              ? docs.map((doc) => (
                                  <tr>
                                    <td>
                                      <a href={"/checklistcomp/" + doc._id}>
                                        {doc.nos}
                                      </a>
                                    </td>
                                    <td>{doc.idcliente.nome}</td>
                                    {doc.status == 0 && (
                                      <td>
                                        <span className="label label-danger">
                                          Pendente
                                        </span>
                                      </td>
                                    )}
                                    {doc.status == 1 && (
                                      <td>
                                        <span className="label label-warning">
                                          Processando
                                        </span>
                                      </td>
                                    )}
                                    {doc.status == 2 && (
                                      <td>
                                        <span className="label label-success">
                                          Concluído
                                        </span>
                                      </td>
                                    )}
                                    {doc.statusExit == 0 && (
                                      <td>
                                        <span className="label label-danger">
                                          Pendente
                                        </span>
                                      </td>
                                    )}
                                    {doc.statusExit == 1 && (
                                      <td>
                                        <span className="label label-warning">
                                          Processando
                                        </span>
                                      </td>
                                    )}
                                    {doc.statusExit == 2 && (
                                      <td>
                                        <span className="label label-success">
                                          Concluído
                                        </span>
                                      </td>
                                    )}
                                    {doc.statusExit == null && (
                                      <td>
                                        <span className="label label-info">
                                          Não Iniciado
                                        </span>
                                      </td>
                                    )}
                                  </tr>
                                ))
                              : msgvazio}
                          </tbody>
                        </table>
                      </div>
                      {/* /.table-responsive */}
                    </div>
                    {/* /.box-body */}

                    {/* /.box-footer */}
                  </div>
                  {/* <h2 className="page-header">Seus resultados de Janeiro / 2020</h2> */}
                
              </div>



          </div>

            </>
          )}

          {/* {showpit && 
            <div className="row">
            <div className="col-md-5">
          
            <div className="box box-info">
              <div className="box-header with-border">
                  <i className="fa fa-bar-chart" />
                  <h3 className="box-title">Estatística Pit Stop</h3>
                </div>
                <div className="box-body">
                  <div className="col-lg-4 col-xs-6">
                    
                    <div className="small-box bg-green">
                      <div className="inner">
                        <h3>{countPit.totalRecords2}</h3>
                        <p>Checklists Finalizados</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-checkmark" />
                      </div>
                      <a href="/checklistpits?status=Concluido" className="small-box-footer">
                          Consultar Checklists{" "}
                          <i className="fa fa-arrow-circle-right" />
                        </a>
                    </div>
                  </div>
                
                
                  <div className="col-lg-4 col-xs-6">
                    <div className="small-box bg-yellow">
                      <div className="inner">
                        <h3>{countPit.totalRecords1}</h3>
                        <p>Checklists em Validação</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-chatboxes" />
                      </div>
                      <a href="/checklistpits?status=Processando" className="small-box-footer">
                          Consultar Checklists{" "}
                          <i className="fa fa-arrow-circle-right" />
                        </a>
                    </div>
                  </div>

                  <div className="col-lg-4 col-xs-6">
                    <div className="small-box bg-red">
                      <div className="inner">
                        <h3>{countPit.totalRecords0}</h3>
                        <p>Checklists Pendentes &nbsp;&nbsp;&nbsp;</p>
                      </div>
                      <div className="icon">
                        <i className="fa fa-mobile" />
                      </div>
                      <a href="/checklistpits?status=Pendente" className="small-box-footer">
                          Consultar Checklists{" "}
                          <i className="fa fa-arrow-circle-right" />
                        </a>
                    </div>
                  </div>

                 
                </div>
              </div>
            

              </div>

            <div className="col-md-7">
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Últimos Checklists Pit Stop</h3>
                  
                </div>
                
                <div className="box-body">
                  <div className="table-responsive">
                    
                    <table className="table no-margin">
                      <thead>
                        <tr>
                          <th>Controle ID</th>
                          <th>N Serie</th>
                          <th>Razão Social</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>

                      {docsPit.length ? docsPit.map(doc => 
                       <tr>
                        <td><a href={'/checklistpit/' + doc._id}>{doc.controlid}</a></td>
                        <td>{doc.nserie}</td>
                        <td>{doc.rsocial}</td>
                        {
                          doc.status == 0 &&
                          <td><span className="label label-danger">Pendente</span></td>
                        }
                        {
                          doc.status == 1 &&
                          <td><span className="label label-warning">Processando</span></td>
                        }
                        {
                          doc.status == 2 &&
                          <td><span className="label label-success">Concluído</span></td>
                        }
                        
                      </tr>
                      ) : msgvazio}
                        
                      </tbody>
                    </table>
                  </div>
                  
                </div>
                
              
                
              </div>

              </div>
            </div>
          } */}

          {/* <div className="row">
            <div className="col-md-12">
              <div className="box box-info">
              <div className="box-header with-border">
                  <i className="fa fa-line-chart" />
                  <h3 className="box-title">Estatísticas do EloyAqui</h3>
                </div>

                <div className="box-body">                 
                  <table className="table table-hover">
                    <tbody>
                        <tr>
                          <td>
                            Usuários do aplicativo
                          </td>
                          <td>
                            10.254 pessoas
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Estabelecimentos cadastrados
                          </td>
                          <td>
                            520 comércios   
                         </td>
                        </tr>
                      
                    </tbody>
                  </table>
                  
             
                
                </div>
              </div>
            </div>

            <div className="col-md-6"></div>
          </div> */}
          {loading && (
            <div style={{ alignItems: "center", textAlign: "center" }}>
              <img src={carregando} width="80"></img>
            </div>
          )}
        </section>
        {/* /.content */}
      </div>

      <Footer />
    </>
  );
}
