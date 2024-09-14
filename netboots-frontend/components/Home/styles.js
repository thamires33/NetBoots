import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },

  header: {
    //height: '15%', //gambiarra?
    backgroundColor: '#8000FF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  logo: {
    marginLeft: 30,
    marginTop: 30,
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Futura',
  },
  searchBar: {
    marginTop: 30,
    maxWidth: 640,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  headerIcons: {
    marginTop: 30,
    flexDirection: 'row',
    marginRight: 50,
  },
  iconButton: {
    marginHorizontal: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
  },

  //Barra de Opções
  optionBar: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionBar2: {
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButton1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  optionText1: {
    marginLeft: 5,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  optionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#000',
  },

  //Carrossel de Imagens
  carousel: {
    backgroundColor: '#FF7F00',
    height: 370,
  },
  carouselItem: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcc80',
  },

  //Carrossel de Produtos
  productCarouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 150,
  },
  productCarousel: {
    flex: 1,
    paddingTop: 10,
  },
  productItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  productImage: {
    width: width * 0.25,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  navButtonLeft: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  navButtonRight: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },

  //Rodapé
  footer: {
    padding: 20,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
  },
});

export default styles;