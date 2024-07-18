import React, { useEffect, useState } from "react";
import api from './services/api';

export default function SideMenu({ history }) {

  const [usernome, setUsernome] = useState("");
  const [online, setOnline] = useState(true);
  const [useradm, setUseradm] =  useState(false);
  const [showcomp, setShowcomp] = useState(false);
  const [showpit, setShowpit] = useState(false);
  const [showrack, setShowrack] = useState(false);
  const [showdesp, setShowdesp] = useState(false);
  const userid = localStorage.getItem('sfuserid');

  async function atualizaStatus(status) {
    const txtstatus = status == true ? 'online' : 'offline';
    if (window.confirm('Confirma alterar seu status para ' + txtstatus + ' ?')){
      //await api.put('/estabelecimentos/'+ userestab, {online:status})
      //localStorage.setItem('eloyuserestabonline', status);
      //window.location.reload();
    }
  }

  useEffect(() => {
    if(userid === null)
      window.location.href = "/login";
    else
      setUsernome(localStorage.getItem('sfusernome'));

      if(localStorage.getItem('sfadmin') === 'true'){
        setUseradm(true);
      };

      if(localStorage.getItem('sfcomp') === 'true' || localStorage.getItem('sfadmin') === 'true') {
       setShowcomp(true);
      };

      if(localStorage.getItem('sfpit') === 'true' || localStorage.getItem('sfadmin') === 'true') {
       setShowpit(true);
      };

      if(localStorage.getItem('sfrack') === 'true' || localStorage.getItem('sfadmin') === 'true') {
        setShowrack(true);
        };

      if(localStorage.getItem('sfdesp') === 'true' || localStorage.getItem('sfadmin') === 'true') {
      setShowdesp(true);
      };

  }, []);


  return (
    <>
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src="/dist/img/user.png"
                className="img-circle"
                alt="User"
              />
            </div>
            <div className="pull-left info">
              <p>{usernome}</p>

              {online &&
                <a id='status_estab' info='online'>
                  <i className="fa fa-circle text-success" /> Online
                </a>
              }

              {!online &&
                <a id='status_estab' info='offline'>
                    <i className="fa fa-circle text-danger" /> Offline
                </a>
              }

              {/* {!online &&
                <a style={{cursor:'pointer'}} onClick={() => atualizaStatus(true)}>
                  <span className="text-success">(ficar online)</span>
                </a>
              }

              {online &&
              <a style={{cursor:'pointer'}} onClick={() => atualizaStatus(false)}>
                <span className="text-danger">(ficar offline)</span>
              </a>
              } */}
            </div>
          </div>

   

          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MENU PRINCIPAL</li>

            {/* <li className="active"> */}
            <li id="menu_painel">
              <a href="/painel">
                <i className="fa fa-bar-chart" /> <span>Painel</span>
              </a>
            </li>

            { showcomp &&
            <li id="menu_os" className="treeview active">
              <a href="#">
                <i className="fa fa-file"></i>
                <span>Checklist Compressor</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">                
                <li id="menu_oscomp_novo"><a href="/checklistcomp/novo"><i className="fa fa-circle-o"></i> Criar Novo</a></li>
                <li id="menu_oscomp_consulta"><a href="/checklistcomps"><i className="fa fa-circle-o"></i> Consultar</a></li>
                {/* <li id="menu_oscomp_rela"><a href="#"><i className="fa fa-circle-o"></i> Relatórios</a></li> */}
              </ul>
            </li>
            }

            { showpit && 
            <li id="menu_pit" className="treeview active">
              <a href="#">
                <i className="fa fa-file"></i>
                <span>Checklist Pit Stop</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li id="menu_ospit_novo"><a href="/checklistpit/novo"><i className="fa fa-circle-o"></i> Criar Novo</a></li>
                <li id="menu_ospit_consulta"><a href="/checklistpits"><i className="fa fa-circle-o"></i> Consultar</a></li>
                {/* <li id="menu_ospit_rel"><a href="/#"><i className="fa fa-circle-o"></i> Relatórios</a></li> */}
              </ul>
            </li>
            }

          { showrack && 
            <li id="menu_rack" className="treeview active">
              <a href="#">
                <i className="fa fa-file"></i>
                <span>Checklist Rack Frio</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li id="menu_osrack_novo"><a href="/checklistrack/novo"><i className="fa fa-circle-o"></i> Criar Novo</a></li>
                <li id="menu_osrack_consulta"><a href="/checklistracks"><i className="fa fa-circle-o"></i> Consultar</a></li>
                {/* <li id="menu_ospit_rel"><a href="/#"><i className="fa fa-circle-o"></i> Relatórios</a></li> */}
              </ul>
            </li>
              }

          { showdesp && 
            <li id="menu_desp" className="treeview active">
              <a href="#">
                <i className="fa fa-file"></i>
                <span>Relatório Despesas</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li id="menu_desp_consulta"><a href="/despesas"><i className="fa fa-circle-o"></i> Consultar</a></li>
                {/* <li id="menu_ospit_rel"><a href="/#"><i className="fa fa-circle-o"></i> Relatórios</a></li> */}
              </ul>
            </li>
          }

            


            {/* <li class="treeview">
              <a href="#">
                <i class="fa fa-pie-chart"></i>
                <span>Relatórios</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li><a href="#"><i class="fa fa-circle-o"></i> Checklists Pendentes</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i> Checklists Finalizados</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i> Checklists em Andamento</a></li>
                <li><a href="#"><i class="fa fa-circle-o"></i> Customizar</a></li>
              </ul>
            </li> */}

            
            <>
            <li id="menu_admin" className="treeview active">
              <a href="#">
                <i className="fa fa-table"></i>
                <span>Tabelas</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                { showcomp && 
                  <>
                    <li id="menu_cliente"><a href="/clientes"><i className="fa fa-circle-o"></i> Clientes</a></li>
                    <li id="menu_fabricante"><a href="/fabricantes"><i className="fa fa-circle-o"></i> Fabricantes</a></li>
                    <li id="menu_compressor"><a href="/compressores"><i className="fa fa-circle-o"></i> Modelos</a></li>
                    <li id="menu_tensao"><a href="/tensoes"><i className="fa fa-circle-o"></i> Tensão Compressor</a></li>
                  </>
                }
                { showpit && 
                  <>
                    <li id="menu_marca"><a href="/marcas"><i className="fa fa-circle-o"></i> Marcas</a></li>
                    <li id="menu_tensaopit"><a href="/tensoespit"><i className="fa fa-circle-o"></i> Tensão Pit Stop</a></li>
                  </>
                }
                { showrack && 
                  <>
                    <li id="menu_sistema"><a href="/sistemas"><i className="fa fa-circle-o"></i> Sistemas</a></li>
                    <li id="menu_gas"><a href="/gases"><i className="fa fa-circle-o"></i> Gás</a></li>
                   </>
                }
                   <li id="menu_catalogo"><a href="/catalogos"><i className="fa fa-circle-o"></i> Catalogos</a></li>
              </ul>
            </li>

            { useradm &&
              <li id="menu_admin" className="treeview active">
                <a href="#">
                  <i className="fa fa-table"></i>
                  <span>Tabelas Admin</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul className="treeview-menu">
                      <li id="menu_itenschecklistcomp"><a href="/itenscomp"><i className="fa fa-circle-o"></i> Itens Entrada Compressor</a></li>
                      <li id="menu_itenschecklistcompExit"><a href="/itenscompExit"><i className="fa fa-circle-o"></i> Itens Saída Compressor</a></li>
                      <li id="menu_itenschecklistrack"><a href="/itensRack"><i className="fa fa-circle-o"></i> Itens Rack Frio</a></li>
                      <li id="menu_itenschecklistpit"><a href="/itenspit"><i className="fa fa-circle-o"></i> Itens Pit-stop</a></li>
                      <li id="menu_categoriadesp"><a href="/categoriasdesp"><i className="fa fa-circle-o"></i> Categorias Despesas</a></li>
                      <li id="menu_aprovadorarea"><a href="/aprovadoresarea"><i className="fa fa-circle-o"></i> Aprovador por Area</a></li>
                      <li id="menu_usuario"><a href="/usuarios"><i className="fa fa-circle-o"></i> Usuários</a></li>
                </ul>
              </li>
            }

           

            <li>
             &nbsp;
            </li>
            <li>
             &nbsp;
            </li>

          
            </>
          
          </ul>
        </section>
      </aside>
    </>
  );
}
