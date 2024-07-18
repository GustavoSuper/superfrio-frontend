import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';

export default function Form_Ajuda({ history }) {

    useEffect(() => {
        document.getElementById('menu_suporte').className = "active";
    }, []);


    return (
        <>
            <Header />
            <SideMenu />

            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Suporte<small>( entre em contato )</small>
                    </h1>
                </section>

                {/* Main content */}
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            
                        <div className="box box-info">
                               
                                <div className="box-body">
                                <a
                                            href='https://api.whatsapp.com/send?phone=5511976023836'
                                            target='_blank'
                                            className="btn btn-block btn-success btn-lg"
                                        >
                                            Contato por Whatsapp
                                                            </a>

                                </div>
                            </div>

                      
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-info">
                                <div className="box-header with-border">
                                    
                                    <h3 className="box-title">FAQ</h3>
                                </div>

                                <div className="box-body">
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Como atualizo os dados da minha empresa ?
                              </td>
                                                <td>
                                                    10.254 pessoas
                              </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Como solicitar segunda via do boleto ?
                              </td>
                                                <td>
                                                    520 comércios
                             </td>
                                            </tr>

                                        </tbody>
                                    </table>



                                </div>
                            </div>
                        </div>

                        <div className="col-md-6"></div>
                    </div>
                </section>
                {/* /.content */}
            </div>

            <Footer />
        </>
    );





    return (
        <>

            <Header />
            <SideMenu />

            <div className="content-wrapper">

                <section className="content-header">
                    <h1>
                        Suporte<small>( entre em contato )</small>
                    </h1>
                </section>

                <section className="content">

                    <div className="row">
                        <div className="col-md-12">


                            <div className="box-body pad table-responsive">
                                <table className="table table-bordered text-center">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <a
                                                    href='https://api.whatsapp.com/send?phone=5511976023836'
                                                    target='_blank'
                                                    className="btn btn-block btn-success btn-lg"
                                                >
                                                    Contato por Whatsapp
                                                            </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <p>Colocar FAQs</p>
                            {/* /.box */}

                        </div>
                        {/* /.col */}
                    </div>

                </section>
                {/* /.content */}
            </div>


            <Footer />
        </>
    )
}
