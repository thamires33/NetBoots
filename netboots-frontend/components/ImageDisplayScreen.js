import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const ImageDisplayScreen = ({ route }) => {
    const { userId } = route.params;
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.post('http://localhost:3000/getImages', { userId });
                setImageUrls(response.data.imageUrls);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar imagens:', error);
                setLoading(false);
            }
        };

        fetchImages();
    }, [userId]);

    if (loading) {
        return <Text>Carregando imagens...</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {imageUrls.length > 0 ? (
                imageUrls.map((url, index) => (
                    <Image key={index} source={{ uri: url }} style={styles.imageStyle} />
                ))
            ) : (
                <Text>Nenhuma imagem disponível.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageStyle: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default ImageDisplayScreen;
