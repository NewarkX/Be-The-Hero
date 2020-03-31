import React,{useEffect,useState} from 'react';
import {View,FlatList,Image,Text,TouchableOpacity} from 'react-native';
import logoimg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation,useRoute} from '@react-navigation/native'
import api from '../../services/api';

export default function incidents(){
    const navigation = useNavigation();
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState([0]);
    const [page,setPage] = useState(1);
    const[loading,setLoading] = useState(false);

    function navigateToDetail(incident){
        navigation.navigate('detail',{incident});
    }

    async function loadIncidents(){
        if(loading){
            return;
        }
        if(total>0 && incident.length == total){
            return;
        }
        setLoading(true);


        const response = await api.get(`incidents?page={page}`);

        
        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    },[]);

    return (
        <View  style={styles.container}>
            <View  style={styles.header}>
                <Image source={logoimg} />
                <Text style={styles.headerText}>
                    Total de  <Text style={styles.headerTextBold}>{total}</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>
                    
                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',
                    {style:'currency',currency:'BRL'})
                    .format(incident.value)}
                    </Text>

                    <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                    </TouchableOpacity>        
                </View>
                )}
            /> 
        </View>
    );
}