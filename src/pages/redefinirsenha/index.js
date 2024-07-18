import React, {useState} from "react";
import api from '../../services/api';
import logo from "../../assets/logo.png"
import appstore from "../../assets/app-store.png"
import googlestore from "../../assets/google-play.png"
import carregando from "../../assets/loading.gif";


export default function Redefinirsenha({ history }) {

    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [loading, setLoading] = useState("");
    const [hidden, setHidden] = useState(false);
    const [statusUser, SetStatusUser] = useState('');

    const url_string = window.location.href;
    const param = url_string.split("/");

    async function handleSubmit(event){
        event.preventDefault();

        const userid = param[4];
        const passcd = param[5];

        if(userid.toString().substring(0 ,1) != passcd.toString().substring(0,1) || userid.toString().substring(5 ,6) != passcd.toString().substring(1,2)){
            alert("Link de revalidacao invalido. Por favor solicitar novamente.");
            return;
        } 

        if (pwd !== pwd2) {
            alert("As duas senhas estão diferentes, por favor validar");
            return;
        }

        setLoading(true);

        const dataobj = { 
            pwd: pwd
        };

        await api.put('/usuarios/' + param[4], dataobj)
        .then((res) => {
            if(res.status == 200){
                setLoading(false);
                setHidden(true);
                SetStatusUser("Senha alterada com sucesso. Faça seu login no aplicativo");
            }else{
                SetStatusUser("Sua senha NÃO foi alterada, tente novamente");
                setLoading(false);
            }
        }).catch((error) => {
            SetStatusUser("Sua senha NÃO foi alterada, tente novamente");
            setLoading(false);
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
                        <label htmlFor="senha" hidden={hidden} >SENHA *</label>
                            <input
                                id="senha"
                                type="password"
                                placeholder="nova senha"
                                hidden={hidden}
                                required
                                value={pwd}
                                onChange={event => setPwd(event.target.value)}
                            />
                            <label htmlFor="senha2" hidden={hidden}>CONFIRMA SENHA *</label>
                            <input
                                id="senha2"
                                type="password"
                                placeholder="confirme sua nova senha"
                                hidden={hidden}
                                required
                                value={pwd2}
                                onChange={event => setPwd2(event.target.value)}
                            />
                            
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <button type="submit" hidden={hidden} className="btn btn-primary btn-block btn-flat">Redefinir</button>
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

  