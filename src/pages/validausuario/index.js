import React, {useState, useEffect} from "react";
import api from '../../services/api';
import appstore from "../../assets/app-store.png"
import googlestore from "../../assets/google-play.png"


export default function ValidaUsuario() {

    const url_string = window.location.href;
    const param = url_string.split("/");
    const [statusUser, SetStatusUser] = useState('processando...');

    async function validacadastro(){
        const dataobj = { 
            idusuario: param[4]
        };

        await api.post('/validacadastro', dataobj)
        .then((res) => {
            SetStatusUser(res.data.msg);
        }).catch((error) => {
            SetStatusUser(error);
        });
    }

    useEffect(() => {
        validacadastro();
    },[]);

    return (
        <>
        <div className="content">
            <p>{statusUser}</p>
        </div>

        <div className="footer">
            <img src={appstore} alt="EloyAqui" width="200px"></img>
            <img src={googlestore} alt="EloyAqui" width="200px"></img>
        </div>
 
      </>
    )
}