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

async function loadProd() {
  let query = '';
  const comp = await localStorage.getItem('sfcomp');
  const pit = await localStorage.getItem('sfpit');
  const admin = await localStorage.getItem('sfadmin');  
  
  if(comp === 'true')
  query = '/catalogo/web/comp';

  if(pit === 'true')
  query = '/catalogo/web/pit';

  if(admin === 'true')
  query = '/catalogo';



  const response = await api.get(query);
  const data = await response.data;
  //setProd(data);
  setProd(data.filter(item => item.nome && item.nome.toLowerCase().includes(busca.toLowerCase())))
  setLoading(false);
}


function efetivaBusca(){
  loadProd();
};

const handleChange = (state) => {
  setRowsSel(state.selectedRows)
};

const goToPage = (state) => {
  history.push('/catalogo/' + state._id);
};

  useEffect(() => {
    setLoading(true);
    loadProd();
    setMsgvazio("Nenhum catalogo encontrado");
    
    setTimeout(() => {
      if(document.getElementById('menu_catalogo')){
        document.getElementById('menu_catalogo').className = "active";
      }      
    }, 50);
    
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const CustomTipo = ({ row }) => (
    row.tipo == '0' ? <span>Compressor</span> : 
    row.tipo == '1' ? <span>Pit-Stop</span> : ""
  );

  const columns = [
    {
      name: 'Nome',
      selector: 'nome',
      sortable: true
    },
    {
      name: 'Tipo',
      selector: 'tipo',
      sortable: true,
      cell: row => <CustomTipo row={row} />
    },
  ];
 


  async function handleRemove(id, item){
    if(rowsSel.length > 0){
      if (window.confirm('Confirma remoção dos itens selecionados ?')){
        setLoading(true);
        rowsSel.map(async (item) => {
            await api.delete('/catalogo/' + item._id).then((res) => {
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
                    Catalogos<small>( tabela catalogos )</small>
                </h1>
            </section>

            <section className="content">
            
            

                <div className="row">
                    <div className="col-xs-12">
                 
                        <div className="box box-primary">
                        {loading && (
                          <div style={{ alignItems: "center", textAlign: "center" }}>
                            <img src={carregando} width="80"></img>
                          </div>
                        )}
                            <div className="box-body table-responsive">
                            

                            <div className="col-md-12 nopadding">
                        <div className="col-md-6 nopadding">
                        <button type="button" class="btn btn-success btn-flat margin" onClick={() => {history.push('/catalogo/novo')}}>Novo Catalogo</button>
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
