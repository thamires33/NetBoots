import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuizModal = ({ isVisible, onClose, onConfirm }) => {
    const [stylesChecked, setStylesChecked] = useState({
        casual: false,
        formal: false,
        sporty: false,
        elegant: false,
    });

    const handleStyleToggle = (style) => {
        setStylesChecked({ ...stylesChecked, [style]: !stylesChecked[style] });
    };

    const handleConfirm = () => {
        const selectedStyles = Object.keys(stylesChecked).filter((style) => stylesChecked[style]);
        onConfirm(selectedStyles);
        onClose();
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Escolha os estilos de sapatos:</Text>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, stylesChecked.casual && styles.checkboxChecked]}
                        onPress={() => handleStyleToggle('casual')}
                    >
                        <Text style={styles.checkboxText}>Casual</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.checkbox, stylesChecked.formal && styles.checkboxChecked]}
                        onPress={() => handleStyleToggle('formal')}
                    >
                        <Text style={styles.checkboxText}>Formal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.checkbox, stylesChecked.sporty && styles.checkboxChecked]}
                        onPress={() => handleStyleToggle('sporty')}
                    >
                        <Text style={styles.checkboxText}>Sporty</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.checkbox, stylesChecked.elegant && styles.checkboxChecked]}
                        onPress={() => handleStyleToggle('elegant')}
                    >
                        <Text style={styles.checkboxText}>Elegant</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginRight: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    checkboxChecked: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    checkboxText: {
        marginLeft: 5,
        color: 'black',
    },
    confirmButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#2196F3',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default QuizModal;
