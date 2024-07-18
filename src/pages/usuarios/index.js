import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';
import DataTable from 'react-data-table-component';

export default function List_Usuarios({ history }) {
const [prod, setProd] = useState([]);
const [loading, setLoading] = useState("");
const [msgvazio, setMsgvazio] = useState('carregando...');
const [busca, setBusca] = useState('');
const [rowsSel, setRowsSel] = useState([]);


const checkadmin = () => {
  const b_admin = localStorage.getItem("sfadmin");
  if(b_admin != 'true') history.push('/painel');
}

async function loadProd() {
  const query = '/usuarios';
  const response = await api.get(query);
  const data = await response.data;
  //setProd(data);
  setProd(data.filter(item => item.nome && item.nome.toLowerCase().includes(busca.toLowerCase())))
}


function efetivaBusca(){
  loadProd();
};

const handleChange = (state) => {
  setRowsSel(state.selectedRows)
};

const goToPage = (state) => {
  history.push('/usuario/' + state._id);
};

  useEffect(() => {
    setLoading(true);
    checkadmin();
    loadProd();
    setMsgvazio("Nenhum usuário encontrado");
    
    setTimeout(() => {
      if(document.getElementById('menu_usuario')){
        document.getElementById('menu_usuario').className = "active";
      }      
    }, 50);
    
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);


  const CustomArea = ({ row }) => (
      row.admin ? "Administrador " :
      row.access_comp && row.access_pit && !row.admin ? "Compressor | Pit Stop" :
      !row.access_comp && row.access_pit && !row.admin ? "Pit Stop" :
      row.access_comp && !row.access_pit && !row.admin ? "Compressor" :
      row.access_rack && !row.admin ? "Rack" :
      row.access_despesa && !row.admin ? "Relatorio Despesa" :
      ""
  );

  //acess_comp push "Compressor"

  const CustomAcesso = ({ row }) => (    
      row.access_app && row.access_web ? "Aplicativo | Web" :
      !row.access_web && row.access_app ? "Aplicativo" :
      row.access_web && !row.access_app ? "Painel Web" : ""
  );

  const CustomAppr = ({ row }) => (    
    row.web_appr ? "Aprovador" : 
    row.desp_appr ? "Aprovador" : 
    "-"
);

  const columns = [
    {
      name: 'Nome',
      selector: 'nome',
      sortable: true
    },
    {
      name: 'E-mail',
      selector: 'email',
      sortable: true
    },
    {
      name: 'Acesso',
      selector: 'admin',
      sortable: true,
      cell: row => <CustomAcesso row={row} />
    },
    {
      name: 'Area',
      selector: 'access_web',
      sortable: true,
      cell: row => <CustomArea row={row} />
    },
    {
      name: 'Tipo',
      selector: 'web_appr',
      sortable: true,
      cell: row => <CustomAppr row={row} />
    }
  ];
 


  async function handleRemove(id, item){
    if(rowsSel.length > 0){
      if (window.confirm('Confirma remoção dos itens selecionados ?')){
        setLoading(true);
        rowsSel.map(async (item) => {
            await api.delete('/usuarios/' + item._id).then((res) => {
              if(res.data.error != undefined){
                  alert(res.data.error);
                  setLoading(false);
                  return;
              } else {
                loadProd();
                setLoading(false);
              }
          }).catch((error) => {
              alert(error);
              setLoading(false);
              return;
          });    
        });
      }
  } else {
    alert("Nenhum registro selecionado !")
  }
};

 

  return (
    <>

    <Header/>
    <SideMenu/>

    <div>
        <div className="content-wrapper">

            <section className="content-header">
                <h1>
                    Usuários<small>( tabela usuários )</small>
                </h1>
            </section>

            <section className="content">
            
            

                <div className="row">
                    <div className="col-xs-12">
                 
                        <div className="box box-primary">
                       
                            <div className="box-body table-responsive">
                            

                            <div className="col-md-12 nopadding">
                        <div className="col-md-6 nopadding">
                        <button type="button" class="btn btn-success btn-flat margin" onClick={() => {history.push('/usuario/novo')}}>Novo Usuário</button>
                          <button type="button" class="btn btn-danger btn-flat margin" onClick={() => {handleRemove('','')}}>Remover Selecionados</button>
                          </div>
                          <div className="col-md-6 text-right" style={{paddingTop:10}}>
                          <input
                              placeholder={"Buscar por Nome"}
                              value={busca}
                              onChange={event => setBusca(event.target.value)}
                            />
                            <button 
                              onClick={efetivaBusca}
                            >
                              Buscar
                            </button>
                            </div>
                          </div>
                        
                          {loading && (
                          <div style={{ alignItems: "center", textAlign: "center" }}>
                            <img src={carregando} width="80"></img>
                          </div>
                        )}

                        
                            <DataTable
                          columns={columns}
                          data={prod}
                          onRowClicked={goToPage}
                          selectableRows
                          pointerOnHover
                          highlightOnHover
                          onSelectedRowsChange={handleChange}
                          noDataComponent={''}
                        />
                        
                            </div>
                            {/* /.box-body */}
                        </div>
                        {/* /.box */}
                    </div>
                </div>
            </section>
            {/* /.content */}
        </div>
    </div>
    
    <Footer/>
    </>
)
}


//nome, 
//descr, 
//preco, 
//imagem, 
//promocao, 
//idestabelecimento
