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

export default function Edit_ChecklistComp({ history }) {
  
  const [dataentrada, setDataentrada] = useState("");
  const [nserie, setNserie] = useState("");
  const [controlid, setControlid] = useState("");
  const [CNPJ, setCNPJ] = useState("");
  const [rsocial, setRsocial] = useState("");
  const [status, setStatus] = useState("");
  const [status_comm, setStatus_comm] = useState("");
  const [tipo, setTipo] = useState("");
  const [pdf, setPDF] = useState('');
  const [loading, setLoading] = useState("");
  const [itens, setItens] = useState([]);
  const [editable, setEditable] = useState(false);
  const [obsgeral, setObsgeral] = useState('');
  const [tensao, setTensao] = useState("");
  const [marca, setMarca] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [chave, setChave] = useState("");
  const [admin, setAdmin] = useState(false);
  const [newitem, setNewItem] = useState('');
  const [tensoes, setTensoes] = useState([]);
  const [marcas, setMarcas] = useState([]);
      
    const url_string = window.location.href;
    const param = url_string.split("/");
  
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

    async function generatePDF(){
      setLoading(true);

      await api.post('/generatePDFPit/' + param[4], {})
      .then((res) => {
        if(res.data.error != undefined){
            alert(res.data.error);
            setLoading(false);
            return;
        }else{
            alert("PDF Gerado com sucesso. Clique no Botão Baixar PDF");
            //history.push('/checklistpits');
            history.go(0);
            
            setLoading(false);
        }
        }).catch((error) => {
            alert(error);
            setLoading(false);
            return;
        });    

    };

    async function addNewItem(){
      setLoading(true);
  
      const dataobj = {
        nomeitem: newitem,
        idchecklistpit: param[4]
      };
  
      await api.post('/checklistpititemManual', dataobj);
      setLoading(false);
      history.go(0);
  };

  async function prepareModal(id, comentario) {
    const response = prompt("Altere o comentário abaixo:", comentario);
    if(response !== null){
       setLoading(true);
       const dataobj = {
         comentario: response
       };

       await api.put('/checklistpititem/'+id, dataobj)
       setLoading(false);
       history.go(0)
    }
 };

    async function checkApprOrAdmin() {
      const userid = localStorage.getItem("sfuserid");
      const query = '/usuarios/' + userid;
      const response = await api.get(query);
      const data = await response.data;
      if(data[0].admin || data[0].web_appr ){
        setEditable(true);
      };
      if(data[0].admin){
        setAdmin(true);
      };
      
    };

    async function loadProd() {
      const response = await api.get('/checklistpit/'+param[4]);
      const data = await response.data;
      const dateCheck = new Date(data[0].dataentrada);
      const dateCheck2 = new Date(dateCheck.getUTCFullYear(), dateCheck.getUTCMonth(),dateCheck.getUTCDate());
      setDataentrada(dateCheck2);
      setNserie(data[0].nserie);
      setControlid(data[0].controlid);
      setCNPJ(data[0].CNPJ);
      setRsocial(data[0].rsocial);
      setStatus(data[0].status);
      setPDF(data[0].pdflink);
      setTipo(data[0].tipo);
      setObsgeral(data[0].comentarios);
      setTensao(data[0].tensao);
      setMarca(data[0].marca);
      setCidade(data[0].cidade);
      setUf(data[0].uf);
      setChave(data[0].chave);
    };

    async function loadPitItens() {
      const query = '/checklistpititem/checklist/' + param[4];
      const response = await api.get(query);
      const data = await response.data;
      setItens(data);
    };

    async function downloadPDF(){
      setLoading(true);
      window.open(pdf);
      setLoading(false);

  };

  async function reject(){
    setLoading(true);

    const dataobj = {
      status: 0,
      status_comm: status_comm
    };

    await api.put('/checklistpit/'+param[4], dataobj)
    setLoading(false);
    history.push('/checklistpits')
};

    async function approve(criacheck){
        setLoading(true);
  
        const dataobj = {
          status: 2,
          status_comm: ''
        };

        if(criacheck){
          //copiar checklist para tipo instalação
        }
  
        await api.put('/checklistpit/'+param[4], dataobj)
        setLoading(false);
        history.push('/checklistpits')
    };

    useEffect(() => {
      setLoading(true);
      loadTensoes();
      loadMarcas();
      checkApprOrAdmin();
      loadProd();
      loadPitItens();
      setTimeout(() => {
        if(document.getElementById('menu_ospit_consulta')){
          document.getElementById('menu_ospit_consulta').className = "active";
        }      
      }, 50);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    },[]);

    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = {
          status: status,
          dataentrada: dataentrada,
          nserie: nserie,
          controlid: controlid,
          CNPJ: CNPJ,
          rsocial: rsocial,
          tipo: tipo,
          comentario: obsgeral,
          marca: marca,
          tensao: tensao,
          cidade: cidade,
          uf: uf,
          chave: chave
        };
  
        await api.put('/checklistpit/'+param[4], dataobj)
        history.push('/checklistpits')
  
    };

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {"Ordem Serviço"}
            <small>
              &nbsp;( {"Pit Stop"} )
            </small>
          </h1>
        </section>


        <section className="content">
          <div className="row">
            <div className="col-md-12">
            <div className="box-footer">
              <button
                className="btn btn-default"
                style={{marginRight:8}}
                onClick={() => history.goBack()}
              >
                Voltar
              </button>
              { status != '2' && editable &&
              <button type="submit" form="formCheck" className="btn btn-info" style={{marginRight:8}}>
                Salvar
              </button>   
              }
              {
                status == '1' && editable &&
                <button className="btn btn-success" data-toggle="modal" data-target="#modal-changeType" style={{marginRight:8}}>
                  Aprovar
                </button>   
              }
               {
                status == '1' && editable &&
                <button className="btn btn-danger" data-toggle="modal" data-target="#modal-default" style={{marginRight:8}}>
                  Rejeitar
                </button>   
              }
              
              {
                status == '2' &&
                <button className="btn btn-info" onClick={() => generatePDF()} style={{marginRight:8}}>
                  Re-gerar PDF
                </button>   
              }
              {
                status == '2' && pdf &&
                <button className="btn btn-info" onClick={() => downloadPDF()} style={{marginRight:8}}>
                  Baixar PDF
                </button>   
              }
          </div>
              <div className="box box-info">
                {loading && (
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <img src={carregando} width="80"></img>
                  </div>
                )}

                <form id="formCheck" className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="box-body">
                  
                  <div className="form-group">
                      <label className="col-sm-2" htmlFor="status" style={{paddingTop:7}}>Status*</label>
                      <div className="col-sm-4">
                        <select
                          id="status"
                          value={status}
                          className="form-control select2"
                          required
                          disabled={!editable}
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
                          disabled={!editable}
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
                          disabled={!editable}
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
                        disabled={!editable}
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
                        disabled={!editable}
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
                        disabled={!editable}
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
                        disabled={!editable}
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
                        disabled={!editable}
                        maxLength={100}
                        onChange={event => setCNPJ(event.target.value)}
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
                          disabled={!editable}
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
                          disabled={!editable}
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
                        disabled={!editable}
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
                        disabled={!editable}
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
                                    { status == '1' && editable &&
                                      <th></th>
                                    }
                                    <th>Última Atualização</th>
                                    <th>Link Foto</th>
                                  </tr>

                                  {itens && itens.map(item => (
                                        <tr>
                                          <td>{item.ordemitem}</td>
                                          <td>{item.nomeitem}</td>
                                          <td>
                                            {item.avaliacao == 0 &&
                                              <span className="label label-success">Bom</span>
                                            }
                                            {item.avaliacao == 1 &&
                                              <span className="label label-danger">Ruim</span>
                                            }
                                            {item.avaliacao == 2 &&
                                              <span className="label label-warning">Faltando</span>
                                            }
                                          </td>
                                          <td>
                                            {
                                              item.comentario ? item.comentario : "-"
                                            }
                                          </td>
                                          { status == '1' && editable &&
                                            <td>
                                              <a onClick={() => prepareModal(item._id, item.comentario)} style={{cursor:'pointer'}}>
                                                <i class="fa fa-edit" style={{color:"blue"}}></i>
                                              </a>
                                            </td>
                                          }
                                          <td>
                                            {item.avaliacao != null ? item.updatedAt.substring(8, 10) + "/" + item.updatedAt.substring(5, 7) + "/" + item.updatedAt.substring(0, 4) : "-"}
                                          </td>
                                          <td>
                                            {
                                              item.foto ? <a href={item.foto} target="_blank"><i className="fa fa-image" /></a> : "-"
                                            }
                                          </td>
                                      </tr>
                                  ))}


                                
                                </tbody></table>
                                <br></br>
                            </div>
                            { admin && status < 1 &&
                              <button className="btn btn-success" data-toggle="modal" data-target="#modal-newitem" type="button" style={{marginRight:8}}>
                              + Adicionar Novo Item
                              </button>  
                            }
                            <p>&nbsp;</p>     
                            {/* /.box-body */}
                          </div>
                          {/* /.box */}
                        </div>
                      </div>

                    

                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-info"
                      style={{marginRight:8}}
                      onClick={() => history.goBack()}
                    >
                      Voltar
                    </button>
                    {
                      status == '1' && editable &&
                    <button type="submit" form="formCheck" className="btn btn-info">
                      Salvar
                    </button>
                    }
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

      <div className="modal fade" id="modal-default" style={{display: 'none'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
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
              onChange={event => setStatus_comm(event.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Voltar</button>
              <button type="button" onClick={() => reject()} data-dismiss="modal" className="btn btn-primary">Rejeitar</button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>

      <div className="modal fade" id="modal-newitem" style={{display: 'none'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
              <h4 className="modal-title">Adicionar Novo Item no Checklist</h4>
            </div>
            <div className="modal-body">
            <input
              id="itemdesc"
              placeholder="Nome do Item"
              className="form-control"
              required
              maxLength={200}
              value={newitem}
              onChange={event => setNewItem(event.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Voltar</button>
              <button type="button" onClick={() => addNewItem()} data-dismiss="modal" className="btn btn-primary">Adicionar</button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>

      <div className="modal fade" id="modal-changeType" style={{display: 'none'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
              <h4 className="modal-title">Deseja criar o checklist de Instalação ?</h4>
            </div>
            <div className="modal-body">
              <p>Ao aprovar o checklist você pode copiar o checklist atual e transforma-lo no tipo "Instalação".</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Voltar</button>
              <button type="button" onClick={() => approve(true)} data-dismiss="modal" className="btn btn-primary">Sim</button>
              <button type="button" onClick={() => approve(false)} data-dismiss="modal" className="btn btn-primary">Não</button>
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
