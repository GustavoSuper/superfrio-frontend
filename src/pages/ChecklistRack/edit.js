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
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [chave, setChave] = useState("");
  const [admin, setAdmin] = useState(false);
  const [newitem, setNewItem] = useState('');
  const [tensoes, setTensoes] = useState([]);
  const [storecompressor, setStorecompressor] = useState([]);

  const [nos, setNos] = useState("");
  const [gas, setGas] = useState("");
  const [idcliente, setIdcliente] = useState("");
  const [clientes, setClientes] = useState([]);
  const [sistema, setSistema] = useState("");
      
    const url_string = window.location.href;
    const param = url_string.split("/");
  
    async function loadTensoes() {
      const query = '/tensao';
      const response = await api.get(query);
      const data = await response.data;
      setTensoes(data);
      setLoading(false);
    };

    async function loadClientes() {
      const query = "/cliente";
      const response = await api.get(query);
      const data = await response.data;
      setClientes(data);
      //setLoading(false);
    }


    async function generatePDF(){
      setLoading(true);

      await api.post('/generatePDFRack/' + param[4], {})
      .then((res) => {
        if(res.data.error != undefined){
            alert(res.data.error);
            setLoading(false);
            return;
        }else{
            alert("PDF Gerado com sucesso. Clique no Botão Baixar PDF");
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
        idchecklistrack: param[4]
      };
  
      await api.post('/checklistrackitemManual', dataobj);
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

       await api.put('/checklistrackitem/'+id, dataobj)
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
      const response = await api.get('/checklistrack/'+param[4]);
      const data = await response.data;
      const dateCheck = new Date(data[0].dataentrada);
      const dateCheck2 = new Date(dateCheck.getUTCFullYear(), dateCheck.getUTCMonth(),dateCheck.getUTCDate());
      setDataentrada(dateCheck2);
      setNos(data[0].nos);     
      setStatus(data[0].status);
      setPDF(data[0].pdflink);
      setSistema(data[0].sistema);
      setObsgeral(data[0].obsgeral);
      setTensao(data[0].tensao);
      setGas(data[0].gas);
      setIdcliente(data[0].idcliente._id);  
      setStorecompressor(data[0].compressores);  
    };

    async function loadRackItens() {
      const query = '/checklistrackitem/checklist/' + param[4];
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

    await api.put('/checklistrack/'+param[4], dataobj)
    setLoading(false);
    history.push('/checklistracks')
};

    async function approve(){
        setLoading(true);
  
        const dataobj = {
          status: 2,
          status_comm: ''
        };
  
        await api.put('/checklistrack/'+param[4], dataobj)
        setLoading(false);
        history.push('/checklistracks')
    };

    useEffect(() => {
      setLoading(true);
      loadTensoes();
      checkApprOrAdmin();
      loadProd();
      loadRackItens();
      loadClientes();
      setTimeout(() => {
        if(document.getElementById('menu_osrack_consulta')){
          document.getElementById('menu_osrack_consulta').className = "active";
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
          tensao: tensao,
          cidade: cidade,
          uf: uf,
          chave: chave
        };
  
        await api.put('/checklistrack/'+param[4], dataobj)
        history.push('/checklistracks')
  
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
              &nbsp;( {"Rack Frio"} )
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
                        disabled
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
                          disabled
                          dateFormat="P"
                          onChange={date => setDataentrada(date)} 
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
                          disabled
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
                          disabled
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
                        disabled
                        maxLength={10}
                        value={gas}
                        onChange={event => setGas(event.target.value)}
                        />
                      </div>
                    </div>

                

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="descr"
                      >
                        Sistema*
                      </label>
                      <div className="col-sm-4">
                      <select
                          id="tensao"
                          value={sistema}
                          className="form-control select2"
                          disabled
                          onChange={event =>
                            setSistema(event.target.value)
                          }
                        >
                            <option
                              key=''
                              value=''
                              disabled
                            >
                              -- Selecione --
                            </option>
                            <option
                              key='RESF'
                              value='RESF'
                            >
                              RESF
                            </option>
                            <option
                              key='CONG'
                              value='CONG'
                            >
                              CONG
                            </option>
                        </select>
                      </div>
                      <label
                        className="col-sm-2 control-label"
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
                        disabled
                        value={obsgeral}
                        onChange={event => setObsgeral(event.target.value)}
                        />
                      </div>
                     
                    </div>
                  
                   
                    <div className="row">
                      <div className="col-xs-12">
                        <label>Compressores &nbsp;</label>
                        <div className="box">
                          {/* /.box-header */}
                          <div className="box-body table-responsive no-padding">
                            <table className="table table-condensed">
                              <tbody>
                                <tr>
                                  <th>Modelo</th>
                                  <th>N° Serie</th>
                                </tr>
                                {storecompressor.map(compAdd => (
                                  <tr>
                                    <td>{compAdd.modelo}</td>
                                    <td>{compAdd.nserie}</td>
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
                    
                    <br></br>

                        

                    <div className="row">
                        <div className="col-xs-12">
                        <label>Checklist &nbsp;</label>
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
                                             {item.avaliacao == 3 &&
                                              <span className="label label-info">Não Aplicavel</span>
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
                      className="btn btn-default"
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
              <h4 className="modal-title">Confirmação</h4>
            </div>
            <div className="modal-body">
              <p>Confirma a aprovação do checklist ?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Voltar</button>
              <button type="button" onClick={() => approve()} data-dismiss="modal" className="btn btn-primary">Sim</button>
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
