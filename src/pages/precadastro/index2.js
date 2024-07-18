import React, {useState, useEffect } from 'react'
import api from '../../services/api';
import logo from "../../assets/logo.png"
import appstore from "../../assets/app-store.png"
import carregando from "../../assets/loading.gif";
import googlestore from "../../assets/google-play.png"

export default function Login({ history }) {

    const categorias = [
        { label: "Almoço", value: "5d929cbac39dcd00176af304" },
        { label: "Jantar", value: "5d929ddcc39dcd00176af305" },
        { label: "Café / Chá", value: "5d92a209c39dcd00176af306" },
        { label: "Esportes", value: "5d92a240c39dcd00176af307" },
        { label: "Vestuário", value: "5d92a4a3c39dcd00176af308" },
        { label: "Beleza", value: "5d92a4cdc39dcd00176af309" },
        { label: "Pets", value: "5d92a4e3c39dcd00176af30a" },
        { label: "Barbearia", value: "5d92a4f7c39dcd00176af30b" },
        { label: "Educaçao", value: "5d92a516c39dcd00176af30c" },
        { label: "Saúde", value: "5db97c64ca74d100178e45ac" },
        { label: "Construção", value: "5db97db3ca74d100178e45ad" },
        { label: "Serviços", value: "5db97e3bca74d100178e45ae" }
    ];
    
      const horarios_inicio = [
        { label: "Abre as 06:00", value: "6" },
        { label: "Abre as 07:00", value: "7" },
        { label: "Abre as 08:00", value: "8" },
        { label: "Abre as 09:00", value: "9" },
        { label: "Abre as 10:00", value: "10" },
        { label: "Abre as 11:00", value: "11" },
        { label: "Abre as 12:00", value: "12" },
        { label: "Abre as 13:00", value: "13" },
        { label: "Abre as 14:00", value: "14" },
        { label: "Abre as 15:00", value: "15" },
        { label: "Abre as 16:00", value: "16" },
        { label: "Abre as 17:00", value: "17" },
        { label: "Abre as 18:00", value: "18" },
        { label: "Abre as 19:00", value: "19" },
        { label: "Abre as 20:00", value: "20" },
        { label: "Sem Funcionamento", value: "-1" },
      ];
    
      const horarios_fim = [
        { label: "Fecha as 10:00", value: "10" },
        { label: "Fecha as 11:00", value: "11" },
        { label: "Fecha as 12:00", value: "12" },
        { label: "Fecha as 13:00", value: "13" },
        { label: "Fecha as 14:00", value: "14" },
        { label: "Fecha as 15:00", value: "15" },
        { label: "Fecha as 16:00", value: "16" },
        { label: "Fecha as 17:00", value: "17" },
        { label: "Fecha as 18:00", value: "18" },
        { label: "Fecha as 19:00", value: "19" },
        { label: "Fecha as 20:00", value: "20" },
        { label: "Fecha as 21:00", value: "21" },
        { label: "Fecha as 22:00", value: "22" },
        { label: "Fecha as 23:00", value: "23" },
        { label: "Sem Funcionamento", value: "-1" },
      ];
    
      const [nome, setNome] = useState("");
      const [descr, setDescr] = useState("");
      const [rua, setRua] = useState("");
      const [numero, setNumero] = useState("");
      const [bairro, setBairro] = useState("");
      const [cep, setCEP] = useState("");
      const [fone1, setFone1] = useState("");
      const [fone2, setFone2] = useState("");
      const [pedonline, setPedonline] = useState("");
      const [cardapio, setCardapio] = useState("");
      const [email, setEmail] = useState("");
      const [facebook, setFacebook] = useState("");
      const [instagram, setInstagram] = useState("");
      const [whatsapp, setWhatsapp] = useState("");
      const [hrinicio_semana, setHrinicio_semana] = useState("");
      const [hrfim_semana, setHrfim_semana] = useState("");
      const [hrinicio_sabado, setHrinicio_sabado] = useState("");
      const [hrfim_sabado, setHrfim_sabado] = useState("");
      const [hrinicio_domingo, setHrinicio_domingo] = useState("");
      const [hrfim_domingo, setHrfim_domingo] = useState("");
      const [idcategoria, setIdcategoria] = useState("");
      const [loading, setLoading] = useState("");
    
      useEffect(() => {
        document.body.className = "hold-transition login-page2"
      },[]);

      function handleSelectMulti(event){
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
      setIdcategoria(value);
    }
    
      async function handleSubmit(event) {
          
          event.preventDefault();
    
          const dataobj = { 
            nome: nome, 
            descr: descr,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            fone1: fone1,
            fone2: fone2,
            pedonline: pedonline,
            cardapio: cardapio,
            email: email,
            facebook: facebook,
            instagram: instagram,
            whatsapp: whatsapp,
            hrinicio_semana: hrinicio_semana,
            hrfim_semana: hrfim_semana,
            hrinicio_sabado: hrinicio_sabado,
            hrfim_sabado : hrfim_sabado,
            hrinicio_domingo: hrinicio_domingo,
            hrfim_domingo : hrfim_domingo,
            idcategoria: idcategoria
          };
          
          await api.post('/precadastro', dataobj);
          alert("Cadastro efetuado com sucesso. Nossa equipe entrará em contato em breve.")
          history.push('/login');
    
      }

        return (
            <div>
                <div className="login-box">
                    <div className="login-logo">
                        <a href="/login"><img src={logo} width={300}></img></a>
                    </div>
                    <div className="login-box-body">
                        <p className="login-box-msg lead">Cadastre aqui seu comércio</p>

                        <form onSubmit={handleSubmit}>
                        <p>Categoria (segure ctrl para selecionar várias)</p>
                            <div className="form-group has-feedback">
                                <select
                                    id="idcategoria"
                                    multiple="multiple"
                                    style={{width:'100%'}}
                                    className="form-control"
                                    value={idcategoria}
                                    className="select1"
                                    onChange={handleSelectMulti}
                                >
                                    {categorias.map((categoria) =>
                                        <option key={categoria.value} value={categoria.value}>{categoria.label}</option>
                                    )}
                                </select>
                            </div>

                            <div className="form-group has-feedback">
                            <input
                                id="nome"
                                placeholder="Nome do Estabelecimento"
                                className="form-control" 
                                maxLength={80}
                                value={nome}
                                required
                                onChange={event => setNome(event.target.value)}
                                />
                            </div>

                            <div className="form-group has-feedback">
                            <input
                                id="descr"
                                className="form-control" 
                                placeholder="Descrição do Estabelecimento"
                                maxLength={250}
                                value={descr}
                                required
                                onChange={event => setDescr(event.target.value)}
                                />
                            </div>

                            <div className="form-group has-feedback">
                            <input
                                id="rua"
                                className="form-control" 
                                placeholder="Rua do Estabelecimento"
                                maxLength={100}
                                value={rua}
                                required
                                onChange={event => setRua(event.target.value)}
                                />
                            </div>

                            <div className="form-group has-feedback">
                            <input
                                id="numero"
                                className="form-control" 
                                placeholder="Número do Estabelecimento"
                                maxLength={10}
                                value={numero}
                                required
                                onChange={event => setNumero(event.target.value)}
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <input
                                id="bairro"
                                className="form-control" 
                                placeholder="Bairro do Estabelecimento"
                                maxLength={80}
                                value={bairro}
                                required
                                onChange={event => setBairro(event.target.value)}
                                />
                            </div>

                            <div className="form-group has-feedback">
                            <input
                                id="cep"
                                className="form-control" 
                                placeholder="CEP do Estabelecimento"
                                maxLength={10}
                                value={cep}
                                required
                                onChange={event => setCEP(event.target.value)}
                                />
                            </div>

                            <div className="form-group has-feedback">
                            <input
                                id="fone1"
                                className="form-control" 
                                placeholder="Telefone do Estabelecimento"
                                maxLength={30}
                                value={fone1}
                                required
                                onChange={event => setFone1(event.target.value)}
                                />
                            </div>

                           

                            <div className="row">
                                <div className="col-xs-12">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Cadastrar</button>
                                    <button className="btn bg-navy btn-block btn-flat" onClick={() => { history.push('/login') }}>Voltar</button>
                                </div>
                            </div>
                           
                        </form>

                        {loading && 
                            <div style={{ alignItems:'center', textAlign: 'center' }}>
                                <img src={carregando} width="80"></img>
                            </div>
                        }

                    </div>

                    {/* /.login-box-body */}
                </div>
            </div>

        )
    }
