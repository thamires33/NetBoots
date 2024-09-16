import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal'; // Certifique-se de ter instalado o 'react-native-modal'
import styles from './styles';
import { searchShoes } from './api';
import QuizModal from '../QuizModal'; // Verifique o caminho correto para sua modal

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        require('./produtos/lulu.png'),
        require('./produtos/lulu.png'),
        require('./produtos/lulu.png'),
    ];
    const imageWidth = width;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const productScrollViewRef = useRef(null);
    const [productIndex, setProductIndex] = useState(0);
    const products = [
        { id: 1, title: "Produto 1", price: "R$ 100,00", image: require('./produtos/product1.png') },
        { id: 2, title: "Produto 2", price: "R$ 200,00", image: require('./produtos/product1.png') },
        { id: 3, title: "Produto 3", price: "R$ 300,00", image: require('./produtos/product1.png') },
        { id: 4, title: "Produto 4", price: "R$ 400,00", image: require('./produtos/product1.png') },
        { id: 5, title: "Produto 5", price: "R$ 500,00", image: require('./produtos/product1.png') },
        { id: 6, title: "Produto 6", price: "R$ 600,00", image: require('./produtos/product1.png') },
        { id: 7, title: "Produto 7", price: "R$ 600,00", image: require('./produtos/product1.png') },
        { id: 8, title: "Produto 8", price: "R$ 600,00", image: require('./produtos/product1.png') },
        { id: 9, title: "Produto 9", price: "R$ 600,00", image: require('./produtos/product1.png') },
    ];

    const itemsPerScreen = Math.floor(width / (width * 0.4));
    const scrollStep = width * 0.4;

    const handleNextProduct = () => {
        const nextIndex = Math.min(productIndex + itemsPerScreen, products.length - itemsPerScreen);
        setProductIndex(nextIndex);
        productScrollViewRef.current?.scrollTo({ x: nextIndex * scrollStep, animated: true });
    };

    const handlePrevProduct = () => {
        const prevIndex = Math.max(productIndex - itemsPerScreen, 0);
        setProductIndex(prevIndex);
        productScrollViewRef.current?.scrollTo({ x: prevIndex * scrollStep, animated: true });
    };

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const results = await searchShoes(query); // Função fictícia para buscar produtos
            setSearchResults(results);
        } catch (error) {
            console.error("Erro ao buscar resultados:", error);
        }
    };

    const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);
    const [preferences, setPreferences] = useState({
        sports: false,
        running: false,
        stores: false,
    });

    const openQuizModal = () => {
        setIsQuizModalVisible(true);
    };

    const closeQuizModal = () => {
        setIsQuizModalVisible(false);
    };

    const handleSubmitQuiz = () => {
        console.log('Preferências selecionadas:', preferences);
        setIsQuizModalVisible(false); // Fechar a modal após a submissão do quiz
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.logo}>NetBoots</Text>
                <TextInput
                    style={styles.searchBar}
                    placeholder="O que você está procurando?"
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    onSubmitEditing={handleSearch}
                />

                <ScrollView style={styles.resultsContainer}>
                    {searchResults.map((result, index) => (
                        <View key={index} style={styles.resultItem}>
                            <Image source={{ uri: result.url }} style={styles.resultImage} />
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesome name="heart" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Lista de Desejos</Text>

                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesome name="user" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Entrar</Text>

                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesome name="shopping-cart" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.optionBar}>
                    <TouchableOpacity style={styles.optionButton1}>
                        <FontAwesome name="map-marker" size={16} color="black" />
                        <Text style={styles.optionText}>Informe seu CEP</Text>
                    </TouchableOpacity>
                    <View style={styles.optionBar2}>
                        <TouchableOpacity style={styles.optionButton1}>
                            <FontAwesome name="bars" size={16} color="black" />
                            <Text style={styles.optionText1}>Todas as categorias</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>SPORTSTYLE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>CORRIDA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>LOJAS PARCEIRAS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>PARCEIRO NETBOOTS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>CUPONS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>N CARD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={openQuizModal}>
                            <Text style={styles.optionText}>QUIZ DE PREFERÊNCIAS</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Carousel de Imagens */}
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.carousel}
                >
                    {images.map((image, index) => (
                        <View key={index} style={[styles.carouselItem, { width: imageWidth }]}>
                            <Image source={image} style={{ width: imageWidth, height: width }} resizeMode="cover" />
                        </View>
                    ))}
                </ScrollView>

                {/* Carousel de Produtos */}
                <View style={styles.productCarouselContainer}>
                    <TouchableOpacity style={styles.navButtonLeft} onPress={handlePrevProduct}>
                        <FontAwesome name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>

                    <ScrollView
                        ref={productScrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.productCarousel}
                    >
                        {products.map((product, index) => (
                            <View key={product.id} style={[styles.productItem, { width: width * 0.2 }]}>
                                <Image source={product.image} style={styles.productImage} />
                                <Text>{product.title}</Text>
                                <Text>{product.price}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <TouchableOpacity style={styles.navButtonRight} onPress={handleNextProduct}>
                        <FontAwesome name="chevron-right" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Modal de Quiz de Preferências */}
                <QuizModal isVisible={isQuizModalVisible} onClose={closeQuizModal} />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>© 2024 NetBoots. Todos os direitos reservados.</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
