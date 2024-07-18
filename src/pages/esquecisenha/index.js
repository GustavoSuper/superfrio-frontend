import React, {useState, useEffect } from 'react'
import api from '../../services/api';
import logo from "../../assets/logo.png"
import appstore from "../../assets/app-store.png"
import carregando from "../../assets/loading.gif";
import googlestore from "../../assets/google-play.png"

export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState("");

    useEffect(() => {
        document.body.className = "hold-transition login-page2"
    },[]);

    async function handleSubmit(event) {
        
        setLoading(true);
        event.preventDefault();

        const dataobj = { 
            email: email
          };

        await api.post('/forgotpwd', dataobj)
        .then((res) => {
            if(res.data.error != undefined){
                alert(res.data.error);
                setLoading(false);
                return;
            }else{
                alert(res.data.success);
                setLoading(false);
                history.push('/login');
            }
        }).catch((error) => {
            alert(error.data);
            setLoading(false);
            return;
        });    
      }

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

                            <div className="row">
                                <div className="col-xs-12">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Enviar Nova Senha</button>
                                    <button className="btn2" className="btn bg-navy btn-block btn-flat" onClick={() => { history.push('/login') }}>Voltar</button>
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
