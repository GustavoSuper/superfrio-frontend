import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/index';
import Painel from './pages/painel/index';
import ValidaUsuario from './pages/validausuario';
import RedefinirSenha from './pages/redefinirsenha';
import EsqueciSenha from './pages/esquecisenha';
import PreCadastro from './pages/precadastro/index2';
import Ajuda from './pages/ajuda/index';
import Policy from './pages/policy/index';
import Suporte from './pages/suporte/index';

import New_Cliente from './pages/clientes/new';
import List_Cliente from './pages/clientes/index';
import Edit_Cliente from './pages/clientes/edit';

import New_Compressor from './pages/compressores/new';
import List_Compressor from './pages/compressores/index';
import Edit_Compressor from './pages/compressores/edit';

import New_Fabricante from './pages/fabricantes/new';
import List_Fabricante from './pages/fabricantes/index';
import Edit_Fabricante from './pages/fabricantes/edit';

import New_Sistema from './pages/sistemas/new';
import List_Sistema from './pages/sistemas/index';
import Edit_Sistema from './pages/sistemas/edit';

import New_Gas from './pages/gas/new';
import List_Gas from './pages/gas/index';
import Edit_Gas from './pages/gas/edit';

import New_ChecklistComp from './pages/ChecklistComp/new';
import List_ChecklistComp from './pages/ChecklistComp/index';
import Edit_ChecklistComp from './pages/ChecklistComp/edit';

import New_ChecklistPit from './pages/ChecklistPit/new';
import List_ChecklistPit from './pages/ChecklistPit/index';
import Edit_ChecklistPit from './pages/ChecklistPit/edit';

import New_ChecklistRack from './pages/ChecklistRack/new';
import List_ChecklistRack from './pages/ChecklistRack/index';
import Edit_ChecklistRack from './pages/ChecklistRack/edit';

import New_Catalogo from './pages/catalogos/new';
import List_Catalogo from './pages/catalogos/index';
import Edit_Catalogo from './pages/catalogos/edit';

import New_Usuario from './pages/usuarios/new';
import List_Usuario from './pages/usuarios/index';
import Edit_Usuario from './pages/usuarios/edit';

import New_Tensao from './pages/tensao/new';
import List_Tensao from './pages/tensao/index';
import Edit_Tensao from './pages/tensao/edit';

import New_TensaoPit from './pages/tensaopit/new';
import List_TensaoPit from './pages/tensaopit/index';
import Edit_TensaoPit from './pages/tensaopit/edit';

import New_Marca from './pages/marcas/new';
import List_Marca from './pages/marcas/index';
import Edit_Marca from './pages/marcas/edit';

import New_Itemcomp from './pages/itemcomp/new';
import List_Itemcomp from './pages/itemcomp/index';
import Edit_Itemcomp from './pages/itemcomp/edit';

import New_Itempit from './pages/itempit/new';
import List_Itempit from './pages/itempit/index';
import Edit_Itempit from './pages/itempit/edit';

import New_ItemcompExit from './pages/itemcompExit/new';
import List_ItemcompExit from './pages/itemcompExit/index';
import Edit_ItemcompExit from './pages/itemcompExit/edit';

import New_Itemrack from './pages/itemrack/new';
import List_Itemrack from './pages/itemrack/index';
import Edit_Itemrack from './pages/itemrack/edit';

import New_CategoriaDesp from './pages/categoriaDesp/new';
import List_CategoriaDesp from './pages/categoriaDesp/index';
import Edit_CategoriaDesp from './pages/categoriaDesp/edit';

import New_AprovadorArea from './pages/AprovadorArea/new';
import List_AprovadorArea from './pages/AprovadorArea/index';
import Edit_AprovadorArea from './pages/AprovadorArea/edit';

import List_Despesas from './pages/despesas/index';
import Edit_Despesas from './pages/despesas/edit';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" component={Login} />
                <Route path="/painel" component={Painel}/>
                <Route path="/validausuario" component={ValidaUsuario}/>
                <Route path="/redefinirsenha" component={RedefinirSenha}/>
                <Route path="/esquecisenha" component={EsqueciSenha}/>
                <Route path="/precadastro" component={PreCadastro}/>          
                <Route path="/politica" component={Policy}/>  
                <Route path="/suporte" component={Suporte}/>  

                <Route path="/cliente/novo" component={New_Cliente}/>
                <Route path="/clientes" component={List_Cliente}/>
                <Route path="/cliente/:id" component={Edit_Cliente}/>

                <Route path="/compressor/novo" component={New_Compressor}/>
                <Route path="/compressores" component={List_Compressor}/>
                <Route path="/compressor/:id" component={Edit_Compressor}/>

                <Route path="/fabricante/novo" component={New_Fabricante}/>
                <Route path="/fabricantes" component={List_Fabricante}/>
                <Route path="/fabricante/:id" component={Edit_Fabricante}/>

                <Route path="/sistema/novo" component={New_Sistema}/>
                <Route path="/sistemas" component={List_Sistema}/>
                <Route path="/sistema/:id" component={Edit_Sistema}/>

                <Route path="/gas/novo" component={New_Gas}/>
                <Route path="/gases" component={List_Gas}/>
                <Route path="/gas/:id" component={Edit_Gas}/>

                <Route path="/checklistcomp/novo" component={New_ChecklistComp}/>
                <Route path="/checklistcomps" component={List_ChecklistComp}/>
                <Route path="/checklistcomp/:id" component={Edit_ChecklistComp}/>

                <Route path="/checklistpit/novo" component={New_ChecklistPit}/>
                <Route path="/checklistpits" component={List_ChecklistPit}/>
                <Route path="/checklistpit/:id" component={Edit_ChecklistPit}/>

                <Route path="/checklistrack/novo" component={New_ChecklistRack}/>
                <Route path="/checklistracks" component={List_ChecklistRack}/>
                <Route path="/checklistrack/:id" component={Edit_ChecklistRack}/>

                <Route path="/catalogo/novo" component={New_Catalogo}/>
                <Route path="/catalogos" component={List_Catalogo}/>
                <Route path="/catalogo/:id" component={Edit_Catalogo}/>

                <Route path="/usuario/novo" component={New_Usuario}/>
                <Route path="/usuarios" component={List_Usuario}/>
                <Route path="/usuario/:id" component={Edit_Usuario}/>

                <Route path="/tensao/novo" component={New_Tensao}/>
                <Route path="/tensoes" component={List_Tensao}/>
                <Route path="/tensao/:id" component={Edit_Tensao}/>

                <Route path="/tensaopit/novo" component={New_TensaoPit}/>
                <Route path="/tensoespit" component={List_TensaoPit}/>
                <Route path="/tensaopit/:id" component={Edit_TensaoPit}/>

                <Route path="/marca/novo" component={New_Marca}/>
                <Route path="/marcas" component={List_Marca}/>
                <Route path="/marca/:id" component={Edit_Marca}/>

                <Route path="/itemcomp/novo" component={New_Itemcomp}/>
                <Route path="/itenscomp" component={List_Itemcomp}/>
                <Route path="/itemcomp/:id" component={Edit_Itemcomp}/>

                <Route path="/itempit/novo" component={New_Itempit}/>
                <Route path="/itenspit" component={List_Itempit}/>
                <Route path="/itempit/:id" component={Edit_Itempit}/>

                <Route path="/itemcompExit/novo" component={New_ItemcompExit}/>
                <Route path="/itenscompExit" component={List_ItemcompExit}/>
                <Route path="/itemcompExit/:id" component={Edit_ItemcompExit}/>

                <Route path="/itemrack/novo" component={New_Itemrack}/>
                <Route path="/itensrack" component={List_Itemrack}/>
                <Route path="/itemrack/:id" component={Edit_Itemrack}/>

                <Route path="/categoriadesp/novo" component={New_CategoriaDesp}/>
                <Route path="/categoriasdesp" component={List_CategoriaDesp}/>
                <Route path="/categoriadesp/:id" component={Edit_CategoriaDesp}/>

                <Route path="/aprovadorarea/novo" component={New_AprovadorArea}/>
                <Route path="/aprovadoresarea" component={List_AprovadorArea}/>
                <Route path="/aprovadorarea/:id" component={Edit_AprovadorArea}/>

                <Route path="/despesas" component={List_Despesas}/>
                <Route path="/despesa/:id" component={Edit_Despesas}/>

            </Switch>
        </BrowserRouter>
    )
}