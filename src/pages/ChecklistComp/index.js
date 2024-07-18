import React, { useState, useEffect, useMemo } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

export default function List_ChecklistComp({ history }) {
const [prod, setProd] = useState([]);
const [loading, setLoading] = useState("");
const [msgvazio, setMsgvazio] = useState('carregando...');
const [rowsSel, setRowsSel] = useState([]);

const url_string = window.location.href;
const param = url_string.split("=");

function efetivaBusca(){
  loadProd();
}

const CustomStatus = ({ row }) => (
  row.status == 'Pendente' ? <span className="label label-danger">Pendente</span> : 
  row.status == 'Processando' ? <span className="label label-warning">Processando</span> :
  row.status == 'Concluido' ? <span className="label label-success">Concluído</span> : ""
);

const CustomStatusExit = ({ row }) => (
  row.statusExit == null ? <span className="label label-info">Não Iniciado</span> : 
  row.statusExit == 0 ? <span className="label label-danger">Pendente</span> : 
  row.statusExit == 1 ? <span className="label label-warning">Processando</span> :
  row.statusExit == 2 ? <span className="label label-success">Concluído</span> : ""
);


const columns = [
  {
    name: 'Cliente',
    selector: 'idcliente[0].nome',
    sortable: true
  },
  {
    name: 'OS',
    selector: 'nos',
    sortable: true
  },
  {
    name: 'Entrada',
    selector: 'dataentrada',
    sortable: true,
  },
  {
    name: 'Status Entrada',
    selector: 'status',
    sortable: true,
    cell: row => <CustomStatus row={row} />
  },
  {
    name: 'Status Saída',
    sortable: true,
    cell: row => <CustomStatusExit row={row} />
  }
];

  const goToPage = (state) => {
    history.push('/checklistcomp/' + state._id);
  };

async function loadProd() {
  //setLoading(true);
  const query = '/checklistcomp';
  const response = await api.get(query);
  const data = await response.data;
  
  if(param[1] && param[1].length === 1){
    setProd(data.filter(item => item.statusExit && item.statusExit.toLowerCase().includes(param[1].toLowerCase())))
  } else if(param[1] && param[1].length > 1) {
    setProd(data.filter(item => item.status && item.status.toLowerCase().includes(param[1].toLowerCase())))
  } else {
    setProd(data);
  }
  
  
  //setLoading(false);
}

  useEffect(() => {
    setLoading(true);
    loadProd();
    setMsgvazio("Nenhum cliente encontrado");
    setTimeout(() => {
      if(document.getElementById('menu_oscomp_consulta')){
        document.getElementById('menu_oscomp_consulta').className = "active";
      }      
    }, 50);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  async function handleRemove(id, item){
    if(rowsSel.length > 0){
      if (window.confirm('Confirma remoção dos itens selecionados ? Essa ação é irreversível')){
        setLoading(true);
        rowsSel.map(async (item) => {
            await api.delete('/checklistcomp/' + item._id).then((res) => {
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

const tableData = {
  columns,
  data:prod
};

  return (
    <>

    <Header/>
    <SideMenu/>

    <div>
        <div className="content-wrapper">

            <section className="content-header">
                <h1>
                    CheckLists Compressores<small>( tabela checklist )</small>
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

                        <div className="col-md-12 nopadding">
                          <div className="col-md-6 nopadding">
                            <button type="button" className="btn btn-success btn-flat margin" onClick={() => {history.push('/checklistcomp/novo')}}>Novo Checklist Compressor</button>
                            <button type="button" className="btn btn-danger btn-flat margin" onClick={() => {handleRemove('','')}}>Remover Selecionados</button>
                          </div>
                       
                        </div>

                        <DataTableExtensions {...tableData} filterPlaceholder={"Buscar"} exportHeaders={true} print={false}>
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
                        </DataTableExtensions>

                        </div>
                        
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
