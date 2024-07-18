import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function New_Usuario({ history }) {
  
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [telefone, setTelefone] = useState("");
    const [loading, setLoading] = useState("");
    const [centro_custo, setCentro_custo] = useState("");
    const [admin, setAdmin] = useState(false);
    const [access_comp, setAccess_comp] = useState(false);
    const [access_pit, setAccess_pit] = useState(false);
    const [access_rack, setAccess_rack] = useState(false);
    const [access_desp, setAccess_desp] = useState(false);
    const [access_app, setAccess_app] = useState(false);
    const [access_web, setAccess_web] = useState(false);
    const [web_appr, setWeb_appr] = useState(false);
    const [desp_appr, setDesp_appr] = useState(false);
    const [desp_apprNot, setDesp_apprNot] = useState(false);
    const [idarea, setIdarea] = useState("");
    const [area, setArea] = useState("");
    const [areas, setAreas] = useState([]);

    const checkadmin = () => {
      const b_admin = localStorage.getItem("sfadmin");
      if(b_admin != 'true') history.push('/painel');
    }
    
    async function loadAreas() {
      const query = '/despesaareaappr';
      const response = await api.get(query);
      const data = await response.data;
      setAreas(data);
      setLoading(false);
    };

    async function handleSubmit(event) {
      setLoading(true);
        event.preventDefault();
  
        const dataobj = {
          nome: nome, 
          email: email,
          pwd: pwd,
          validado:true,
          telefone: telefone,
          centro_custo: centro_custo,
          admin:admin,
          access_app: access_app,
          access_web: access_web,
          access_comp: access_comp,
          access_pit: access_pit,
          access_rack: access_rack,
          access_despesa: access_desp,
          web_appr: web_appr,
          desp_appr: desp_appr,
          receive_final_despesa: desp_apprNot,
          area: area,
          idarea: idarea
        };
        
        await api.post('/usuarios/', dataobj).then((res) => {
          if(res.data.error != undefined){
            alert(res.data.error);
            setLoading(false);
            return;              
          }else{
            setLoading(false);
            history.push('/usuarios')
          }
          }).catch((error) => {
            alert(error);
            setLoading(false);
            return;
          });
      
        
  
    };

    useEffect(() => {
        setLoading(true);
        checkadmin();
        loadAreas();
        setTimeout(() => {
          if(document.getElementById('menu_usuario')){
            document.getElementById('menu_usuario').className = "active";
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
            {"Novo Usuário"}
            {/* <small>
              &nbsp;( {"Compressor"} )
            </small> */}
          </h1>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">

                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="box-body">

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="nome"
                      >
                        Nome*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="nome"
                        placeholder="Nome Completo do Usuário"
                        className="form-control"
                        required
                        maxLength={60}
                        value={nome}
                        onChange={event => setNome(event.target.value)}
                        />
                      </div>
                      </div><div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="preco"
                      >
                        E-mail*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="email"
                        placeholder="E-mail do Usuário"
                        className="form-control"
                        required
                        maxLength={50}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        />
                        </div>
                    </div>
                    
                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="nome"
                      >
                        Senha*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="nome"
                        type="password"
                        placeholder="Senha do Usuário"
                        className="form-control"
                        required
                        maxLength={20}
                        value={pwd}
                        onChange={event => setPwd(event.target.value)}
                        />
                      </div>
                      </div>
                      <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="preco"
                      >
                        Telefone
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="email"
                        placeholder="Telefone do Usuário"
                        className="form-control"
                        required
                        maxLength={14}
                        value={telefone}
                        onChange={event => setTelefone(event.target.value)}
                        />
                        </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="nome"
                      >
                        Centro de Custo*
                      </label>
                      <div className="col-sm-4">
                      <input
                        id="nome"
                        placeholder="Nome ou Codigo do Centro de Custo do usuário"
                        className="form-control"
                        required
                        maxLength={60}
                        value={centro_custo}
                        onChange={event => setCentro_custo(event.target.value)}
                        />
                      </div>
                      </div>

                      <div className="form-group">
                      <label
                        className="col-sm-2"
                        htmlFor="descr"
                      >
                        Area*
                      </label>
                      <div className="col-sm-4">
                      <select
                          id="aprovador"
                          value={idarea}
                          className="form-control select2"
                          required
                          onChange={event => {
                            setArea(event.target.options[event.target.selectedIndex].text);
                            setIdarea(event.target.value);
                          }
                          }
                        >
                            <option
                              key=''
                              value=''
                              disabled
                            >
                              -- Selecione --
                            </option>
                          {areas.map(area => (
                            <option
                              key={area._id}
                              value={area._id}
                            >
                              {area.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                     {/*
                        
                          if access_web === true 
                          show dropbox to inform if it is a Checklist creator or Checklist Approver
                          create property to usuario model and include new field named web_resp
                          0 = Creator
                          1 = Approver

                        */}

                   

                    <div className="form-group">
                    <label
                        className="col-sm-2"
                        htmlFor="preco"
                      >
                        Tipo Acesso*
                      </label>
                      <div className="checkbox">
                          <label style={{paddingLeft:35}}>
                            <input
                              id='acessoapp'
                              type="checkbox"
                              checked={access_app === true ? "checked" : ""}
                              onChange={event => {setAccess_app(!access_app)}}
                            />
                            Aplicativo
                          </label>

                          <label style={{paddingLeft:35}}>
                            <input
                              id='acessoweb'
                              type="checkbox"
                              checked={access_web === true ? "checked" : ""}
                              onChange={event => {setAccess_web(!access_web)}}
                            />
                            Painel Web
                          </label>

                        </div>
                        </div>

                       
                        <div className="form-group">
                    <label
                        className="col-sm-2"
                        htmlFor="preco"
                      >
                        Área de Acesso*
                      </label>
                      <div className="checkbox">
                          <label style={{paddingLeft:35}}>
                            <input
                              id='acessoapp'
                              type="checkbox"
                              checked={access_comp === true ? "checked" : ""}
                              onChange={event => {setAccess_comp(!access_comp)}}
                            />
                            Compressor
                          </label>

                          <label style={{paddingLeft:35}}>
                            <input
                              id='acessoapp'
                              type="checkbox"
                              checked={access_pit === true ? "checked" : ""}
                              onChange={event => {setAccess_pit(!access_pit)}}
                            />
                            Pit Stop
                          </label>

                          <label style={{paddingLeft:35}}>
                            <input
                              id='acessoapp'
                              type="checkbox"
                              checked={access_rack === true ? "checked" : ""}
                              onChange={event => {setAccess_rack(!access_rack)}}
                            />
                            Rack Frio
                          </label>

                          <label style={{paddingLeft:35}}>
                            <input
                              id='acessoapp'
                              type="checkbox"
                              checked={access_desp === true ? "checked" : ""}
                              onChange={event => {setAccess_desp(!access_desp)}}
                            />
                            Despesas
                          </label>

                          <label style={{paddingLeft:35}}>
                            <input
                              id='acessoapp'
                              type="checkbox"
                              checked={admin === true ? "checked" : ""}
                              onChange={event => {setAdmin(!admin)}}
                            />
                            Administrador
                          </label>

                        </div>
                        </div>

                        <div className="form-group">
                    <label
                        className="col-sm-2"
                        htmlFor="preco"
                      >
                        Direitos*
                      </label>
                      <div className="checkbox">
                          <label style={{paddingLeft:35}}>
                            <input
                              id='acessoapp'
                              type="checkbox"
                              checked={web_appr === true ? "checked" : ""}
                              onChange={event => {setWeb_appr(!web_appr)}}
                            />
                            Aprovador de checklist
                          </label>

                          <label style={{paddingLeft:35}}>
                            <input
                              id='despappr'
                              type="checkbox"
                              checked={desp_appr === true ? "checked" : ""}
                              onChange={event => {setDesp_appr(!desp_appr)}}
                            />
                            Aprovador de relatório de despesas
                          </label>

                          <label style={{paddingLeft:35}}>
                            <input
                              id='despapprNot'
                              type="checkbox"
                              checked={desp_apprNot === true ? "checked" : ""}
                              onChange={event => {setDesp_apprNot(!desp_apprNot)}}
                            />
                            Recebe Relatorio Final de despesas
                          </label>

                        </div>
                        </div>



                     
                                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      style={{marginRight:8}}
                      onClick={() => history.push("/usuarios")}
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
