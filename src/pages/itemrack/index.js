import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';
import DataTable from 'react-data-table-component';

export default function List_Itemrack({ history }) {
const [prod, setProd] = useState([]);
const [loading, setLoading] = useState("");
const [msgvazio, setMsgvazio] = useState('carregando...');
const [busca, setBusca] = useState('');
const [rowsSel, setRowsSel] = useState([]);

const userestab = localStorage.getItem('sfuserid');

async function loadProd() {
  const query = '/checklistitemdefault/type/rack';
  const response = await api.get(query);
  const data = await response.data;
  //setProd(data);
  setProd(data.filter(item => item.nomeitem && item.nomeitem.toLowerCase().includes(busca.toLowerCase())))
  setLoading(false);
}

function efetivaBusca(){
  loadProd();
};

const goToPage = (state) => {
  history.push('/itemrack/' + state._id);
};

  useEffect(() => {
    setLoading(true);
    loadProd();
    setMsgvazio("Nenhuma item encontrado");
    setTimeout(() => {
      if(document.getElementById('menu_itenschecklistrack')){
        document.getElementById('menu_itenschecklistrack').className = "active";
      }      
    }, 50);
  }, []);

  async function handleRemove(id, item){
      if(rowsSel.length > 0){
        if (window.confirm('Confirma remoção dos itens selecionados ?')){
          setLoading(true);
          rowsSel.map(async (item) => {
              await api.delete('/checklistitemdefault/' + item._id).then((res) => {
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

  const handleChange = (state) => {
      setRowsSel(state.selectedRows)
  };

  const columns = [
    {
      name: 'Ordem',
      selector: 'ordemitem',
      sortable: true
    },
    {
      name: 'item',
      selector: 'nomeitem',
      sortable: true
    }
  ];
 

  return (
    <>

    <Header/>
    <SideMenu/>

    <div>
        <div className="content-wrapper">

            <section className="content-header">
                <h1>
                    Itens Rack Frio<small>( tabela itens )</small>
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                        {loading && (
                          <div style={{ alignItems: "center", textAlign: "center" }}>
                            <img src={carregando} width="80"></img>
                          </div>
                        )}
                        <div className="box-body table-responsive">
                            

                            <div className="col-md-12 nopadding">
                        <div className="col-md-6 nopadding">
                        <button type="button" class="btn btn-success btn-flat margin" onClick={() => {history.push('/itemrack/novo')}}>Novo Item</button>
                          <button type="button" class="btn btn-danger btn-flat margin" onClick={() => {handleRemove('','')}}>Remover Selecionados</button>
                          </div>
                          <div className="col-md-6 text-right" style={{paddingTop:10}}>
                          <input
                              placeholder={"Buscar por Item"}
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
                          pointerOnHover
                          highlightOnHover
                          selectableRows // add for checkbox selection
                          Clicked
                          onSelectedRowsChange={handleChange}
                          noDataComponent={''}
                        />

                            </div>

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
