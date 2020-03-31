import React,{useState,useEffect} from 'react';
import './styles.css';
import logoimg from '../../assets/logo.svg'
import {Link,useHistory} from 'react-router-dom';
import {FiPower,FiTrash2 } from 'react-icons/fi';
import api from '../../services/api'   

export default function Profile(){
    const [incidents,setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }          
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });
        setIncidents(incidents.filter(incidents=>incidents.id !== id))
        }catch(err){
            alert('Erro ao deletar,tente novamente.');
        }
    }
    function handlerLogout(){
        localStorage.clear();
        history.push('/');

    }


    return (
        <div className="profile-container">
            <header>
                 <img src={logoimg} alt="Be the Hero"/>
                 <span>Bem vindo,{ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handlerLogout} type="button">
                    <FiPower size={18} color="E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}> 
                    <strong>Caso:</strong>
                    <p>{incidents.title}</p>

                    <strong>Descrição</strong>
                    <p>{incidents.description}</p>

                    <strong>Valor</strong>
                <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency:'BRL'}).format(incidents.value)}</p>

                    <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                    
                </li>
                ))}
            </ul>
        </div>
    );
}