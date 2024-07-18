import React, {useState, useEffect } from 'react'
import api from '../../services/api';
import logo from "../../assets/logo.png"
import appstore from "../../assets/app-store.png"
import carregando from "../../assets/loading.gif";
import googlestore from "../../assets/google-play.png"
import CryptoJS from 'crypto-js';

export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [loading, setLoading] = useState("");

    useEffect(() => {
        document.body.className = "hold-transition login-page2"
    },[]);

    async function handleSubmit(event) {
        
        setLoading(true);
        event.preventDefault();
        
        const skey = process.env.REACT_APP_SECRET_KEY;

        const hashEmail = CryptoJS.AES.encrypt(email, skey).toString();
        const hashPwd = CryptoJS.AES.encrypt(pwd, skey).toString();

        const dataobj = { 
            email: hashEmail,
            senha: hashPwd
          };

        await api.post('/admauthenticate', dataobj)
        .then((res) => {
            if(res.data.error != undefined){
                alert(res.data.error);
                setLoading(false);
                return;
            }else{
                localStorage.setItem('sfuseremail', email);
                localStorage.setItem('sfusernome', res.data.nome);
                localStorage.setItem('sfuserid', res.data._id);
                localStorage.setItem('sfadmin', res.data.admin);
                localStorage.setItem('sfcomp', res.data.access_comp);
                localStorage.setItem('sfpit', res.data.access_pit);
                localStorage.setItem('sfrack', res.data.access_rack);
                localStorage.setItem('sfdesp', res.data.access_despesa);

                setLoading(false);
                history.push('/painel');
            }
        }).catch((error) => {
            alert(error);
            setLoading(false);
            return;
        });    
      }

      const footer = {
        marginTop: '10px',
        flexDirection: 'row',
      };

        return (
            <div>
                <div className="login-box">
                    <div className="login-logo">
                        <a href="/login"><img src={logo} width={300}></img></a>
                    </div>
                    <div className="login-box-body">
                        <p className="login-box-msg">Entre com sua credencial</p>

                        <form onSubmit={handleSubmit}>
                        
                            <div className="form-group has-feedback">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="seuemail@dominio.com.br" 
                                    value={email} 
                                    required 
                                    onChange={event => setEmail(event.target.value)} />
                                <span className="glyphicon glyphicon-envelope form-control-feedback" />
                            </div>

                            <div className="form-group has-feedback">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="sua senha"
                                    required
                                    value={pwd}
                                    onChange={event => setPwd(event.target.value)} />
                                <span className="glyphicon glyphicon-lock form-control-feedback" />
                            </div>

                            <div className="row">
                                <div className="col-xs-12">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Entrar</button>
                                </div>
                            </div>
                           
                        </form>

                        {loading && 
                            <div style={{ alignItems:'center', textAlign: 'center' }}>
                                <img src={carregando} width="80"></img>
                            </div>
                        }

                        <div style={{ marginTop:'10px' }}>
                            <a href="/esquecisenha">Esqueci minha senha</a><br />
                            {/* <a href="/precadastro" className="text-center">Ainda não tem cadastro ?</a> */}
                        </div>

                    </div>

                    <div style={footer}>
                        <img src={appstore} alt="EloyAqui" width="50%"></img>
                        <img src={googlestore} alt="EloyAqui" width="50%"></img>
                    </div>      

                    {/* /.login-box-body */}
                </div>
            </div>

        )
    }
