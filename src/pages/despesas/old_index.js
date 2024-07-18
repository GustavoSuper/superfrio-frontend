import React, { useState, useEffect, useMemo } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

export default function List_Despesas({ history }) {
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
  row.iddespesa[0].status == '0' ? <span className="label label-info">Rascunho</span> : 
  row.iddespesa[0].status == '1' ? <span className="label label-warning">Aguardando Aprovação</span> :
  row.iddespesa[0].status == '2' ? <span className="label label-success">Aprovado</span> :
  row.iddespesa[0].status == '3' ? <span className="label label-danger">Reprovado</span> : ""
);

const CustomValor = ({ row }) => (
  <span>R${row.valor}</span>
);

const CustomDate = ({ row }) => (
  row.iddespesa[0].dataentrada.substring(8, 10) + "/" + row.iddespesa[0].dataentrada.substring(5, 7) + "/" + row.iddespesa[0].dataentrada.substring(0, 4)
);

const CustomFoto = ({ row }) => (
  <a href={row.foto} target="_blank"><i className="fa fa-image" /></a>
);

const columns = [
  {
    name: 'Requisição N.',
    selector: 'iddespesa[0].numero',
    sortable: true
  },
  {
    name: 'Requisitante',
    selector: 'iddespesa[0].nomerequester'
  },
  {
    name: 'Criado em',
    selector: 'iddespesa[0].dataentrada',
    cell: row => <CustomDate row={row} />
  },
  {
    name: 'Categoria',
    selector: 'categoriaText',
    sortable: true,
  },
  {
    name: 'Valor',
    selector: 'valor',
    cell: row => <CustomValor row={row} />
  },
  {
    name: 'Status',
    selector: 'iddespesa[0].status',
    sortable: true,
    cell: row => <CustomStatus row={row} />
  },
  {
    name: 'Aprovador',
    selector: 'iddespesa[0].nomeaprovador'
  },
  {
    name: 'Recibo/NF',
    selector: 'foto',
    cell: row => <CustomFoto row={row} />
  }
  
];

  // const goToPage = (state) => {
  //   history.push('/checklistcomp/' + state._id);
  // };

async function loadProd() {
  //setLoading(true);
  const query = '/despesaItem/aggreg/export';
  const response = await api.get(query);
  const data = await response.data;
  setProd(data)
  //setLoading(false);
}

  useEffect(() => {
    setLoading(true);
    loadProd();
    setMsgvazio("Nenhuma despesa encontrada");
    setTimeout(() => {
      if(document.getElementById('menu_desp_consulta')){
        document.getElementById('menu_desp_consulta').className = "active";
      }      
    }, 50);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  

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
                    Despesas
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

                       

                        <DataTableExtensions {...tableData} filterPlaceholder={"Buscar"} exportHeaders={true} print={false}>
                        <DataTable
                          columns={columns}
                          data={prod}
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
